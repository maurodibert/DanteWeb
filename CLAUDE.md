# DanteWeb - Dante Music Shop

## Project Overview

Custom website for Dante Andreo's music sheet (partituras) shop, replacing a legacy WordPress site at danteandreo.com.

## Tech Stack

- **Frontend:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS
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

## Guidelines

- Use App Router patterns (not Pages Router)
- Prefer server components where possible
- Keep catalog in JSON for simplicity initially
- All UI text in Spanish
- Secure PDF delivery via temporary/signed download links
- Developer context: Mau is a mobile dev (React/Flutter) learning web dev - keep web explanations clear
