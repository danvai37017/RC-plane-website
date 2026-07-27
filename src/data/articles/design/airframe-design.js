export default {
  topic: 'design',
  slug: 'airframe-design',
  category: 'Design',
  tags: ['Layout', 'Stability'],
  title: 'Airframe Design',
  excerpt:
    'Design a fuselage that properly houses your electronics while maintaining strength and minimal weight.',
  author: 'RC Team',
  readingTime: '8 min read',
  difficulty: 'Intermediate',
  updated: 'July 2026',
  publishedAt: '2026-07-06',
  heroImage:
    'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: '[Placeholder — to be written] The fuselage is the structural backbone of your aircraft. It must carry the wing and tail loads, protect the electronics, and keep everything aligned while adding as little weight as possible.' },
      ],
    },
    {
      id: 'fuselage-sizing',
      level: 2,
      title: 'Fuselage Sizing',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Overall fuselage length, cross-section shape, and internal volume for electronics and battery placement.' },
      ],
    },
    {
      id: 'moment-arms',
      level: 2,
      title: 'Tail Moment Arms',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Distance from the CG to the horizontal and vertical stabilizers. Longer moment arms provide more stability but require a stronger, heavier fuselage.' },
      ],
    },
    {
      id: 'horizontal-stab',
      level: 2,
      title: 'Horizontal Stabilizer Sizing',
      content: [
        { type: 'p', text: '[Placeholder — to be written] The horizontal stabilizer provides longitudinal (pitch) stability. A good starting point: horizontal stab area = 20-25% of wing area.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: tail sizing diagram with dimensions]' },
      ],
    },
    {
      id: 'vertical-stab',
      level: 2,
      title: 'Vertical Stabilizer Sizing',
      content: [
        { type: 'p', text: '[Placeholder — to be written] The vertical stabilizer provides directional (yaw) stability. Target vertical stab area = 10-15% of wing area. Factors like fuselage side area and propwash affect how much you need.' },
      ],
    },
    {
      id: 'control-surfaces',
      level: 2,
      title: 'Control Surface Sizing',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Elevator, rudder, and aileron chord ratios and span. Typical elevator chord is 25-40% of horizontal stab chord. Rudder chord is 30-45% of vertical stab chord.' },
      ],
    },
    {
      id: 'landing-gear',
      level: 2,
      title: 'Landing Gear Placement',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Main gear position relative to CG, track width, wheel size, and tail wheel vs nose wheel configuration.' },
      ],
    },
    {
      id: 'firewall-motor',
      level: 2,
      title: 'Firewall & Motor Placement',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Firewall angle (right and down thrust), nose length for prop clearance, and battery compartment access.' },
      ],
    },
    {
      id: 'layout-basics',
      level: 2,
      title: 'Component Layout',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Start by deciding the component layout: battery forward (near the firewall), receiver in the middle, servos near the tail or in the wing. Ensure the battery can slide forward or backward for CG adjustment.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: fuselage cross-section showing component layout]' },
      ],
    },
  ],
}
