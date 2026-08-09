export default {
  topic: 'electronics',
  slug: 'servo-basics',
  category: 'Electronics',
  tags: ['Servos'],
  title: 'Servo Basics',
  excerpt:
    'What a servo does, the parts inside it, and how size, gears, signaling, and voltage separate one servo from another.',
  author: 'RC Team',
  readingTime: '6 min read',
  difficulty: 'Beginner',
  updated: 'August 2026',
  publishedAt: '2026-08-08',
  heroImage:
    'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80',
  sections: [
    {
      id: 'what-a-servo-does',
      level: 2,
      title: 'What a servo does',
      content: [
        {
          type: 'p',
          text: 'A servo is a small motor in a plastic case, used for controlling precise position or speed. Common applications of servos include moving robotic arms/legs precisely, moving RC model parts exactly (such as ailerons on a plane), and even controlling zoom lenses in digital cameras.',
        },
        {
          type: 'img',
          src: 'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80',
          caption: '[image of a servo connected to a aileron flap]',
        },
        {
          type: 'p',
          text: "What makes a servo different from a regular motor is that servos have potentiometers in them. A potentiometer is a tool that can accurately measure the angle a servo is at. This allows servos to turn a specific number of degrees or turns, even if there is slight resistance to the movement, which ordinary motors (even stepper motors) can't achieve.",
        },
      ],
    },
    {
      id: 'parts-of-a-servo',
      level: 2,
      title: 'Parts of a servo',
      content: [
        {
          type: 'img',
          src: 'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80',
          caption: "[image of a servo's parts]",
        },
        {
          type: 'p',
          text: 'A standard servo is made up of a DC motor, a system of gears, a feedback sensor, and a circuit board. The DC motor spins the gears, which are designed to create high torque. This means the force produced can push through resistance more easily, and also stop precisely. When the feedback sensor’s potentiometer detects that it’s at the right angle, it sends a signal to the motor to stop rotation.',
        },
      ],
    },
    {
      id: 'different-types-of-servos',
      level: 2,
      title: 'Different types of servos',
      content: [
        {
          type: 'p',
          text: 'There are many servo specifications that vary between models.',
        },
      ],
    },
    {
      id: 'size',
      level: 3,
      title: 'Size',
      content: [
        {
          type: 'p',
          text: 'Servos come in three main sizes: Micro, Standard, and Giant. Smaller servos are convenient for saving space and weight in models like RC airplanes, while larger servos generate more torque and are used in mechanical robotics.',
        },
        {
          type: 'img',
          src: 'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80',
          caption: '[image of size comparison]',
        },
      ],
    },
    {
      id: 'gear-material',
      level: 3,
      title: 'Gear Material',
      content: [
        {
          type: 'p',
          text: 'The internal gears of a servo can be made of nylon/plastic or metal. Servos with nylon or plastic gears are cheaper and lightweight, but they are more prone to damage (such as from an airplane crash) compared to a servo with metal gears.',
        },
      ],
    },
    {
      id: 'signaling-method',
      level: 3,
      title: 'Signaling Method',
      content: [
        {
          type: 'p',
          text: 'Servos can be classified as analog or digital based on how the potentiometer signals the circuit board. Essentially, analog servos are cheaper and use less battery power, but they have lower interruption resistance. Digital servos can resist forces like wind better due to receiving and processing much more frequent signals.',
        },
      ],
    },
    {
      id: 'operating-voltage',
      level: 3,
      title: 'Operating Voltage',
      content: [
        {
          type: 'p',
          parts: [
            'Servos can require different voltages to work, which means they should be used with different types of power sources. Standard servos take 4.8-6V, which means they should be powered with sources such as a 5V USB or an ',
            {
              term: 'ESC',
              definition: 'Electronic Speed Controller — a device that a battery and servos (and more) can be plugged into to safely power servos.',
            },
            ' with a built-in ',
            {
              term: 'BEC',
              definition: 'Battery Eliminator Circuit — reduces voltage from a battery to an amount safe for electronic parts like servos.',
            },
            '.',
          ],
        },
        {
          type: 'p',
          text: 'High-voltage servos require 6-8.4V. These can be powered by 2S LiPo (2 celled) batteries, which provide around 7.4V, or ESCs with BEC units that convert to this voltage range.',
        },
        {
          type: 'p',
          parts: [
            'There are also industrial servos, which can be powered from 24V up to even 220V in heavy-duty applications, such as laser cutters or ',
            {
              term: 'CNC routers',
              definition: 'A computer-controlled cutting device that precisely cuts materials like wood, plastic, and even some soft metals.',
            },
            '.',
          ],
        },
        {
          type: 'img',
          src: 'https://images.unsplash.com/photo-1558981806-ec527fa0c8f6?auto=format&fit=crop&w=900&q=80',
          caption: '[image of industrial servo in use]',
        },
      ],
    },
  ],
}
