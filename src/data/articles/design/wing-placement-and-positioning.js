export default {
  topic: 'design',
  slug: 'wing-placement-and-positioning',
  category: 'Design',
  tags: ['Stability', 'Layout'],
  title: 'Wing Placement and Positioning',
  author: 'Sidhanth Sridhar',
  readingTime: '8 min read',
  difficulty: 'Intermediate',
  updated: 'July 2026',
  publishedAt: '2026-07-14',
  excerpt:
    'How dihedral, wing mounting position, and angle of attack management combine to determine how stable, forgiving, or agile your RC plane feels in the air.',
  // Card/hero image: the high/mid/low wing configuration diagram used inline below.
  heroImage: '/images/wing_configurations.png',
  breadcrumb: ['Home', 'Design', 'Wing Placement and Positioning'],
  related: ['design/choosing-the-right-airfoil', 'design/aerodynamic-principles-for-beginners'],
  nav: {
    previous: { title: 'Choosing an Airfoil', path: '/design/choosing-the-right-airfoil' },
    next: { title: 'Aerodynamic Principles', path: '/design/aerodynamic-principles-for-beginners' },
  },
  sections: [
    {
      id: 'key-takeaways',
      type: 'takeaways',
      level: 2,
      title: 'Key Takeaways',
      content: [
        { type: 'bullet', text: 'Dihedral (wings angled upward) creates automatic roll stability by generating more lift on a dropped wing, rolling the aircraft back level without any pilot input.' },
        { type: 'bullet', text: 'Anhedral (wings angled downward) trades away that self-leveling tendency for the instant, unrestricted roll response that fighter jets and aerobatic aircraft need.' },
        { type: 'bullet', text: 'Where you mount the wing changes how forgiving the plane feels: high-wing designs hang the fuselage below the wing for pendulum-like stability, while low-wing designs are more agile but less self-correcting.' },
        { type: 'bullet', text: "Angle of attack governs lift and stall — climb using motor power, not by pulling back on the elevator, or you risk exceeding the wing's critical angle and stalling." },
      ],
    },
    {
      id: 'wing-geometry',
      level: 2,
      title: 'Wing Geometry and Physics',
      content: [
        { type: 'p', text: 'An airfoil gives you lift, but how that wing is attached to your plane determines how stable it is. To build a successful RC plane, you need to understand three core stability concepts.' },
      ],
    },
    {
      id: 'dihedral-vs-anhedral',
      level: 3,
      title: '1. Dihedral vs. Anhedral (Rolling Stability)',
      content: [
        { type: 'p', text: 'Dihedral (Wings angled upward in a slight "V" shape): When a gust of wind tips a dihedral wing to the left, the left wing becomes flatter to the ground while the right wing points steeper into the air. This causes the left wing to generate more lift than the right, naturally rolling the plane back to a level position.' },
        { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Dihedral_and_anhedral_angle_%28aircraft_wing%29.svg/960px-Dihedral_and_anhedral_angle_%28aircraft_wing%29.svg.png', crop: 'top', caption: 'Dihedral (+Γ): wings angled up above the horizontal.' },
        { type: 'p', text: '[Placeholder — to be written] Neutral (Zero Dihedral, Γ = 0°): The wings sit perfectly flat, with no upward or downward angle. This gives a roll response that falls right between the self-correcting dihedral setup and the twitchier anhedral setup — the plane neither fights nor amplifies a roll on its own.' },
        { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Dihedral_and_anhedral_angle_%28aircraft_wing%29.svg/960px-Dihedral_and_anhedral_angle_%28aircraft_wing%29.svg.png', crop: 'middle', caption: 'Neutral (Γ = 0°): wings level with the horizontal.' },
        { type: 'p', text: "Anhedral (Wings angled downward): This creates rolling instability. This is actually a feature on fighter jets and high-performance military cargo planes because it allows them to roll and change directions instantly without fighting the plane's natural tendency to level out." },
        { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Dihedral_and_anhedral_angle_%28aircraft_wing%29.svg/960px-Dihedral_and_anhedral_angle_%28aircraft_wing%29.svg.png', crop: 'bottom', caption: 'Anhedral (−Γ): wings angled down below the horizontal.' },
      ],
    },
    {
      id: 'high-wing-vs-low-wing',
      level: 3,
      title: '2. High Wing Mid wing Low Wing: The Pendulum Effect',
      content: [
        { type: 'p', text: 'Where you mount the wing on the body (fuselage) drastically changes how "rocky" or "smooth" the plane feels.' },
        { type: 'img', src: '/images/wing_configurations.png', caption: 'High wing, mid-wing, and low-wing aircraft configurations' },
        { type: 'p', text: 'High Wing (Pendulum Effect): Mounting the wing on top of the fuselage places the plane\'s heavy components (battery, receiver, servos) below the center of lift. Think of a weight hanging on a string: gravity naturally pulls the heavy fuselage downward, keeping the wing level. This makes high-wing setups incredibly stable and perfect for trainers.' },
        { type: 'p', text: 'Low Wing: Mounting the wing underneath the fuselage is like trying to balance a broomstick on your hand. Because the center of gravity is above the center of lift, the plane wants to roll easily. This makes it highly agile but less forgiving.' },
      ],
    },
    {
      id: 'angle-of-attack-stall',
      level: 3,
      title: '3. Angle of Attack and the Stall Trap',
      content: [
        { type: 'p', text: 'The Angle of Attack (AoA) is the angle between the chord line of your wing and the oncoming airflow. A higher angle of attack equates to more lift but increases drag and can cause the aircraft to become more prone to stalling.' },
        { type: 'img', src: 'https://modelaviation.s3.us-east-2.amazonaws.com/styles/lead/s3/angle-of-attack.jpg?VersionId=mV9B2M1pqfamaWX6qhi98xaMLH90lji4&itok=1M8fvVWd', caption: 'Angle of attack and lift relationship' },
        { type: 'p', text: 'The Lift Curve: As you pull back on your elevator stick, you pitch the nose up, increasing the Angle of Attack. This exposes more of the wing\'s underside to the air, generating more lift.' },
        { type: 'p', text: 'The Stall: Air likes to flow smoothly over the curved top of the wing. If you pitch the nose up too high (usually beyond 12 to 15 degrees), the air can no longer "stick" to the top surface. It breaks away in turbulent swirls, lift drops to zero, and the plane\'s nose drops like a stone.' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Extremely Important Piloting Rule',
          text: 'Beginners often try to climb by pulling back hard on the control stick. Remember: Use your motor power to control your climb, and your elevator to control your airspeed.',
        },
      ],
    },
  ],
}
