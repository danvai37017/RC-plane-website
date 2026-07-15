export const navLinks = [
  { label: 'Design', path: '/design' },
  { label: 'Electronics', path: '/electronics' },
  { label: 'Tools', path: '/tools' },
  { label: 'Build', path: '/build' },
  { label: 'Resources', path: '/resources' },
  { label: 'Troubleshooting', path: '/troubleshooting' },
]

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
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
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
