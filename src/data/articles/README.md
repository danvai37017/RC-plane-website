# Authoring articles

Every article on the site is **one file** in this folder tree. The registry
([`index.js`](./index.js)) auto-discovers files with Vite's `import.meta.glob`,
so you never edit a central list — **drop a correctly-formatted file into the
right topic folder and it goes live.**

```
src/data/articles/
  index.js                          ← registry + accessors (don't edit to add articles)
  design/
    choosing-the-right-airfoil.js   ← full article (has `sections`)
    aerodynamic-principles-...js    ← draft stub (no `sections`)
  build/ electronics/ resources/ troubleshooting/
```

## Rules

1. **Folder = topic.** Put the file in the folder matching its topic
   (`design`, `build`, `electronics`, `resources`, `tools`, `troubleshooting`).
2. **Filename = slug.** The filename (minus `.js`) becomes the URL slug. Use
   lowercase-kebab-case. The URL is `/<topic>/<slug>`, e.g.
   `design/choosing-the-right-airfoil.js` → `/design/choosing-the-right-airfoil`.
3. **`export default` one object** shaped like the reference below.
4. **`topic` and `slug` inside the file must match the folder and filename.**
5. A file **with** a non-empty `sections` array renders as a full article. A
   file **without** `sections` is a *draft/coming-soon stub* — it still appears
   in cards and lists but opens the "under construction" page until you add the
   body.

## Article object — field reference

```js
export default {
  // --- identity (required) ---
  topic: 'design',                 // must match the folder name
  slug: 'choosing-the-right-airfoil', // must match the filename

  // --- card metadata (used on home page, related lists, article header) ---
  category: 'Design',              // Capitalized; must exist in categoryColors (content.js)
  title: 'Full Article Title',
  excerpt: 'One-sentence summary shown on cards.',
  author: 'Author Name',
  readingTime: '12 min read',
  updated: 'July 2026',            // human-readable "last updated" label
  difficulty: 'Intermediate',      // shown in the article header (Beginner/Intermediate/Advanced)
  publishedAt: '2026-07-14',       // ISO date — controls "Latest" ordering (newest first)
  heroImage: 'https://…',          // card image; if omitted, the first in-body image is used

  // --- placement (optional) ---
  featured: true,                  // marks THE home-page featured article (only one should have this)
  related: ['build/foamboard-trainer'], // "topic/slug" of related articles; auto-filled if short

  // --- article body (omit entirely for a draft stub) ---
  breadcrumb: ['Home', 'Design', 'Short Title'],
  nav: {
    previous: { title: 'Previous Article', path: '/design/…' },
    next: { title: 'Next Article', path: '/design/…' },
  },
  sections: [ /* see below */ ],
}
```

## `sections` — the body

`sections` is an ordered array. Each section is a heading plus an ordered list
of content blocks.

```js
{
  id: 'flat-bottom',   // kebab-case, unique within the article — used as the TOC anchor
  level: 3,            // 2 = major section (##),  3 = subsection (###)
  title: 'Section heading text',
  content: [ /* blocks, in order */ ],
}
```

**Special first section — Key Takeaways** (renders as a highlighted card, not a
normal heading):

```js
{
  id: 'key-takeaways',
  type: 'takeaways',
  level: 2,
  title: 'Key Takeaways',
  content: [
    { type: 'bullet', text: 'First takeaway.' },
    { type: 'bullet', text: 'Second takeaway.' },
  ],
}
```

### Block types (the `content` array)

| Block | Shape | Renders as |
|---|---|---|
| Paragraph | `{ type: 'p', text: '…' }` | `<p>` body text |
| Image | `{ type: 'img', src: '…', caption: '…', size: 'small' }` | figure + caption. `src` may be an external URL or a `/images/…` path in `public/`. `size` and `width` optional. |
| Table | `{ type: 'table', headers: [...], rows: [[...], [...]] }` | HTML table |
| Callout | `{ type: 'callout', variant: 'info', title: '…', text: '…' }` | colored box. `variant`: `info`, `warning`, or `tip` |
| Bullet | `{ type: 'bullet', text: '…' }` | only used inside a `takeaways` section |
| Code | `{ type: 'code', text: '…' }` | monospaced code block |

For a complete, real example, read
[`design/choosing-the-right-airfoil.js`](./design/choosing-the-right-airfoil.js).

## Mapping a Google Doc → an article file

When converting a written doc, map it like this:

- **Doc title** → `title` (+ a short `breadcrumb` last entry).
- **Intro "key points" / summary list** → a `takeaways` section (bullets).
- **`##` / major headings** → a section with `level: 2`.
- **`###` / sub-headings** → a section with `level: 3`.
- **Each paragraph** under a heading → one `{ type: 'p' }` block, in order.
- **Images** → `{ type: 'img', src, caption }` placed where they appear.
- **Tables** → `{ type: 'table', headers, rows }`.
- **Tip/Note/Warning boxes** → `{ type: 'callout', variant, title, text }`.
- **`id` for each section** → a kebab-case slug of its heading (unique).
- Fill card metadata (`excerpt`, `author`, `readingTime`, `difficulty`,
  `updated`, `publishedAt`, `heroImage`) from the doc's front matter or your own
  judgement. Set `featured: true` on at most one article.

### Prompt you can give an assistant

> You are formatting an RC-plane article for a React site. Output **one file**:
> a JavaScript module that `export default`s an article object, matching the
> spec in `src/data/articles/README.md`. Rules:
> - Set `topic` and `slug`; tell me the target filename (`<topic>/<slug>.js`).
> - Convert every heading into a `sections` entry (`level: 2` for major
>   headings, `level: 3` for sub-headings) with a unique kebab-case `id`.
> - Convert each paragraph into a `{ type: 'p', text }` block, preserving order.
> - Convert images to `{ type: 'img', src, caption }`, tables to
>   `{ type: 'table', headers, rows }`, and Tip/Note/Warning boxes to
>   `{ type: 'callout', variant, title, text }` (variant = info/warning/tip).
> - If the doc opens with a summary/key-points list, make it the first section
>   with `type: 'takeaways'` and `bullet` blocks.
> - Fill `title`, `excerpt`, `author`, `category`, `readingTime`, `difficulty`,
>   `updated`, `publishedAt`, and `heroImage` from the doc (ask me if missing).
> - Output only the code for the file — no prose. Then here is the article:
> [paste the Google Doc content]
