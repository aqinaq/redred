import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { stories, images } from '../src/content.js';

const template = await readFile('dist/index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const description = 'A fictional editorial concept for culture, fashion, music and art. Issue 01: After Dark.';
const origin = process.env.SITE_URL?.replace(/\/$/, '');
if (origin && !/^https?:\/\//.test(origin)) throw new Error('SITE_URL must be an absolute HTTP(S) URL.');
const pages = [
  { path: '/', title: 'After Dark' },
  { path: '/latest', title: 'Latest stories' },
  { path: '/issues/01', title: 'Issue 01 — After Dark' },
  { path: '/about', title: 'About the publication' },
  { path: '/case-study', title: 'Case study', description: 'The design system, responsive grid, typography and art direction behind the fictional OFF//RECORD editorial concept.' },
  ...['Culture', 'Fashion', 'Music', 'Art'].map(title => ({path: `/category/${title.toLowerCase()}`, title})),
  ...stories.map(story => ({path: `/article/${story.slug}`, title: story.title, description: story.blurb, image: story.image, story})),
];

function html(page) {
  const title = escape(`${page.title} — OFF//RECORD`);
  const summary = escape(page.description || description);
  const image = escape(`${origin || ''}${page.image || images.hero}`);
  let result = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${summary}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${summary}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${image}`);
  const extra = [`<meta property="og:type" content="${page.story ? 'article' : 'website'}" />`];
  if (origin) extra.push(`<link rel="canonical" href="${escape(origin + page.path)}" />`, `<meta property="og:url" content="${escape(origin + page.path)}" />`);
  if (page.path === '/404') extra.push('<meta name="robots" content="noindex" />');
  result = result.replace('</head>', `${extra.join('\n    ')}\n  </head>`);
  return result;
}

for (const page of pages) {
  const directory = `dist${page.path === '/' ? '' : page.path}`;
  await mkdir(directory, {recursive: true});
  await writeFile(`${directory}/index.html`, html(page));
}
await writeFile('dist/404.html', html({path:'/404',title:'Page not found'}));
if (origin) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page=>`<url><loc>${escape(origin+page.path)}</loc></url>`).join('')}</urlset>`);
console.log(`Built metadata pages for ${pages.length} routes, plus 404.`);
