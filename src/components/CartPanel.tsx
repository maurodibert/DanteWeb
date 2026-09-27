"use client";
// =============================================================================
// CartPanel.tsx — PANEL LATERAL "TU PEDIDO"
// =============================================================================
// El botón "Pagar con PayPal" todavía no hace nada: la integración de pagos
// es la próxima fase.
// =============================================================================

import { useEffect } from "react";
import { useCart, useLang } from "./Providers";
import { workBySlug } from "@/lib/works";
import { eur, unitPrice } from "@/lib/pricing";

export function CartPanel() {
  const { t } = useLang();
  const { bag, remove, panelOpen, setPanelOpen } = useCart();

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanelOpen(false);
    document.body.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [panelOpen, setPanelOpen]);

  const items = bag.flatMap((b) => {
    const w = workBySlug(b.slug);
    return w ? [{ ...b, w }] : [];
  });
  const copies = items.reduce((s, c) => s + c.q, 0);
  const total = items.reduce((s, c) => s + unitPrice(c.q) * c.q, 0);

  return (
    <>
      <div className={`scrim${panelOpen ? " on" : ""}`} onClick={() => setPanelOpen(false)} />
      <aside className={`pan${panelOpen ? " on" : ""}`} aria-hidden={!panelOpen}>
        <div className="panH">
          <div>
            <p className="kicker" style={{ color: "var(--plum-3)" }}>{t("yourOrder")}</p>
            <h2>{items.length ? `${items.length} ${t("items")} · ${copies} ${t("cps")}` : "—"}</h2>
          </div>
          <button className="xx" style={{ position: "static", marginLeft: "auto" }} onClick={() => setPanelOpen(false)} aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="panB">
          {items.length === 0 ? (
            <p style={{ color: "var(--plum-3)", padding: "16px 0" }}>{t("empty")}</p>
          ) : (
            <>
              {items.map(({ slug, q, w }) => (
                <div className="it" key={slug}>
                  <div className="t">
                    <b>{w.title}</b>
                    <span>
                      {w.voicing} · {q} {t("cps")} × {eur(unitPrice(q))}
                    </span>
                    <br />
                    <button onClick={() => remove(slug)}>{t("rm")}</button>
                  </div>
                  <div className="p">{eur(unitPrice(q) * q)}</div>
                </div>
              ))}
              <div className="tot">
                <span className="kicker" style={{ color: "var(--plum-3)" }}>{t("total")}</span>
                <b>{eur(total)}</b>
              </div>
              <button className="pp">{t("pay")}</button>
              <p style={{ fontSize: 12, color: "var(--plum-3)", marginTop: 12 }}>{t("mailn")}</p>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
