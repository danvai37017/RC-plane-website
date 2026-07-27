// Draft — placeholder sections added. Replace content with real text and images.
export default {
  topic: 'electronics',
  slug: 'choosing-a-motor',
  category: 'Electronics',
  tags: ['Motors'],
  title: 'Motor and KV Ratings',
  excerpt:
    'Match motor size, Kv, and mount type to your airframe so you get the thrust you need without overheating.',
  author: 'RC Team',
  readingTime: '9 min read',
  difficulty: 'Beginner',
  updated: 'April 2026',
  publishedAt: '2026-04-02',
  heroImage:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Choosing the right motor for your RC plane is a balancing act between power, weight, and efficiency. This guide walks through the key specifications and how they affect your build.' },
      ],
    },
    {
      id: 'motor-types',
      level: 2,
      title: 'Brushed vs Brushless Motors',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Brushless motors have largely replaced brushed motors in modern RC aircraft. They are more efficient, produce more power for their weight, and require less maintenance.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: comparison of brushed and brushless motors]' },
      ],
    },
    {
      id: 'what-kv-means',
      level: 2,
      title: 'What Kv Actually Means',
      content: [
        { type: 'p', text: 'Kv stands for "RPM per volt". A motor rated at 1000 Kv will spin at 1000 RPM for every volt applied, assuming no load. Under load, the actual RPM will be lower.' },
        { type: 'img', src: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=900&q=80', caption: '[Placeholder image: motor Kv comparison chart]' },
        { type: 'p', text: 'A 1000 Kv motor running on an 11.1V (3S) battery will spin at approximately 11,100 RPM under no load. Lower Kv motors spin larger props at lower speeds; higher Kv motors spin smaller props at higher speeds.' },
        { type: 'p', text: 'Kv rating is one of the most misunderstood specifications in RC electronics. Matching Kv to your prop and battery voltage is critical for efficient, reliable performance.' },
      ],
    },
  ],
}