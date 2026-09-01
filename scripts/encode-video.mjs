/**
 * GIF -> webm/mp4 + poster frame, for the carousel's `video` field.
 *
 * Reads every GIF in src/assets/work/ and writes, for each one:
 *   public/work/<name>.webm            the looping background video
 *   public/work/<name>.mp4             fallback for older Safari (--mp4)
 *   src/assets/work/<name>-poster.png  first frame, for the `image` field
 *
 * The poster lands in src/assets/ on purpose: Astro optimizes and hashes
 * anything imported from there, while public/ is copied through untouched,
 * which is what a video wants.
 *
 * Usage:  npm run video            all GIFs, skipping ones already encoded
 *         npm run video -- --force re-encode even if the output exists
 *         npm run video -- --mp4   also write the mp4 fallback
 *         npm run video -- --crf=32 sharper and bigger (lower = better, 30-40)
 *         npm run video -- modem   only GIFs whose name contains "modem"
 *
 * Requires ffmpeg on PATH (brew install ffmpeg).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const SRC = 'src/assets/work';
const OUT = 'public/work';

const args = process.argv.slice(2);
const force = args.includes('--force');
const alsoMp4 = args.includes('--mp4');
const crf = Number(args.find((a) => a.startsWith('--crf='))?.slice(6) ?? 36);
const filters = args.filter((a) => !a.startsWith('--'));

const mb = (file) => (statSync(file).size / 1024 / 1024).toFixed(1) + 'MB';
const run = (a) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', ...a]);

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('ffmpeg not found on PATH. Install it with: brew install ffmpeg');
  process.exit(1);
}

const gifs = readdirSync(SRC)
  .filter((f) => f.toLowerCase().endsWith('.gif'))
  .filter((f) => !filters.length || filters.some((needle) => f.includes(needle)));

if (!gifs.length) {
  console.log(`No GIFs to encode in ${SRC}/.`);
  process.exit(0);
}

mkdirSync(OUT, { recursive: true });

let before = 0;
let after = 0;

for (const gif of gifs) {
  const name = path.basename(gif, path.extname(gif));
  const input = path.join(SRC, gif);
  const webm = path.join(OUT, `${name}.webm`);
  const mp4 = path.join(OUT, `${name}.mp4`);
  const poster = path.join(SRC, `${name}-poster.png`);

  if (existsSync(webm) && !force) {
    console.log(`- ${name}: skipped (${webm} exists — pass --force to redo)`);
    continue;
  }

  console.log(`- ${name}: ${mb(input)} gif ...`);

  // Even dimensions (some GIFs are odd-sized, which VP9/H.264 reject), a light
  // denoise, then yuv420p. The denoise matters more than it looks: GIF is a
  // 256-colour format, so sources are dithered, and that dither is high-frequency
  // noise that a video codec spends most of its bitrate faithfully preserving.
  const vf =
    'scale=trunc(iw/2)*2:trunc(ih/2)*2,hqdn3d=2:1.5:6:6,format=yuv420p';
  // The poster wants the frame as it is, without the denoise.
  const posterVf = 'scale=trunc(iw/2)*2:trunc(ih/2)*2';

  // VP9, CRF-only (bitrate 0) so quality drives the size. -an: these are
  // silent GIFs, and a muted autoplay video has no use for an audio track.
  run(['-y', '-i', input, '-c:v', 'libvpx-vp9', '-crf', String(crf), '-b:v', '0',
       '-row-mt', '1', '-vf', vf, '-an', webm]);

  if (alsoMp4) {
    run(['-y', '-i', input, '-c:v', 'libx264', '-crf', String(crf - 10),
         '-preset', 'slow', '-profile:v', 'main', '-movflags', '+faststart',
         '-vf', vf, '-an', mp4]);
  }

  run(['-y', '-i', input, '-frames:v', '1', '-vf', posterVf, poster]);

  before += statSync(input).size;
  after += statSync(webm).size;

  console.log(
    `  ${webm} ${mb(webm)}${alsoMp4 ? `, ${mp4} ${mb(mp4)}` : ''}, poster ${poster}`
  );
  console.log(`  point the entry at:  image: <import ${name}-poster.png>, video: 'work/${name}.webm'`);
}

if (before) {
  console.log(
    `\n${(before / 1024 / 1024).toFixed(1)}MB of GIF -> ` +
      `${(after / 1024 / 1024).toFixed(1)}MB of webm ` +
      `(${(before / after).toFixed(0)}x smaller).`
  );
}
