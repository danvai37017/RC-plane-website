import { useLocation, Link } from 'react-router-dom'
import { Plane, Search } from 'lucide-react'
import { navLinks } from '../../data/content'
import styles from './Navigation.module.css'

export default function Navigation() {
  const { pathname } = useLocation()

  return (
    <header className={styles.topbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <Plane size={26} strokeWidth={1.8} />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>RC PLANES</span>
            <span className={styles.brandSub}>Aircraft Design Knowledge Base</span>
          </div>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${
                pathname === link.path ? styles.active : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="#" className={styles.searchLink} aria-label="Search">
            <Search size={18} strokeWidth={2} />
          </a>
        </nav>
      </div>
    </header>
  )
}
