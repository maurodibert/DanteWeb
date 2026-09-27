"use client";
// =============================================================================
// WorkModal.tsx — FICHA DE UNA OBRA (primera página, datos y compra)
// =============================================================================
// Si la obra se vende acá: selector de copias + "Añadir al pedido".
// Si la edita una editorial: aviso con el link a la editorial.
// =============================================================================

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart, useLang } from "./Providers";
import { MEDIA, level, sheetOf, type Work } from "@/lib/works";
import { eur, unitPrice } from "@/lib/pricing";

export function WorkModal({ work: w, onClose }: { work: Work; onClose: () => void }) {
  const { t } = useLang();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  // Arranca oculto y se muestra en el cuadro siguiente, para que corra la animación de entrada.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const setQ = (n: number) => setQty(Math.max(1, isNaN(n) ? 1 : n));
  const u = unitPrice(qty);
  const lv = level(w);
  const spec: [string, string | number | null][] = [
    [t("mVoi"), w.voicing],
    [t("mPoet"), w.textAuthor],
    [t("mLang"), w.language],
    [t("mDur"), w.duration],
    [t("mYear"), w.year],
    [t("mDif"), `${t("niv")} ${lv} · ${[t("dif1"), t("dif2"), t("dif3")][lv - 1]}`],
  ];
  const media = MEDIA[w.slug] || [];

  const addToBag = () => {
    add(w.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <>
      <div className={`scrim${shown ? " on" : ""}`} onClick={onClose} />
      <div className={`modal${shown ? " on" : ""}`}>
        <div className="box">
          <div className="pg">
            <Image src={sheetOf(w)} alt={w.title} width={620} height={878} />
          </div>
          <div className="sd">
            <button className="xx" onClick={onClose} aria-label="Cerrar">
              ×
            </button>
            <p className="kicker">Nº {w.ref || "—"}</p>
            <h2>{w.title}</h2>
            <dl className="spec">
              {spec
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
            </dl>

            {media.length > 0 && (
              <div className="med">
                <p className="kicker" style={{ color: "var(--plum-3)" }}>{t("listenT")}</p>
                <ul>
                  {media.map((m) => (
                    <li key={m.u}>
                      <a href={m.u} target="_blank" rel="noopener">
                        <span className="ico">
                          {m.k === "v" ? (
                            <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor"><path d="M0 0l9 5-9 5z" /></svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M10.4 1.4v6M4.6 2.8v5.6M10.4 1.4L4.6 2.8" />
                              <circle cx="2.9" cy="9.1" r="1.7" />
                              <circle cx="8.7" cy="7.6" r="1.7" />
                            </svg>
                          )}
                        </span>
                        {m.t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {w.forSale ? (
              <div className="buy">
                <div className="qr">
                  <div>
                    <span className="kicker" style={{ color: "var(--plum-3)" }}>{t("copies")}</span>
                    <div className="stp">
                      <button aria-label="menos" onClick={() => setQ(qty - 1)}>−</button>
                      <input type="number" min={1} value={qty} onChange={(e) => setQ(parseInt(e.target.value || "1", 10))} />
                      <button aria-label="más" onClick={() => setQ(qty + 1)}>+</button>
                    </div>
                    <p style={{ fontSize: 11.5, color: "var(--plum-3)", marginTop: 6 }}>{t("perS")}</p>
                  </div>
                  <div className="amt">
                    <b>{eur(u * qty)}</b>
                    <span>
                      {eur(u)} {t("each")}
                    </span>
                  </div>
                </div>
                <p className="fine">{t("hint")}</p>
                <button className="full" onClick={addToBag}>
                  {added ? t("added") : t("add")}
                </button>
              </div>
            ) : (
              <div className="out">
                <b>
                  {t("extT")} {w.publisher || "—"}.
                </b>
                <br />
                {t("extB")}
                {w.publisherUrl && (
                  <>
                    <br />
                    <a className="extlink" href={w.publisherUrl} target="_blank" rel="noopener">
                      {t("extGo")} ↗
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
