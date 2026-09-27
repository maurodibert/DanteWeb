# DanteWeb - Dante Music Shop

## Project Overview

Custom website for Dante Andreo's music sheet (partituras) shop, replacing a legacy WordPress site at danteandreo.com.

## Current State

Next.js 16 (App Router) port of the `coro-andreo` static prototype (Sept 2026). Routes: `/`, `/catalogo` (work detail opens as a modal via `?obra=<slug>`), `/dante`, `/contacto`. ES/EN via the `lang` cookie (read server-side in `src/lib/lang.ts`, texts in `src/lib/texts.ts`). Cart in a client Context persisted to localStorage (`src/components/Providers.tsx`). Catalog data: `src/data/works.json` (321 works). Styling is the prototype's hand-written CSS in `src/app/globals.css` (no Tailwind). The cart and "Pagar con PayPal" are UI only — no payment integration yet. Content sources (catalog, previews, copy) live in `../../Contenido/`.

`.vercel/` links the folder to the Vercel project `coro-andreo` (still serving the static prototype).

## Tech Stack (target)

- **Frontend:** Next.js 14+ (App Router) with TypeScript
- **Styling:** plain CSS in `globals.css` (ported from the prototype)
- **Catalog Data:** JSON files (`data/catalog.json`), migrate to DB later if needed
- **Payments:** PayPal REST API / PayPal Buttons
- **Email:** Resend API (free tier up to 3000/month)
- **PDF Storage:** Vercel Blob or S3
- **Hosting:** Vercel (free tier)
- **Domain:** danteandreo.com (currently on OVH)

## Catalog Item Schema

```json
{
  "id": "001",
  "title": "Nombre de la partitura",
  "composer": "Compositor",
  "description": "Descripción breve",
  "price": 5.99,
  "currency": "USD",
  "difficulty": "Intermedio",
  "image": "/images/partituras/001.jpg",
  "pdfFile": "001-partitura.pdf",
  "preview": "/previews/001-preview.pdf"
}
```

## Key Pages

- **Home** - Landing page
- **Quién soy** - About Dante Andreo (bio, photo)
- **Catálogo** - Browse partituras with images, descriptions, and prices
- **Contacto** - Contact form or info

## Project Phases

1. **Setup & Static Site** - Next.js + Tailwind, layout (header/footer/nav), Quién soy page, contact page, catalog from JSON
2. **Payment System** - PayPal SDK integration, purchase buttons per partitura, sandbox testing, state handling (processing/completed/error)
3. **Delivery Automation** - PayPal webhook API route, Resend email integration, temporary/secure download links, email template with download link, PDF storage
4. **Deploy & Migration** - Deploy to Vercel, configure danteandreo.com domain, production testing, DNS migration from OVH

## Infrastructure

- **Current state:** WordPress running on OVH with `backupdb_wp_lstat` errors (keep running until new site is ready)
- **OVH Server:** imcbsly.cluster030.hosting.ovh.net
- **Migration strategy:** Build new site on Vercel, test on Vercel subdomain, switch DNS only when 100% ready

## MANDATORY: Auto-save Permissions

When the user grants a permission that required approval, you MUST immediately add it to the project's `.claude/settings.local.json` so it won't be asked again. Use the most general safe pattern (e.g. `Bash(git add:*)` not `Bash(git add README.md)`). Read the file, add the permission to `permissions.allow`, write it back. Do this EVERY time without exception.

## Guidelines

- Use App Router patterns (not Pages Router)
- Prefer server components where possible
- Keep catalog in JSON for simplicity initially
- UI text in Spanish and English (copy in `../../Contenido/copy.md`)
- Secure PDF delivery via temporary/signed download links
- Developer context: Mau is a mobile dev (React/Flutter) learning web dev - keep web explanations clear

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
