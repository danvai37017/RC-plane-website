// Draft — placeholder sections added. Replace content with real text and images.
export default {
  topic: 'troubleshooting',
  slug: 'vibration-analysis',
  category: 'Troubleshooting',
  tags: ['Flight Issues'],
  title: 'Vibration Analysis',
  excerpt:
    'Track down the source of unwanted vibration, from prop balance to loose mounts, before it damages electronics.',
  author: 'RC Team',
  readingTime: '8 min read',
  difficulty: 'Intermediate',
  updated: 'May 2026',
  publishedAt: '2026-05-08',
  heroImage:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        {
          type: 'p',
          text: 'Vibration is one of the most common problems that can occur in RC aircraft. Excessive vibration can lower flight quality, damage components, and reduce control stability.',
        },
        {
          type: 'p',
          text: 'A properly balanced aircraft should run smoothly with the least amount of shaking possible. Finding and removing vibration sources improves efficiency and reliability during flight.',
        },
        {
          type: 'p',
          text: 'Usually, vibration is caused by the motor, propeller, and other rotating components.',
        },
      ],
    },
    {
      id: 'finding-the-source',
      level: 2,
      title: 'Finding the Source of Vibration',
      content: [
        {
          type: 'p',
          text: 'The first step toward diagnosing vibration is identifying when it occurs. If vibration increases alongside throttle, you can target the problem to the motor or propeller system.',
        },
        {
          type: 'p',
          text: 'A common cause of vibration is an unbalanced propeller. Even a small imbalance can create large vibrations at high RPM. Balancing the propeller or replacing a damaged one can solve the problem.',
        },
        {
          type: 'p',
          text: 'The motor shaft and propeller adapter should also be checked for bends or misalignment. A bent shaft can create vibration that cannot be fixed by balancing alone.',
        },
        {
          type: 'p',
          text: 'It is also important to check for loose components, such as motor mounts, screws, landing gear, and other parts. Make sure everything is properly attached.',
        },
        {
          type: 'p',
          text: 'When troubleshooting, remove one possible cause at a time. Systematically checking each component makes it easier to locate and eliminate the source of vibration without making the problem worse.',
        },
        {
          type: 'img',
          src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
          caption: 'Inspecting propeller balance and mounting hardware',
        },
      ],
    },
  ],
}