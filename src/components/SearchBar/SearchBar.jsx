import { Search } from 'lucide-react'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  return (
    <div className={styles.wrapper}>
      <Search size={20} className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder="Search articles, calculators, build guides..."
      />
    </div>
  )
}
