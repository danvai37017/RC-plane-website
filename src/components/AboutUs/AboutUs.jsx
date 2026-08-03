import styles from './AboutUs.module.css'

const team = [
  { name: 'Member One', image: '/images/team-placeholder-1.svg' },
  { name: 'Member Two', image: '/images/team-placeholder-2.svg' },
  { name: 'Member Three', image: '/images/team-placeholder-3.svg' },
]

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.accent} />
        <p className={styles.label}>About Us</p>
      </div>

      <div className={styles.team}>
        {team.map((member, i) => (
          <div className={styles.member} key={member.name}>
            <img src={member.image} alt={member.name} className={styles.avatar} />
            <p className={styles.role}>Role</p>
            {i === 0 && <p className={styles.roleSecondary}>Secondary Role</p>}
          </div>
        ))}
      </div>

      <div className={styles.story}>
        <h2 className={styles.storyTitle}>Our Story</h2>
        <p className={styles.storyText}>Here's how we began.</p>
      </div>
    </section>
  )
}
