import { ArrowRight } from 'lucide-react'
import { latestArticles } from '../../data/content'
import CategoryBadge from '../ui/CategoryBadge/CategoryBadge'
import Button from '../ui/Button/Button'
import styles from './LatestContent.module.css'

export default function LatestContent() {
  const [featured, second, third, ...rest] = latestArticles

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Latest Content</p>
        <h2 className={styles.heading}>
          Fresh guides, calculators, and build notes.
        </h2>

        <div className={styles.grid}>
          <article className={styles.featured}>
            <img src={featured.image} alt={featured.title} className={styles.featuredImg} />
            <div className={styles.featuredBody}>
              <CategoryBadge category={featured.category} />
              <h3 className={styles.featuredTitle}>{featured.title}</h3>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <Button variant="ghost" href="#">
                Read More <ArrowRight size={16} strokeWidth={2} />
              </Button>
            </div>
          </article>

          <article className={styles.medium}>
            <img src={second.image} alt={second.title} className={styles.mediumImg} />
            <div className={styles.mediumBody}>
              <CategoryBadge category={second.category} />
              <h3 className={styles.mediumTitle}>{second.title}</h3>
              <p className={styles.mediumExcerpt}>{second.excerpt}</p>
              <a href="#" className={styles.readMore}>
                Read More <ArrowRight size={14} strokeWidth={2} />
              </a>
            </div>
          </article>

          <article className={styles.medium}>
            <img src={third.image} alt={third.title} className={styles.mediumImg} />
            <div className={styles.mediumBody}>
              <CategoryBadge category={third.category} />
              <h3 className={styles.mediumTitle}>{third.title}</h3>
              <p className={styles.mediumExcerpt}>{third.excerpt}</p>
              <a href="#" className={styles.readMore}>
                Read More <ArrowRight size={14} strokeWidth={2} />
              </a>
            </div>
          </article>

          {rest.map((article) => (
            <article key={article.title} className={styles.small}>
              <img src={article.image} alt={article.title} className={styles.smallImg} />
              <div className={styles.smallBody}>
                <CategoryBadge category={article.category} />
                <h3 className={styles.smallTitle}>{article.title}</h3>
                <p className={styles.smallExcerpt}>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
