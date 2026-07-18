import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Search, Clock, BarChart3 } from 'lucide-react'
import { navLinks, topicLanding } from '../data/content'
import { getArticlesByTopic } from '../data/articles'
import styles from './TopicPage.module.css'

export default function TopicPage() {
  const { topic } = useParams()
  const navItem = navLinks.find((l) => l.path.replace('/', '') === topic)
  const label = navItem ? navItem.label : topic
  const meta = topicLanding[topic] || {}
  const articles = getArticlesByTopic(topic)

  const [query, setQuery] = useState('')
  const [activeChip, setActiveChip] = useState('All')

  // Subtopic filter chips, derived from the tags present across this topic's
  // articles. Only shown once there are at least two distinct tags to filter by.
  const tags = [...new Set(articles.flatMap((a) => a.tags || []))]
  const showChips = tags.length >= 2
  const chips = showChips ? ['All', ...tags] : []

  const q = query.trim().toLowerCase()
  const filtered = articles.filter((a) => {
    const matchesChip =
      activeChip === 'All' || (a.tags || []).includes(activeChip)
    const matchesQuery =
      !q ||
      a.title.toLowerCase().includes(q) ||
      (a.excerpt || '').toLowerCase().includes(q)
    return matchesChip && matchesQuery
  })

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link to="/" className={styles.homeBtn}>
          <ArrowLeft size={16} strokeWidth={2} />
          Home
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{label}</h1>
          {meta.subtitle && <p className={styles.subtitle}>{meta.subtitle}</p>}

          <div className={styles.searchWrap}>
            <Search size={18} strokeWidth={2} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.search}
              placeholder={`Search ${label.toLowerCase()} articles...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={`Search ${label} articles`}
            />
          </div>

          {showChips && (
            <div className={styles.chips}>
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className={`${styles.chip} ${activeChip === chip ? styles.chipActive : ''}`}
                  onClick={() => setActiveChip(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}
        </header>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((a) => (
              <Link key={a.path} to={a.path} className={styles.card}>
                <div className={styles.thumbWrap}>
                  {a.image ? (
                    <img src={a.image} alt={a.title} className={styles.thumb} />
                  ) : (
                    <div className={styles.thumbFallback} />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{a.title}</h3>
                  <p className={styles.cardDesc}>{a.excerpt}</p>
                  <div className={styles.meta}>
                    {a.readingTime && (
                      <span className={styles.metaItem}>
                        <Clock size={14} strokeWidth={2} />
                        {a.readingTime.replace(/\s*read$/i, '')}
                      </span>
                    )}
                    {a.difficulty && (
                      <span className={styles.metaItem}>
                        <BarChart3 size={14} strokeWidth={2} />
                        {a.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            {articles.length === 0
              ? 'Articles for this section are coming soon.'
              : `No articles found${query ? ` for “${query}”` : ''}.`}
          </p>
        )}
      </div>
    </div>
  )
}
