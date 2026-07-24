// Draft — placeholder sections added. Replace content with real text and images.
export default {
  topic: 'tools',
  slug: 'formulas',
  category: 'Tools',
  tags: ['Reference', 'Calculators'],
  title: 'Formulas',
  excerpt:
    'Quick-reference formulas for wing loading, aspect ratio, center of lift, and center of pressure.',
  author: 'RC Team',
  readingTime: '6 min read',
  difficulty: 'Intermediate',
  updated: 'July 2026',
  publishedAt: '2026-07-20',
  heroImage:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: '[Placeholder — to be written] These formulas are the building blocks of RC aircraft design. Use them to estimate performance, compare designs, and make informed decisions before you cut foam or balsa.' },
      ],
    },
    {
      id: 'wing-loading',
      level: 2,
      title: 'Wing Loading & Wing Cubic Loading',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Wing Loading = Total Weight / Wing Area. It tells you how much weight each square inch of wing must support. Lower values mean slower, more forgiving flight.' },
        { type: 'p', text: '[Placeholder — to be written] Wing Cubic Loading (WCL) = Weight / (Wing Area^1.5). WCL accounts for scale effects and is more accurate for comparing planes of different sizes.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: wing loading formula diagram]' },
      ],
    },
    {
      id: 'aspect-ratio',
      level: 2,
      title: 'Aspect Ratio',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Aspect Ratio = Wingspan^2 / Wing Area (or Span / Average Chord). High aspect ratio wings are efficient for gliding; low aspect ratio wings are agile but produce more induced drag.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: aspect ratio comparison]' },
      ],
    },
    {
      id: 'center-of-lift',
      level: 2,
      title: 'Center of Lift',
      content: [
        { type: 'p', text: '[Placeholder — to be written] The Center of Lift (CL) is the point on the wing where the total lift force acts. For a straight, untapered wing, it is located at approximately 25% of the Mean Aerodynamic Chord (MAC) from the leading edge.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: MAC and center of lift calculation diagram]' },
      ],
    },
    {
      id: 'center-of-pressure',
      level: 2,
      title: 'Center of Pressure',
      content: [
        { type: 'p', text: '[Placeholder — to be written] The Center of Pressure (CP) is the point where the total aerodynamic force acts on the airfoil. Unlike the CL, the CP moves as the angle of attack changes — it shifts forward as AoA increases.' },
        { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Aerodynamic_center.svg/960px-Aerodynamic_center.svg.png', caption: '[Placeholder image: center of pressure movement with angle of attack]' },
      ],
    },
  ],
}