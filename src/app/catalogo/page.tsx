// =============================================================================
// catalogo/page.tsx — RUTA "/catalogo"
// =============================================================================
// El encabezado se renderiza en el servidor; el buscador y la grilla son un
// Client Component (<Catalog />) porque responden a lo que escribís y tocás.
// <Suspense> es obligatorio alrededor de un componente que lee la URL con
// useSearchParams().
// =============================================================================

import { Suspense } from "react";
import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { getLang } from "@/lib/lang";
import { T } from "@/lib/texts";

export const metadata: Metadata = { title: "Catálogo" };

export default async function CatalogoPage() {
  const t = T[await getLang()];
  return (
    <main className="inner">
      <div className="phead">
        <div className="wrap">
          <p className="kicker">{t.catTag}</p>
          <h1 style={{ marginTop: 16 }}>{t.catTitle}</h1>
          <p>{t.catLead}</p>
        </div>
      </div>
      <Suspense>
        <Catalog />
      </Suspense>
    </main>
  );
}
