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
        {
          type: 'p',
          text: 'The wing is one of the most important parts of an RC airplane. The design of it greatly determines how much lift the aircraft is able to produce, the stability, and the efficiency during flight.',
        },
        {
          type: 'p',
          text: 'The biggest design decision goes down to the wing planform, or the shape of the wing when viewed from above. Different planforms influence how the airplane handles things in the air.',
        },
        {
          type: 'p',
          text: 'Wing placement is also important. Moving the wing forward or backward changes the aircraft\'s stability and how responsive the elevator feels.',
        },
        {
          type: 'p',
          text: 'The sections below explain the most common wing planforms and how wing design affects your aircraft\'s performance.',
        },
      ],
    },
    {
      id: 'planform-types',
      level: 2,
      title: 'Types of Wing Planforms',
      content: [
        {
          type: 'p',
          text: 'Rectangular wings are the simplest to build and are commonly used on trainers. They are approachable, predictable, and easy to construct from foam board.',
        },
        {
          type: 'p',
          text: 'Tapered wings reduce drag and improve efficiency, but they are more difficult to build and can be less forgiving during stalls.',
        },
        {
          type: 'p',
          text: 'Elliptical wings provide excellent aerodynamic efficiency with very low drag. However, their complex shape makes them hard to approach for most foam board RC aircraft.',
        },
        {
          type: 'p',
          text: 'Swept wings are designed for high-speed flight and are commonly found in jet aircraft. At typical RC speeds, they provide few aerodynamic benefits and create more difficulties when it comes to manufacturing.',
        },
        {
          type: 'p',
          text: 'For the sake of simplicity, most foam board RC airplanes use rectangular or slightly swept wings. These shapes are easy to measure, cut, and assemble while still providing proper stability during flight.',
        },
        {
          type: 'img',
          src: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80',
          caption: 'Comparison of common wing planforms used in RC aircraft.',
        },
      ],
    },
    {
      id: 'aspect-ratio',
      level: 3,
      title: 'Aspect Ratio and Performance',
      content: [
        {
          type: 'p',
          text: 'A wing\'s aspect ratio is the comparison between its wingspan to its chord. Long, narrow wings are more efficient and glide better, while shorter, wider wings are stronger and roll more quickly.',
        },
        {
          type: 'p',
          text: 'Wing placement also affects how the aircraft pitches. A wing mounted farther forward makes the airplane more stable and reduces elevator sensitivity.',
        },
        {
          type: 'p',
          text: 'Moving the wing farther back increases elevator responsiveness and maneuverability, but it also makes the aircraft less stable and more difficult to fly.',
        },
        {
          type: 'p',
          text: 'For most RC airplanes, placing the center of gravity around 25–33% of the wing chord behind the leading edge provides a good balance between stability and control.',
        },
      ],
    },
  ],
}