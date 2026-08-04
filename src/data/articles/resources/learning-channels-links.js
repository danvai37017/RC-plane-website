export default {
  topic: 'resources',
  slug: 'learning-channels-links',
  category: 'Resources',
  tags: ['Learning'],
  title: 'Learning Channels & Links',
  excerpt:
    'Curated YouTube channels, articles, courses, and tools to accelerate your RC knowledge — from basic servo placement to advanced aerodynamics.',
  author: 'RC Team',
  readingTime: '8 min read',
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
        { type: 'p', text: 'Learning RC aircraft design and building goes beyond static plans and articles. The best way to improve is to watch experienced builders, study aerodynamics fundamentals, and join communities where decades of troubleshooting knowledge are preserved. This page collects the most valuable external resources the RC community relies on — from design and servo/linkage placement channels, to free flight-training courses, airfoil databases, and troubleshooting forums.' },
      ],
    },
    {
      id: 'youtube-channels',
      level: 2,
      title: 'YouTube Channels',
      content: [
        { type: 'p', text: 'These channels are excellent for learning basic design principles, servo and linkage placement, real build techniques, and the reasoning behind each choice.' },
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
            {
              title: 'Flite Test',
              text: 'The team behind flitetest.com. Their build series tackle foam and balsa trainers step by step, and they routinely discuss CG, control surface sizing, and setup in context.',
              url: 'https://www.youtube.com/@FliteTest',
            },
            {
              title: 'Tom Stanton',
              text: 'An engineer who documents ambitious RC projects — including original wings, controls, and flight testing. Excellent for learning how to iterate on a design and wire servos, electronic speed controllers (ESCs), and receivers properly.',
              url: 'https://www.youtube.com/@TomStanton',
            },
            {
              title: 'Experimental Airlines',
              text: 'Built a following teaching scratch-built foamboard aircraft construction. Their videos pair every structural step with the reasoning behind spar placement and control geometry.',
              url: 'https://www.youtube.com/@ExperimentalAirlines',
            },
            {
              title: 'RCModelReviews',
              text: 'Bruce Simpson runs rigorous motor, propeller, ESC, and servo tests with real measurements. Ideal for knowing which servo, linkage, and power choices actually hold up under load.',
              url: 'https://www.youtube.com/@RCModelReviews',
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
        { type: 'p', text: 'Written references are great for stepping back from a screen and reasoning through a concept at your own pace.' },
        {
          type: 'ul',
          items: [
            {
              title: 'Flite Test',
              text: 'A huge base of articles for both beginners and advanced RC enthusiasts. Covers everything from your first foamboard build to advanced aerodynamics. Their beginner series is especially well-regarded.',
              url: 'https://www.flitetest.com/',
            },
            {
              title: 'RC Airplane World',
              text: 'A long-running beginner-focused site with readable articles on aerodynamics, building, covering, and flying — a good complement to video tutorials.',
              url: 'https://www.rc-airplane-world.com/',
            },
            {
              title: 'Model Aviation — Academy of Model Aeronautics',
              text: 'The magazine of the AMA publishes free in-depth features on full-scale and model aerodynamics, structure, and safety. Useful for grounding your RC knowledge in established aviation practice.',
              url: 'https://www.modelaviation.com/',
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
        { type: 'p', text: 'Structured courseware teaches you well past what is strictly required for RC, giving you the aerodynamic intuition to make better design calls.' },
        {
          type: 'ul',
          items: [
            {
              title: 'MIT Private Pilot Certificate Course (YouTube)',
              text: 'This MIT lecture series covers aerodynamics, flight mechanics, and aviation fundamentals far beyond what most RC resources offer. The airplane aerodynamics lecture alone is worth watching for anyone designing RC aircraft. Teaches past what is required for RC.',
              url: 'https://www.youtube.com/watch?v=jeI3wpulyPw&list=PLUl4u3cNGP63cUdAG3v311Vl72ozOiK25',
            },
            {
              title: 'MIT OpenCourseWare — Aerospace Engineering',
              text: 'Free course materials (lecture notes, videos, problem sets) across aerodynamics, propulsion, and aircraft design. Search for courses such as Flight Vehicle Aerodynamics for a rigorous, free alternative to a full textbook.',
              url: 'https://ocw.mit.edu/',
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
        { type: 'p', text: 'Interactive tools and downloadable coordinate data let you understand airfoils and predict performance before ever cutting foam, balsa, or milling a wing surface.' },
        {
          type: 'ul',
          items: [
            {
              title: 'Airfoil Tools',
              text: 'Interactive airfoil database with performance calculations, polar plots (Cl/Cd), and coordinate data. Compares airfoils side by side and explains their characteristics before you lay up a surface.',
              url: 'https://airfoiltools.com/',
            },
            {
              title: 'UIUC Airfoil Data Site',
              text: 'The University of Illinois Airfoil Data Site hosts a comprehensive, academically maintained archive of airfoil coordinates and wind-tunnel test data — invaluable when you need trustworthy digital polar curves.',
              url: 'https://m-selig.ae.illinois.edu/airfoils/',
            },
            {
              title: 'XFLR5',
              text: 'Free, open-source software for analyzing aerodynamics of airfoils and wings at low Reynolds numbers — the exact regime model aircraft fly in. Great for testing wing design before building.',
              url: 'https://www.xflr5.online/',
            },
            {
              title: 'eCalc',
              text: 'Online calculators for motor, propeller, and power-system matching. Paste in your components and it estimates thrust, current, flight, and efficiency so you can size a drivetrain.',
              url: 'https://www.ecalc.ch/',
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
        { type: 'p', text: 'Decades of troubleshooting and design knowledge live in these communities — search before you build and you will find a documented solution to nearly every problem.' },
        {
          type: 'ul',
          items: [
            {
              title: 'RC Groups',
              text: 'Decades of troubleshooting knowledge preserved in one of the oldest RC forums on the web. Every problem you will encounter has likely been solved and documented here. Invaluable for diagnosing build and flight issues.',
              url: 'https://www.rcgroups.com/',
            },
            {
              title: 'RC Universe',
              text: 'A large, established community forum with dedicated sub-forums for aircraft design, build, servos, and electronics. Great for getting multi-opinion feedback on a plan before you build.',
              url: 'https://www.rcuniverse.com/forum/',
            },
            {
              title: 'Flite Test Forum',
              text: 'A lively, beginner-friendly community tied to Flite Test. Great place to post a build log and get practical advice from builders at every level.',
              url: 'https://forum.flitetest.com/',
            },
            {
              title: 'Reddit — r/radiocontrol',
              text: 'A fast-moving community for hobby control, including model planes. Useful for quick troubleshooting and for seeing current, real-world builds.',
              url: 'https://www.reddit.com/r/radiocontrol/',
            },
          ],
        },
      ],
    },
  ],
}