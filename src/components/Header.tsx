"use client";
// =============================================================================
// Header.tsx — BARRA SUPERIOR FIJA
// =============================================================================
// Es "use client" porque reacciona al scroll, a la ruta actual y al pedido.
// En la home arranca transparente sobre el hero y se "pega" (fondo crema)
// al bajar 20px; en el resto de las páginas está siempre pegada.
// =============================================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart, useLang } from "./Providers";
import type { TextKey } from "@/lib/texts";

const NAV: [string, TextKey][] = [
  ["/catalogo", "nCat"],
  ["/dante", "nBio"],
  ["/contacto", "nCon"],
];

export function Header() {
  const pathname = usePathname();
  const { lang, t, setLang } = useLang();
  const { bag, setPanelOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const stuck = pathname !== "/" || scrolled;
  const copies = bag.reduce((s, b) => s + b.q, 0);

  return (
    <header className={stuck ? "stuck" : undefined}>
      <div className="wrap">
        <nav className="nav">
          {NAV.map(([href, key]) => (
            <Link key={href} href={href} className={pathname === href ? "on" : undefined}>
              {t(key)}
            </Link>
          ))}
        </nav>
        <Link className="mono" href="/" aria-label="Inicio">
          <svg width="46" height="40" viewBox="0 0 46 40" fill="none" style={{ fontFamily: "var(--disp)" }}>
            <text x="4" y="20" fontSize="19" fill="#2B0A1B">D</text>
            <text x="26" y="34" fontSize="19" fill="#2B0A1B">A</text>
            <line x1="32" y1="4" x2="14" y2="36" stroke="#2B0A1B" strokeWidth="1.6" />
          </svg>
        </Link>
        <div className="tail">
          <div className="lng">
            <button aria-pressed={lang === "es"} aria-label="Español" onClick={() => setLang("es")}>
              <FlagEs />
              ES
            </button>
            <button aria-pressed={lang === "en"} aria-label="English" onClick={() => setLang("en")}>
              <FlagEn />
              EN
            </button>
          </div>
          <button className="bag" onClick={() => setPanelOpen(true)}>
            <span>{t("bag")}</span>
            <b>{copies}</b>
          </button>
        </div>
      </div>
    </header>
  );
}

function FlagEs() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true">
      <g clipPath="url(#fes)">
        <rect width="17" height="12" fill="#F3C348" />
        <rect width="17" height="3.5" fill="#C4224E" />
        <rect y="8.5" width="17" height="3.5" fill="#C4224E" />
      </g>
      <rect x=".9" y=".9" width="15.2" height="10.2" rx="2" fill="none" stroke="#2B0A1B" strokeWidth="1.5" />
      <defs>
        <clipPath id="fes">
          <rect x=".9" y=".9" width="15.2" height="10.2" rx="2" />
        </clipPath>
      </defs>
    </svg>
  );
}

function FlagEn() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true">
      <g clipPath="url(#fen)">
        <rect width="17" height="12" fill="#20447E" />
        <path d="M0 0L17 12M17 0L0 12" stroke="#FFFAEC" strokeWidth="3.2" />
        <path d="M0 0L17 12M17 0L0 12" stroke="#C4224E" strokeWidth="1.3" />
        <path d="M8.5 0v12M0 6h17" stroke="#FFFAEC" strokeWidth="4" />
        <path d="M8.5 0v12M0 6h17" stroke="#C4224E" strokeWidth="2" />
      </g>
      <rect x=".9" y=".9" width="15.2" height="10.2" rx="2" fill="none" stroke="#2B0A1B" strokeWidth="1.5" />
      <defs>
        <clipPath id="fen">
          <rect x=".9" y=".9" width="15.2" height="10.2" rx="2" />
        </clipPath>
      </defs>
    </svg>
  );
}
