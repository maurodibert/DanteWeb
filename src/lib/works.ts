// =============================================================================
// works.ts — EL CATÁLOGO (321 obras) Y CÓMO SE FILTRA
// =============================================================================
// Los datos están en src/data/works.json. Acá les damos un tipo (como un
// modelo en Dart) y ponemos la lógica de búsqueda/filtros, que no depende
// de React y se puede usar tanto en el servidor como en el cliente.
// =============================================================================

import data from "@/data/works.json";

export type Work = {
  ref: string;
  title: string;
  voicing: string | null; // plantilla: "SATB", "SA + Piano"...
  textAuthor: string | null; // poeta o fuente del texto
  language: string | null;
  difficulty: number | null; // 1 fácil, 2 media, 3 avanzada
  duration: string | null; // "2:30"
  year: number | null;
  forSale: boolean; // false = la edita una editorial, no se vende acá
  publisher: string | null;
  slug: string;
  publisherUrl: string | null;
};

export const WORKS = data as Work[];

export const workBySlug = (slug: string) => WORKS.find((w) => w.slug === slug);

export const level = (w: Work) => w.difficulty || 2;

// Filtros del catálogo. "" = sin filtro. d: 1 (<2 min), 2 (2–4), 3 (>4). f: nivel.
export type Filters = { q: string; v: string; d: string; f: string };

const secs = (d: string | null) => {
  if (!d) return null;
  const [m, s] = d.split(":");
  return +m * 60 + +s;
};

export function matches(w: Work, F: Filters) {
  const q = F.q.trim().toLowerCase();
  if (q && !(w.title + " " + (w.textAuthor || "")).toLowerCase().includes(q)) return false;
  if (F.v && w.voicing !== F.v) return false;
  if (F.f && String(w.difficulty) !== F.f) return false;
  if (F.d) {
    const s = secs(w.duration);
    if (s == null) return false;
    if (F.d === "1" && s >= 120) return false;
    if (F.d === "2" && (s < 120 || s > 240)) return false;
    if (F.d === "3" && s <= 240) return false;
  }
  return true;
}

// Las 5 plantillas con más obras, para los chips de filtro.
export function topVoicings(n = 5): [string, number][] {
  const c: Record<string, number> = {};
  WORKS.forEach((w) => {
    if (w.voicing) c[w.voicing] = (c[w.voicing] || 0) + 1;
  });
  return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, n);
}

// Primera página de partitura que se muestra en la ficha. Solo hay 4 fotos
// reales; el resto usa una de ellas como muestra (igual que el prototipo).
const SHEETS = [
  "/img/sh-el-mar-la-mar-1.jpg",
  "/img/sh-amor-de-mis-entranas-1.jpg",
  "/img/sh-dejadme-a-ras-del-mar-1.jpg",
  "/img/sh-retablo-extremeno-1.jpg",
];
const REAL: Record<string, number> = { "el-mar-la-mar": 0, "amor-de-mis-entranas": 1, "dejadme-a-ras-del-mar": 2, "retablo-extremeno": 3 };
export const sheetOf = (w: Work) => SHEETS[REAL[w.slug] ?? WORKS.indexOf(w) % SHEETS.length];

// Grabaciones y videos por obra, por slug. k: "v" video, "a" audio.
// Ej: "el-mar-la-mar": [{ k: "v", t: "Camerata Lacunensis · Tenerife 2019", u: "https://youtu.be/xxxx" }]
export const MEDIA: Record<string, { k: "v" | "a"; t: string; u: string }[]> = {};
