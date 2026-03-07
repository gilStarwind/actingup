# Acting Up Carolina — CLAUDE.md

## Project Overview

Website for **Acting Up Carolina LLC**, a performing arts school (acting, singing, dancing) for kids in Lake Wylie, SC. Celebrating 10+ years in business.

- **Address**: 5501 Hwy 55 E, Lake Wylie, SC 29710 (inside Imagine Church)
- **Phone**: (704) 313-8228
- **Email**: actingupcarolina@gmail.com
- **Registration platform**: JackRabbit Class (orgID: `519476`)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + React Router v6 |
| Build | Vite 7 |
| Styling | Tailwind CSS v3 + PostCSS |
| Animation | Framer Motion 11 |
| CSV parsing | PapaParse |
| Sanitization | DOMPurify |
| Language | JSX (`.jsx` / `.js`); TypeScript config present but source is JS |
| Package manager | npm |

---

## Project Structure

```
actingup/
├── app/                        # Vite + React SPA
│   ├── src/
│   │   ├── App.jsx             # Root — router + all routes defined here
│   │   ├── components/
│   │   │   ├── Shell.jsx       # Page layout wrapper (header, footer, glow orbs)
│   │   │   ├── Header.jsx      # Sticky nav with mobile menu
│   │   │   ├── Footer.jsx
│   │   │   ├── Cta.jsx         # Primary call-to-action button
│   │   │   ├── GlowOrbs.jsx    # Decorative background elements
│   │   │   └── Stripe.jsx      # Decorative top stripe
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Classes.jsx     # CSV-driven class listings
│   │   │   ├── Camps.jsx
│   │   │   ├── Calendar.jsx    # JackRabbit iframe embed + location
│   │   │   ├── Gallery.jsx     # Photo gallery by show
│   │   │   ├── Cast.jsx        # Cast Hub — resources & cast lists
│   │   │   ├── About.jsx       # Instructor bios
│   │   │   ├── Contact.jsx
│   │   │   ├── ScheduleHelper.jsx  # Admin CSV preview/debug tool
│   │   │   └── NotFound.jsx
│   │   ├── hooks/
│   │   │   ├── useClassSchedule.js  # Fetches CSV/JSON schedule with fallback
│   │   │   ├── useGallery.js        # Fetches show photos (sheet or static JSON)
│   │   │   └── useLightbox.js       # Lightbox state for gallery
│   │   ├── data/
│   │   │   ├── instructors.js           # Instructor name/role/bio/img
│   │   │   ├── castResources.js         # CAST_RESOURCES + CAST_LISTS arrays
│   │   │   └── classScheduleFallback.json  # Fallback schedule if fetch fails
│   │   └── utils/helpers.js    # brand colors, publicAsset, galleryAsset, slugify
│   └── package.json
├── class-schedule/             # Drop index.csv here for deployment (Docker mount)
├── gallery/                    # Drop show photo folders here for deployment (Docker mount)
├── tools/
│   └── gen-gallery.mjs         # Generates index.json + photos.json for gallery folders
└── CLAUDE.md
```

---

## Dev Commands

All commands run from the `app/` directory:

```bash
cd app
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + Vite build → dist/
npm run preview   # Serve the production build locally
```

---

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, trust bar, marquee |
| `/classes` | Classes | CSV-driven class cards |
| `/camps` | Camps | Static content + JackRabbit registration link |
| `/calendar` | Calendar | JackRabbit iframe + Apple Maps link |
| `/gallery` | Gallery | Per-show photo grid + lightbox |
| `/cast` | Cast Hub | Resources + cast list links |
| `/about` | About | Instructor bios from `instructors.js` |
| `/contact` | Contact | Contact form / info |
| `/schedule-helper` | Schedule Helper | Admin tool — not linked in main nav |

---

## Brand Colors

Defined in `app/src/utils/helpers.js` as the `brand` object:

```js
purple:     "#6d28d9"  // Tailwind purple-700
purpleSoft: "#a78bfa"  // Tailwind violet-300
yellow:     "#facc15"  // Tailwind yellow-400
yellowDark: "#eab308"  // Tailwind yellow-500
black:      "#0a0a0a"
```

Always use `brand.*` values for inline styles rather than hardcoding hex codes.

---

## Environment Variables

All Vite env vars must be prefixed `VITE_` to be exposed to the client.

| Variable | Purpose | Default |
|---|---|---|
| `VITE_SCHEDULE_CSV_URL` | Remote CSV URL for class schedule | `/class-schedule/index.csv` |
| `VITE_SCHEDULE_JSON_URL` | Remote JSON URL for class schedule | `/class-schedule/index.json` |
| `VITE_GALLERY_SHEET_URL` | Google Sheet CSV URL for gallery data | _(disabled if unset)_ |
| `VITE_GALLERY_BASE_URL` | Base URL for gallery photo assets | `/shows` |

---

## Data Management

### Class Schedule

The schedule on `/classes` is loaded dynamically by `useClassSchedule`:

1. Tries `VITE_SCHEDULE_CSV_URL` (or `/class-schedule/index.csv`)
2. Falls back to `VITE_SCHEDULE_JSON_URL` (or `/class-schedule/index.json`)
3. Falls back to `src/data/classScheduleFallback.json`

**To update the schedule**: Drop a new `index.csv` into `class-schedule/` on the server, or point `VITE_SCHEDULE_CSV_URL` to a published Google Sheet CSV.

Required CSV headers: `status, title, description, days, times, gender, ages, openings, starts, ends, session, tuition, fees`

Use `/schedule-helper` in the browser to validate a CSV before uploading.

### Gallery

Photos are loaded by `useGallery`:

1. Tries `VITE_GALLERY_SHEET_URL` (Google Sheet with columns: `label/show`, `slug`, `src/image`, `alt`, `caption`, `show_order`, `photo_order`)
2. Falls back to `/shows/index.json` + per-show `/shows/<slug>/photos.json`

**To add a new show**: Create a folder in `gallery/` (on the server), drop photos in, then run:
```bash
node tools/gen-gallery.mjs path/to/gallery
```
This generates `index.json` and `photos.json` for each show folder.

### Instructors

Edit `app/src/data/instructors.js` — update the `INSTRUCTORS` array with `name`, `role`, `img`, and `bio`.

### Cast Hub

Edit `app/src/data/castResources.js`:
- `CAST_RESOURCES` — links to Google Drive folders, rehearsal tracks, etc.
- `CAST_LISTS` — cast list PDFs or images; set `fileType: "pdf"` or `"image"` explicitly if needed.

---

## External Integrations

- **JackRabbit** (class management): Registration links and parent portal use orgID `519476`. The `/calendar` page embeds the JackRabbit event calendar via iframe.
- **Google Drive**: Used for cast resources and cast list documents — share links should use Drive's preview format (`/preview` suffix for PDFs, `uc?export=view&id=` for images).

---

## Deployment Notes

- The app is deployed on **Vercel** (see recent git commits).
- A **Docker/Nginx** setup also exists for self-hosting (Raspberry Pi mentioned in `gallery/README.md`). It mounts:
  - `class-schedule/` → `/usr/share/nginx/html/class-schedule`
  - `gallery/` → `/usr/share/nginx/html/shows`
- SSL certs live in Docker volumes — **never commit them to git**.
- `dist/`, `node_modules/`, `.DS_Store`, `.vscode/` are all gitignored.

---

## Coding Conventions

- Pages always wrap content in `<Shell>` (provides header, footer, layout padding, and background gradient).
- Use `publicAsset(path)` for links to files under `public/` and `galleryAsset(path)` for gallery photos — both handle base URL correctly across deployment environments.
- Inline styles for brand colors only; use Tailwind classes for everything else.
- Keep content updates in data files (`instructors.js`, `castResources.js`, fallback JSON) rather than inline in JSX.
- All user-facing strings from external sources (CSV, sheets) are sanitized with DOMPurify before rendering.
