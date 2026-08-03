import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Plane, Search, ChevronDown, ArrowRight } from 'lucide-react'
import { navLinks, topicDropdowns } from '../../data/content'
import styles from './Navigation.module.css'

const NAV_HEIGHT_DESKTOP = 90
const NAV_HEIGHT_MOBILE = 72
const MOBILE_BREAKPOINT = 720
// The header never shrinks past this — the sliver that stays pinned at the
// top, doubling as both the visual "collapsed" strip and the hover target
// that reveals the rest of it again.
const STRIP_HEIGHT = 5
// Keep in sync with the transition duration applied inline for hover/click
// driven height changes (scroll-driven changes apply no transition, so they
// track the scroll position exactly).
const TRANSITION_MS = 280

function getNavHeight() {
  return window.innerWidth <= MOBILE_BREAKPOINT ? NAV_HEIGHT_MOBILE : NAV_HEIGHT_DESKTOP
}

// The header's natural, scroll-derived height: full at the top of the page,
// shrinking 1:1 with scroll distance down to the strip, then staying there.
function computeBaseHeight(scrollY, navHeight) {
  return Math.min(navHeight, Math.max(STRIP_HEIGHT, navHeight - scrollY))
}

export default function Navigation() {
  const { pathname } = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const [navHeight, setNavHeight] = useState(getNavHeight)
  const [baseHeight, setBaseHeight] = useState(() => computeBaseHeight(window.scrollY, getNavHeight()))
  // How the header came to be at full height despite baseHeight being
  // shrunk: 'hover' (strip/arrow peek — auto-recloses to baseHeight once the
  // pointer leaves) or 'click' (pinned open until the arrow is pressed
  // again). null means it's just following baseHeight as-is.
  const [openSource, setOpenSource] = useState(null)
  const [transitioning, setTransitioning] = useState(false)

  const navRef = useRef(null)
  const shellRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const transitionTimeoutRef = useRef(null)
  const hoverLeaveTimeoutRef = useRef(null)

  // Mirrors of the state above for the scroll/document listeners below, which
  // are bound once and would otherwise only ever see the values from the
  // render they were bound in.
  const navHeightRef = useRef(navHeight)
  const baseHeightRef = useRef(baseHeight)
  const openSourceRef = useRef(openSource)
  const transitioningRef = useRef(transitioning)

  useEffect(() => {
    navHeightRef.current = navHeight
  }, [navHeight])
  useEffect(() => {
    baseHeightRef.current = baseHeight
  }, [baseHeight])
  useEffect(() => {
    openSourceRef.current = openSource
  }, [openSource])
  useEffect(() => {
    transitioningRef.current = transitioning
  }, [transitioning])

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

  function beginTransition() {
    setTransitioning(true)
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    transitionTimeoutRef.current = setTimeout(() => {
      setTransitioning(false)
    }, TRANSITION_MS)
  }

  function openWith(source) {
    if (transitioningRef.current || openSourceRef.current) return
    setOpenSource(source)
    beginTransition()
  }

  function releaseOverride() {
    if (transitioningRef.current || !openSourceRef.current) return
    setOpenSource(null)
    beginTransition()
  }

  function handleArrowClick() {
    if (transitioningRef.current) return
    // A mouse click on the arrow is always preceded by the mouseenter that
    // opens it as a hover peek, so by the time the click itself lands, the
    // bar is already at full height with source 'hover'. Treat that as
    // pinning it open (matching the intent of the click) rather than
    // immediately releasing what the same gesture just opened.
    if (openSourceRef.current === 'hover') {
      setOpenSource('click')
      return
    }
    if (openSourceRef.current === 'click') {
      releaseOverride()
      return
    }
    openWith('click')
  }

  // Hovering the strip/header or the arrow opens the bar the same way
  // clicking does, but the resulting open state is a "peek": it reverts to
  // baseHeight once the pointer leaves, instead of staying pinned.
  function handleHoverOpen() {
    if (baseHeightRef.current < navHeightRef.current) openWith('hover')
  }

  // Auto-revert a hover-opened bar back to baseHeight once the pointer is
  // actually outside the strip/arrow/header/dropdown group.
  //
  // This deliberately does not use onMouseLeave. The arrow's own position
  // tracks the header's current height, so opening the bar moves the arrow
  // out from under a pointer that never moved — which fires a real
  // mouseleave on the shell despite the user doing nothing. Polling on
  // mousemove instead means a stationary pointer never re-triggers a check,
  // only an actual pointer move does, and at that point elementFromPoint
  // reflects wherever things really are.
  //
  // The short delay before actually reverting mirrors closeDropdownSoon:
  // crossing the gap between a nav link and its dropdown panel means
  // briefly being over neither, and that shouldn't read as "left".
  useEffect(() => {
    if (openSource !== 'hover') return undefined

    function onMove(e) {
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const inside = !!(shellRef.current && el && shellRef.current.contains(el))
      if (inside) {
        if (hoverLeaveTimeoutRef.current) {
          clearTimeout(hoverLeaveTimeoutRef.current)
          hoverLeaveTimeoutRef.current = null
        }
        return
      }
      if (!hoverLeaveTimeoutRef.current) {
        hoverLeaveTimeoutRef.current = setTimeout(() => {
          hoverLeaveTimeoutRef.current = null
          releaseOverride()
        }, 180)
      }
    }

    document.addEventListener('mousemove', onMove)
    return () => {
      document.removeEventListener('mousemove', onMove)
      if (hoverLeaveTimeoutRef.current) {
        clearTimeout(hoverLeaveTimeoutRef.current)
        hoverLeaveTimeoutRef.current = null
      }
    }
  }, [openSource])

  // The header's height tracks scroll position directly and continuously:
  // full at the top of the page, shrinking 1:1 down to the strip over the
  // next (navHeight - STRIP_HEIGHT) pixels of scroll, then staying there
  // until hovered or clicked open. Once scrolled back up to where the
  // natural height is full again, any hover/click override is stale and
  // cleared so a later scroll-down starts fresh.
  useEffect(() => {
    function onScroll() {
      const h = computeBaseHeight(window.scrollY, navHeightRef.current)
      baseHeightRef.current = h
      setBaseHeight(h)
      if (h >= navHeightRef.current && openSourceRef.current) {
        setOpenSource(null)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onResize() {
      const nh = getNavHeight()
      if (nh === navHeightRef.current) return
      navHeightRef.current = nh
      setNavHeight(nh)
      const h = computeBaseHeight(window.scrollY, nh)
      baseHeightRef.current = h
      setBaseHeight(h)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Also reveal when the pointer leaves the top of the viewport entirely (up
  // toward the browser chrome / off the top of the screen), same as hovering
  // the strip.
  useEffect(() => {
    function onDocLeave(e) {
      if (e.clientY <= 0) handleHoverOpen()
    }
    document.addEventListener('mouseleave', onDocLeave)
    return () => document.removeEventListener('mouseleave', onDocLeave)
  }, [])

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

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  const topic = pathname.split('/')[1]
  const isArticlePage = pathname.split('/').length > 2

  const displayHeight = openSource ? navHeight : baseHeight
  const isOpen = displayHeight >= navHeight
  const isShrinkable = baseHeight < navHeight
  const contentOpacity = Math.max(0, Math.min(1, (displayHeight - STRIP_HEIGHT) / (navHeight - STRIP_HEIGHT)))
  const heightTransition = transitioning ? `height ${TRANSITION_MS}ms ease` : 'none'

  return (
    <div className={styles.navShell} ref={shellRef}>
      {isShrinkable && (
        <button
          type="button"
          className={styles.arrowButton}
          style={{ top: displayHeight, transition: transitioning ? `top ${TRANSITION_MS}ms ease` : 'none' }}
          onClick={handleArrowClick}
          onMouseEnter={handleHoverOpen}
          disabled={transitioning}
          aria-label={isOpen ? 'Hide navigation' : 'Show navigation'}
          aria-expanded={isOpen}
        >
          <ChevronDown
            size={16}
            strokeWidth={2.5}
            className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconOpen : ''}`}
          />
        </button>
      )}

      <header
        className={styles.topbar}
        style={{ height: displayHeight, transition: heightTransition }}
        onMouseEnter={handleHoverOpen}
      >
        <div
          className={styles.inner}
          style={{ opacity: contentOpacity }}
          aria-hidden={contentOpacity < 0.05}
        >
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
    </div>
  )
}
