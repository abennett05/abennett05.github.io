/**
 * Add / remove / reorder your work here — the showcase sliders render
 * straight from these arrays.
 *
 * Each entry needs an `image` (the image does the talking): drop a file in
 * src/assets/work/ (screenshots, 16:9-ish, ~1600px wide look best), import
 * it below, and reference it. `links` is optional — omit it for anything
 * that isn't public.
 *
 * MOTION: prefer video over GIF — a webm is typically 20-50x smaller.
 * Put the encoded files in public/work/ and point `video` at them; the path
 * is relative to public/, so 'work/modem.webm' resolves to /work/modem.webm
 * (the site `base` is prepended for you).
 *
 *   video: 'work/modem.webm'                          // single source
 *   video: ['work/modem.webm', 'work/modem.mp4']      // + fallback for older Safari
 *
 * `image` stays required when you add a video: it is the poster frame, so it
 * is what loads first, what shows while the video buffers, and what visitors
 * with "reduce motion" turned on see instead. `npm run video` encodes every
 * GIF in src/assets/work/ and writes both the webm and its poster for you.
 */
import type { ImageMetadata } from 'astro';

import invoice_pay from '../assets/work/invoice_pay.png';
import modem from '../assets/work/modem-poster.png';
import ISObe from '../assets/work/isobe.jpg';
import tags_near_you from '../assets/work/pipeline.svg';
import birdhaus from '../assets/work/birdhaus-poster.png';
import jousting_around from '../assets/work/jousting_around-poster.png';
import knight_owl from '../assets/work/knight-owl-poster.png';
import double_exposure from '../assets/work/double-exposure-poster.png';
import scrap_rats from '../assets/work/scrap_rats_concept.png';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  /** Poster frame — also the still shown when motion is reduced. */
  image: ImageMetadata;
  /**
   * Optional looping background video, as a path (or list of paths, best
   * format first) inside public/. Plays muted only while the slide is on
   * screen; nothing is downloaded until then.
   */
  video?: string | string[];
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: 'MODEM',
    subtitle: 'Physical device built to reconnect people',
    description:
      'Today, it is easier than ever to feel alone in a room full of people. Phones are a constant attention grab that pull people away from one another. MODEM seeks to fix this by not only disabling phones but making it social. Up to 6 people simply tap their phone to the device, enrolling them in a session. Once in a session, phones are locked & users compete for the least pick ups. In case of an emergency, the device individually notifies a user.',
    tags: ['C++', 'Flutter', 'Mobile', 'Embedded'],
    image: modem,
    video: ['work/modem.webm', 'work/modem.mp4'],
    links: [
      { label: 'Website', url: 'https://abennett05.github.io/modem_web/'}
    ]
  },
  {
    title: 'Tags Near You',
    subtitle: 'Accurate RFID tag localization',
    description:
      'Developed at Auburn University\'s RFID Lab alongside <a target="_blank" rel="noopener noreferrer" href="https://harper-rhett.github.io/">Harper Rhett</a>. By training a machine learning model based on positional and temporal data paired with RSSI values, we were able to accurately predict the location of RFID tags.',
    tags: ['XR', 'Machine Learning', 'RFID'],
    image: tags_near_you,
  },
  {
    title: 'InvoicePay',
    subtitle: 'All-in-one invoice management solution',
    description:
      'Crafted for businesses who wish to modernize their invoice payment process. Send, manage, and close out invoices in your ERP all from one web dashboard. Built to be scalable and fit the needs of any business',
    tags: ['React', 'TS', 'SQLite', 'Docker'],
    image: invoice_pay,
  },
  {
    title: 'BirdHaus',
    subtitle: 'AI-powered smart birdhouse',
    description:
      'Developed in 36 hours at the Purdue Humanoid Robotic Club\'s Hackathon, BirdHaus was designed to stop squirrels from stealing birdfeed. It accomplished this with a computer vision model trained on squirrels, when a squirrel was detected the feeder closed. Future plans saw a mobile companion app that could log bird species that visited your feeder.',
    tags: ['C++', 'Machine Learning', 'Edge Computing', 'Hackathon'],
    image: birdhaus,
    video: ['work/birdhaus.webm', 'work/birdhaus.mp4'],
    links: [
      { label: 'Demo', url: 'https://youtu.be/bLPc5ft7LDM'},
    ],
  },
  {
    title: 'ISObe',
    subtitle: 'Organize your retro console library from any device in your home',
    description:
      'Playing games on retro consoles is great, apart from the storage aspect. ISObe solves this by providing a digital library that gamers expect from modern systems. Additionally, ISObe enables management of your entire retro library from any device in your home. Next time you boot up your console, your games are ready to go!',
    tags: ['React', 'TS', 'Python', 'SQLite'],
    image: ISObe,
    links: [
      { label: 'Github', url: 'https://github.com/abennett05/isobe' },
    ],
  },
];

export const games: Project[] = [
  {
    title: 'Jousting Around',
    subtitle: 'Whimsy physics based 1v1 jousting game',
    description:
      'Face off with a friend to win the oddly-humoured goblin king\'s favor. This was the first project where I handled all visual elements, it proved to be the confidence builder I needed to publish games.',
    tags: ['PvP', 'C#', 'Built with Unity'],
    image: jousting_around,
    video: ['jousting_around.webm'],
    links: [
      { label: 'Play on Steam', url: 'https://store.steampowered.com/app/4983950/Jousting_Around/' },
    ],
  },
  {
    title: 'Knight Owl',
    subtitle: '2.5D FPS experiment',
    description:
      'Developed within a week, I wanted to challenge myself to develop a unique FPS inspired by the likes of Doom & Hotline Miami. Albeit unfinished, this project taught me to prioritize essentials and the benefit of \'newtonian\' design. That is where I find it far easier to iterate once things are already in motion.',
    tags: ['Level Design', 'Prototyping', 'Built with Godot'],
    image: knight_owl,
    video: ['work/knight-owl.webm', 'work/knight-owl.mp4'],
  },
  {
    title: 'Double Exposure',
    subtitle: 'Intriguing mystery puzzler',
    description:
      'Inspired by Valve\'s Portal franchise, you find yourself wielding an unworldly camera capable of physically capturing objects in its view. Unravel the mystery that awaits, one photo at a time.',
    tags: ['Puzzle', 'Narrative','Built with Godot'],
    image: double_exposure,
    video: ['work/double-exposure.webm', 'work/double-exposure.mp4'],
    links: [
      {label: 'Watch Dev Blog', url: 'https://youtu.be/w0hCYkbVqBU'}
    ]
  },
  {
    title: 'Scrap Rats',
    subtitle: 'Escape the Rat Race to keep the people entertained',
    description:
      'Currently in development at <a target="_blank" rel="noopener noreferrer" href="https://deadtag.studio/games">Dead Tag Studios</a>. Team up with 3 other players to escape a hostile procedurally generated maze. With little to fight back with, teamwork and strategy is necessary for survival.',
    tags: ['Co-Op', 'Action', 'Built with Unity'],
    image: scrap_rats,
  },
];
