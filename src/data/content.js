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
    sections: [
      {
        label: 'Recent',
        items: [
          { title: 'Choosing an Airfoil', path: '/design/choosing-the-right-airfoil', icon: 'FileText' },
          { title: 'Airfoil Geometry', path: '/design/airfoil-geometry', icon: 'Shapes' },
          { title: 'Lift & Drag', path: '/design/lift-drag', icon: 'TrendingUp' },
        ],
      },
      {
        label: 'Airfoils',
        items: [
          { title: 'Choosing an Airfoil', path: '/design/choosing-the-right-airfoil', icon: 'Layers' },
          { title: 'Airfoil Geometry', path: '/design/airfoil-geometry', icon: 'Shapes' },
          { title: 'Lift & Drag', path: '/design/lift-drag', icon: 'TrendingUp' },
        ],
      },
      {
        label: 'Stability',
        items: [
          { title: 'CG & Balance', path: '/design/cg-balance', icon: 'Scale' },
          { title: 'Dihedral Effect', path: '/design/dihedral-effect', icon: 'Rotate3D' },
          { title: 'Pitch Stability', path: '/design/pitch-stability', icon: 'ArrowUpDown' },
        ],
      },
      {
        label: 'Layout',
        items: [
          { title: 'Wing Design', path: '/design/wing-design', icon: 'Wind' },
          { title: 'Fuselage Layout', path: '/design/fuselage-layout', icon: 'Container' },
          { title: 'Tail Sizing', path: '/design/tail-sizing', icon: 'Crosshair' },
        ],
      },
    ],
  },
  electronics: {
    sections: [
      {
        label: 'Recent',
        items: [
          { title: 'Choosing a Motor', path: '/electronics/choosing-a-motor', icon: 'FileText' },
          { title: 'Motor Kv Ratings', path: '/electronics/motor-kv-ratings', icon: 'Gauge' },
          { title: 'ESC Compatibility', path: '/electronics/esc-compatibility', icon: 'Cpu' },
        ],
      },
      {
        label: 'Motors',
        items: [
          { title: 'Choosing a Motor', path: '/electronics/choosing-a-motor', icon: 'Zap' },
          { title: 'Motor Kv Ratings', path: '/electronics/motor-kv-ratings', icon: 'Gauge' },
          { title: 'ESC Compatibility', path: '/electronics/esc-compatibility', icon: 'Cpu' },
        ],
      },
      {
        label: 'Power',
        items: [
          { title: 'Battery Selection', path: '/electronics/battery-selection', icon: 'Battery' },
          { title: 'Wiring Basics', path: '/electronics/wiring-basics', icon: 'Cable' },
          { title: 'Voltage & Current', path: '/electronics/voltage-current', icon: 'Zap' },
        ],
      },
    ],
  },
  tools: {
    sections: [
      {
        label: 'Recent',
        items: [
          { title: 'CG Calculator', path: '/tools/cg-calculator', icon: 'FileText' },
          { title: 'Wing Loading', path: '/tools/wing-loading', icon: 'BarChart3' },
          { title: 'Propeller Pitch', path: '/tools/propeller-pitch', icon: 'Fan' },
        ],
      },
      {
        label: 'Calculators',
        items: [
          { title: 'CG Calculator', path: '/tools/cg-calculator', icon: 'Calculator' },
          { title: 'Wing Loading', path: '/tools/wing-loading', icon: 'BarChart3' },
          { title: 'Propeller Pitch', path: '/tools/propeller-pitch', icon: 'Fan' },
        ],
      },
      {
        label: 'Reference',
        items: [
          { title: 'Material Properties', path: '/tools/material-properties', icon: 'BookOpen' },
          { title: 'Conversion Charts', path: '/tools/conversion-charts', icon: 'FileText' },
          { title: 'Thread Standards', path: '/tools/thread-standards', icon: 'Ruler' },
        ],
      },
    ],
  },
  build: {
    sections: [
      {
        label: 'Recent',
        items: [
          { title: 'Foamboard Trainer', path: '/build/foamboard-trainer', icon: 'FileText' },
          { title: 'Hot Wire Cutting', path: '/build/hot-wire-cutting', icon: 'Flame' },
          { title: 'Foam Finishing', path: '/build/foam-finishing', icon: 'Paintbrush' },
        ],
      },
      {
        label: 'Foam',
        items: [
          { title: 'Foamboard Trainer', path: '/build/foamboard-trainer', icon: 'Box' },
          { title: 'Hot Wire Cutting', path: '/build/hot-wire-cutting', icon: 'Flame' },
          { title: 'Foam Finishing', path: '/build/foam-finishing', icon: 'Paintbrush' },
        ],
      },
      {
        label: 'Wood',
        items: [
          { title: 'Balsa Basics', path: '/build/balsa-basics', icon: 'Trees' },
          { title: 'Spar Construction', path: '/build/spar-construction', icon: 'Hammer' },
          { title: 'Covering Techniques', path: '/build/covering-techniques', icon: 'Wrench' },
        ],
      },
    ],
  },
  resources: {
    sections: [
      {
        label: 'Recent',
        items: [
          { title: 'Plan Libraries', path: '/resources/plan-libraries', icon: 'FileText' },
          { title: 'Airfoil Databases', path: '/resources/airfoil-databases', icon: 'Database' },
          { title: 'Software Tools', path: '/resources/software-tools', icon: 'Monitor' },
        ],
      },
      {
        label: 'Downloads',
        items: [
          { title: 'Plan Libraries', path: '/resources/plan-libraries', icon: 'Download' },
          { title: 'Airfoil Databases', path: '/resources/airfoil-databases', icon: 'Database' },
          { title: 'Software Tools', path: '/resources/software-tools', icon: 'Monitor' },
        ],
      },
      {
        label: 'Community',
        items: [
          { title: 'Forums & Groups', path: '/resources/forums-groups', icon: 'MessageCircle' },
          { title: 'Events Calendar', path: '/resources/events-calendar', icon: 'Calendar' },
          { title: 'Club Directory', path: '/resources/club-directory', icon: 'MapPin' },
        ],
      },
    ],
  },
  troubleshooting: {
    sections: [
      {
        label: 'Recent',
        items: [
          { title: 'Vibration Analysis', path: '/troubleshooting/vibration-analysis', icon: 'FileText' },
          { title: 'Trim Troubles', path: '/troubleshooting/trim-troubles', icon: 'SlidersHorizontal' },
          { title: 'Stall Recovery', path: '/troubleshooting/stall-recovery', icon: 'AlertTriangle' },
        ],
      },
      {
        label: 'Flight Issues',
        items: [
          { title: 'Vibration Analysis', path: '/troubleshooting/vibration-analysis', icon: 'Vibrate' },
          { title: 'Trim Troubles', path: '/troubleshooting/trim-troubles', icon: 'SlidersHorizontal' },
          { title: 'Stall Recovery', path: '/troubleshooting/stall-recovery', icon: 'AlertTriangle' },
        ],
      },
      {
        label: 'Electronics',
        items: [
          { title: 'Motor Not Spinning', path: '/troubleshooting/motor-not-spinning', icon: 'PowerOff' },
          { title: 'Radio Interference', path: '/troubleshooting/radio-interference', icon: 'Wifi' },
          { title: 'Battery Failure', path: '/troubleshooting/battery-failure', icon: 'BatteryWarning' },
        ],
      },
    ],
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
