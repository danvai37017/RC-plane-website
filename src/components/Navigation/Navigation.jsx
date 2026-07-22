import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Plane, Search, ChevronDown, ArrowRight } from 'lucide-react'
import { navLinks, topicDropdowns } from '../../data/content'
import styles from './Navigation.module.css'

export default function Navigation() {
  const { pathname } = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navRef = useRef(null)
  const closeTimeoutRef = useRef(null)

  function clearCloseTimeout() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  function openDropdownNow(dropdown) {
    clearCloseTimeout()
    setOpenDropdown(dropdown)
  }

  // Delay the close slightly so moving the mouse from the nav link down into
  // the dropdown (across the gap that shows the underline animation) doesn't
  // flicker-close it. Still closes on its own if the mouse leaves the whole
  // nav-item area (link + dropdown) without landing back on either.
  function closeDropdownSoon() {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  useEffect(() => {
    const topic = pathname.split('/')[1]
    const found = navLinks.find(l => l.path.replace('/', '') === topic)
    if (found) setActiveDropdown(found.dropdown)
    else setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        clearCloseTimeout()
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      clearCloseTimeout()
    }
  }, [])

  const topic = pathname.split('/')[1]
  const isArticlePage = pathname.split('/').length > 2

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

        <nav className={styles.nav} ref={navRef} aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = !isArticlePage && pathname === link.path
            const isDropdownOpen = openDropdown === link.dropdown
            const isDropdownActive = activeDropdown === link.dropdown

            return (
              <div key={link.path} className={styles.navItem}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  onMouseEnter={() => openDropdownNow(link.dropdown)}
                  onMouseLeave={closeDropdownSoon}
                  onClick={() => {
                    clearCloseTimeout()
                    setOpenDropdown(null)
                  }}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={`${styles.navChevron} ${isDropdownOpen ? styles.navChevronUp : ''}`}
                    />
                  )}
                </Link>

                {link.dropdown && (
                  <div
                    className={`${styles.dropdown} ${isDropdownOpen ? styles.dropdownVisible : ''}`}
                    onMouseEnter={() => openDropdownNow(link.dropdown)}
                    onMouseLeave={closeDropdownSoon}
                  >
                    {topicDropdowns[link.dropdown].items.map((item) => {
                      const isItemActive = pathname === item.path
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`${styles.dropdownItem} ${isItemActive ? styles.dropdownItemActive : ''}`}
                          onClick={() => {
                            clearCloseTimeout()
                            setOpenDropdown(null)
                          }}
                        >
                          <span className={styles.dropdownText}>{item.title}</span>
                        </Link>
                      )
                    })}
                    <Link
                      to={link.path}
                      className={styles.seeMore}
                      onClick={() => {
                        clearCloseTimeout()
                        setOpenDropdown(null)
                      }}
                    >
                      <span>See More of {link.label}</span>
                      <ArrowRight size={15} strokeWidth={2} className={styles.seeMoreArrow} />
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
          <a
            href="#"
            className={styles.searchLink}
            aria-label="Search"
            onMouseEnter={() => {
              clearCloseTimeout()
              setOpenDropdown(null)
            }}
          >
            <Search size={18} strokeWidth={2} />
          </a>
        </nav>
      </div>
    </header>
  )
}
