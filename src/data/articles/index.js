// Single source of truth for every article on the site.
//
// To publish a new article: drop a file under the matching topic folder
// (e.g. ./design/my-new-article.js) that `export default`s an article object.
// Vite's import.meta.glob auto-discovers it here — no edits to this file needed.
// The URL is derived from the object's `topic` and `slug` (/<topic>/<slug>).
//
// An article with a non-empty `sections` array renders as a full page; one
// without (a "draft"/coming-soon stub) still shows up in cards and lists but
// opens the under-construction placeholder until its body is written.

const modules = import.meta.glob('./**/*.js', { eager: true })

// Registry keyed by "topic/slug".
const registry = {}
for (const path in modules) {
  const article = modules[path]?.default
  if (!article || !article.topic || !article.slug) continue
  registry[`${article.topic}/${article.slug}`] = article
}

const allArticles = Object.values(registry)

// --- helpers ---------------------------------------------------------------

export function articlePath(article) {
  return `/${article.topic}/${article.slug}`
}

// The card/hero image: an explicit `heroImage`, else the first image in the body.
export function firstImage(article) {
  if (!article) return undefined
  if (article.heroImage) return article.heroImage
  for (const section of article.sections || []) {
    const img = (section.content || []).find(
      (b) => (b.type === 'img' || b.type === 'image') && b.src
    )
    if (img) return img.src
  }
  return undefined
}

// Normalized data that any "card" needs (featured slot, latest grid, related).
export function toCard(article) {
  if (!article) return null
  return {
    topic: article.topic,
    slug: article.slug,
    path: articlePath(article),
    category: article.category,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author,
    image: firstImage(article),
    readingTime: article.readingTime,
    difficulty: article.difficulty,
    tags: article.tags || [],
    updated: article.updated,
  }
}

// Newest first, by `publishedAt` (ISO date string).
function byNewest(a, b) {
  return String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''))
}

// True when the article has real body content (vs. a draft/coming-soon stub).
export function isPublished(article) {
  return Boolean(article && Array.isArray(article.sections) && article.sections.length > 0)
}

// --- accessors -------------------------------------------------------------

// Full article object for a route, or null. Drives ArticlePage.
export function getArticle(topic, slug) {
  return registry[`${topic}/${slug}`] || null
}

export function getAllArticles() {
  return [...allArticles]
}

// Every article in a topic (published + draft stubs), newest first, as cards.
// Drives the topic landing page (src/pages/TopicPage).
export function getArticlesByTopic(topic) {
  return [...allArticles]
    .filter((a) => a.topic === topic)
    .sort(byNewest)
    .map(toCard)
}

// The home-page featured article: the one flagged `featured: true`, else newest.
export function getFeaturedArticle() {
  return (
    allArticles.find((a) => a.featured) ||
    [...allArticles].sort(byNewest)[0] ||
    null
  )
}

// Most-recent articles for the "Latest Content" grid, excluding the featured one.
export function getLatestArticles(n = 5) {
  const featured = getFeaturedArticle()
  return [...allArticles]
    .filter((a) => a !== featured)
    .sort(byNewest)
    .slice(0, n)
}

// Related cards: explicit `related` ("topic/slug") entries first, then fill from
// the same topic and most-recent articles. Returns normalized cards.
export function getRelatedArticles(article, n = 3) {
  if (!article) return []
  const picked = []
  const seen = new Set([`${article.topic}/${article.slug}`])

  for (const key of article.related || []) {
    const found = registry[key]
    if (found && !seen.has(key)) {
      picked.push(found)
      seen.add(key)
    }
  }

  if (picked.length < n) {
    const fill = [...allArticles]
      .filter((a) => !seen.has(`${a.topic}/${a.slug}`))
      .sort((a, b) => {
        const sameA = a.topic === article.topic ? 0 : 1
        const sameB = b.topic === article.topic ? 0 : 1
        if (sameA !== sameB) return sameA - sameB
        return byNewest(a, b)
      })
    for (const a of fill) {
      if (picked.length >= n) break
      picked.push(a)
      seen.add(`${a.topic}/${a.slug}`)
    }
  }

  return picked.slice(0, n).map(toCard)
}
