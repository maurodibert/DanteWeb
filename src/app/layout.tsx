// =============================================================================
// layout.tsx — EL LAYOUT RAÍZ (Root Layout)
// =============================================================================
//
// EN NEXT.JS (App Router):
// - Cada carpeta dentro de "src/app/" puede ser una RUTA (URL).
//   Ej: src/app/catalogo/page.tsx → se accede en danteandreo.com/catalogo
//
// - "layout.tsx" envuelve TODAS las páginas como un "contenedor".
//   Es como un Scaffold en Flutter: define la estructura que se repite
//   (header, footer, fuentes, etc.) y en el medio va el contenido de cada página.
//
// - "page.tsx" es el contenido específico de cada ruta.
//   Este layout.tsx envuelve al page.tsx de esta misma carpeta (y de las subcarpetas).
//
// - Este archivo es un SERVER COMPONENT (componente de servidor) por defecto.
//   Esto significa que se ejecuta en el servidor, NO en el browser.
//   Es como si fuera un endpoint que devuelve HTML ya armado.
//   Si necesitás interactividad (clicks, estados), usás "use client" arriba del archivo.
// =============================================================================

// "import type" trae solo el TIPO (para TypeScript), no código real.
// Metadata es el tipo que define título, descripción, etc. para SEO (<head> del HTML).
import type { Metadata } from "next";

// Next.js tiene un sistema de fuentes que las descarga en build time
// (no desde el browser del usuario), lo que mejora performance.
// Geist es la fuente que usa Vercel. La cargamos con el subset "latin".
import { Geist } from "next/font/google";

// Importamos los estilos globales (Tailwind CSS + nuestras variables de colores).
import "./globals.css";

// Creamos una instancia de la fuente. "variable" la hace disponible como
// CSS variable (--font-geist-sans) para usarla en Tailwind.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// "metadata" es un objeto especial que Next.js lee para generar las tags <title>,
// <meta description>, etc. en el <head> del HTML. Esto es para SEO y para que
// se vea bien cuando compartís el link en WhatsApp, Twitter, etc.
export const metadata: Metadata = {
  title: "Dante Andreo — Partituras",
  description:
    "Partituras de tango para guitarra por Dante Andreo. Arreglos y composiciones originales.",
};

// =============================================================================
// EL COMPONENTE RootLayout
// =============================================================================
// En React, un "componente" es una función que devuelve JSX (HTML con superpoderes).
// En Flutter sería un Widget. Los componentes reciben "props" (como los parámetros
// de un constructor de Widget).
//
// "children" es un prop especial: representa lo que va DENTRO de este componente.
// En este caso, Next.js le pasa automáticamente el contenido de page.tsx.
//
// Pensalo así:
//   <RootLayout>
//     <PaginaActual />    ← esto es "children"
//   </RootLayout>
// =============================================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // ReactNode = cualquier cosa que React pueda renderizar
}>) {
  return (
    // lang="es" → le dice al browser y a Google que el contenido está en español
    <html lang="es">
      {/*
        className en JSX = class en HTML (se llama distinto porque "class"
        es palabra reservada en JavaScript).

        Tailwind CSS funciona con clases utilitarias:
        - "antialiased" → suaviza el rendering de las fuentes
        - "bg-stone-50" → fondo gris piedra muy claro (stone es la paleta, 50 el tono)
        - "text-stone-900" → texto casi negro

        ${geistSans.variable} → inyecta la CSS variable de la fuente Geist
      */}
      <body
        className={`${geistSans.variable} font-sans antialiased bg-stone-50 text-stone-900`}
      >
        {/*
          {children} → acá se renderiza el contenido de la página actual.
          Es como el "body" del Scaffold en Flutter.
        */}
        {children}
      </body>
    </html>
  );
}
