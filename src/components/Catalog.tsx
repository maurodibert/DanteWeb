"use client";
// =============================================================================
// Catalog.tsx — BUSCADOR, FILTROS Y GRILLA DE OBRAS
// =============================================================================
// La ficha abierta se refleja en la URL (/catalogo?obra=el-mar-la-mar): así se
// puede compartir el link de una obra, y los destacados de la home abren la
// ficha directamente. Los filtros son estado local (useState).
//
// La barra de filtros se repliega apenas elegís algo: quedan solo los filtros
// activos (con su ×) y el botón "Filtros" para volver a abrirla. En mobile
// arranca replegada siempre, para no tapar media pantalla. Qué se ve en cada
// caso lo decide el CSS (.slim, .mopen, .hasf en globals.css), así no hay que
// averiguar el ancho de pantalla desde JavaScript.
// =============================================================================

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "./Providers";
import { WorkModal } from "./WorkModal";
import { WORKS, level, matches, topVoicings, workBySlug, type Filters } from "@/lib/works";

type FilterKey = "v" | "d" | "f";
const EMPTY: Filters = { q: "", v: "", d: "", f: "" };
const VOICINGS = topVoicings();

function Funnel() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <path d="M1.7 2.5h12.6L9.6 8v5.3l-3.2-1.9V8z" />
    </svg>
  );
}

export function Catalog() {
  const { t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const [F, setF] = useState<Filters>(EMPTY);
  const [fOpen, setFOpen] = useState(false);

  const list = WORKS.filter((w) => matches(w, F));
  const anyF = !!(F.v || F.d || F.f);
  const slim = anyF && !fOpen;
  const nActive = [F.v, F.d, F.f].filter(Boolean).length;

  const DUR: [string, string][] = [["1", t("dur1")], ["2", t("dur2")], ["3", t("dur3")]];
  const DIF: [string, string][] = [["1", "1 · " + t("dif1")], ["2", "2 · " + t("dif2")], ["3", "3 · " + t("dif3")]];
  const label = (k: FilterKey, v: string) =>
    k === "v" ? v : k === "d" ? DUR.find(([a]) => a === v)![1] : t("niv") + " " + DIF.find(([a]) => a === v)![1];

  const toggle = (k: FilterKey, v: string) => {
    setF({ ...F, [k]: F[k] === v ? "" : v });
    setFOpen(false);
  };
  const clear = (k: FilterKey) => setF({ ...F, [k]: "" });

  const selected = workBySlug(params.get("obra") || "");
  const openWork = (slug: string) => router.replace(`/catalogo?obra=${slug}`, { scroll: false });
  const closeWork = useCallback(() => router.replace("/catalogo", { scroll: false }), [router]);

  const chip = (k: FilterKey, v: string, l: string, num?: number) => (
    <button key={k + v} className={`chip${F[k] === v ? " on" : ""}`} onClick={() => toggle(k, v)}>
      {l}
      {num ? <span className="n">{num}</span> : null}
    </button>
  );
  const countInner = (
    <>
      <b>{list.length}</b> {t("works")}
    </>
  );

  return (
    <>
      <div className={`tools${slim ? " slim" : ""}${fOpen ? " mopen" : ""}${anyF ? " hasf" : ""}`}>
        <div className="wrap">
          <div className="sr">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9">
              <circle cx="7" cy="7" r="4.6" />
              <path d="M10.6 10.6L14.6 14.6" />
            </svg>
            <input
              type="search"
              autoComplete="off"
              aria-label="Buscar"
              placeholder={t("ph")}
              value={F.q}
              onChange={(e) => setF({ ...F, q: e.target.value })}
            />
          </div>
          <div className="fbar">
            <button className="chip fbtn ftoggle" aria-expanded={fOpen} onClick={() => setFOpen(!fOpen)}>
              <Funnel />
              {t("filters")}
              {nActive > 0 && <span className="n">{nActive}</span>}
            </button>
            <span className="fbody">
              <span className="grp">
                <span className="glbl">{t("mVoi")}</span>
                {chip("v", "", t("allV"))}
                {VOICINGS.map(([v, num]) => chip("v", v, v, num))}
              </span>
              <span className="grp">
                <span className="glbl">{t("mDur")}</span>
                {DUR.map(([v, l]) => chip("d", v, l))}
              </span>
              <span className="grp">
                <span className="glbl">{t("niv")}</span>
                {DIF.map(([v, l]) => chip("f", v, l))}
              </span>
              <span className="frow">
                <button className="chip fbtn fdone" onClick={() => setFOpen(false)}>
                  {t("done")}
                </button>
                <span className="mcount">{countInner}</span>
              </span>
            </span>
            <span className="factive">
              {(["v", "d", "f"] as FilterKey[])
                .filter((k) => F[k])
                .map((k) => (
                  <span className="pill" key={k}>
                    {label(k, F[k])}
                    <b
                      role="button"
                      tabIndex={0}
                      title={t("rm")}
                      onClick={() => clear(k)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          clear(k);
                        }
                      }}
                    >
                      ×
                    </b>
                  </span>
                ))}
            </span>
            <span className="count">{countInner}</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="grid">
          {list.length ? (
            list.map((w) => (
              <article
                className="card"
                key={w.slug}
                tabIndex={0}
                onClick={() => openWork(w.slug)}
                onKeyDown={(e) => e.key === "Enter" && openWork(w.slug)}
              >
                <span className="no">Nº {w.ref || "·"}</span>
                <h3>{w.title}</h3>
                <p className="au">{w.textAuthor || "—"}</p>
                {!w.forSale && <span className="ed">{t("edBadge")}</span>}
                <div className="ft">
                  <span className="tag" title={w.voicing || ""}>{w.voicing || "—"}</span>
                  <span className="dur">{w.duration || "—"}</span>
                  <span className={`lvl l${level(w)}`}>
                    {t("niv")} {level(w)}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="void">
              <h3>{t("none")}</h3>
              <p>{t("noneP")}</p>
              <button
                className="btn ghost"
                onClick={() => {
                  setF(EMPTY);
                  setFOpen(false);
                }}
              >
                {t("reset")}
              </button>
            </div>
          )}
        </div>
      </div>

      {selected && <WorkModal key={selected.slug} work={selected} onClose={closeWork} />}
    </>
  );
}
