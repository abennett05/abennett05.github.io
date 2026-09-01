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
import jousting_around from '../assets/work/jousting_around.jpg';
import knight_owl from '../assets/work/knight-owl.gif';
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
    title: 'Jousting Around',
    subtitle: 'Silly physics based 1v1 jousting game.',
    description:
      'Face off with a friend to win the oddly-humoured goblin king\'s favor. This was the first project where I handled all visual elements, it proved to be the confidence builder I needed to publish games.',
    tags: ['PvP', 'C#', 'Built with Unity'],
    image: jousting_around,
    links: [
      { label: 'Play on Steam', url: 'https://store.steampowered.com/app/4983950/Jousting_Around/' },
    ],
  },
  {
    title: 'Knight Owl',
    subtitle: '2.5D FPS Experiment',
    description:
      'Developed within a week, I wanted to challenge myself to develop a unique FPS inspired by the likes of Doom & Hotline Miami. Albeit unfinished, this project taught me to prioritize essentials and the benefit of \'newtonian\' design. That is where I find it much easier to get work done when the ball is already moving.',
    tags: ['Level Design', 'Prototyping', 'Built with Godot'],
    image: knight_owl,
  },
  {
    title: 'Scrap Rats',
    subtitle: 'Escape the Rat Race to keep the people entertained.',
    description:
      'Currently in development @ Dead Tag Studios. Team up with 3 other players to escape a hostile procedurally generated maze. With little to fight back with, teamwork and strategy is necessary for survival.',
    tags: ['Co-Op', 'Action', 'Built with Unity'],
    image: scrap_rats,
  },
];
