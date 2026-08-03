export default {
  topic: 'electronics',
  slug: 'propeller-matching',
  category: 'Electronics',
  tags: ['Motors', 'Propellers'],
  title: 'Propeller Matching',
  excerpt:
    'Match your motor, propeller, and battery as one balanced system so you get the power you need without burning anything out.',
  author: 'RC Team',
  readingTime: '8 min read',
  difficulty: 'Beginner',
  updated: 'August 2026',
  publishedAt: '2026-08-03',
  heroImage:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'key-takeaways',
      type: 'takeaways',
      level: 2,
      title: 'Key Takeaways',
      content: [
        { type: 'bullet', text: 'The motor, propeller, and battery must work together as a balanced system — change one and the load on the others changes.' },
        { type: 'bullet', text: 'The propeller is what turns motor power into thrust, but it is also the main load on the motor.' },
        { type: 'bullet', text: 'A larger propeller draws more current; a high-KV motor with too large a prop can overheat the motor, ESC, and battery.' },
        { type: 'bullet', text: 'Work through the four steps: aircraft requirements, battery voltage, motor selection, then verify with a wattmeter before the first flight.' },
      ],
    },
    {
      id: 'introduction',
      level: 2,
      title: 'Motor, Propeller, and Battery',
      content: [
        { type: 'p', text: 'Choosing an RC airplane power system is not about picking the biggest motor or the highest-voltage battery. The motor, propeller, and battery must work together as a balanced system: motor → propeller → battery.' },
        { type: 'p', text: 'Change one component, and the load on the others changes.' },
      ],
    },
    {
      id: 'the-motor',
      level: 2,
      title: 'The Motor',
      content: [
        { type: 'p', text: 'The motor converts electrical energy into spinning force. The important specifications are:' },
        { type: 'p', text: '• KV rating — RPM per volt' },
        { type: 'p', text: '• Stator size — determines torque and power capability' },
        { type: 'p', text: '• Maximum watt/current rating — shows how much power the motor can safely handle' },
        { type: 'p', text: 'A high-KV motor spins faster but produces less torque. It is usually used for lighter, faster aircraft.' },
        { type: 'p', text: 'A low-KV motor spins slower but produces more torque. It is better suited for larger, heavier airplanes.' },
        { type: 'callout', variant: 'info', title: 'Higher KV is not more power', text: 'A higher KV rating only means the motor is designed to spin faster at a given voltage. It does not mean the motor is more powerful.' },
      ],
    },
    {
      id: 'the-propeller',
      level: 2,
      title: 'The Propeller',
      content: [
        { type: 'p', text: 'The propeller is what turns motor power into thrust, but it also creates the load on the motor.' },
        { type: 'p', text: 'A larger propeller produces more thrust, requires more torque, and draws more current.' },
        { type: 'p', text: 'A smaller propeller requires less power and allows higher RPM.' },
        { type: 'callout', variant: 'warning', title: 'The wrong prop can destroy a good setup', text: 'A high-KV motor with too large a propeller can pull excessive current, overheating the motor, ESC, and battery. Always size the propeller to the motor and voltage you actually use.' },
      ],
    },
    {
      id: 'the-battery',
      level: 2,
      title: 'The Battery',
      content: [
        { type: 'p', text: 'The battery controls the voltage and available power. LiPo batteries are rated by cell count:' },
        { type: 'table', headers: ['Cell Count', 'Nominal Voltage'], rows: [['2S', '7.4V'], ['3S', '11.1V'], ['4S', '14.8V']] },
        { type: 'p', text: 'Motor RPM is determined by the formula RPM = KV × Voltage. Increasing voltage increases RPM — moving from 3S to 4S increases motor speed significantly.' },
        { type: 'p', text: 'Because of this, higher-voltage setups usually require lower-KV motors, careful propeller selection, and proper ESC sizing.' },
        { type: 'p', text: 'For example, a 1200 KV motor on 3S can have similar RPM to a 900 KV motor on 4S.' },
      ],
    },
    {
      id: 'step-by-step-matching',
      level: 2,
      title: 'Step-by-Step Power System Matching',
      content: [
        { type: 'p', text: 'Working through the four steps below keeps the whole system balanced. Skipping one is the most common way to end up with a burned motor or ESC.' },
      ],
    },
    {
      id: 'step-1-aircraft-requirements',
      level: 3,
      title: 'Aircraft Requirements',
      content: [
        { type: 'p', text: 'Start with the airplane itself — its weight, flying style, and desired performance.' },
        { type: 'table', headers: ['Aircraft Type', 'Power Needed'], rows: [['Trainer', '50–100 W/lb'], ['Sport', '100–130 W/lb'], ['Aerobatic', '130–150 W/lb'], ['3D', '150 W/lb+']] },
        { type: 'p', text: 'For example, a 4 lb sport airplane needs about 4 × 120 = 480 watts of power.' },
      ],
    },
    {
      id: 'step-2-battery-voltage',
      level: 3,
      title: 'Battery Voltage',
      content: [
        { type: 'p', text: 'Decide whether you want 3S for common trainer and sport aircraft, or 4S and higher for more efficient high-power setups.' },
        { type: 'p', text: 'Higher voltage usually means the system can make the same power while drawing less current.' },
      ],
    },
    {
      id: 'step-3-select-motor',
      level: 3,
      title: 'Motor Selection',
      content: [
        { type: 'p', text: 'Choose a motor that can provide the required power. Check the KV rating, motor size, maximum watt rating, and the recommended battery range.' },
        { type: 'callout', variant: 'warning', title: 'Size matters in both directions', text: 'A motor that is too small will overheat. A motor that is unnecessarily large adds weight without improving performance.' },
      ],
    },
    {
      id: 'step-4-verify',
      level: 3,
      title: 'Verify Your Setup',
      content: [
        { type: 'p', text: 'Calculations are only a starting point. Before the first flight, always test the actual setup with a wattmeter or digital clamp meter.' },
        { type: 'p', text: 'Check the current draw, power output, battery voltage sag, and motor temperature. A few minutes of testing can prevent a burned motor or ESC.' },
        { type: 'p', text: 'The most important number to compare is current draw (amps). Every motor has a maximum rated amp draw — running above it overheats the windings. Always check that your measured amps stay below that rating.' },
        { type: 'p', text: 'A smaller propeller will lower the amp draw, while a larger propeller raises it. If your setup pulls more than the motor (or ESC) is rated for, step down the prop size.' },
      ],
    },
  ],
}