# OFF//RECORD — Issue 01: After Dark

A fictional independent magazine about culture, fashion, music and art. React + Vite, with structured editorial content and no backend.

## Run

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm run build
npm run preview
```

The production output is `dist/`. The build writes separate HTML entry points with titles, descriptions and Open Graph metadata for all 16 routes. The interactive content renders in React. Trailing slashes are supported.

For production canonical URLs, absolute social images and a sitemap, build with your real domain:

```sh
SITE_URL=https://your-domain.example npm run build
```

Serve the generated directories directly and serve `404.html` with status 404 for unknown URLs. A Netlify `_redirects` file is included. The site has not been deployed to a public host.

## Editorial system

- `src/content.js`: eight original stories, authors, issue membership, cover images, gallery sequences and section text. Reading times are calculated from the copy.
- `src/main.jsx`: home, latest/search, four categories, issue, article, about and 404 views. The city essay, fashion editorial and music essay have distinct layouts.
- `src/styles.css`: warm paper, ink and vermilion; Instrument Serif headlines and reading text, Inter navigation/wordmark, DM Mono metadata. Includes mobile layouts, focus states and reduced-motion support.
- `public/images/`: the existing reference imagery plus optimized 640px and 1600px WebP variants. Original files are retained. Below-the-fold images load lazily.

The article index reveals the corresponding image beside the pointer and on keyboard focus. Touch layouts show inline thumbnails. Galleries use native modal dialogs, arrow keys, Escape and focus restoration. Latest supports combined category and text filtering.

All contributors and editorial situations are fictional. Existing reference image provenance/licensing was not supplied; confirm image permissions or replace the references before public publication. Contact and submission endpoints have deliberately not been invented.

## Design rationale

The issue works as a sequence of magazine spreads: a cinematic cover, a large lead story, an asymmetric dark spread, a dense index and a full-bleed closing image. Orange provides the recurring visual punctuation. Article bodies use a narrower reading measure, side metadata, pull quotes, inline imagery and contact sheets.

The next issue is announced without inventing an archive. The content is shared across the homepage, latest, category and issue pages so additions have one source of truth.
