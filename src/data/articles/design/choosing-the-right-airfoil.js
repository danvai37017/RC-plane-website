export default {
  topic: 'design',
  slug: 'choosing-the-right-airfoil',
  category: 'Design',
  tags: ['Airfoils', 'Stability'],
  title: 'Choosing the Right Airfoil for Your RC Plane',
  author: 'Sidhanth Sridhar',
  readingTime: '12 min read',
  difficulty: 'Intermediate',
  updated: 'July 2026',
  publishedAt: '2026-07-14',
  featured: true,
  excerpt:
    'Understand how lift, drag, and stall behavior change with airfoil selection and why that matters for your build.',
  // Card/hero image (distinct from the first in-body diagram).
  heroImage:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/1915ca_abger_fluegel_%28cropped_and_mirrored%29.jpg/960px-1915ca_abger_fluegel_%28cropped_and_mirrored%29.jpg',
  breadcrumb: ['Home', 'Design', 'Choosing the Right Airfoil'],
  // "topic/slug" of related articles; the list is auto-filled from the same
  // topic if fewer than needed resolve.
  related: ['build/foamboard-trainer', 'design/aerodynamic-principles-for-beginners'],
  nav: {
    previous: { title: 'Aircraft Design Overview', path: '/design' },
    next: { title: 'Airfoil Geometry', path: '/design/airfoil-geometry' },
  },
  sections: [
    {
      id: 'key-takeaways',
      type: 'takeaways',
      level: 2,
      title: 'Key Takeaways',
      content: [
        { type: 'bullet', text: "The airfoil shape determines your plane's core behavior — changing it can transform a twitchy stunt plane into a floaty trainer." },
        { type: 'bullet', text: 'Flat-bottom airfoils like the Clark Y generate high lift at low speeds and are the easiest to build, making them ideal for beginners.' },
        { type: 'bullet', text: 'Semi-symmetrical airfoils offer the best lift-to-drag ratio, providing excellent glide distance and wind penetration for sport flying.' },
        { type: 'bullet', text: 'Fully symmetrical airfoils produce zero lift at zero angle of attack, delivering neutral handling and identical upright and inverted performance.' },
        { type: 'bullet', text: 'Wing geometry — dihedral, wing placement, and angle of attack management — is just as critical as airfoil choice for overall stability.' },
      ],
    },
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: 'When you are building an RC plane, one of the biggest decisions you have to make is picking the shape of your wing. If you look at a standard wing from the side, that teardrop design is known as the airfoil.' },
        { type: 'p', text: "The airfoil decides your plane's behavior. Changing this single shape can turn a twitchy stunt plane into a floaty trainer or a roll-sensitive aircraft." },
        { type: 'p', text: 'To help you decide which wing you need for your design, we have analyzed airfoils through wind tunnel simulations to break down their impacts on aircraft behavior, along with the key 3D wing geometries that keep your plane stable in the sky.' },
      ],
    },
    {
      id: 'three-airfoil-shapes',
      level: 2,
      title: 'Part 1: The Three Big Airfoil Shapes',
      content: [
        { type: 'p', text: 'To establish a baseline, we analyzed three classic airfoils through XFOIL computer simulations at typical RC flying speeds (a Reynolds Number of Re approx 150,000, which is equivalent to a 7.5-inch chord flying around 30 mph).' },
      ],
    },
    {
      id: 'flat-bottom',
      level: 3,
      title: '1. The Flat-Bottom Airfoil (Example: Clark Y)',
      content: [
        { type: 'p', text: 'The flat-bottom airfoil is the absolute staple of model aviation. Its distinguishing feature is a flat lower surface stretching from just behind the curved nose (leading edge) all the way to the tail (trailing edge).' },
        { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Clark_Y_airfoil.svg/960px-Clark_Y_airfoil.svg.png', caption: 'Clark Y airfoil' },
        { type: 'p', text: 'Since the bottom is completely flat and the top curve is emphasized, this profile generates high amounts of lift even at very low speeds. In our aerodynamic simulations, a flat bottom airfoil maintains a high lift coefficient (approx 0.40) even at a 0 degree angle of attack. This means your plane will climb and fly level without needing to pitch its nose up.' },
        { type: 'p', text: 'Pros: Naturally stable and "hands-off" floaty. It is incredibly easy to build because you can pin the flat bottom sheet of balsa wood or foam board directly to a flat workbench.' },
        { type: 'p', text: 'Cons: Very sensitive to windy days (the high-lift shape acts like a sail) and struggles to fly upside down.' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Best Use Case',
          text: 'This is best for first iteration trainers, heavy-lift cargo planes, and slow flying aircraft.',
        },
      ],
    },
    {
      id: 'semi-symmetrical',
      level: 3,
      title: '2. The Semi-Symmetrical Airfoil (Example: NACA 2412)',
      content: [
        { type: 'p', text: 'A semi-symmetrical wing is the middle ground. The bottom surface has a subtle, gentle curve, while the top has a much more aggressive curve.' },
        { type: 'img', src: '/images/naca2412_cropped.png', caption: 'NACA 2412 airfoil' },
        { type: 'p', text: 'In our simulations, this shape offers the best overall aerodynamic efficiency. It serves as a brilliant compromise, producing solid lift (approx 0.24) while cutting through the air with significantly less drag than a flat-bottom wing. This gives it the highest Lift to Drag ratio, allowing the plane to glide incredibly far if the motor is cut.' },
        { type: 'p', text: 'Pros: Slices cleanly through gusty wind without getting tossed around and easily supports basic aerobatics (loops, rolls, and brief inverted flight).' },
        { type: 'p', text: 'Cons: Higher landing speeds than flat bottom wings. It is also more challenging to build because you cannot lay the curved bottom flat on a table without using custom wing jigs.' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Best Use Case',
          text: 'This is best for sport planes, scaled war planes, and long range gliders.',
        },
      ],
    },
    {
      id: 'symmetrical',
      level: 3,
      title: '3. The Fully Symmetrical Airfoil (Example: NACA 0012)',
      content: [
        { type: 'p', text: 'The symmetrical airfoil is a perfect mirror image from top to bottom. If you fold it in half horizontally, the upper and lower halves match exactly.' },
        { type: 'img', src: '/images/naca0012_cropped.png', caption: 'NACA 0012 airfoil' },
        { type: 'p', text: 'As the profile is perfectly balanced, it generates exactly zero lift when flying at a 0 angle of attack. To fly level, the pilot must maintain a slightly positive nose-up angle. Because there is no camber (asymmetry in the curve), this profile produces the lowest possible drag at high speeds.' },
        { type: 'p', text: 'Pros: Neutral handling. The plane behaves exactly the same whether it is flying right side up or completely upside down. It rolls quickly, loops effortlessly, and goes exactly where you point it.' },
        { type: 'p', text: 'Cons: Zero hands off stability. If you let go of the controls, the plane will not level itself. It will also stall much more abruptly when it gets too slow.' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Best Use Case',
          text: 'This is best for pattern aerobatic ships, 3D stunt planes, and high-speed racers.',
        },
      ],
    },
    {
      id: 'performance-chart',
      level: 3,
      title: 'Performance Chart',
      content: [
        { type: 'p', text: 'Here is how our virtual wind tunnel simulations rank these three shapes under identical scale-flight conditions. To keep our tests fair, we use a Reynolds Number of 150,000.' },
        { type: 'p', text: 'Re measures how air behaves around an object. Because small RC planes experience air "friction" differently than full sized aircraft, we set this number to match the specific conditions of small scale RC flight.' },
        {
          type: 'table',
          headers: ['Airfoil Profile', 'Level Flight Lift (CL at 0°)', 'Drag Level (Low is faster)', 'Glide Distance (With motor off)', 'Pilot Skill Level'],
          rows: [
            ['Flat-Bottom (Clark Y)', 'High (0.40)', 'High', 'Good', 'Beginner, easy to build'],
            ['Semi-Symmetrical (NACA 2412)', 'Medium (0.24)', 'Medium', 'Excellent (Best)', 'Intermediate'],
            ['Symmetrical (NACA 0012)', 'None (0.00)', 'Low (Best)', 'Fair', 'Advanced, difficult to mount on a foamboard trainer'],
          ],
        },
      ],
    },
    {
      id: 'wing-geometry',
      level: 2,
      title: 'Part 2: Wing Geometry and Physics',
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
    {
      id: 'conclusion',
      level: 2,
      title: 'Conclusion',
      content: [
        { type: 'p', text: "In the end, choosing the right airfoil is a game of selecting the right flight characteristics for you. RC plane design and even aerospace engineering isn't about finding a perfect, all-in-one wing, it is about finding the perfect wing for your flight style and how you want your plane to behave in the air." },
        { type: 'p', text: 'In order to experiment with different airfoils, use free tools like XFLR5 and SimScale to run your own virtual wind tunnel tests. See how tweaking your wing\'s aspect ratio or chord width changes your lift to drag curves.' },
        { type: 'p', text: 'Modeling can be done in FreeCAD or Fusion 360 (Autodesk) to sketch out your wing ribs, or design your own wing before developing your own physical wing.' },
        { type: 'p', text: 'Through these steps and this article, you will have the knowledge necessary to pick out the right wing for your RC aircraft. Good luck and happy flying!' },
      ],
    },
  ],
}
