import Hero from '../components/Hero/Hero'
import StartHere from '../components/StartHere/StartHere'
import Topics from '../components/Topics/Topics'
import ToolsPanel from '../components/ToolsPanel/ToolsPanel'
import FeaturedArticle from '../components/FeaturedArticle/FeaturedArticle'
import LatestContent from '../components/LatestContent/LatestContent'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StartHere />
      <Topics />
      <section className={styles.featuredSection}>
        <div className={styles.featuredInner}>
          <div className={styles.featuredGrid}>
            <ToolsPanel />
            <FeaturedArticle />
          </div>
        </div>
      </section>
      <LatestContent />
    </>
  )
}
