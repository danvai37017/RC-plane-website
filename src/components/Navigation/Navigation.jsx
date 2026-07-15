import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  Plane, Search, ChevronDown,
  Layers, Shapes, TrendingUp, Scale, Rotate3D, ArrowUpDown, Wind, Container, Crosshair,
  Zap, Gauge, Cpu, Battery, Cable,
  Calculator, BarChart3, Fan, BookOpen, FileText, Ruler,
  Box, Flame, Paintbrush, Trees, Hammer, Wrench,
  Download, Database, Monitor, MessageCircle, Calendar, MapPin,
  Vibrate, SlidersHorizontal, AlertTriangle, PowerOff, Wifi, BatteryWarning,
} from 'lucide-react'
import { navLinks, topicDropdowns } from '../../data/content'
import styles from './Navigation.module.css'

const iconMap = {
  Layers, Shapes, TrendingUp, Scale, Rotate3D, ArrowUpDown, Wind, Container, Crosshair,
  Zap, Gauge, Cpu, Battery, Cable,
  Calculator, BarChart3, Fan, BookOpen, FileText, Ruler,
  Box, Flame, Paintbrush, Trees, Hammer, Wrench,
  Download, Database, Monitor, MessageCircle, Calendar, MapPin,
  Vibrate, SlidersHorizontal, AlertTriangle, PowerOff, Wifi, BatteryWarning,
}

export default function Navigation() {
  const { pathname } = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const topic = pathname.split('/')[1]
    const found = navLinks.find(l => l.path.replace('/', '') === topic)
    if (found) setActiveDropdown(found.dropdown)
    else setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
                  onMouseEnter={() => setOpenDropdown(link.dropdown)}
                  onClick={(e) => {
                    if (link.dropdown) {
                      e.preventDefault()
                      setOpenDropdown(isDropdownOpen ? null : link.dropdown)
                    }
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
                    onMouseEnter={() => setOpenDropdown(link.dropdown)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {topicDropdowns[link.dropdown].sections.map((section, i) => (
                      <div key={i} className={styles.section}>
                        <span className={styles.sectionLabel}>{section.label}</span>
                        {section.items.map((item) => {
                          const Icon = iconMap[item.icon]
                          const isItemActive = pathname === item.path
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`${styles.dropdownItem} ${isItemActive ? styles.dropdownItemActive : ''}`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {Icon && <Icon size={18} strokeWidth={1.6} className={styles.dropdownIcon} />}
                              <span className={styles.dropdownText}>{item.title}</span>
                              <ChevronDown size={16} strokeWidth={1.5} className={styles.dropdownArrow} />
                            </Link>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <a href="#" className={styles.searchLink} aria-label="Search">
            <Search size={18} strokeWidth={2} />
          </a>
        </nav>
      </div>
    </header>
  )
}
