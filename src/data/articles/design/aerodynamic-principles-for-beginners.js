// Draft — placeholder sections added. Replace content with real text and images.
export default {
  topic: 'design',
  slug: 'aerodynamic-principles-for-beginners',
  category: 'Design',
  tags: ['Aerodynamics'],
  title: 'Aerodynamic Principles for Beginners',
  excerpt:
    'Learn how lift, drag, thrust, and weight interact to keep your plane in the air.',
  author: 'RC Team',
  readingTime: '9 min read',
  updated: 'May 2026',
  publishedAt: '2026-05-15',
  heroImage:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [],
    },
    {
      id: 'part-1-forces-acting-upon-the-aircraft',
      level: 2,
      title: 'Part 1: Forces Acting Upon the Aircraft',
      content: [
        { type: 'img', src: '/images/part1.png', caption: 'Part 1 introductory illustration' },
      ],
    },
    {
      id: 'thrust-and-the-thrust-to-weight-ratio',
      level: 3,
      title: '1. Thrust & The Thrust-to-Weight Ratio',
      content: [
        { type: 'p', text: 'Thrust is the force produced by the propulsion system that pushes the aircraft forward. In aircraft design, the Thrust to Weight Ratio is the key indicator of overall flight performance:' },
        { type: 'p', text: 'T/W < 1.0: Standard for trainers and gliders. The aircraft requires forward ground speed or a hand launch to generate enough lift in order to take off.' },
        { type: 'p', text: 'T/W ≥ 1.0: Means the motor produces more static thrust than the weight of the entire plane, allowing for infinite vertical climbs and the ability to make aerodynamic movements with high level agility.' },
      ],
    },
    {
      id: 'lift-and-weight-center-of-lift-vs-center-of-gravity',
      level: 3,
      title: '2. Lift & Weight: Center of Lift vs. Center of Gravity',
      content: [
        { type: 'p', text: 'The stability of the flight relies heavily upon the spatial relationship between where the weight sits and where the lift is generated.' },
        { type: 'p', text: 'Center of Gravity: The single point zone where the combined weight of the aircraft forces downwards.' },
        { type: 'p', text: 'Center of Lift: The point on the wing where all total forces of lift average out.' },
        { type: 'p', text: 'Stability Rule: For the pitch to remain passive and have good levels of stability, the CG must sit slightly ahead of the CL. This creates a slight nose down pitch moment that is counteracted by downforce from the tail, which causes the aircraft to naturally recover and evenly level itself from wind gusts.' },
      ],
    },
    {
      id: 'drag-parasitic-induced-and-aspect-ratio',
      level: 3,
      title: '3. Drag: Parasitic, Induced, and Aspect Ratio',
      content: [
        { type: 'p', text: 'Drag is the force that resists forward motion, and can be divided into two main categories:' },
        { type: 'p', text: 'Parasitic Drag: Resistance created by the physical body moving through air, including form drag and skin friction, which increases quadratically with speed.' },
        { type: 'p', text: 'Induced Drag: The result of lift generation as high pressure under the wing escapes to the low pressure above it, creating wingtip vortices that pull back on the aircraft.' },
        { type: 'p', text: 'Aspect Ratio Effect: High Aspect Ratio wings minimize wingtip vortices and greatly reduce induced drag, leading to higher efficiency in gliding as a whole.' },
      ],
    },
    {
      id: 'part-2-aircraft-controls-and-wing-profiles',
      level: 2,
      title: 'Part 2: Aircraft Controls & Wing Profiles',
      content: [
        { type: 'img', src: '/images/part2.png', caption: 'Part 2 introductory illustration' },
      ],
    },
    {
      id: 'control-axes-pitch-yaw-and-roll',
      level: 3,
      title: '1. Control Axes: Pitch, Yaw, and Roll',
      content: [
        { type: 'p', text: 'Aircraft maneuver in three dimensional space by rotating around three perpendicular axes that intersect at the Center of Gravity:' },
        { type: 'p', text: 'Pitch: Nose up or down, controlled by the elevators on the horizontal stabilizer.' },
        { type: 'p', text: 'Roll: Wings shift left or right, controlled by ailerons acting oppositely on the wings.' },
        { type: 'p', text: 'Yaw: Nose swinging left or right, controlled by the Rudder on the vertical stabilizer.' },
      ],
    },
    {
      id: 'wing-shapes-flat-plates-vs-cambered-airfoils',
      level: 3,
      title: '2. Wing Shapes: Flat Plates vs. Cambered Airfoils',
      content: [
        { type: 'p', text: 'Flat Plate Airfoils: Simple, flat surfaced wings. They rely strictly on the attacking angle to deflect air downward, generating the required lift for lightweight park flyers but suffering due to high drag and early stall angles.' },
        { type: 'p', text: 'Cambered Airfoils: Curved cross sections designed to accelerate airflow over the top surface. This creates a low pressure area while properly directing air downward beneath, leading to better lift to drag ratios.' },
      ],
    },
    {
      id: 'part-3-air-density-and-altitude',
      level: 2,
      title: 'Part 3: Air Density & Altitude',
      content: [
        { type: 'img', src: '/images/part3.png', caption: 'Part 3 introductory illustration' },
      ],
    },
    {
      id: 'density-factors-temperature-and-altitude',
      level: 3,
      title: '1. Density Factors: Temperature & Altitude',
      content: [
        { type: 'p', text: 'Lift and thrust calculations rely entirely on mass air density. Air density is negatively impacted by:' },
        { type: 'p', text: 'Higher Altitude: Pressure drops as elevation increases, expanding air molecules and reducing overall density.' },
        { type: 'p', text: 'Higher Temperature: Warmer air molecules move rapidly and spread apart, decreasing density.' },
      ],
    },
    {
      id: 'thrust-loss-and-higher-takeoff-speeds',
      level: 3,
      title: '2. Thrust Loss & Higher Takeoff Speeds',
      content: [
        { type: 'p', text: 'Flying on hot days or at elevated locations impacts performance:' },
        { type: 'p', text: 'Reduced Thrust: Propellers push fewer air molecules per RPM, leading to noticeable static thrust loss.' },
        { type: 'p', text: 'Higher Stall & Takeoff Speeds: Because lift is proportional to air density, a lower density requires a higher true airspeed for the wing to generate the necessary lift to take off, delaying ground roll and increasing the standard requirements for power.' },
      ],
    },
    {
      id: 'part-4-ground-effect',
      level: 2,
      title: 'Part 4: Ground Effect',
      content: [
        { type: 'img', src: '/images/part4.png', caption: 'Part 4 introductory illustration' },
      ],
    },
    {
      id: 'cushioning-near-the-surface',
      level: 3,
      title: 'Cushioning Near the Surface',
      content: [
        { type: 'p', text: 'When an aircraft flies close to the ground it enters Ground Effect.' },
        { type: 'p', text: 'Vortex Reduction: The physical presence of the ground blocks the full development of wingtip vortices and downwash.' },
        { type: 'p', text: 'Drag Reduction: This interruption drastically reduces induced drag, temporarily increasing the wing\'s efficiency.' },
        { type: 'p', text: 'Flight Behavior: On landing approaches, the aircraft experiences a noticeable "cushioning" or floating sensation, extending glide distance and delaying the stall speed until the plane leaves the ground effect zone.' },
      ],
    },
  ],
}