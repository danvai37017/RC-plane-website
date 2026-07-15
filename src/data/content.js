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

export const featuredArticle = {
  category: 'Design',
  readTime: '12 MIN READ',
  updated: 'UPDATED MAY 2026',
  title: 'Choosing the Right Airfoil',
  excerpt:
    'Understand how lift, drag, and stall behavior change with airfoil selection and why that matters for your build.',
  author: 'Ryan Thompson',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/1915ca_abger_fluegel_%28cropped_and_mirrored%29.jpg/960px-1915ca_abger_fluegel_%28cropped_and_mirrored%29.jpg',
}

export const latestArticles = [
  {
    title: 'Building a Foamboard Trainer',
    category: 'Build',
    excerpt:
      'A practical guide to creating a durable first airplane that survives early flights.',
    image:
      'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Understanding ESCs',
    category: 'Electronics',
    excerpt:
      'Learn how electronic speed controllers influence power delivery and reliability.',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Motor Gets Hot?',
    category: 'Troubleshooting',
    excerpt:
      'A concise checklist for identifying overload, poor timing, or airflow issues.',
    image:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Aerodynamic Principles for Beginners',
    category: 'Design',
    excerpt:
      'Learn how lift, drag, thrust, and weight interact to keep your plane in the air.',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Ultimate Resource Guide for RC Pilots',
    category: 'Resources',
    excerpt:
      'Curated links to airfoil databases, plan repositories, and community forums.',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  },
]

export const categoryColors = {
  Design: { bg: '#eff6ff', text: '#2563eb' },
  Electronics: { bg: '#ecfdf5', text: '#059669' },
  Build: { bg: '#fff7ed', text: '#ea580c' },
  Resources: { bg: '#f5f3ff', text: '#7c3aed' },
  Troubleshooting: { bg: '#fef2f2', text: '#dc2626' },
}
