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
        { type: 'p', text: 'Have you ever rolled your RC plane to the right, only to notice the nose momentarily swing to the left? That annoying little kick is called adverse yaw. It happens right when you try to turn, and if you don\'t correct it, your plane can drift off course or feel sloppy in the air.' },
      ],
    },
    {
      id: 'what-causes-adverse-yaw',
      level: 2,
      title: 'What Causes Adverse Yaw?',
      content: [
        { type: 'p', text: 'It all comes down to how ailerons make a plane roll.' },
        { type: 'p', text: 'To roll right, your transmitter commands the left aileron to go down (to lift that wing up) and the right aileron to go up (to drop that wing).' },
        { type: 'p', text: 'When an aileron goes down to create extra lift, it also creates extra drag (air resistance).' },
        { type: 'p', text: 'Because the left wing has more drag, it gets pulled backward slightly compared to the right wing. That extra drag on the left side swings your nose to the left, even though you wanted to go right!' },
        { type: 'p', text: 'Motor torque also plays a role. Under high throttle, the torque from the spinning motor and propeller tries to roll the airframe in the opposite direction. This torque effect is strongest during low-speed, high-power situations like takeoff and can exaggerate yaw when you try to correct with ailerons.' },
        { type: 'p', text: 'P-factor adds yet another twist. When your plane is at a high angle of attack (climbing), the descending propeller blade bites into more air than the ascending blade, creating an asymmetric thrust that pulls the nose to one side. Combined with torque and adverse yaw from the ailerons, these three effects stack up and can make the plane feel unpredictable if you don\'t account for them.' },
        { type: 'img', src: 'https://pilotrise.com/wp-content/uploads/2024/06/Adverse-yaw.png' },
      ],
    },
    {
      id: 'solutions',
      level: 2,
      title: 'Solutions for Adverse Yaw',
      content: [
        { type: 'p', text: 'Although adverse yaw is a natural side effect, there are many ways to mitigate it in the world of RC airplanes' },
      ],
    },
    {
      id: 'differential-ailerons',
      level: 3,
      title: 'Differential Ailerons',
      content: [
        { type: 'p', text: 'This is the most popular fix for RC planes. You program your radio so that the aileron going up moves a lot further than the aileron going down. By limiting how far the down-aileron travels, you cut down on that unwanted drag.' },
        { type: 'p', text: 'Think of it like a car\'s differential, when you go around a corner, the outside wheel spins faster than the inside wheel so both can grip the road without fighting each other. Differential ailerons do the same thing for your plane: the up-aileron moves more, the down-aileron moves less, so each wing does its job without working against the other. The result is a cleaner, more coordinated roll.' },
        { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Differential_ailerons.png', size: 'small' },
      ],
    },
    {
      id: 'motor-angling',
      level: 3,
      title: 'Motor Angling (Right Thrust)',
      content: [
        { type: 'p', text: 'On many RC planes, the motor isn\'t pointed straight forward, it is intentionally mounted with 1-2 degrees of down thrust and 2-3 degrees of right thrust. The down thrust counteracts the plane\'s natural tendency to pitch up under power, while the right thrust fights motor torque and mitigates P-factor. Together, they help the plane track straight through the air and reduce undesirable yaw during flight.' },
        { type: 'img', src: 'https://wsrv.nl/?url=https://rckavalaacroteam.com/wp-content/uploads/2017/01/%CE%A7%CF%89%CF%81%CE%AF%CF%82-%CF%84%CE%AF%CF%84%CE%BB%CE%BF-66.png&w=800', size: 'small' },
      ],
    },
    {
      id: 'using-the-rudder',
      level: 3,
      title: 'Using the Rudder',
      content: [
        { type: 'p', text: 'On a 4-channel plane, you can use a little bit of rudder in the direction of the turn to help sweep the tail around. Many modern RC transmitters also let you mix a tiny bit of rudder automatically whenever you move the ailerons.' },
      ],
    },
  ],
}
