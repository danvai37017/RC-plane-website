import { ArrowRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getFeaturedArticle, toCard } from '../../data/articles'
import CategoryBadge from '../ui/CategoryBadge/CategoryBadge'
import Button from '../ui/Button/Button'
import styles from './FeaturedArticle.module.css'

export default function FeaturedArticle() {
  const article = toCard(getFeaturedArticle())
  if (!article) return null

  const { category, readingTime, updated, title, excerpt, author, image, path } = article

  return (
    <article className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.body}>
        <div className={styles.meta}>
          <CategoryBadge category={category} />
          {readingTime && <span className={styles.metaText}>{readingTime.toUpperCase()}</span>}
          {updated && <span className={styles.metaDot}>&middot;</span>}
          {updated && <span className={styles.metaText}>UPDATED {updated.toUpperCase()}</span>}
        </div>
        <Link to={path || '#'} className={styles.titleGroup}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
        </Link>
        <div className={styles.author}>
          <User size={14} strokeWidth={2} />
          <span>By {author}</span>
        </div>
        <Button variant="ghost" href={path || '#'}>
          Read More <ArrowRight size={16} strokeWidth={2} />
        </Button>
      </div>
    </article>
  )
}
