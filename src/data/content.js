export const navLinks = [
  { label: 'Design', path: '/design', dropdown: 'design' },
  { label: 'Electronics', path: '/electronics', dropdown: 'electronics' },
  { label: 'Tools', path: '/tools', dropdown: 'tools' },
  { label: 'Build', path: '/build', dropdown: 'build' },
  { label: 'Resources', path: '/resources', dropdown: 'resources' },
  { label: 'Troubleshooting', path: '/troubleshooting', dropdown: 'troubleshooting' },
]

export const topicDropdowns = {
  design: {
    items: [
      { title: 'Choosing an Airfoil', path: '/design/choosing-the-right-airfoil' },
      { title: 'Aerodynamic Principles for Beginners', path: '/design/aerodynamic-principles-for-beginners' },
      { title: 'Lift & Drag', path: '/design/lift-drag' },
      { title: 'CG & Balance', path: '/design/cg-balance' },
      { title: 'Dihedral Effect', path: '/design/dihedral-effect' },
      { title: 'Pitch Stability', path: '/design/pitch-stability' },
      { title: 'Wing Design', path: '/design/wing-design' },
      { title: 'Fuselage Layout', path: '/design/fuselage-layout' },
      { title: 'Tail Sizing', path: '/design/tail-sizing' },
    ],
  },
  electronics: {
    items: [
      { title: 'Choosing a Motor', path: '/electronics/choosing-a-motor' },
      { title: 'Motor Kv Ratings', path: '/electronics/motor-kv-ratings' },
      { title: 'Understanding ESCs', path: '/electronics/understanding-escs' },
      { title: 'Battery Selection', path: '/electronics/battery-selection' },
      { title: 'Wiring Basics', path: '/electronics/wiring-basics' },
      { title: 'Voltage & Current', path: '/electronics/voltage-current' },
      { title: 'Propeller Matching', path: '/electronics/propeller-matching' },
      { title: 'Servo Basics', path: '/electronics/servo-basics' },
    ],
  },
  tools: {
    items: [
      { title: 'CG Calculator', path: '/tools/cg-calculator' },
      { title: 'Wing Loading', path: '/tools/wing-loading' },
      { title: 'Propeller Pitch', path: '/tools/propeller-pitch' },
      { title: 'Material Properties', path: '/tools/material-properties' },
      { title: 'Conversion Charts', path: '/tools/conversion-charts' },
      { title: 'Thread Standards', path: '/tools/thread-standards' },
    ],
  },
  build: {
    items: [
      { title: 'Foamboard Trainer', path: '/build/foamboard-trainer' },
      { title: 'Hot Wire Cutting', path: '/build/hot-wire-cutting' },
      { title: 'Foam Finishing', path: '/build/foam-finishing' },
      { title: 'Balsa Basics', path: '/build/balsa-basics' },
      { title: 'Spar Construction', path: '/build/spar-construction' },
      { title: 'Covering Techniques', path: '/build/covering-techniques' },
      { title: 'Composite Layup Basics', path: '/build/composite-layup-basics' },
    ],
  },
  resources: {
    items: [
      { title: 'Ultimate Resource Guide', path: '/resources/ultimate-resource-guide-for-rc-pilots' },
      { title: 'Plan Libraries', path: '/resources/plan-libraries' },
      { title: 'Airfoil Databases', path: '/resources/airfoil-databases' },
      { title: 'Software Tools', path: '/resources/software-tools' },
      { title: 'Forums & Groups', path: '/resources/forums-groups' },
      { title: 'Events Calendar', path: '/resources/events-calendar' },
      { title: 'Club Directory', path: '/resources/club-directory' },
    ],
  },
  troubleshooting: {
    items: [
      { title: 'Vibration Analysis', path: '/troubleshooting/vibration-analysis' },
      { title: 'Trim Troubles', path: '/troubleshooting/trim-troubles' },
      { title: 'Stall Recovery', path: '/troubleshooting/stall-recovery' },
      { title: 'Motor Gets Hot?', path: '/troubleshooting/motor-gets-hot' },
      { title: 'Motor Not Spinning', path: '/troubleshooting/motor-not-spinning' },
      { title: 'Radio Interference', path: '/troubleshooting/radio-interference' },
      { title: 'Battery Failure', path: '/troubleshooting/battery-failure' },
    ],
  },
}

// Per-topic copy for the dedicated topic landing pages (src/pages/TopicPage).
export const topicLanding = {
  design: {
    subtitle:
      'Explore the fundamentals of airfoils, stability, and structural layout — and learn how each design choice shapes the way your aircraft flies.',
  },
  electronics: {
    subtitle:
      'Understand motors, ESCs, batteries, and wiring so you can build a reliable power system with confidence.',
  },
  tools: {
    subtitle:
      'Fast, practical calculators for center of gravity, wing loading, propeller sizing, and more — right when you need them.',
  },
  build: {
    subtitle:
      'Step-by-step build guides for foam, balsa, and composite aircraft, from your first trainer to advanced airframes.',
  },
  resources: {
    subtitle:
      'Curated references, downloads, and community links to help you plan, tune, and keep learning.',
  },
  troubleshooting: {
    subtitle:
      'Diagnose common RC aircraft problems, understand why they happen, and learn proven solutions for motors, electronics, aerodynamics, radio systems, and more.',
  },
}

export const topics = [
  {
    title: 'Design',
    path: '/design',
    description: 'Airfoils, stability, and layout fundamentals.',
    icon: 'design',
    count: '48 Articles',
  },
  {
    title: 'Electronics',
    path: '/electronics',
    description: 'Servos, ESCs, batteries, and wiring confidence.',
    icon: 'electronics',
    count: '31 Guides',
  },
  {
    title: 'Tools',
    path: '/tools',
    description: 'Fast calculators for CG, wing loading, and props.',
    icon: 'tools',
    count: '14 Calculators',
  },
  {
    title: 'Build Tutorials',
    path: '/build',
    description: 'Step-by-step guides for foam, balsa, and composites.',
    icon: 'build',
    count: '27 Builds',
  },
  {
    title: 'Resources',
    path: '/resources',
    description: 'Reference material for planning and tuning.',
    icon: 'resources',
    count: '162 Downloads',
  },
  {
    title: 'Troubleshooting',
    path: '/troubleshooting',
    description: 'Diagnose vibration, drift, and power issues.',
    icon: 'troubleshoot',
    count: '36 Fixes',
  },
]

export const tools = [
  { name: 'CG Calculator', icon: 'crosshair' },
  { name: 'Wing Loading Calculator', icon: 'chartArea' },
  { name: 'Propeller Calculator', icon: 'fan' },
  { name: 'Battery Runtime Calculator', icon: 'battery' },
  { name: 'Servo Calculator', icon: 'rotateCw' },
]

// Home-page featured and "latest" cards are derived from the article registry
// (src/data/articles). See getFeaturedArticle() / getLatestArticles() there.

export const categoryColors = {
  Design: { bg: '#eff6ff', text: '#2563eb' },
  Electronics: { bg: '#ecfdf5', text: '#059669' },
  Build: { bg: '#fff7ed', text: '#ea580c' },
  Resources: { bg: '#f5f3ff', text: '#7c3aed' },
  Troubleshooting: { bg: '#fef2f2', text: '#dc2626' },
}
