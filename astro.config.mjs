// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages setup:
  //  - `site` is your Pages URL. Replace YOUR_GITHUB_USERNAME.
  //  - `base` is the repo name. If you deploy to a *user* site repo
  //    (YOUR_GITHUB_USERNAME.github.io), delete the `base` line entirely.
  site: 'https://abennett05.github.io',
  base: '/portfolio',

  // Phosphor icons. `<Icon name="ph:github-logo" />` inlines the SVG at build
  // time — no icon font and no extra request.
  // Browse the set at https://phosphoricons.com
  // Only the icons actually referenced get bundled — no `include` list needed.
  integrations: [icon()],
});
