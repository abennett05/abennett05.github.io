/**
 * Add / remove / reorder your work here — the carousels on the page
 * render straight from these arrays. That's it, no other file to touch.
 *
 * `links` is optional (omit it for anything that isn't public), and each
 * link gets its own button on the card. `emoji` is the card's big sticker.
 */

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: 'Data Pipeline Playground',
    description:
      'A batch + streaming ETL sandbox for wrangling messy real-world datasets into tidy, queryable shape. Built to learn fast and break things safely.',
    tags: ['Python', 'Airflow', 'PostgreSQL'],
    emoji: '🛠️',
    links: [
      { label: 'GitHub', url: 'https://github.com/YOUR_GITHUB_USERNAME' },
    ],
  },
  {
    title: 'Quicomm Tools',
    description:
      'Internal tooling and automation built for the day job — dashboards, report generators, and the little scripts that quietly save hours every week.',
    tags: ['TypeScript', 'Node', 'Automation'],
    emoji: '⚡',
  },
  {
    title: 'This Very Website',
    description:
      'The portfolio you are looking at right now. Astro, zero frameworks, a lot of yellow, and just enough motion to keep things interesting.',
    tags: ['Astro', 'CSS', 'Vanilla JS'],
    emoji: '🌻',
    links: [
      { label: 'Source', url: 'https://github.com/YOUR_GITHUB_USERNAME/Portfolio' },
    ],
  },
];

export const games: Project[] = [
  {
    title: 'Untitled Platformer',
    description:
      'A tight little precision platformer about a bee with a grappling hook. Coyote time, buffered jumps, and all the juice — screen shake included.',
    tags: ['Godot', 'GDScript', 'Pixel Art'],
    emoji: '🐝',
    links: [
      { label: 'Play on itch.io', url: 'https://itch.io' },
    ],
  },
  {
    title: 'Game Jam Grab Bag',
    description:
      'A rotating collection of 48-hour jam entries. Some are gems, some are gloriously broken — every one of them taught me something new.',
    tags: ['Unity', 'C#', 'Game Jams'],
    emoji: '🎲',
    links: [
      { label: 'itch.io', url: 'https://itch.io' },
      { label: 'GitHub', url: 'https://github.com/YOUR_GITHUB_USERNAME' },
    ],
  },
  {
    title: 'Board Game Prototypes',
    description:
      'Physical-first design experiments: cards, dice, and far too many laminated playtest sheets. Digital versions coming when they earn it.',
    tags: ['Design', 'Prototyping'],
    emoji: '🃏',
  },
];
