import styles from './Button.module.css'

export default function Button({ variant = 'primary', href, children }) {
  const className = `${styles.button} ${styles[variant] || ''}`
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  return <button className={className}>{children}</button>
}
