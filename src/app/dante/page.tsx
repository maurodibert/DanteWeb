// =============================================================================
// dante/page.tsx — RUTA "/dante" (biografía)
// =============================================================================
// Server Component. Los textos largos (bio, línea de tiempo, coros, premios)
// están en lib/dante.ts; acá solo se arma la página.
// =============================================================================

import type { Metadata } from "next";
import Image from "next/image";
import { getLang } from "@/lib/lang";
import { T } from "@/lib/texts";
import { BIO, CHOIRS, PRIZES, TL } from "@/lib/dante";

export const metadata: Metadata = { title: "Dante" };

const PUBLISHERS = [
  "Carus-Verlag · Stuttgart",
  "Santa Barbara Music · California",
  "C. M. Ediciones · Bilbao",
  "Ediciones GCC · Buenos Aires",
  "Confederación Coral Española",
  "Viceconsejería de Cultura de Canarias",
];

// Fotos de la galería. name: null = persona todavía sin identificar. wide: ocupa más ancho.
const GALLERY: { src: string; w: number; h: number; name: string | null; wide?: boolean }[] = [
  { src: "/img/p1.jpg", w: 640, h: 480, name: null, wide: true },
  { src: "/img/p7.jpg", w: 248, h: 249, name: "Alberto Grau" },
  { src: "/img/p8.jpg", w: 197, h: 250, name: "Isabel Palacios" },
  { src: "/img/p3.jpg", w: 640, h: 640, name: null },
  { src: "/img/p6.jpg", w: 640, h: 431, name: null, wide: true },
  { src: "/img/p4.jpg", w: 640, h: 623, name: null },
  { src: "/img/p5.jpg", w: 640, h: 424, name: null },
  { src: "/img/p2.jpg", w: 640, h: 427, name: null, wide: true },
  { src: "/img/p9.jpg", w: 1280, h: 960, name: null },
  { src: "/img/p10.jpg", w: 1280, h: 960, name: null, wide: true },
];

const P = { fontSize: 14.5, lineHeight: 1.78, color: "var(--plum-2)", maxWidth: "50ch" } as const;

export default async function DantePage() {
  const lang = await getLang();
  const t = T[lang];

  return (
    <main className="inner">
      <div className="phead">
        <div className="wrap">
          <p className="kicker">{t.bTag}</p>
          <h1>{t.bTitle}</h1>
          <p>{t.bLead}</p>
        </div>
      </div>

      <div className="wrap">
        <figure className="storyArt" style={{ margin: 0 }}>
          <Image src="/img/historia.jpg" alt="Ilustración de Dante Andreo escribiendo una partitura, con un coro detrás" width={1600} height={833} priority />
        </figure>
      </div>

      <div className="wrap">
        <div className="bio" style={{ paddingTop: 56 }}>
          <div>
            {BIO[lang].map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : undefined}>{p}</p>
            ))}
          </div>
          <div className="aside">
            <p className="kicker" style={{ color: "var(--plum-3)" }}>{t.edLbl}</p>
            <div className="tags">
              {PUBLISHERS.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <p className="kicker" style={{ color: "var(--plum-3)", marginTop: 30 }}>{t.pzLbl}</p>
            <div className="prz">
              {PRIZES.map(([y, w, d]) => (
                <div className="r" key={y}>
                  <span className="y">{y}</span>
                  <span>
                    <span className="w">{w}</span>
                    <br />
                    <span className="d">{d}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="kicker">{t.tlTag}</p>
        <div className="tl">
          {TL[lang].map(([y, txt], i) => (
            <div key={i}>
              <b>{y}</b>
              <p>{txt}</p>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 74 }}>
          <p className="kicker">{t.whoTag}</p>
          <h2 style={{ fontSize: "clamp(30px,4.2vw,50px)", marginTop: 14, maxWidth: "22ch" }}>{t.whoTitle}</h2>
          <p style={{ marginTop: 18, fontSize: 15, color: "var(--plum-2)", maxWidth: "56ch", lineHeight: 1.7 }}>{t.whoSub}</p>
          <div className="choirs">
            {CHOIRS.map(([name, dir, place]) => (
              <div key={name}>
                <b>{name}</b>
                {dir && <span>{dir}</span>}
                <em>{place}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="duo">
          <figure style={{ margin: 0 }}>
            <Image src="/img/cancionero.jpg" alt="Dante Andreo con un cantoral manuscrito" width={880} height={1099} />
            <figcaption className="cap">{t.cnCap}</figcaption>
          </figure>
          <div>
            <p className="kicker">{t.cnTag}</p>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", margin: "14px 0 22px" }}>{t.cnTitle}</h2>
            <p style={{ ...P, marginBottom: 14 }}>{t.cn1}</p>
            <p style={P}>{t.cn2}</p>
          </div>
        </div>

        <p className="kicker" style={{ marginTop: 20 }}>{t.crTag}</p>
        <h2 style={{ fontSize: "clamp(28px,3.8vw,46px)", marginTop: 14, maxWidth: "20ch" }}>{t.crTitle}</h2>
        <div className="gal">
          {GALLERY.map((g) => (
            <figure key={g.src} className={g.wide ? "w" : undefined}>
              <Image src={g.src} alt={g.name || ""} width={g.w} height={g.h} />
              <figcaption className={g.name ? undefined : "tbd"}>{g.name || t.tbd}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
