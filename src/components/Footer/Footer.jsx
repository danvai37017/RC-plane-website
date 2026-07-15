import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { navLinks, tools } from '../../data/content'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>
              <Plane size={22} strokeWidth={1.8} />
              <span className={styles.brandName}>RC PLANES</span>
            </div>
            <p className={styles.mission}>
              Your complete resource for RC aircraft design, building, and
              engineering knowledge.
            </p>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} RC Planes. All rights reserved.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Learn</h4>
            <ul className={styles.colList}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Tools</h4>
            <ul className={styles.colList}>
              {tools.map((tool) => (
                <li key={tool.name}>
                  <a href="#" className={styles.colLink}>
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Community</h4>
            <ul className={styles.colList}>
              <li>
                <a href="#" className={styles.colLink}>Contact</a>
              </li>
              <li>
                <a href="#" className={styles.colLink}>GitHub</a>
              </li>
              <li>
                <a href="#" className={styles.colLink}>Contribute</a>
              </li>
              <li>
                <a href="#" className={styles.colLink}>Changelog</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.bottomText}>
            &copy; {new Date().getFullYear()} RC Planes
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
            <span className={styles.bottomSep}>&middot;</span>
            <a href="#" className={styles.bottomLink}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
