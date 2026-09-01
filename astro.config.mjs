// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages setup:
  //  - `site` is your Pages URL. Replace YOUR_GITHUB_USERNAME.
  //  - `base` is the repo name. If you deploy to a *user* site repo
  //    (YOUR_GITHUB_USERNAME.github.io), delete the `base` line entirely.
  site: 'https://abennett05.github.io',
  base: '/portfolio',
});
