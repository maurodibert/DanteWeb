// =============================================================================
// page.tsx — HOME (ruta "/")
// =============================================================================
// Server Component: se renderiza en el servidor, ya en el idioma de la cookie,
// y llega al navegador como HTML sin JavaScript propio. Solo el header y el
// pedido (en el layout) son interactivos.
//
// Secciones: hero · cuatro obras destacadas · cómo funciona · foto del taller · cierre.
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import { getLang } from "@/lib/lang";
import { T } from "@/lib/texts";
import { PICKS } from "@/lib/dante";
import { workBySlug } from "@/lib/works";

export default async function Home() {
  const lang = await getLang();
  const t = T[lang];

  return (
    <main>
      <section className="hero">
        <div className="heroArt">
          <Image src="/img/ilustracion.jpg" alt="Ilustración de Dante Andreo dirigiendo, rodeado de hojas" width={1080} height={1319} priority />
        </div>
        <div className="wrap">
          <div className="heroText">
            <h1>
              <span>{t.h1a}</span>
              <br />
              <span>{t.h1b}</span>
            </h1>
            <p className="lead">{t.lead}</p>
            <div className="cta">
              <Link className="btn" href="/catalogo">{t.cta1}</Link>
              <Link className="btn ghost" href="/dante">
                <span className="tri" />
                <span>{t.cta2}</span>
              </Link>
            </div>
            <div className="social">
              <a href="mailto:contacto@danteandreo.com" aria-label="Email">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <rect x="2.5" y="5" width="19" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
              <Link href="/catalogo" aria-label="Catálogo">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M4 4h7v16H4zM13 4h7v16h-7z" />
                </svg>
              </Link>
              <Link href="/dante" aria-label="Dante">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4.5 20a7.5 7.5 0 0115 0" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="kicker">{t.fTag}</p>
              <h2 style={{ marginTop: 14 }}>{t.fTitle}</h2>
            </div>
            <Link className="more" href="/catalogo">{t.fMore}</Link>
          </div>
          <div className="picks">
            {PICKS.map((p) => {
              const w = workBySlug(p.slug);
              if (!w) return null;
              return (
                <Link className="pick" key={p.slug} href={`/catalogo?obra=${p.slug}`}>
                  <div className="im">
                    <Image src={p.sheet} alt={w.title} width={620} height={878} />
                  </div>
                  <h3>{w.title}</h3>
                  <p className="who">{w.textAuthor}</p>
                  <p className="st">
                    {w.voicing} · {w.duration}
                  </p>
                  {p.prize && <span className="pz">{p.prize[lang]}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="kicker">{t.sTag}</p>
              <h2 style={{ marginTop: 14 }}>{t.sTitle}</h2>
            </div>
            <p>{t.sSub}</p>
          </div>
          <div className="steps">
            <div className="step">
              <svg className="ic" viewBox="0 0 80 80" fill="none">
                <rect x="9" y="9" width="48" height="62" rx="4" fill="#F7B9C6" stroke="#2B0A1B" strokeWidth="3.5" />
                <path d="M20 28h26M20 40h26M20 52h16" stroke="#2B0A1B" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="57" cy="55" r="16" fill="#F3C348" stroke="#2B0A1B" strokeWidth="3.5" />
                <path d="M52 55l4 4 8-9" stroke="#2B0A1B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>{t.s1a}</h3>
              <p>{t.s1b}</p>
            </div>
            <div className="step">
              <svg className="ic" viewBox="0 0 80 80" fill="none">
                <circle cx="24" cy="24" r="12" fill="#BFC873" stroke="#2B0A1B" strokeWidth="3.5" />
                <circle cx="47" cy="24" r="12" fill="#F4726E" stroke="#2B0A1B" strokeWidth="3.5" />
                <circle cx="35" cy="47" r="12" fill="#F3C348" stroke="#2B0A1B" strokeWidth="3.5" />
                <path d="M12 70h56" stroke="#2B0A1B" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <h3>{t.s2a}</h3>
              <p>{t.s2b}</p>
            </div>
            <div className="step">
              <svg className="ic" viewBox="0 0 80 80" fill="none">
                <rect x="8" y="18" width="64" height="44" rx="5" fill="#F7B9C6" stroke="#2B0A1B" strokeWidth="3.5" />
                <path d="M9 22l31 22 31-22" stroke="#2B0A1B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="63" cy="20" r="11" fill="#C4224E" stroke="#2B0A1B" strokeWidth="3.5" />
              </svg>
              <h3>{t.s3a}</h3>
              <p>{t.s3b}</p>
            </div>
          </div>
          <div className="lic">
            <p>
              <b>{t.licB}</b> {t.licR}
            </p>
          </div>
        </div>
      </section>

      <figure className="band" style={{ margin: 0 }}>
        <Image src="/img/taller.jpg" alt="Dante Andreo en un taller coral" width={1900} height={855} />
        <figcaption>
          <div className="wrap">
            <span>{t.bA}</span>
            <span>{t.bB}</span>
          </div>
        </figcaption>
      </figure>

      <section className="closer">
        <div className="wrap">
          <div>
            <h2>{t.cTitle}</h2>
            <p>{t.cSub}</p>
          </div>
          <Link className="btn" href="/catalogo">{t.cBtn}</Link>
        </div>
      </section>
    </main>
  );
}
