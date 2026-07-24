// Draft — placeholder sections added. Replace content with real text and images.
export default {
  topic: 'design',
  slug: 'wing-design',
  category: 'Design',
  tags: ['Aerodynamics'],
  title: 'Wing Design',
  excerpt:
    'Explore wing planform shapes, aspect ratio, taper, and how each affects flight performance.',
  author: 'RC Team',
  readingTime: '8 min read',
  difficulty: 'Intermediate',
  updated: 'July 2026',
  publishedAt: '2026-07-08',
  heroImage:
    'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Wing planform is the shape of the wing when viewed from directly above or below — the wing\'s outline in top-down view. The planform choice dramatically affects stall behavior, roll rate, drag, and build complexity.' },
      ],
    },
    {
      id: 'planform-types',
      level: 2,
      title: 'Types of Wing Planforms',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Rectangular: constant chord from root to tip. Simplest to build, predictable stall (root stalls first), best for trainers.' },
        { type: 'p', text: '[Placeholder — to be written] Tapered: chord decreases toward the tip. Reduces drag and looks more scale, but can stall at the tip first unless washout is added.' },
        { type: 'p', text: '[Placeholder — to be written] Elliptical: the most aerodynamically efficient planform with minimal induced drag. Very difficult to build — famously used on the Supermarine Spitfire.' },
        { type: 'p', text: '[Placeholder — to be written] Delta: triangular shape with swept leading edges. Common on high-speed jets, good at high angle of attack but high drag at low speeds.' },
        { type: 'p', text: '[Placeholder — to be written] Swept: wings angle backward. Used for high-speed stability; requires washout to avoid dangerous tip stalls.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: comparison of rectangular, tapered, elliptical, delta, and swept planforms]' },
      ],
    },
    {
      id: 'aspect-ratio',
      level: 3,
      title: 'Aspect Ratio and Performance',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Aspect ratio = span ÷ average chord. High aspect ratio wings (long and narrow) are efficient for gliding but less maneuverable. Low aspect ratio wings (short and wide) are agile but produce more induced drag. Most RC trainers have an aspect ratio between 5:1 and 7:1.' },
      ],
    },
  ],
}