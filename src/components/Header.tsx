"use client";
// =============================================================================
// Header.tsx — BARRA SUPERIOR FIJA
// =============================================================================
// Es "use client" porque reacciona al scroll, a la ruta actual y al pedido.
// En la home arranca transparente sobre el hero y se "pega" (fondo crema)
// al bajar 20px; en el resto de las páginas está siempre pegada.
//
// El monograma D/A:
// - En desktop es el link a la home; si ya estás en la home, te sube arriba de todo.
// - En mobile (< 980px, donde no entra el menú horizontal) abre un menú
//   desplegable con todas las páginas. Tocar la página en la que ya estás
//   también te sube arriba de todo.
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const onMono = (e: React.MouseEvent) => {
    if (window.matchMedia("(max-width: 980px)").matches) {
      e.preventDefault();
      setMenuOpen(!menuOpen);
    } else if (pathname === "/") {
      e.preventDefault();
      toTop();
    }
  };

  // Link del menú mobile: si es la página actual no navega, sube arriba.
  const onMenuLink = (href: string) => (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (href === pathname) {
      e.preventDefault();
      toTop();
    }
  };

  const stuck = pathname !== "/" || scrolled || menuOpen;
  const copies = bag.reduce((s, b) => s + b.q, 0);

  return (
    <>
      <header className={stuck ? "stuck" : undefined}>
        <div className="wrap">
          <nav className="nav">
            {NAV.map(([href, key]) => (
              <Link key={href} href={href} className={pathname === href ? "on" : undefined}>
                {t(key)}
              </Link>
            ))}
          </nav>
          <Link className="mono" href="/" aria-label={t("nHome")} aria-expanded={menuOpen} aria-controls="mmenu" onClick={onMono}>
            <svg width="46" height="40" viewBox="0 0 46 40" fill="none" style={{ fontFamily: "var(--disp)" }}>
              <text x="4" y="20" fontSize="19" fill="#2B0A1B">D</text>
              <text x="26" y="34" fontSize="19" fill="#2B0A1B">A</text>
              <line x1="32" y1="4" x2="14" y2="36" stroke="#2B0A1B" strokeWidth="1.6" />
            </svg>
            <span className={`caret${menuOpen ? " up" : ""}`} aria-hidden="true" />
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
        <nav id="mmenu" className={`mmenu${menuOpen ? " on" : ""}`} aria-hidden={!menuOpen}>
          <div className="wrap">
            {([["/", "nHome"], ...NAV] as [string, TextKey][]).map(([href, key]) => (
              <Link key={href} href={href} className={pathname === href ? "on" : undefined} onClick={onMenuLink(href)} tabIndex={menuOpen ? 0 : -1}>
                {t(key)}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      {/* Fuera del <header>: el backdrop-filter del header rompería el position:fixed. */}
      {menuOpen && <div className="mscrim" onClick={() => setMenuOpen(false)} />}
    </>
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
