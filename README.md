# Fatāwā Archive

A clean, fast static website for publishing translated Islamic fatwas, built with [Astro](https://astro.build), Tailwind CSS, and Fuse.js for client-side search.

## Features

- 📚 **Content Collections** — Type-safe frontmatter with Zod schema validation
- 🔍 **Full-text search** — Client-side Fuse.js search over a pre-built JSON index
- 👨‍🏫 **Scholar pages** — Dedicated pages for each scholar with bio and fatwa listings
- 🗂️ **Category pages** — Browse fatwas by topic
- 🎨 **Clean Tailwind UI** — Teal/cream/gold palette with Libre Baskerville + Source Sans 3
- ⚡ **Static output** — Fully pre-rendered, deployable anywhere
- 🚀 **Vercel-ready** — `vercel.json` included

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Adding Fatwas

Create a new Markdown file in `src/content/fatwas/`:

```
src/content/fatwas/006.md
```

With this frontmatter:

```yaml
---
id: "006"
scholar: ibn-baz              # ibn-baz | ibn-uthaymin | al-albani | muqbil | yahya
categories:
  - Prayer
  - Purification
source_url: https://binbaz.org.sa/fatwas/5678
translator: Abu Abdillah
reviewer: Abu Khadeejah       # optional
date_issued: "1415-03-10"    # Hijri or ISO date string
date_added: 2024-06-01       # ISO date — used for sorting
---

## Question

Your question text here.

## Answer

The scholar's answer here.
```

The `id` should match the filename (without `.md`) and be unique.

---

## Search Index

The search index is generated automatically during build. To regenerate manually:

```bash
npm run build:index
```

This reads all Markdown files and writes `public/search-index.json` used by the client-side Fuse.js search.

---

## Build & Deploy

### Vercel (recommended)

1. Push this repo to GitHub/GitLab.
2. Import it in [vercel.com](https://vercel.com).
3. Vercel auto-detects Astro — no extra configuration needed.
4. The `vercel.json` sets `buildCommand` to `npm run build`, which runs the search index script first.

### Manual build

```bash
npm run build
# Output in ./dist — serve with any static host
```

---

## Project Structure

```
fatwa-site/
├── public/
│   └── search-index.json        # Auto-generated; commit or regenerate at build
├── scripts/
│   └── build-search-index.js    # Generates search-index.json from Markdown content
├── src/
│   ├── content/
│   │   ├── config.ts            # Zod schema for fatwas collection
│   │   └── fatwas/              # One .md file per fatwa
│   ├── components/
│   │   ├── FatwaCard.astro
│   │   ├── FilterBar.astro
│   │   └── SearchWidget.astro   # Fuse.js search (client-side JS)
│   ├── data/
│   │   └── scholars.ts          # Scholar metadata
│   ├── layouts/
│   │   └── Layout.astro         # Base HTML shell + nav + footer
│   ├── pages/
│   │   ├── index.astro          # Home — recent fatwas with filters
│   │   ├── search.astro         # Search page
│   │   ├── scholars.astro       # All scholars
│   │   ├── categories.astro     # All categories
│   │   ├── fatwa/[id].astro     # Individual fatwa
│   │   ├── scholar/[scholar].astro
│   │   └── category/[category].astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## Customisation

### Adding a new scholar

Edit `src/data/scholars.ts` and add an entry. Then update the Zod enum in `src/content/config.ts`:

```ts
const scholars = ['ibn-baz', 'ibn-uthaymin', 'al-albani', 'muqbil', 'yahya', 'your-new-scholar'] as const;
```

### Colours & fonts

Edit `tailwind.config.js` — the palette uses `teal`, `gold`, `cream`, and `sand` tokens.
