// Draft — placeholder sections added. Replace content with real text and images.
export default {
  topic: 'design',
  slug: 'adverse-yaw',
  category: 'Design',
  tags: ['Aerodynamics'],
  title: 'Adverse Yaw',
  excerpt:
    'Understand why your plane yaws opposite to your roll input and how to correct it with design choices.',
  author: 'RC Team',
  readingTime: '7 min read',
  difficulty: 'Intermediate',
  updated: 'July 2026',
  publishedAt: '2026-07-02',
  heroImage:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Adverse yaw is a phenomenon where your airplane yaws in the opposite direction of your roll input. When you roll right, the nose briefly yaws left.' },
      ],
    },
    {
      id: 'what-causes-it',
      level: 2,
      title: 'What Causes Adverse Yaw',
      content: [
        { type: 'p', text: '[Placeholder — to be written] When you apply right aileron, the left aileron goes down (increasing lift and drag) and the right aileron goes up (decreasing lift and drag). The extra drag on the left wing pulls that side back, causing the nose to yaw left.' },
        { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Adverse_yaw_illustration.svg/960px-Adverse_yaw_illustration.svg.png', caption: '[Placeholder image: adverse yaw diagram showing forces]' },
      ],
    },
    {
      id: 'solutions',
      level: 3,
      title: 'Solutions for Adverse Yaw',
      content: [
        { type: 'p', text: '[Placeholder — to be written] Differential ailerons are the most common solution — program the ailerons so they move more upward than downward. Frise ailerons use a shaped hinge that protrudes into the airflow when raised. Motor angling can also help by offsetting the thrust line.' },
      ],
    },
  ],
}