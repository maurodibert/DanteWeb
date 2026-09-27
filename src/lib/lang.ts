// Lee el idioma de la cookie "lang" en el servidor. Solo se puede usar en
// Server Components (page.tsx, layout.tsx), no en componentes "use client".
import { cookies } from "next/headers";
import type { Lang } from "./texts";

export async function getLang(): Promise<Lang> {
  return (await cookies()).get("lang")?.value === "en" ? "en" : "es";
}
