export const articleContent = {
  title: 'Choosing the Right Airfoil',
  category: 'Design',
  readingTime: '12 min read',
  difficulty: 'Intermediate',
  author: 'Ryan Thompson',
  updated: 'May 2026',
  breadcrumb: ['Home', 'Design', 'Choosing the Right Airfoil'],
  sections: [
    {
      id: 'key-takeaways',
      type: 'takeaways',
      level: 2,
      title: 'Key Takeaways',
      content: [
        { type: 'bullet', text: 'Airfoil selection determines 80% of your aircraft\'s flight characteristics before the first wing spar is cut.' },
        { type: 'bullet', text: 'Cambered airfoils generate more lift at lower speeds, making them ideal for trainers and thermal gliders.' },
        { type: 'bullet', text: 'Symmetric airfoils excel in aerobatic and inverted flight but require higher speeds for takeoff.' },
        { type: 'bullet', text: 'The Reynolds number at your operating speed dictates whether a thin or thick profile will perform best.' },
        { type: 'bullet', text: 'Leading-edge radius affects stall behavior — rounder edges stall more gently than sharp ones.' },
      ],
    },
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: 'Every aircraft begins with a wing, and every wing begins with an airfoil. The shape of that cross-section — the airfoil — governs how lift is generated, drag is managed, and stall is approached. For RC enthusiasts, choosing the right airfoil can mean the difference between a trainer that practically flies itself and a sport model that bites when you slow down.' },
        { type: 'p', text: 'This guide walks through the aerodynamic principles behind airfoil selection, the practical tradeoffs you will face at model scales, and a framework for matching airfoil shape to mission profile. By the end, you will know exactly what to look for when comparing profiles for your next build.' },
      ],
    },
    {
      id: 'airfoil-fundamentals',
      level: 2,
      title: 'Airfoil Fundamentals',
      content: [
        { type: 'p', text: 'An airfoil generates lift by creating a pressure difference between its upper and lower surfaces. Air moving over the curved top surface travels farther and faster than air beneath the flatter bottom surface, producing lower pressure above and higher pressure below — the Bernoulli principle at work.' },
        { type: 'p', text: 'But pressure distribution alone does not tell the full story. Newton\'s third law also applies: the wing deflects air downward, and the equal and opposite reaction pushes the wing upward. Both effects contribute to total lift, and their relative importance shifts with angle of attack and airfoil shape.' },
      ],
    },
    {
      id: 'camber',
      level: 3,
      title: 'Camber and Lift Generation',
      content: [
        { type: 'p', text: 'Camber is the asymmetry between the top and bottom curves of an airfoil. A cambered airfoil has a curved mean line — the imaginary line halfway between the upper and lower surfaces — while a symmetric airfoil has a straight mean line.' },
        { type: 'p', text: 'Cambered airfoils generate lift even at zero degrees angle of attack. This makes them naturally efficient for cruising-level flight and allows lower wing loadings, which translates to slower landing speeds and gentler stall characteristics.' },
        { type: 'p', text: 'Symmetric airfoils, by contrast, produce zero lift at zero angle of attack. They require a positive angle of attack to generate lift, which means higher takeoff speeds and more aggressive stall behavior. The payoff is that they perform identically upright and inverted, making them the go-to choice for 3D and aerobatic airframes.' },
      ],
    },
    {
      id: 'reynolds-numbers',
      level: 2,
      title: 'Reynolds Numbers at Model Scale',
      content: [
        { type: 'p', text: 'Reynolds number (Re) describes the ratio of inertial forces to viscous forces in a fluid. In practical terms, it determines whether the airflow over your wing is smooth (laminar) or chaotic (turbulent). At full scale, airliners operate at Re in the tens of millions. Your RC model? Typically between 50,000 and 500,000.' },
        { type: 'p', text: 'At these low Reynolds numbers, air behaves more like honey. Boundary layers are thicker, flow separation happens earlier, and lift-to-drag ratios are dramatically lower than their full-scale counterparts. An airfoil that performs beautifully on a Cessna 172 will likely be a terrible choice for a 1.5-meter RC trainer.' },
      ],
    },
    {
      id: 'airfoil-comparison-table',
      level: 3,
      title: 'Common RC Airfoils Compared',
      content: [
        { type: 'p', text: 'The table below compares four airfoil families commonly used in RC aircraft. Each represents a different point in the design space between efficiency, stability, and maneuverability.' },
        {
          type: 'table',
          headers: ['Airfoil', 'Type', 'Best For', 'Camber', 'Stall', 'Re Range'],
          rows: [
            ['Clark Y', 'Flat-bottom', 'Trainers', 'Moderate', 'Gradual', '50K–200K'],
            ['NACA 2412', 'Semi-symmetric', 'Sport/G-P', 'Moderate', 'Moderate', '80K–400K'],
            ['NACA 0012', 'Symmetric', 'Aerobatic', 'None', 'Sharp', '100K–500K'],
            ['SD7032', 'Under-cambered', 'Thermal', 'High', 'Very Gentle', '30K–150K'],
          ],
        },
        { type: 'p', text: 'The Clark Y airfoil has been a favorite among RC builders since the 1920s. Its flat bottom makes construction simple — you can build the wing directly on a flat board — and its gentle stall characteristics forgive the mistakes of novice pilots.' },
      ],
    },
    {
      id: 'mission-profiles',
      level: 2,
      title: 'Matching Airfoils to Mission Profiles',
      content: [
        { type: 'p', text: 'Your airfoil choice should be driven by what you want the aircraft to do. Below are the three most common RC mission profiles and the airfoil families that suit each.' },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Trainer Tip',
          text: 'If this is your first build, choose the Clark Y. Its forgiving stall and easy construction will save you hours of repair time.',
        },
      ],
    },
    {
      id: 'trainers',
      level: 3,
      title: 'Trainers and Beginners',
      content: [
        { type: 'p', text: 'For training aircraft, predictability is king. You want an airfoil that produces ample lift at low speeds, stalls gradually and straight ahead, and gives the pilot plenty of warning before letting go.' },
        { type: 'p', text: 'Flat-bottom airfoils like the Clark Y and the USA-35B are the gold standard here. Their high camber generates significant lift at low airspeeds, and the sharp trailing edge promotes clean flow separation that starts at the rear of the wing and moves forward as the angle of attack increases. This means the pilot feels a gentle mush rather than a sudden wing drop.' },
      ],
    },
    {
      id: 'sport-aerobatic',
      level: 3,
      title: 'Sport and Aerobatic',
      content: [
        { type: 'p', text: 'Once you graduate from training, you will likely want an airframe that can loop, roll, and fly inverted without fighting you. This is where symmetric and semi-symmetric airfoils shine.' },
        { type: 'p', text: 'The NACA 0012 is the most popular symmetric section for RC aerobatics. Its zero-camber design means the aircraft behaves identically upright and inverted, and its relatively thin profile keeps drag low during high-speed maneuvers.' },
      ],
    },
    {
      id: 'thermal-gliders',
      level: 3,
      title: 'Thermal Gliders',
      content: [
        { type: 'p', text: 'For pilots chasing lift, the goal is maximum lift-to-drag ratio at the lowest possible speed. Under-cambered airfoils like the SD7032 and the FX 63-137 excel here.' },
        { type: 'p', text: 'These airfoils have a pronounced concave lower surface that creates extremely high camber, generating exceptional lift at low Reynolds numbers. The tradeoff is structural complexity — the concave bottom makes foam-core or built-up construction challenging — and reduced high-speed performance.' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Beware of Tip Stalls',
          text: 'Under-cambered airfoils are prone to tip stalls if the wing lacks washout. Build in 2–3 degrees of washout to keep the root flying while the tips are already stalled.',
        },
      ],
    },
    {
      id: 'practical-selection',
      level: 2,
      title: 'Practical Selection Framework',
      content: [
        { type: 'p', text: 'When evaluating an airfoil for your next build, follow this three-step process:' },
        { type: 'p', text: 'Step 1 — Estimate your Reynolds number. Use the formula Re = (V × c) ÷ ν where V is velocity in m/s, c is chord length in meters, and ν is kinematic viscosity (roughly 1.5 × 10⁻⁵ at sea level). For a 0.2 m chord at 15 m/s, Re ≈ 200,000.' },
        { type: 'p', text: 'Step 2 — Choose your camber. High camber (4–6%) for trainers and gliders. Low camber (2–3%) for sport models. Zero camber for aerobatic and 3D.' },
        { type: 'p', text: 'Step 3 — Select thickness. Thicker airfoils (12–15% of chord) provide structural depth for spars and produce more drag. Thinner airfoils (8–10%) reduce drag but require stronger internal structure.' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Airfoil Databases',
          text: 'AirfoilTools.com and UIUC Airfoil Coordinates Database provide downloadable coordinates for hundreds of airfoils suitable for RC-scale Reynolds numbers.',
        },
      ],
    },
    {
      id: 'boundary-layer',
      level: 2,
      title: 'Boundary Layer and Turbulators',
      content: [
        { type: 'p', text: 'At RC-scale Reynolds numbers, boundary layers are almost always laminar over the front portion of the wing. While laminar flow is low-drag, it is also fragile — it separates easily under adverse pressure gradients, leading to sudden stall.' },
        { type: 'p', text: 'Many RC builders deliberately trip the boundary layer to turbulent using turbulators — strips of tape or mylar placed near the leading edge. Turbulent flow is higher-drag but more energetic and stays attached to the wing surface longer, producing a more gradual stall.' },
        { type: 'p', text: 'A common rule of thumb: place turbulators at 10–15% of chord on the upper surface. Experiment with position during flight testing — you will feel the difference in stall behavior immediately.' },
      ],
    },
    {
      id: 'conclusion',
      level: 2,
      title: 'Conclusion',
      content: [
        { type: 'p', text: 'Airfoil selection is one of the most consequential decisions you will make in an RC build, but it does not need to be paralyzing. For the vast majority of sport and trainer aircraft, a Clark Y or NACA 2412 will serve you well. As you branch into specialized flying — thermal duration, high-speed pylon, or 3D aerobatics — the airfoil becomes a tuning parameter you can adjust to extract the last few percent of performance.' },
        { type: 'p', text: 'Start simple, build a few wings, and fly them back to back. Nothing beats empirical data from your own transmitter.' },
      ],
    },
  ],
}

export const articleNav = {
  previous: { title: 'Aircraft Design Overview', path: '/design' },
  next: { title: 'Airfoil Geometry', path: '/design/airfoil-geometry' },
}

export const relatedArticles = [
  {
    title: 'Understanding Wing Loading',
    category: 'Design',
    excerpt: 'How wing area and weight affect stall speed, climb rate, and handling.',
    path: '/design/understanding-wing-loading',
    image: 'https://images.unsplash.com/photo-1506942521071-5e6f16e1a2e5?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'CG & Balance Fundamentals',
    category: 'Design',
    excerpt: 'Why neutral point, static margin, and CG location matter for stability.',
    path: '/design/cg-balance-fundamentals',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Building a Foamboard Trainer',
    category: 'Build',
    excerpt: 'A practical guide to creating a durable first airplane that survives early flights.',
    path: '/build/foamboard-trainer',
    image: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=600&q=80',
  },
]
