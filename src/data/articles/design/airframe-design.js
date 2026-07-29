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
        {
          type: 'p',
          text: 'A proper airframe begins with the wing. Once your wingspan and wing chord are chosen, the rest of the aircraft can be sized using proven design ratios.',
        },
        {
          type: 'p',
          text: 'Using consistent proportions helps create an aircraft that is stable, balanced, and easier to tune and make adjustments to during flight testing.',
        },
        {
          type: 'p',
          text: 'The sections below cover the major airframe components and their direct relation to the wing.',
        },
      ],
    },
    {
      id: 'fuselage-sizing',
      level: 2,
      title: 'Fuselage Sizing',
      content: [
        {
          type: 'p',
          text: 'For most aircraft, begin by designing the wing saddle. The saddle should match the wing chord so the wing sits securely and maintains the correct incidence angle.',
        },
        {
          type: 'p',
          text: 'Once the wing position is established, design the rest of the fuselage around it. The nose, cabin, and tail can all be scaled using proportions from the full-size aircraft or common RC design ratios.',
        },
        {
          type: 'p',
          text: 'For high-wing trainers like a Cessna, the fuselage is usually taller and wider for stability. Sport and aerobatic aircraft often use slimmer fuselages to reduce drag and weight.',
        },
      ],
    },
    {
      id: 'moment-arms',
      level: 2,
      title: 'Tail Moment Arms',
      content: [
        {
          type: 'p',
          text: 'The tail moment arm is the distance between the wing and the tail surfaces. This distance has a major impact on the stability of the aircraft.',
        },
        {
          type: 'p',
          text: 'A longer tail moment increases pitch and yaw stability while allowing smaller stabilizers. Most trainers use longer tail moments in order to ensure a smoother flight.',
        },
        {
          type: 'p',
          text: 'Shorter tail moments improve the responsiveness of the aircraft, however they also require larger tail surfaces to maintain control.',
        },
      ],
    },
    {
      id: 'horizontal-stab',
      level: 2,
      title: 'Horizontal Stabilizer Sizing',
      content: [
        {
          type: 'p',
          text: 'The horizontal stabilizer provides pitch stability and supports the elevator.',
        },
        {
          type: 'p',
          text: 'A common starting point is a horizontal stabilizer area of 20–30% of the wing area. Trainers typically use values near the upper end of this range, while aerobatic aircraft can use slightly smaller stabilizers.',
        },
        {
          type: 'p',
          text: 'Increasing the stabilizer size improves stability but also adds drag and weight.',
        },
        { type: 'img', src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80', caption: 'Tail sizing diagram with dimensions for a balanced airframe.' },
      ],
    },
    {
      id: 'vertical-stab',
      level: 2,
      title: 'Vertical Stabilizer Sizing',
      content: [
        {
          type: 'p',
          text: 'The vertical stabilizer keeps the aircraft pointed straight and provides directional stability.',
        },
        {
          type: 'p',
          text: 'A good starting point is a vertical stabilizer area of 8–12% of the wing area. Larger fins improve tracking in windy conditions, while smaller fins reduce drag and increase agility.',
        },
        {
          type: 'p',
          text: 'Aircraft with powerful motors or large propellers often benefit from a slightly larger vertical stabilizer.',
        },
      ],
    },
    {
      id: 'control-surfaces',
      level: 2,
      title: 'Control Surface Sizing',
      content: [
        {
          type: 'p',
          text: 'Control surface size depends on the type of aircraft being built.',
        },
        {
          type: 'p',
          text: 'For trainers, elevators and rudders typically use 25–30% of the stabilizer chord, while ailerons use about 20–25% of the wing chord. Smaller control surfaces produce smoother, more forgiving handling.',
        },
        {
          type: 'p',
          text: 'Sport-related aircraft usually increase these values to around 30–35%, providing quicker responses without becoming overly sensitive.',
        },
        {
          type: 'p',
          text: 'Aerobatic and 3D aircraft often use 35–50% control surfaces to maximize authority and control for aggressive maneuvers, although they usually require control rates to be lowered or exponential settings.',
        },
      ],
    },
    {
      id: 'landing-gear',
      level: 2,
      title: 'Landing Gear Placement',
      content: [
        {
          type: 'p',
          text: 'Landing gear should support the aircraft while keeping takeoffs and landings predictable and under control.',
        },
        {
          type: 'p',
          text: 'For taildraggers, the main wheels are typically placed slightly ahead of the aircraft\'s center of gravity to prevent and lower the risk of tipping backward.',
        },
        {
          type: 'p',
          text: 'For tricycle gear, the main wheels are usually positioned just behind the center of gravity, with the nose wheel supporting the front of the aircraft during taxi and landing.',
        },
      ],
    },
    {
      id: 'firewall-motor',
      level: 2,
      title: 'Firewall & Motor Placement',
      content: [
        {
          type: 'p',
          text: 'The firewall serves as the mounting point for the motor and transfers thrust loads into the fuselage.',
        },
        {
          type: 'p',
          text: 'The motor\'s center of thrust should align closely with the aircraft\'s centerline. This minimizes unwanted pitching and yawing during throttle changes.',
        },
        {
          type: 'p',
          text: 'Many aircraft also use a small amount of right thrust and down thrust to act against the propeller effects and improve straight-flight performance under power.',
        },
      ],
    },
    {
      id: 'layout-basics',
      level: 2,
      title: 'Component Layout',
      content: [
        {
          type: 'p',
          text: 'After completing the airframe, position the electronics in order to achieve the desired center of gravity.',
        },
        {
          type: 'p',
          text: 'The battery is usually the easiest component to move and is commonly used to fine-tune the balance of the aircraft.',
        },
        {
          type: 'p',
          text: 'Place heavier components close to the fuselage centerline whenever possible. This reduces rotational inertia and improves the handling of the aircraft.',
        },
        { type: 'img', src: 'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80', caption: 'Fuselage cross-section showing component layout for balanced CG.' },
      ],
    },
  ],
}
