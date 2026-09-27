// =============================================================================
// page.tsx — LA PÁGINA PRINCIPAL (Home / ruta "/")
// =============================================================================
//
// ESTRUCTURA DE ESTA PÁGINA:
// La landing está armada como 5 "frames" (secciones de pantalla completa)
// que el usuario recorre haciendo scroll. Cada <section> ocupa el 100%
// de la altura de la ventana del browser ("h-screen" en Tailwind).
//
// Frame 1: Foto de Dante (dante_frame_1.png) sobre fondo negro
// Frame 2: Frase de Antonio Machado (texto sobre fondo oscuro)
// Frame 3: Frase de Antonio Machado (texto sobre fondo claro)
// Frame 4: Foto de Dante (dante_frame_2 — TODO: agregar asset)
// Frame 5: Foto de Dante (dante_frame_3.jpg) con texto final
//
// CONCEPTO CLAVE — COMPOSICIÓN DE COMPONENTES:
// En React, construís la UI combinando componentes chicos.
// Acá definimos Header, Footer, y cada Frame como componentes separados
// dentro del mismo archivo, y después los armamos en Home().
// Es como armar un Column de Widgets en Flutter.
// =============================================================================

import Image from "next/image";

// =============================================================================
// HEADER — Barra de navegación
// =============================================================================
// Está sobre fondo negro/oscuro, así que usamos texto blanco.
// "fixed" en vez de "sticky": se queda flotando sobre TODO el contenido,
// no importa en qué frame estés. Necesita z-50 para estar por encima.
// "bg-black/50 backdrop-blur" → semitransparente con blur, así se ve el
// contenido debajo sin tapar la navegación.
// =============================================================================
function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / nombre — texto blanco para contraste con fondo oscuro */}
        <a href="/" className="text-xl font-semibold tracking-tight text-white">
          Dante Andreo
        </a>

        {/*
          Navegación — los links usan text-white/70 (blanco al 70% de opacidad)
          y en hover suben a 100% opacidad. Esto crea un efecto sutil y elegante.
        */}
        <nav className="flex gap-8 text-sm">
          <a href="/" className="text-white/70 hover:text-white transition-colors">
            Inicio
          </a>
          <a href="/quien-soy" className="text-white/70 hover:text-white transition-colors">
            Quién soy
          </a>
          <a href="/catalogo" className="text-white/70 hover:text-white transition-colors">
            Catálogo
          </a>
          <a href="/contacto" className="text-white/70 hover:text-white transition-colors">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}

// =============================================================================
// FRAME 1 — Hero con dante_frame_1.png sobre fondo negro
// =============================================================================
// La imagen es un PNG con fondo transparente (recortado), así que la ponemos
// sobre fondo negro y se integra naturalmente.
//
// LAYOUT: La imagen va a la derecha/abajo y el texto a la izquierda/arriba.
// "h-screen" = height: 100vh = la sección ocupa toda la ventana del browser.
// "relative" = necesario para que el Image con "fill" se posicione dentro.
// =============================================================================
function Frame1() {
  return (
    <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      {/*
        IMAGEN DE FONDO (el PNG de Dante):
        - "fill" → la imagen ocupa todo el contenedor (necesita padre "relative")
        - "object-contain" → muestra la imagen completa sin recortar (a diferencia
          de object-cover que recorta). Como es un PNG recortado, queremos verlo entero.
        - "object-bottom" → alinea la imagen abajo (Dante "parado" sobre el borde inferior)
        - "opacity-90" → levemente transparente para que el texto resalte
        - "pointer-events-none" → la imagen no intercepta clicks (pasan al texto de atrás)
      */}
      <Image
        src="/images/dante_frame_1.png"
        alt="Dante Andreo"
        fill
        className="object-contain object-bottom opacity-90 pointer-events-none"
        priority
        sizes="100vw"
      />

      {/*
        TEXTO superpuesto sobre la imagen.
        "relative z-10" → lo pone por encima de la imagen (que tiene z-index default).
        Sin esto, el texto quedaría detrás de la imagen.
      */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/*
          Tipografía grande y elegante:
          - "text-5xl md:text-7xl" → 48px en mobile, 72px en desktop
          - "font-light" → peso fino (elegante, editorial)
          - "tracking-wide" → letras más espaciadas (opuesto a tracking-tight)
          - "text-white" → blanco para contraste con fondo negro
        */}
        <h1 className="text-5xl md:text-7xl font-light tracking-wide text-white">
          Dante Andreo
        </h1>

        {/*
          Línea decorativa entre título y subtítulo.
          - "w-24" → ancho de 96px
          - "h-px" → altura de 1 pixel (una línea fina)
          - "bg-white/40" → blanco al 40% de opacidad
          - "mx-auto my-6" → centrada horizontalmente con margin vertical
        */}
        <div className="w-24 h-px bg-white/40 mx-auto my-6" />

        <p className="text-lg md:text-xl text-white/70 font-light tracking-widest uppercase">
          Partituras de tango para guitarra
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// FRAME 2 — Primera frase de Machado (fondo oscuro cálido)
// =============================================================================
// Un frame de texto puro. El diseño es minimalista: frase centrada con mucho
// espacio alrededor (whitespace). Esto genera impacto visual y ritmo al scrollear.
//
// "min-h-screen" en vez de "h-screen": altura MÍNIMA de pantalla completa.
// Si el texto es más largo que la pantalla (en mobile), se expande en vez de cortar.
// =============================================================================
function Frame2() {
  return (
    <section className="min-h-screen bg-stone-900 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/*
          <blockquote> → etiqueta semántica HTML para citas textuales.
          Los buscadores y lectores de pantalla entienden que es una cita.

          "italic" → texto en cursiva (apropiado para citas literarias)
          "text-3xl md:text-4xl" → grande para impacto visual
          "leading-relaxed" → interlineado generoso (más espacio entre renglones)
          "text-stone-300" → gris claro cálido sobre el fondo oscuro
        */}
        <blockquote className="italic text-3xl md:text-4xl font-light leading-relaxed text-stone-300">
          &ldquo;Caminante, no hay camino,
          <br />
          se hace camino al andar.&rdquo;
        </blockquote>

        {/*
          &ldquo; y &rdquo; → comillas tipográficas ("") en HTML.
          Son más elegantes que las comillas rectas ("").

          <cite> → etiqueta semántica para la fuente/autor de una cita.
          "not-italic" → porque <cite> es italic por defecto y ya lo usamos arriba.
        */}
        <cite className="block mt-8 text-sm text-stone-500 not-italic tracking-widest uppercase">
          Antonio Machado
        </cite>
      </div>
    </section>
  );
}

// =============================================================================
// FRAME 3 — Segunda frase de Machado (fondo claro, contraste con frame 2)
// =============================================================================
// Alternamos oscuro → claro → oscuro para crear ritmo visual.
// El usuario siente el cambio de "mood" al scrollear.
// =============================================================================
function Frame3() {
  return (
    <section className="min-h-screen bg-stone-100 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <blockquote className="italic text-3xl md:text-4xl font-light leading-relaxed text-stone-700">
          &ldquo;Todo pasa y todo queda,
          <br />
          pero lo nuestro es pasar,
          <br />
          pasar haciendo caminos,
          <br />
          caminos sobre la mar.&rdquo;
        </blockquote>

        <cite className="block mt-8 text-sm text-stone-400 not-italic tracking-widest uppercase">
          Antonio Machado — Proverbios y cantares
        </cite>
      </div>
    </section>
  );
}

// =============================================================================
// FRAME 4 — dante_frame_2 (TODO: falta el asset)
// =============================================================================
// Cuando tengas el archivo dante_frame_2, poné el .jpg o .png en:
//   public/images/dante_frame_2.jpg
// y descomentá la línea del Image.
//
// Por ahora muestra un frame oscuro con un texto placeholder.
// =============================================================================
function Frame4() {
  return (
    <section className="relative min-h-screen bg-stone-800 flex items-center justify-center overflow-hidden">
      {/*
        TODO: Descomentar cuando exista el asset dante_frame_2:

        <Image
          src="/images/dante_frame_2.jpg"
          alt="Dante Andreo"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
      */}

      {/* Texto superpuesto — se ve mientras no haya imagen, y también con la imagen */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed">
          Arreglos y composiciones originales
          <br />
          para guitarra clásica y criolla
        </p>

        <a
          href="/catalogo"
          className="inline-block mt-10 px-10 py-3 border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
        >
          Ver catálogo
        </a>
      </div>
    </section>
  );
}

// =============================================================================
// FRAME 5 — dante_frame_3.jpg como fondo con overlay
// =============================================================================
// La foto de Dante contra la pared de piedra. Es una foto con fondo propio
// (no recortada como frame 1), así que la usamos como background con un
// overlay oscuro semitransparente encima para poder leer el texto.
//
// TRUCO DEL OVERLAY:
// Ponemos un <div> con "bg-black/50" (negro al 50%) entre la imagen
// y el texto. Esto oscurece la foto para que el texto blanco sea legible.
// Es un patrón muy común en diseño web.
// =============================================================================
function Frame5() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo — llena toda la sección */}
      <Image
        src="/images/dante_frame_3.jpg"
        alt="Dante Andreo"
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/*
        OVERLAY oscuro — un div invisible que oscurece la foto.
        - "absolute inset-0" → se posiciona cubriendo todo el padre (top/right/bottom/left = 0)
        - "bg-black/50" → negro al 50% de opacidad
      */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Texto final — sobre el overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="text-3xl md:text-5xl font-light text-white leading-relaxed">
          La música es el lenguaje
          <br />
          que no necesita traducción
        </p>

        <div className="w-24 h-px bg-white/40 mx-auto my-8" />

        <a
          href="/contacto"
          className="inline-block px-10 py-3 border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
        >
          Contacto
        </a>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER — Pie de página minimalista
// =============================================================================
function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Dante Andreo. Todos los derechos reservados.
      </div>
    </footer>
  );
}

// =============================================================================
// COMPONENTE PRINCIPAL — Ensambla todos los frames
// =============================================================================
// Acá se componen todos los frames en orden. React los renderiza como un
// documento HTML largo donde el usuario scrollea de uno a otro.
//
// Notar que NO usamos "min-h-screen" en el div raíz porque cada frame
// ya tiene su propia altura completa. El div raíz es solo un contenedor.
// =============================================================================
export default function Home() {
  return (
    <div>
      <Header />

      {/* Cada frame es una sección de pantalla completa */}
      <main>
        <Frame1 />
        <Frame2 />
        <Frame3 />
        <Frame4 />
        <Frame5 />
      </main>

      <Footer />
    </div>
  );
}
