import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clock, Calendar, User, ArrowUp, Download, ChevronLeft, ChevronRight, Lightbulb, AlertTriangle, Info, FileText } from 'lucide-react'
import { navLinks } from '../data/content'
import { articleContent, articleNav, relatedArticles } from '../data/articles'
import CategoryBadge from '../components/ui/CategoryBadge/CategoryBadge'
import styles from './ArticlePage.module.css'

const calloutIcons = { tip: Lightbulb, warning: AlertTriangle, info: Info }

function ArticleSectionRenderer({ section }) {
  if (section.type === 'takeaways') {
    return (
      <div className={styles.takeawaysCard}>
        <h2 className={styles.takeawaysTitle}>Key Takeaways</h2>
        <ul className={styles.takeawaysList}>
          {section.content.filter(c => c.type === 'bullet').map((item, i) => (
            <li key={i} className={styles.takeawayItem}>{item.text}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      {section.level === 2 && (
        <h2 id={section.id} className={styles.h2}>{section.title}</h2>
      )}
      {section.level === 3 && (
        <h3 id={section.id} className={styles.h3}>{section.title}</h3>
      )}
      {section.content && section.content.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i} className={styles.body}>{block.text}</p>
          case 'img':
          case 'image':
            return (
              <figure key={i} className={styles.figure}>
                <img src={block.src} alt={block.caption || 'Article illustration'} className={styles.figureImg} />
                {block.caption ? <figcaption className={styles.figcaption}>{block.caption}</figcaption> : null}
              </figure>
            )
          case 'code':
            return <pre key={i} className={styles.codeBlock}><code>{block.text}</code></pre>
          case 'table':
            return (
              <div key={i} className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'callout': {
            const Icon = calloutIcons[block.variant] || Info
            const variantClass = styles[`callout_${block.variant}`] || styles.callout_info
            return (
              <div key={i} className={`${styles.callout} ${variantClass}`}>
                <Icon size={20} strokeWidth={1.8} className={styles.calloutIcon} />
                <div>
                  <strong className={styles.calloutTitle}>{block.title}</strong>
                  <p className={styles.calloutText}>{block.text}</p>
                </div>
              </div>
            )
          }
          case 'bullet':
            return null
          default:
            return null
        }
      })}
    </>
  )
}

function PlaceholderContent({ topic, article }) {
  const displayTopic = (navLinks.find(l => l.path.replace('/', '') === topic)?.label) || topic
  const displayArticle = article
    ? article.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Article'

  return (
    <div className={styles.placeholder}>
      <FileText size={64} strokeWidth={1.5} className={styles.placeholderIcon} />
      <h1 className={styles.placeholderTitle}>{displayArticle}</h1>
      <p className={styles.placeholderText}>
        This article is under construction. Content for <strong>{displayArticle}</strong> in <strong>{displayTopic}</strong> will appear here soon.
      </p>
      <Link to={`/${topic}`} className={styles.placeholderBack}>
        Back to {displayTopic}
      </Link>
    </div>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.backToTopVisible : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

function TOCSidebar({ sections, activeId }) {
  const tocItems = sections.filter(s => s.level !== 2 || s.id !== 'key-takeaways')

  return (
    <aside className={styles.sidebar}>
      <span className={styles.sidebarTitle}>ON THIS PAGE</span>
      <nav className={styles.toc}>
        {tocItems.map((section) => {
          const isActive = activeId === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.tocLink} ${section.level === 3 ? styles.tocSub : ''} ${
                isActive ? styles.tocActive : ''
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className={`${styles.tocIndicator} ${isActive ? styles.tocIndicatorActive : ''}`} />
              {section.title}
            </a>
          )
        })}
      </nav>
      <a href="#" className={styles.downloadBtn}>
        <Download size={16} strokeWidth={2} />
        Download PDF
      </a>
    </aside>
  )
}

export default function ArticlePage() {
  const { topic, article } = useParams()
  const isRealArticle = topic === 'design' && article === 'choosing-the-right-airfoil'
  const contentRef = useRef(null)
  const [activeId, setActiveId] = useState('')
  const sidebarTop = 120

  useEffect(() => {
    if (!isRealArticle) return
    const id = articleContent.sections[0]?.id
    if (id) setActiveId(id)
  }, [isRealArticle])

  useEffect(() => {
    if (!isRealArticle) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const headings = document.querySelectorAll('[id]')
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [isRealArticle])

  if (!isRealArticle) {
    return (
      <div className={styles.page}>
        <ReadingProgress />
        <div className={styles.inner}>
          <PlaceholderContent topic={topic} article={article} />
        </div>
        <BackToTop />
      </div>
    )
  }

  const { title, category, readingTime, difficulty, author, updated, breadcrumb, sections } = articleContent
  const headerSections = sections.filter(s => s.level !== 2 || s.id !== 'key-takeaways')

  return (
    <div className={styles.page}>
      <ReadingProgress />

      <div className={styles.breadcrumbWrap}>
        <div className={styles.inner}>
          <nav className={styles.breadcrumb}>
            {breadcrumb.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span className={styles.breadcrumbSep}>/</span>}
                <span className={i === breadcrumb.length - 1 ? styles.breadcrumbCurrent : styles.breadcrumbLink}>{crumb}</span>
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.sidebarWrap} style={{ top: `${sidebarTop}px` }}>
            <TOCSidebar sections={headerSections} activeId={activeId} />
          </div>

          <article className={styles.article} ref={contentRef}>
            <CategoryBadge category={category} />
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.metadata}>
              <span className={styles.metaItem}><Clock size={14} /><span>{readingTime}</span></span>
              <span className={styles.metaSep}>&middot;</span>
              <span className={styles.metaItem}><Calendar size={14} /><span>Updated {updated}</span></span>
              <span className={styles.metaSep}>&middot;</span>
              <span className={styles.metaItem}><User size={14} /><span>By {author}</span></span>
              <span className={styles.metaSep}>&middot;</span>
              <span className={styles.metaItem}>{difficulty}</span>
            </div>

            <div className={styles.divider} />

            {sections.map((section, i) => (
              <ArticleSectionRenderer key={section.id || i} section={section} />
            ))}

            <div className={styles.articleNav}>
              <Link to={articleNav.previous.path} className={styles.articleNavLink}>
                <ChevronLeft size={18} />
                <div>
                  <span className={styles.articleNavLabel}>Previous</span>
                  <span className={styles.articleNavTitle}>{articleNav.previous.title}</span>
                </div>
              </Link>
              <Link to={articleNav.next.path} className={`${styles.articleNavLink} ${styles.articleNavRight}`}>
                <div>
                  <span className={styles.articleNavLabel}>Next</span>
                  <span className={styles.articleNavTitle}>{articleNav.next.title}</span>
                </div>
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className={styles.relatedSection}>
              <h2 className={styles.relatedTitle}>Continue Learning</h2>
              <div className={styles.relatedGrid}>
                {relatedArticles.map((a) => (
                  <Link key={a.path} to={a.path} className={styles.relatedCard}>
                    <img src={a.image} alt={a.title} className={styles.relatedImg} />
                    <div className={styles.relatedBody}>
                      <CategoryBadge category={a.category} />
                      <h3 className={styles.relatedCardTitle}>{a.title}</h3>
                      <p className={styles.relatedExcerpt}>{a.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}
