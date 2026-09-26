# OFF//RECORD — Issue 01: After Dark

A clearly labeled fictional independent magazine and portfolio case study about culture, fashion, music and art. React + Vite, with structured editorial content and no backend.

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
- `src/main.jsx`: home, latest/search, four categories, issue, article, case study, about and 404 views. The city essay, fashion editorial and music essay have distinct layouts.
- `src/styles.css`: a modular night-radio interface built from electric blue, signal green, coral and ink. System sans type drives the interface, with Georgia reserved for long-form reading. Includes fully recomposed mobile layouts, focus states and reduced-motion support.
- `public/images/concept-*`: six original AI-generated concept images plus optimized 640px and 1600px WebP variants. Below-the-fold images load lazily.
- `artwork-source/`: the lossless PNG generation masters, retained outside the public deployment bundle.

The article index reveals the corresponding image beside the pointer and on keyboard focus. Touch layouts show inline thumbnails. Galleries use native modal dialogs, arrow keys, Escape and focus restoration. Latest supports combined category and text filtering.

All contributors and editorial situations are fictional. Every image referenced by the published site was generated specifically for this project. The source/output record and portfolio-use review are in `IMAGE_RIGHTS.md`; legacy images with unknown provenance are quarantined in `legacy-unverified-images/` and excluded from production. Contact and submission endpoints have deliberately not been invented.

## Design rationale

The issue behaves like a live city broadcast rather than a sequence of print spreads: paired signal cards, compact utility navigation, pill-shaped actions, image-led story modules and a transmission log. Article bodies keep a focused reading measure, side metadata, pull quotes, inline imagery and contact sheets.

The next issue is announced without inventing an archive. The content is shared across the homepage, latest, category and issue pages so additions have one source of truth.

The `/case-study` route explains the typography system, twelve-to-four-column responsive grid and art direction. It also includes navigation, a complete linked article example and desktop/tablet/mobile compositions.
