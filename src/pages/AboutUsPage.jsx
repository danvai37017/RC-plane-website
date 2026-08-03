import AboutUs from '../components/AboutUs/AboutUs'
import styles from './AboutUsPage.module.css'

export default function AboutUsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <AboutUs />
      </div>
    </div>
  )
}
