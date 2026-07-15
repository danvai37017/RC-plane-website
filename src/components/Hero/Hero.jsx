import Button from '../ui/Button/Button'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.textCol}>
          <span className={styles.pill}>RC AIRCRAFT KNOWLEDGE HUB</span>
          <h1 className={styles.headline}>
            BUILD.
            <br />
            LEARN.
            <br />
            FLY.
          </h1>
          <p className={styles.subtitle}>
            Your complete resource for RC plane design, building, electronics, and
            problem solving.
          </p>
          <SearchBar />
          <div className={styles.actions}>
            <Button variant="primary" href="#">
              Start Learning
            </Button>
            <Button variant="secondary" href="/design">
              Explore Topics
            </Button>
          </div>
        </div>
        <div className={styles.visualCol} aria-hidden="true" />
      </div>
    </section>
  )
}
