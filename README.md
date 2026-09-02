# Adrian Bennett — Portfolio

A morning-coffee-flavored portfolio built with [Astro](https://astro.build)
## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Editing content

### Projects & games (showcase sliders)

Everything lives in **`src/data/projects.ts`**. Each entry looks like:

```ts
{
  title: 'My Cool Thing',
  subtitle: 'One-line hook',
  description: 'Brief description shown over the image.',
  tags: ['Astro', 'TypeScript'],
  image: myCoolThing, // imported at the top of the file
  links: [{ label: 'GitHub', url: 'https://github.com/...' }], // optional
}
```

The image does the talking: drop a screenshot into **`src/assets/work/`** (16:9-ish, ~1600px wide looks best), import it at the top of `projects.ts`, and reference it. Add, remove, or reorder entries and the sliders update automatically. The current `.svg` files are labeled placeholders.

### Hero polaroids

The polaroid deck shuffles in sync with the rotating title. Images live in **`src/assets/polaroids/`**, paired to the roles in filename order (`01-…` → first role). Replace the placeholder SVGs with square-ish photos of you doing each thing. The roles themselves are the `roles` array in `src/components/Hero.astro`.

### Photos (contact gallery)

Drop image files (`.jpg`, `.png`, `.webp`, …) into **`src/assets/photos/`** — every file in that folder appears in the marquee automatically, sorted by filename. Delete the placeholder `photo-*.svg` files once you've added real photos.

### Everything else

- Education & roles: `src/components/About.astro`
- Contact links: `src/components/Gallery.astro` (the `contacts` array — replace the `YOUR_GITHUB_USERNAME` / `YOUR_LINKEDIN` placeholders)
- Colors: the `:root` variables in `src/layouts/Layout.astro`

## Deploying to GitHub Pages

1. In `astro.config.mjs`, set `site` to `https://<your-username>.github.io` and make sure `base` matches your repo name (currently `/Portfolio`). If you deploy to a user site repo (`<your-username>.github.io`), remove `base` entirely.
2. Push this project to a GitHub repo.
3. In the repo settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
