// =============================================================================
// page.tsx — LA PÁGINA PRINCIPAL (Home / ruta "/")
// =============================================================================
//
// En Next.js App Router, cada archivo "page.tsx" corresponde a una URL:
//   - src/app/page.tsx          → danteandreo.com/          (home)
//   - src/app/catalogo/page.tsx → danteandreo.com/catalogo  (catálogo)
//   - src/app/contacto/page.tsx → danteandreo.com/contacto  (contacto)
//
// Este archivo exporta una función (componente) que devuelve JSX.
// JSX es básicamente HTML que podés escribir dentro de JavaScript/TypeScript.
// La diferencia con HTML puro:
//   - "class" se escribe "className" (porque class es palabra reservada en JS)
//   - Los atributos van en camelCase: onclick → onClick, tabindex → tabIndex
//   - Podés meter expresiones JS entre llaves: {variable}, {2 + 2}, {items.map(...)}
//   - Los componentes custom van con Mayúscula: <Header />, <Footer />
//
// IMPORTANTE — SERVER COMPONENT vs CLIENT COMPONENT:
// Este archivo NO tiene "use client" arriba, así que es un SERVER COMPONENT.
// Eso significa que se ejecuta en el servidor y manda HTML puro al browser.
// Ventaja: más rápido, mejor SEO.
// Limitación: no podés usar useState, useEffect, onClick, ni nada interactivo.
// Cuando necesites interactividad, creás un componente aparte con "use client".
// =============================================================================

// Image es el componente de Next.js para imágenes. Es mejor que <img> porque:
// - Optimiza el tamaño automáticamente (genera WebP, distintos tamaños)
// - Hace lazy loading (carga la imagen solo cuando el usuario scrollea hasta ella)
// - Reserva el espacio para evitar layout shift (que la página "salte")
// Es como el widget Image de Flutter con caching y optimización built-in.
import Image from "next/image";

// =============================================================================
// COMPONENTES AUXILIARES
// =============================================================================
// En React, podés definir componentes chicos dentro del mismo archivo.
// Son funciones que devuelven JSX. Los usamos para organizar el código,
// igual que cuando en Flutter extraés un método _buildHeader() de un Widget.
// =============================================================================

// --- HEADER / NAVEGACIÓN ---
// Esto es la barra de navegación que va arriba de todas las páginas.
function Header() {
  return (
    // <header> es una etiqueta HTML semántica (le dice al browser/Google
    // que esto es el encabezado de la página).
    //
    // Tailwind clases usadas acá:
    // - "w-full"          → ancho 100%
    // - "border-b"        → línea fina abajo
    // - "border-stone-200"→ color de esa línea (stone claro)
    // - "bg-white/80"     → fondo blanco con 80% opacidad (el /80 es la opacidad)
    // - "backdrop-blur-sm"→ efecto blur detrás (como el glass effect de iOS)
    // - "sticky top-0"    → se queda fija arriba al scrollear
    // - "z-50"            → z-index alto para que quede por encima del contenido
    <header className="w-full border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      {/*
        Este div interior centra el contenido y pone un ancho máximo.
        - "max-w-5xl"   → ancho máximo ~1024px (para que no se estire en pantallas enormes)
        - "mx-auto"     → margin horizontal auto = centra el bloque
        - "px-6"        → padding horizontal 24px (espacio a los costados)
        - "py-4"        → padding vertical 16px
        - "flex"        → activa Flexbox (como Row en Flutter)
        - "items-center"→ centra verticalmente (crossAxisAlignment.center)
        - "justify-between" → espacia los hijos a los extremos (MainAxisAlignment.spaceBetween)
      */}
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* El nombre/logo — un link que va al home */}
        <a href="/" className="text-xl font-semibold tracking-tight">
          Dante Andreo
        </a>

        {/* Navegación — <nav> es la etiqueta semántica para links de navegación */}
        {/*
          "gap-8" → espacio de 32px entre cada link (como el spacing en un Row de Flutter)
          "text-sm" → tamaño de texto chico (14px)
          "hover:text-stone-600" → cambia color cuando el mouse pasa por encima
          "transition-colors" → anima el cambio de color suavemente
        */}
        <nav className="flex gap-8 text-sm">
          <a href="/" className="hover:text-stone-600 transition-colors">
            Inicio
          </a>
          <a href="/quien-soy" className="hover:text-stone-600 transition-colors">
            Quién soy
          </a>
          <a href="/catalogo" className="hover:text-stone-600 transition-colors">
            Catálogo
          </a>
          <a href="/contacto" className="hover:text-stone-600 transition-colors">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    // <footer> → etiqueta semántica para el pie de página
    // "mt-auto" → empuja el footer al fondo (funciona porque el contenedor padre tiene min-h-screen + flex col)
    <footer className="w-full border-t border-stone-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} Dante Andreo. Todos los derechos reservados.
      </div>
    </footer>
  );
}

// =============================================================================
// COMPONENTE PRINCIPAL — La página Home
// =============================================================================
// "export default" significa que este es el componente principal del archivo.
// Next.js busca el "export default" de page.tsx para renderizar la página.
// =============================================================================
export default function Home() {
  return (
    // "min-h-screen" → altura mínima = 100% de la ventana del browser
    // "flex flex-col" → Flexbox en columna (como Column en Flutter)
    // Esto hace que Header esté arriba, el contenido en el medio, y Footer abajo.
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* <main> → etiqueta semántica que indica el contenido principal */}
      <main className="flex-1">
        {/* ============================================================
            HERO SECTION — La sección grande de bienvenida
            ============================================================
            "flex-1" → ocupa todo el espacio disponible entre header y footer
            (como Expanded en Flutter)
        */}
        <section className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          {/*
            RESPONSIVE DESIGN con Tailwind:
            Tailwind usa prefijos para breakpoints (tamaños de pantalla):
            - Sin prefijo → mobile (default, pantalla chica)
            - "md:"       → pantallas medianas (≥768px)
            - "lg:"       → pantallas grandes (≥1024px)

            "flex-col md:flex-row" significa:
            - En mobile: los elementos van en columna (foto arriba, texto abajo)
            - En desktop (md+): van en fila (foto a la izquierda, texto a la derecha)

            Es como hacer un Column que se convierte en Row en tablets/desktop.
          */}

          {/* --- Foto de Dante --- */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden shadow-lg flex-shrink-0">
            {/*
              El componente Image de Next.js:
              - "fill" → la imagen llena el contenedor (el div padre necesita "relative")
              - "className='object-cover'" → recorta para llenar sin deformar (como BoxFit.cover)
              - "priority" → carga esta imagen inmediatamente (sin lazy loading),
                porque está "above the fold" (visible sin scrollear)
              - "sizes" → le dice al browser qué tamaño va a tener la imagen
                en distintas pantallas, para que descargue la versión correcta
            */}
            <Image
              src="/images/dante_andreo_1.jpg"
              alt="Dante Andreo"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 256px, 320px"
            />
          </div>

          {/* --- Texto de bienvenida --- */}
          <div className="text-center md:text-left">
            {/*
              Tipografía en Tailwind:
              - "text-4xl" → tamaño grande (36px)
              - "font-bold" → negrita
              - "tracking-tight" → letras más juntas (kerning)
              - "leading-tight" → interlineado compacto (line-height)
              - "text-stone-800" → color casi negro, cálido
            */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-stone-800">
              Partituras de tango
              <br />
              para guitarra
            </h1>

            {/*
              "mt-4" → margin-top 16px (espacio arriba)
              "text-lg" → texto un poco más grande que lo normal (18px)
              "text-stone-600" → gris medio (para contraste sutil con el título)
              "max-w-md" → ancho máximo ~448px (para que no sean renglones larguísimos)
            */}
            <p className="mt-4 text-lg text-stone-600 max-w-md">
              Arreglos y composiciones originales de Dante Andreo.
              Partituras profesionales listas para descargar.
            </p>

            {/* Botón que lleva al catálogo */}
            {/*
              Tailwind para botones:
              - "inline-block" → se comporta como bloque pero en línea con el texto
              - "mt-8" → margin-top 32px
              - "px-8 py-3" → padding horizontal y vertical
              - "bg-stone-800" → fondo oscuro
              - "text-white" → texto blanco
              - "rounded-full" → bordes totalmente redondeados (pill shape)
              - "hover:bg-stone-700" → un poco más claro al pasar el mouse
              - "transition-colors" → anima el cambio suavemente
              - "text-sm font-medium" → texto chico y semi-negrita
            */}
            <a
              href="/catalogo"
              className="inline-block mt-8 px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors text-sm font-medium"
            >
              Ver catálogo
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
