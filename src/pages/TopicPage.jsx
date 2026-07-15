import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'
import { navLinks } from '../data/content'
import styles from './TopicPage.module.css'

export default function TopicPage() {
  const { topic } = useParams()
  const navItem = navLinks.find(
    (l) => l.path.replace('/', '') === topic
  )
  const displayName = navItem ? navItem.label : topic

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link to="/" className={styles.back}>
          <ArrowLeft size={18} strokeWidth={2} />
          Back to Home
        </Link>

        <div className={styles.content}>
          <Construction size={48} strokeWidth={1.5} className={styles.icon} />
          <h1 className={styles.title}>{displayName}</h1>
          <p className={styles.subtitle}>
            This section is under construction. Articles, guides, and resources
            for <strong>{displayName}</strong> will appear here soon.
          </p>
          <Link to="/" className={styles.homeLink}>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
