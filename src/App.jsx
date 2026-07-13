import { useEffect, useState } from 'react'
import './App.css'

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const topics = [
  {
    title: 'Home',
    intro: 'A welcoming place to start learning about RC aircraft basics and planning.',
    subcategories: [
      'Start Here',
      'What You\'ll Learn',
      'Featured Build',
      'Featured Tools',
    ],
  },
  {
    title: 'Design',
    intro: 'All about the design side of RC aircraft, from airfoils to center of gravity.',
    subcategories: [
      'Aircraft Anatomy',
      'Flight Basics',
      'Stability',
      'Wing Design',
      'Airfoils',
      'Wing Loading',
      'Center of Gravity',
      'Tail Design',
      'Fuselage Design',
      'Control Surfaces',
      'Servo Geometry',
      'Design Rules of Thumb',
    ],
  },
  {
    title: 'Electronics',
    intro: 'All about Electronics, from motors and batteries to wiring and radio gear.',
    subcategories: [
      'RC Power System Overview',
      'Motors',
      'ESCs',
      'Batteries',
      'Propellers',
      'Servos',
      'Receivers & Transmitters',
      'Connectors & Wiring',
      'Power Matching',
      'Common Mistakes',
    ],
  },
  {
    title: 'Tools',
    intro: 'Useful tools and calculators to help you size, balance, and estimate your RC setup.',
    layout: 'cards',
    subcategories: [
      {
        title: 'Thrust-to-Weight Calculator',
        description: 'Estimate whether your aircraft has enough power for a safe takeoff.',
        metadata: ['Use: Sizing', 'Importance: 4.5/5'],
      },
      {
        title: 'Wing Loading Calculator',
        description: 'Check how heavily the wing is loaded for a given setup.',
        metadata: ['Use: Performance', 'Importance: 4/5'],
      },
      {
        title: 'CG Calculator',
        description: 'Help place the center of gravity in a balanced and stable range.',
        metadata: ['Use: Balance', 'Importance: 5/5'],
      },
      {
        title: 'Wing Area Calculator',
        description: 'Estimate wing area from span and chord values quickly.',
        metadata: ['Use: Design', 'Importance: 3.5/5'],
      },
      {
        title: 'Aspect Ratio Calculator',
        description: 'Compare how efficient a wing shape might be for the build.',
        metadata: ['Use: Design', 'Importance: 3/5'],
      },
      {
        title: 'Motor RPM Calculator',
        description: 'Approximate propeller speed based on KV and voltage input.',
        metadata: ['Use: Matching', 'Importance: 4/5'],
      },
      {
        title: 'Flight Time Estimator',
        description: 'Preview how long a battery might last under a planned load.',
        metadata: ['Use: Planning', 'Importance: 3.5/5'],
      },
      {
        title: 'Watts-per-Pound Calculator',
        description: 'Gauge how much power your aircraft has relative to its weight.',
        metadata: ['Use: Performance', 'Importance: 4/5'],
      },
      {
        title: 'Unit Converter',
        description: 'Swap between metric and imperial values for common RC measurements.',
        metadata: ['Use: Quick Reference', 'Importance: 3/5'],
      },
      {
        title: 'Reference Charts',
        description: 'Keep common aircraft and electronics numbers in one place.',
        metadata: ['Use: Reference', 'Importance: 3/5'],
      },
    ],
  },
  {
    title: 'Build Tutorials',
    intro: 'Step-by-step guidance for building a variety of RC aircraft from scratch.',
    layout: 'cards',
    subcategories: [
      {
        title: 'Beginner Trainer',
        description: 'A simple first build for learning the basics of assembly and setup.',
        metadata: ['Difficulty: Easy', 'Time: 1-2 days'],
      },
      {
        title: 'High-Wing Trainer',
        description: 'A stable aircraft style that is beginner-friendly and forgiving.',
        metadata: ['Difficulty: Easy', 'Time: 2-3 days'],
      },
      {
        title: 'Low-Wing Sport Plane',
        description: 'A lively build for pilots ready to explore faster flying.',
        metadata: ['Difficulty: Moderate', 'Time: 3-5 days'],
      },
      {
        title: 'Flying Wing',
        description: 'A minimal design focused on efficiency and clean aerodynamics.',
        metadata: ['Difficulty: Moderate', 'Time: 3-4 days'],
      },
      {
        title: 'Glider',
        description: 'A lighter and smoother build centered on quiet, efficient flight.',
        metadata: ['Difficulty: Moderate', 'Time: 2-3 days'],
      },
      {
        title: 'Twin Motor (future)',
        description: 'A future project idea for a more advanced dual-motor aircraft.',
        metadata: ['Difficulty: Hard', 'Time: TBD'],
      },
      {
        title: 'Scratch Design Series',
        description: 'An approach to planning and shaping a custom RC aircraft from scratch.',
        metadata: ['Difficulty: Hard', 'Time: Ongoing'],
      },
      {
        title: 'Build Techniques',
        description: 'Helpful methods for joining parts, aligning structures, and finishing cleanly.',
        metadata: ['Difficulty: Moderate', 'Time: Flexible'],
      },
      {
        title: 'Finishing',
        description: 'Covering, sanding, and surface prep ideas for a polished build.',
        metadata: ['Difficulty: Moderate', 'Time: 1-2 days'],
      },
      {
        title: 'Pre-Flight Checklist',
        description: 'A final checklist to review before every flight for safety and confidence.',
        metadata: ['Importance: Essential', 'Use: Every flight'],
        standaloneSection: true,
      },
    ],
  },
  {
    title: 'Resources',
    intro: 'Helpful references, community links, software, and beginner-friendly materials.',
    subcategories: [
      'Flight Simulator',
      'Software',
      'Free Plans',
      'Recommended Channels',
      'Reference Documents',
      'Community',
      'Glossary',
      'FAQ',
    ],
  },
  {
    title: 'Troubleshooting',
    intro: 'Here\'s how to troubleshoot common RC plane issues and get back in the air.',
    subcategories: [
      'Plane won\'t take off',
      'Rolls left/right after launch',
      'Keeps stalling',
      'Turns constantly',
      'Motor gets hot',
      'ESC overheats',
      'Battery puffs',
      'Servo jitters',
    ],
  },
]

const fillerLineWidths = ['100%', '82%', '74%', '92%', '68%', '88%']

function App() {
  const [activeTopic, setActiveTopic] = useState(topics[0])
  const [activeSection, setActiveSection] = useState('')

  const handleTopicSelect = (topic) => {
    setActiveTopic(topic)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isCardLayout = activeTopic.layout === 'cards'
  const isHomePage = activeTopic.title === 'Home'
  const cardItems = isCardLayout ? activeTopic.subcategories.filter((item) => !item.standaloneSection) : []
  const standaloneItems = isCardLayout ? activeTopic.subcategories.filter((item) => item.standaloneSection) : []
  const sectionTitles = activeTopic.subcategories.map((item) => (typeof item === 'string' ? item : item.title))
  const tutorialTopic = topics.find((topic) => topic.title === 'Build Tutorials')
  const electronicsTopic = topics.find((topic) => topic.title === 'Electronics')
  const toolsTopic = topics.find((topic) => topic.title === 'Tools')

  const scrollToSection = (index = 0) => {
    const targetTopic = activeTopic.subcategories[index]
    const targetTitle = typeof targetTopic === 'string' ? targetTopic : targetTopic.title
    const targetId = slugify(targetTitle)
    const target = document.getElementById(targetId)

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToTarget = (targetId) => {
    const target = document.getElementById(targetId)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (isCardLayout || sectionTitles.length === 0) {
      return
    }

    setActiveSection(slugify(sectionTitles[0]))

    const sections = Array.from(document.querySelectorAll('.topic-section'))
    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: [0.1, 0.3, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [activeTopic, isCardLayout, sectionTitles])

  return (
    <div className="page">
      <header className="top-nav">
        <nav className="top-nav-links" aria-label="Top navigation">
          {topics.map((topic) => (
            <button
              key={topic.title}
              type="button"
              className={`top-nav-link ${activeTopic.title === topic.title ? 'active' : ''}`}
              onClick={() => handleTopicSelect(topic)}
            >
              {topic.title}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">
        <div className={`page-layout ${isCardLayout ? 'card-layout' : 'content-layout'}`}>
          {!isHomePage && !isCardLayout && (
            <aside className="toc-sidebar">
              <div className="toc-card" aria-label="Table of contents">
                <div className="toc-header">
                  <h2>Table of Contents</h2>
                </div>

                <ul className="toc-list">
                  {activeTopic.subcategories.map((subcategory) => {
                    const title = typeof subcategory === 'string' ? subcategory : subcategory.title
                    const sectionId = slugify(title)
                    const isActive = activeSection === sectionId

                    return (
                      <li key={title}>
                        <a href={`#${sectionId}`} className={isActive ? 'active' : ''}>
                          {title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>
          )}

          <div className={`content-column ${isHomePage ? 'home-page' : ''}`}>
            {isHomePage ? (
              <>
                <section className="hero hero-home">
                  <div className="hero-home-content">
                    <h1>RC Plane Learning Hub</h1>
                    <p className="page-intro">
                      Learn the essentials of RC aircraft design, electronics, and building with a clear path from first steps to confident flying.
                    </p>

                    <div className="hero-actions">
                      <button type="button" className="btn btn-primary" onClick={() => scrollToTarget('home-quick-links')}>
                        Start Learning
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => tutorialTopic && handleTopicSelect(tutorialTopic)}
                      >
                        Browse Tutorials →
                      </button>
                    </div>
                  </div>
                </section>

                <section id="home-quick-links" className="home-quick-links">
                  <article className="home-card">
                    <h3>New to RC Aircraft?</h3>
                    <p>Start with the basics and build confidence before you ever take off.</p>
                    <button type="button" className="btn btn-secondary" onClick={() => handleTopicSelect(topics[0])}>
                      Start Here
                    </button>
                  </article>

                  <article className="home-card">
                    <h3>Electronics Got You Confused?</h3>
                    <p>Get a practical overview of motors, batteries, wiring, and radio gear.</p>
                    <button type="button" className="btn btn-secondary" onClick={() => electronicsTopic && handleTopicSelect(electronicsTopic)}>
                      Browse Electronics
                    </button>
                  </article>

                  <article className="home-card">
                    <h3>Will It Fly?</h3>
                    <p>Use quick calculators and sizing tools to estimate power, balance, and performance.</p>
                    <button type="button" className="btn btn-secondary" onClick={() => toolsTopic && handleTopicSelect(toolsTopic)}>
                      Find a Calculator
                    </button>
                  </article>
                </section>
              </>
            ) : (
              <>
                <section className="hero">
                  <div className="hero-copy">
                    <p className="eyebrow">RC Plane Learning Hub</p>
                    <h1>{activeTopic.title}</h1>
                    <p className="page-intro">{activeTopic.intro}</p>
                  </div>

                  <div className="hero-illustration" aria-hidden="true">
                    <svg viewBox="0 0 320 200" role="img">
                      <rect x="32" y="46" width="248" height="118" rx="18" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
                      <path d="M60 118L132 84L168 88L220 76L260 95L214 104L176 126L132 120L92 132Z" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M102 96L76 58" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                      <path d="M132 78L118 44" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                      <path d="M170 84L162 56" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                      <path d="M220 82L238 58" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="112" cy="106" r="4" fill="#3b82f6" />
                      <circle cx="168" cy="96" r="4" fill="#3b82f6" />
                    </svg>
                  </div>
                </section>

                <section className="page-body">
              {isCardLayout ? (
                <>
                  <div className="card-grid">
                    {cardItems.map((item) => (
                      <article key={item.title} className="info-card">
                        <div className="card-icon" aria-hidden="true">
                          ✦
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="card-meta-list">
                          {item.metadata.map((meta) => (
                            <span key={meta} className="card-meta">
                              {meta}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>

                  {standaloneItems.length > 0 && (
                    <div className="standalone-sections">
                      {standaloneItems.map((item) => (
                        <section key={item.title} id={slugify(item.title)} className="topic-section">
                          <div className="section-heading">
                            <span className="section-icon" aria-hidden="true">
                              ✓
                            </span>
                            <h3>{item.title}</h3>
                          </div>
                          <p>{item.description}</p>
                          <div className="section-note">
                            <div className="note-card">
                              <strong>Quick note</strong>
                              <p>Use this section as a practical checkpoint before moving on.</p>
                            </div>
                          </div>
                          <div className="filler-blocks" aria-hidden="true">
                            {fillerLineWidths.map((width, lineIndex) => (
                              <span key={`${width}-${lineIndex}`} className="filler-line" style={{ width }} />
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                activeTopic.subcategories.map((subcategory) => {
                  const title = typeof subcategory === 'string' ? subcategory : subcategory.title

                  return (
                    <section key={title} id={slugify(title)} className="topic-section">
                      <div className="section-heading">
                        <span className="section-icon" aria-hidden="true">
                          •
                        </span>
                        <h3>{title}</h3>
                      </div>
                      <p>Placeholder content for {title.toLowerCase()} will be added here later.</p>
                      <div className="section-note">
                        <div className="note-card">
                          <strong>Why it matters</strong>
                          <p>These sections will soon hold concise guidance, diagrams, and practical examples.</p>
                        </div>
                      </div>
                      <div className="filler-blocks" aria-hidden="true">
                        {fillerLineWidths.map((width, lineIndex) => (
                          <span key={`${width}-${lineIndex}`} className="filler-line" style={{ width }} />
                        ))}
                      </div>
                    </section>
                  )
                })
              )}
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
