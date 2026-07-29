export default {
  topic: 'electronics',
  slug: 'battery-selection',
  category: 'Electronics',
  tags: ['Power'],
  title: 'Battery Selection',
  excerpt:
    'Compare capacity, C-rating, and cell count to choose a pack that balances flight time with power delivery.',
  author: 'RC Team',
  readingTime: '8 min read',
  difficulty: 'Beginner',
  updated: 'February 2026',
  publishedAt: '2026-02-14',
  heroImage:
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        {
          type: 'p',
          text: 'The battery is the primary power source of your RC aircraft. Choosing the right battery affects several key defining factors behind the success of your aircraft, consisting of flight time, performance, weight, and overall reliability.',
        },
        {
          type: 'p',
          text: 'A battery that is too small may not provide enough power, while one that is too large can add unnecessary weight and reduce flight performance despite having power. Finding the perfect battery with a balance between these is key.',
        },
        {
          type: 'p',
          text: 'Understanding a few key battery specifications will help you select the perfect power system for your aircraft.',
        },
      ],
    },
    {
      id: 'understanding-ratings',
      level: 2,
      title: 'Understanding Battery Ratings',
      content: [
        {
          type: 'p',
          text: 'The majority of RC aircrafts use Lithium Polymer (LiPo) batteries due to their ability to provide high power output while remaining lightweight.',
        },
        {
          type: 'p',
          text: 'Battery capacity, measured in mAh (milliamp-hours), determines how long the battery is able to supply power. Higher capacities of power supply generally increase flight time but also add weight to the aircraft.',
        },
        {
          type: 'p',
          text: 'The cell count (S) determines the battery\'s voltage levels. More cells produce higher voltage, allowing the motor to spin faster, generating more power.',
        },
        {
          type: 'p',
          text: 'The C-rating indicates how quickly the battery can safely deliver current. Higher C-ratings support more powerful motors and higher throttle demands without causing any damage towards the battery.',
        },
        {
          type: 'p',
          text: 'When selecting a battery, it’s extremely important to remember to balance capacity, voltage, and weight to achieve the desired performance while efficiently maintaining the aircraft\'s center of gravity.',
        },
        { type: 'img', src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80', caption: 'LiPo battery anatomy and key specifications for RC aircraft.' },
      ],
    },
  ],
}