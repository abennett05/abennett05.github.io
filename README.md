# Adrian Bennett — Portfolio

A playful, dark-with-yellow portfolio built with [Astro](https://astro.build). No frameworks, just components, CSS, and a little vanilla JS.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Editing content

### Projects & games

Everything lives in **`src/data/projects.ts`**. Each entry looks like:

```ts
{
  title: 'My Cool Thing',
  description: 'What it is and why it matters.',
  tags: ['Astro', 'TypeScript'],
  emoji: '🚀',
  links: [{ label: 'GitHub', url: 'https://github.com/...' }], // optional
}
```

Add, remove, or reorder entries in the `projects` or `games` arrays and the carousels update automatically.

### Photos

Drop image files (`.jpg`, `.png`, `.webp`, …) into **`src/assets/photos/`** — every file in that folder appears in the gallery automatically, sorted by filename. Delete the placeholder `photo-*.svg` files once you've added real photos.

### Everything else

- Rotating hero titles: `src/components/Hero.astro` (the `roles` array)
- About blurb & "hats": `src/components/About.astro`
- Contact links: `src/components/Gallery.astro` (the `contacts` array — replace the `YOUR_GITHUB_USERNAME` / `YOUR_LINKEDIN` placeholders)

## Deploying to GitHub Pages

1. In `astro.config.mjs`, set `site` to `https://<your-username>.github.io` and make sure `base` matches your repo name (currently `/Portfolio`). If you deploy to a user site repo (`<your-username>.github.io`), remove `base` entirely.
2. Push this project to a GitHub repo.
3. In the repo settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
