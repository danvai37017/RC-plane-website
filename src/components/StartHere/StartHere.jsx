import { BookOpen, Hammer, Rocket } from 'lucide-react'
import styles from './StartHere.module.css'

const steps = [
  {
    icon: BookOpen,
    title: 'Learn the Basics',
    description:
      'Airfoils, lift, center of gravity, stability, and terminology.',
  },
  {
    icon: Hammer,
    title: 'Build Your First Plane',
    description:
      'A beginner-friendly foamboard trainer with downloadable plans and a complete video walkthrough.',
  },
  {
    icon: Rocket,
    title: 'Fly and Improve',
    description:
      'Setup, trimming, maiden flights, troubleshooting, and common upgrades.',
  },
]

export default function StartHere() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>New to RC Aircraft? Start Here.</h2>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div className={styles.step} key={step.title}>
              <div className={styles.stepIcon}>
                <step.icon size={24} strokeWidth={1.8} />
              </div>
              {i < steps.length - 1 && <div className={styles.connector} />}
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
