export default {
  topic: 'resources',
  slug: 'learning-channels-links',
  category: 'Resources',
  tags: ['Learning'],
  title: 'Learning Channels & Links',
  excerpt:
    'Curated YouTube channels, articles, courses, and tools to accelerate your RC knowledge — from basic servo placement to advanced aerodynamics.',
  author: 'RC Team',
  readingTime: '5 min read',
  difficulty: 'Beginner',
  updated: 'July 2026',
  publishedAt: '2026-07-28',
  heroImage:
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'introduction',
      level: 2,
      title: 'Introduction',
      content: [
        { type: 'p', text: 'Learning RC aircraft design and building goes beyond static plans and articles. The best way to improve is to watch experienced builders, study aerodynamics fundamentals, and join communities where decades of troubleshooting knowledge are preserved. This page collects the most valuable external resources the RC community relies on.' },
      ],
    },
    {
      id: 'youtube-channels',
      level: 2,
      title: 'YouTube Channels',
      content: [
        { type: 'p', text: 'These channels are excellent for learning basic design principles, servo and linkage placement, and seeing real build techniques in action.' },
        {
          type: 'ul',
          items: [
            {
              title: 'RC Maker Lab',
              text: 'Focused on practical RC builds with clear explanations of servo placement, linkage setups, and design choices. Great for beginners who want to see the build process from start to finish.',
              url: 'https://www.youtube.com/@RC-Maker-Lab',
            },
            {
              title: 'Project Air',
              text: 'Covers detailed RC aircraft design and construction with a methodical approach. Excellent for understanding how design decisions affect flight performance.',
              url: 'https://www.youtube.com/@Project-Air',
            },
            {
              title: 'Peter Sripol',
              text: 'Known for creative and unconventional RC builds. While entertaining, his videos also demonstrate real engineering principles, servo setups, and creative problem-solving.',
              url: 'https://www.youtube.com/@PeterSripol',
            },
          ],
        },
      ],
    },
    {
      id: 'articles-guides',
      level: 2,
      title: 'Articles & Guides',
      content: [
        {
          type: 'ul',
          items: [
            {
              title: 'FliteTest',
              text: 'A huge base of articles for both beginners and advanced RC enthusiasts. Covers everything from your first foamboard build to advanced aerodynamics. Their beginner series is especially well-regarded.',
              url: 'https://www.flitetest.com/',
            },
          ],
        },
      ],
    },
    {
      id: 'courses',
      level: 2,
      title: 'Online Courses',
      content: [
        {
          type: 'ul',
          items: [
            {
              title: 'MIT Private Pilot Certificate Course (YouTube)',
              text: 'This MIT lecture series covers aerodynamics, flight mechanics, and aviation fundamentals far beyond what most RC resources offer. The airplane aerodynamics lecture alone is worth watching for anyone designing RC aircraft. Teaches past what is required for RC.',
              url: 'https://www.youtube.com/watch?v=jeI3wpulyPw&list=PLUl4u3cNGP63cUdAG3v311Vl72ozOiK25',
            },
          ],
        },
      ],
    },
    {
      id: 'tools-databases',
      level: 2,
      title: 'Tools & Databases',
      content: [
        {
          type: 'ul',
          items: [
            {
              title: 'Airfoil Tools',
              text: 'Interactive airfoil database with performance calculations, polar plots, and coordinate data. Lets you compare airfoils side by side and understand their characteristics before cutting foam or balsa.',
              url: 'https://airfoiltools.com/',
            },
          ],
        },
      ],
    },
    {
      id: 'forums-communities',
      level: 2,
      title: 'Forums & Communities',
      content: [
        {
          type: 'ul',
          items: [
            {
              title: 'RC Groups',
              text: 'Decades of troubleshooting knowledge preserved in one of the oldest RC forums on the web. Every problem you will encounter has likely been solved and documented here. Invaluable for diagnosing build and flight issues.',
              url: 'https://www.rcgroups.com/',
            },
          ],
        },
      ],
    },
  ],
}
