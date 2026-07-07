import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="page">
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      <aside className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>Menu</h2>
          <button
            type="button"
            className="close-button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav>
          <a href="#" className="menu-link">Home</a>
          <a href="#" className="menu-link">About Us</a>
          <a href="#" className="menu-link">Links to Parts</a>
        </nav>
      </aside>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      <main className="content">
        <p className="eyebrow">Welcome</p>
        <h1>Welcome to our RC plane website</h1>
        <p>
          More coming soon
        </p>
      </main>
    </div>
  )
}

export default App
