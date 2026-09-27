// Ruta "/contacto" — Server Component, sin interacción.
import type { Metadata } from "next";
import Image from "next/image";
import { getLang } from "@/lib/lang";
import { T } from "@/lib/texts";

export const metadata: Metadata = { title: "Contacto" };

export default async function ContactoPage() {
  const t = T[await getLang()];
  return (
    <main className="inner">
      <section className="reach">
        <div className="wrap">
          <div>
            <p className="kicker">{t.rTag}</p>
            <h1 style={{ marginTop: 16 }}>{t.rTitle}</h1>
            <p>{t.rLead}</p>
            <a className="mailto" href="mailto:contacto@danteandreo.com">contacto@danteandreo.com</a>
          </div>
          <figure className="reachArt" style={{ margin: 0 }}>
            <Image src="/img/contacto-ilus.jpg" alt="Ilustración de Dante Andreo dirigiendo" width={900} height={1091} />
          </figure>
        </div>
      </section>
    </main>
  );
}
