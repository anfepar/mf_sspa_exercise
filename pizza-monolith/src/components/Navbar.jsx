import { useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const STEPS = [
  { path: '/select', label: '1. Choose Pizza' },
  { path: '/payment', label: '2. Payment' },
  { path: '/tracking', label: '3. Track Order' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>🍕 PizzaFront</div>
      <nav className={styles.steps}>
        {STEPS.map(({ path, label }) => (
          <span
            key={path}
            className={`${styles.step} ${pathname === path ? styles.active : ''}`}
          >
            {label}
          </span>
        ))}
      </nav>
    </header>
  )
}
