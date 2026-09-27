"use client";
// =============================================================================
// Providers.tsx — ESTADO COMPARTIDO DEL LADO DEL CLIENTE
// =============================================================================
// Un Context de React es como un InheritedWidget / Provider en Flutter:
// cualquier componente de más abajo puede leerlo con un hook (useLang, useCart)
// sin pasarlo por props de nivel en nivel.
//
// - Idioma: la fuente de verdad es la cookie "lang". El layout (servidor) la
//   lee y nos pasa el valor. setLang escribe la cookie y hace router.refresh(),
//   que vuelve a pedirle al servidor las páginas ya en el otro idioma.
// - Pedido (carrito): vive en memoria y se guarda en localStorage para que no
//   se pierda al recargar. Se guarda por slug, no por posición en la lista.
// =============================================================================

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { T, type Lang, type TextKey } from "@/lib/texts";

type LangCtx = { lang: Lang; t: (k: TextKey) => string; setLang: (l: Lang) => void };
const LangContext = createContext<LangCtx | null>(null);

export type BagItem = { slug: string; q: number };
type CartCtx = {
  bag: BagItem[];
  add: (slug: string, q: number) => void;
  remove: (slug: string) => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
};
const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "dante-bag";

export function Providers({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const router = useRouter();

  const setLang = useCallback(
    (l: Lang) => {
      document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
      router.refresh();
    },
    [router],
  );
  const langValue = useMemo(() => ({ lang, t: (k: TextKey) => T[lang][k], setLang }), [lang, setLang]);

  const [bag, setBag] = useState<BagItem[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);

  // Al montar, recuperamos el pedido guardado. localStorage puede fallar
  // (modo privado, bloqueado), por eso el try/catch.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage solo existe en el navegador
      if (Array.isArray(saved)) setBag(saved);
    } catch {}
  }, []);

  const save = (next: BagItem[]) => {
    setBag(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const cartValue: CartCtx = {
    bag,
    add: (slug, q) => {
      const found = bag.find((b) => b.slug === slug);
      save(found ? bag.map((b) => (b.slug === slug ? { ...b, q: b.q + q } : b)) : [...bag, { slug, q }]);
    },
    remove: (slug) => save(bag.filter((b) => b.slug !== slug)),
    panelOpen,
    setPanelOpen,
  };

  return (
    <LangContext.Provider value={langValue}>
      <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
    </LangContext.Provider>
  );
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang fuera de <Providers>");
  return c;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart fuera de <Providers>");
  return c;
}
