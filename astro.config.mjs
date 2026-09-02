// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: this deploys to the *user site* repo (abennett05.github.io),
  // which is served from the domain root — so there is no `base` to set.
  // A project-site repo (e.g. abennett05/portfolio) would need base: '/portfolio'.
  site: 'https://abennett05.github.io',

  // Phosphor icons. `<Icon name="ph:github-logo" />` inlines the SVG at build
  // time — no icon font and no extra request.
  // Browse the set at https://phosphoricons.com
  // Only the icons actually referenced get bundled — no `include` list needed.
  integrations: [icon()],
});
