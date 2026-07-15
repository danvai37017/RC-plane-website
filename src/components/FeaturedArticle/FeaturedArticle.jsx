import { ArrowRight, User } from 'lucide-react'
import { featuredArticle } from '../../data/content'
import CategoryBadge from '../ui/CategoryBadge/CategoryBadge'
import Button from '../ui/Button/Button'
import styles from './FeaturedArticle.module.css'

export default function FeaturedArticle() {
  const { category, readTime, updated, title, excerpt, author, image } =
    featuredArticle

  return (
    <article className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.body}>
        <div className={styles.meta}>
          <CategoryBadge category={category} />
          <span className={styles.metaText}>{readTime}</span>
          <span className={styles.metaDot}>&middot;</span>
          <span className={styles.metaText}>{updated}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.author}>
          <User size={14} strokeWidth={2} />
          <span>By {author}</span>
        </div>
        <Button variant="ghost" href="#">
          Read More <ArrowRight size={16} strokeWidth={2} />
        </Button>
      </div>
    </article>
  )
}
