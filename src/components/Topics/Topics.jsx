import { Link } from 'react-router-dom'
import { topics } from '../../data/content'
import {
  Ruler,
  Cpu,
  Calculator,
  Hammer,
  BookOpen,
  BugPlay,
} from 'lucide-react'
import styles from './Topics.module.css'

const iconMap = {
  design: Ruler,
  electronics: Cpu,
  tools: Calculator,
  build: Hammer,
  resources: BookOpen,
  troubleshoot: BugPlay,
}

export default function Topics() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.accent} />
          <p className={styles.label}>Explore by Topic</p>
        </div>
        <div className={styles.grid}>
          {topics.map((topic) => {
            const Icon = iconMap[topic.icon] || BookOpen
            return (
              <Link to={topic.path} key={topic.title} className={styles.card}>
                <div className={styles.iconWrap}>
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <h3 className={styles.cardTitle}>{topic.title}</h3>
                <p className={styles.cardDesc}>{topic.description}</p>
                <span className={styles.cardMeta}>{topic.count}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
