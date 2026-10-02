// =============================================================================
// layout.tsx — EL MARCO COMÚN DE TODAS LAS PÁGINAS
// =============================================================================
// Next.js envuelve cada página (page.tsx) con este layout: header, footer,
// panel del pedido y los Providers (idioma + pedido) quedan montados mientras
// navegás, así el carrito no se pierde al cambiar de página.
//
// Es un Server Component: puede leer la cookie de idioma antes de mandar el HTML.
// =============================================================================

import type { Metadata } from "next";
import { Abril_Fatface, DM_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { CartPanel } from "@/components/CartPanel";
import { getLang } from "@/lib/lang";
import { T } from "@/lib/texts";
import "./globals.css";

// next/font descarga las fuentes en el build y las sirve desde el propio sitio.
// Cada una queda en una variable CSS (--font-abril, --font-dm) que usa globals.css.
const abril = Abril_Fatface({ weight: "400", subsets: ["latin"], variable: "--font-abril" });
const dm = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], weight: ["400", "500", "700"], variable: "--font-dm" });

export const metadata: Metadata = {
  metadataBase: new URL("https://danteandreo.com"),
  title: { default: "Dante Andreo — Música coral", template: "%s — Dante Andreo" },
  description:
    "341 obras corales de Dante Andreo sobre poesía de García Lorca, Alberti y Pedro García Cabrera. Partituras por copia autorizada, entregadas por email.",
  openGraph: {
    title: "Dante Andreo — El arte de cantar juntos",
    description: "341 obras corales. Eliges la partitura, decides cuántas copias necesita tu coro y llegan a tu correo.",
    images: ["/img/ilustracion.jpg"],
  },
  // Mientras el sitio nuevo no reemplace al WordPress, que Google no lo indexe.
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    // suppressHydrationWarning: algunos navegadores (Chrome en iPhone) le agregan
    // atributos propios al <html> antes de que cargue React; no es un error nuestro.
    <html lang={lang} className={`${abril.variable} ${dm.variable}`} suppressHydrationWarning>
      <body>
        <Providers lang={lang}>
          <Header />
          {children}
          <footer>
            <div className="wrap">
              <span>
                © 2026 Dante Andreo · <span>{T[lang].rights}</span>
              </span>
              <span>
                <a href="mailto:contacto@danteandreo.com">contacto@danteandreo.com</a>
              </span>
            </div>
          </footer>
          <CartPanel />
        </Providers>
      </body>
    </html>
  );
}
