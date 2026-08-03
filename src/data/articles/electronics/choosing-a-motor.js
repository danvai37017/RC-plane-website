export default {
  topic: 'electronics',
  slug: 'choosing-a-motor',
  category: 'Electronics',
  tags: ['Motors'],
  title: 'Motor and KV Ratings',
  excerpt:
    'Match motor size, Kv rating, and battery voltage to your aircraft so you get the power you need without overheating.',
  author: 'RC Team',
  readingTime: '9 min read',
  difficulty: 'Beginner',
  updated: 'August 2026',
  publishedAt: '2026-04-02',
  heroImage:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'key-takeaways',
      type: 'takeaways',
      level: 2,
      title: 'Key Takeaways',
      content: [
        { type: 'bullet', text: 'Kv stands for RPM per volt — it tells you how fast a motor wants to spin, not how powerful it is.' },
        { type: 'bullet', text: 'Higher Kv means more speed but less torque; lower Kv means more torque for larger, heavier aircraft.' },
        { type: 'bullet', text: 'A four-digit motor label (like 3530) describes stator size: diameter (first two) and height (last two).' },
        { type: 'bullet', text: 'You can reach the same RPM with a low-Kv motor on higher voltage, which draws less current and is more efficient.' },
        { type: 'bullet', text: 'Choose the motor for the job, not the biggest number on the label.' },
      ],
    },
    {
      id: 'what-kv-means',
      level: 2,
      title: 'What Does Kv Mean?',
      content: [
        { type: 'p', text: 'The motor is the heart of an RC airplane\'s power system. Choosing the correct motor is not just about picking the biggest or highest-Kv option — it is about matching motor size, KV rating, battery voltage, and aircraft requirements.' },
        { type: 'p', text: 'Kv stands for RPM per volt. It tells you how fast a motor is designed to spin with no load. The basic formula is:' },
        { type: 'code', text: 'RPM = KV × Battery Voltage' },
        { type: 'p', text: 'For example, a 1000 KV motor on a 3S LiPo battery:' },
        { type: 'code', text: '1000 × 11.1V = approximately 11,100 RPM' },
        { type: 'p', text: 'Actual flying RPM will be lower because the propeller creates resistance.' },
      ],
    },
    {
      id: 'higher-kv',
      level: 2,
      title: 'Higher Kv Does Not Mean More Power',
      content: [
        { type: 'p', text: 'A common beginner mistake is thinking that a higher KV means a stronger or faster motor. In reality, KV only describes motor speed, not power output.' },
        { type: 'p', text: 'A high-KV motor spins faster, produces less torque, is usually used in lighter aircraft, and works well with higher-RPM applications.' },
        { type: 'p', text: 'A low-KV motor spins slower, produces more torque, handles larger and heavier aircraft better, and is often paired with higher-voltage batteries.' },
        { type: 'callout', variant: 'info', title: 'Think of Kv like gears in a car', text: 'High Kv = high-speed gear. Low Kv = low-speed gear with more pulling force. Neither is automatically better — the right choice depends on the airplane.' },
      ],
    },
    {
      id: 'motor-size-numbers',
      level: 2,
      title: 'Understanding Motor Size Numbers',
      content: [
        { type: 'p', text: 'Brushless motors are usually labeled with four digits, such as 2204, 2212, 3530, or 4020. These numbers describe the motor\'s stator size.' },
        { type: 'p', text: 'A stator is the fixed, toothed core inside the motor that the copper windings wrap around. Its size determines how much magnetic force the motor can generate, so it is a good proxy for how much power the motor can handle.' },
        { type: 'img', src: '/images/placeholder-motor-stator.png', caption: '[Placeholder: labelled diagram of a brushless motor stator and windings]' },
        { type: 'p', text: 'For example, a 3530 motor has a 35 mm stator diameter and a 30 mm stator height.' },
        { type: 'table', headers: ['Common Label', 'Stator Diameter (mm)', 'Stator Height (mm)'], rows: [['2204', '22', '04'], ['2212', '22', '12'], ['3530', '35', '30'], ['4020', '40', '20']] },
      ],
    },
    {
      id: 'diameter-vs-height',
      level: 3,
      title: 'Diameter vs Height',
      content: [
        { type: 'p', text: 'The first two numbers describe the stator diameter. A larger diameter generally means more magnetic area, more torque, and higher power capability. In practice, 22xx motors suit small aircraft, while 35xx motors suit larger, higher-power aircraft.' },
        { type: 'p', text: 'The last two numbers describe the stator height. A taller stator means more copper winding, more motor volume, better heat handling, and higher power capacity. For example, a 2216 motor can usually handle more power than a 2212 because it has a larger stator volume.' },
      ],
    },
    {
      id: 'motor-size-and-weight',
      level: 2,
      title: 'Motor Size and Aircraft Weight',
      content: [
        { type: 'table', headers: ['Motor Size', 'Suitable For', 'Typical Power'], rows: [['Small Motors (2204–2206)', 'Micro aircraft, small foam models, lightweight FPV planes', '50–150 watts'], ['Medium Motors (2212–2814)', 'Trainers, park flyers, small sport aircraft', '150–400 watts'], ['Larger Motors (3530 and above)', 'Bigger models, scale aircraft, aerobatic planes', '400+ watts']] },
      ],
    },
    {
      id: 'kv-voltage-tradeoff',
      level: 2,
      title: 'KV and Battery Voltage: The Trade-Off',
      content: [
        { type: 'p', text: 'Because RPM = Kv × Voltage, you can achieve similar motor speeds using different combinations.' },
        { type: 'p', text: 'Set up A: a 1200 KV motor on a 3S battery produces 1200 × 11.1 = 13,320 RPM.' },
        { type: 'p', text: 'Set up B: a 900 KV motor on a 4S battery produces 900 × 14.8 = 13,320 RPM — the same speed.' },
        { type: 'callout', variant: 'tip', title: 'The higher-voltage setup wins', text: 'Using a lower-Kv motor with higher voltage draws less current, improves efficiency, and puts less stress on your electronics. This is why experienced builders move to higher-voltage batteries while choosing lower-Kv motors.' },
      ],
    },
    {
      id: 'choosing-kv',
      level: 2,
      title: 'Choosing the Right Kv',
      content: [
        { type: 'table', headers: ['KV Range', 'Good For'], rows: [['Low KV (500–1000)', 'Larger airplanes, scale models, heavy aircraft, efficient cruising'], ['Medium KV (1000–1500)', 'Trainers, sport planes, general-purpose aircraft'], ['High KV (1500–3000+)', 'Lightweight aircraft, racing models, high-speed applications']] },
      ],
    },
    {
      id: 'motor-selection-checklist',
      level: 2,
      title: 'Motor Selection Checklist',
      content: [
        { type: 'callout', variant: 'warning', title: 'Before choosing a motor, consider', text: '✓ Aircraft weight · ✓ Desired flying style · ✓ Battery voltage you plan to use · ✓ Required power level · ✓ Motor size and weight · ✓ Kv rating compatibility' },
      ],
    },
    {
      id: 'final-rule',
      level: 2,
      title: 'Final Rule',
      content: [
        { type: 'p', text: 'A motor\'s KV rating does not tell you how powerful it is — it tells you how fast it wants to spin. A successful RC power system comes from matching motor size → Kv → battery voltage → aircraft requirements.' },
        { type: 'callout', variant: 'tip', title: 'Choose the motor for the job', text: 'Not the biggest number on the label.' },
      ],
    },
  ],
}