/**
 * Add / remove / reorder your work here — the showcase sliders render
 * straight from these arrays.
 *
 * Each entry needs an image (the image does the talking): drop a file in
 * src/assets/work/ (screenshots, 16:9-ish, ~1600px wide look best), import
 * it below, and reference it. `links` is optional — omit it for anything
 * that isn't public.
 */
import type { ImageMetadata } from 'astro';

import pipeline from '../assets/work/pipeline.svg';
import tools from '../assets/work/tools.svg';
import website from '../assets/work/website.svg';
import platformer from '../assets/work/platformer.svg';
import jam from '../assets/work/jam.svg';
import boardgame from '../assets/work/boardgame.svg';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: ImageMetadata;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: 'Data Pipeline Playground',
    subtitle: 'Batch + streaming ETL sandbox',
    description:
      'Wrangling messy real-world datasets into tidy, queryable shape. Built to learn fast and break things safely.',
    tags: ['Python', 'Airflow', 'PostgreSQL'],
    image: pipeline,
    links: [
      { label: 'GitHub', url: 'https://github.com/YOUR_GITHUB_USERNAME' },
    ],
  },
  {
    title: 'Quicomm Tools',
    subtitle: 'Internal tooling & automation',
    description:
      'Dashboards, report generators, and the little scripts that quietly save hours every week.',
    tags: ['TypeScript', 'Node', 'Automation'],
    image: tools,
  },
  {
    title: 'This Very Website',
    subtitle: 'The portfolio you are looking at',
    description:
      'Astro, zero frameworks, a lot of coffee, and just enough motion to keep things interesting.',
    tags: ['Astro', 'CSS', 'Vanilla JS'],
    image: website,
    links: [
      { label: 'Source', url: 'https://github.com/YOUR_GITHUB_USERNAME/Portfolio' },
    ],
  },
];

export const games: Project[] = [
  {
    title: 'Untitled Platformer',
    subtitle: 'Precision platforming with a grappling hook',
    description:
      'A tight little game about a bee with a grappling hook. Coyote time, buffered jumps, and all the juice — screen shake included.',
    tags: ['Godot', 'GDScript', 'Pixel Art'],
    image: platformer,
    links: [
      { label: 'Play on itch.io', url: 'https://itch.io' },
    ],
  },
  {
    title: 'Game Jam Grab Bag',
    subtitle: '48-hour experiments, shipped anyway',
    description:
      'A rotating collection of jam entries. Some are gems, some are gloriously broken — every one taught me something new.',
    tags: ['Unity', 'C#', 'Game Jams'],
    image: jam,
    links: [
      { label: 'itch.io', url: 'https://itch.io' },
      { label: 'GitHub', url: 'https://github.com/YOUR_GITHUB_USERNAME' },
    ],
  },
  {
    title: 'Board Game Prototypes',
    subtitle: 'Physical-first design experiments',
    description:
      'Cards, dice, and far too many laminated playtest sheets. Digital versions coming when they earn it.',
    tags: ['Design', 'Prototyping'],
    image: boardgame,
  },
];
