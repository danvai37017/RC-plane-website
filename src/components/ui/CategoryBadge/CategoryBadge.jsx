import { categoryColors } from '../../../data/content'
import styles from './CategoryBadge.module.css'

export default function CategoryBadge({ category }) {
  const colors = categoryColors[category] || { bg: '#eff6ff', text: '#2563eb' }
  return (
    <span
      className={styles.badge}
      style={{ background: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  )
}
