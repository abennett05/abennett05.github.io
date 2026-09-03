/**
 * GIF or screen-recording -> webm/mp4 + poster frame, for the carousel's `video` field.
 *
 * Reads every clip in src/assets/work/ (.gif, .mov, .mp4, .m4v, .webm) and
 * writes, for each one:
 *   public/work/<name>.webm            the looping background video
 *   public/work/<name>.mp4             fallback for older Safari (--mp4)
 *   src/assets/work/<name>-poster.png  first frame, for the `image` field
 *
 * The poster lands in src/assets/ on purpose: Astro optimizes and hashes
 * anything imported from there, while public/ is copied through untouched,
 * which is what a video wants.
 *
 * Usage:  npm run video            all clips, skipping ones already encoded
 *         npm run video -- --help  print this and exit
 *         npm run video -- --force re-encode even if the output exists
 *         npm run video -- --mp4   also write the mp4 fallback
 *         npm run video -- --crf=32 sharper and bigger (lower = better, 30-40)
 *         npm run video -- modem   only clips whose name contains "modem"
 *
 * Requires ffmpeg on PATH (brew install ffmpeg).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const SRC = 'src/assets/work';
const OUT = 'public/work';
const SOURCE_EXTS = ['.gif', '.mov', '.mp4', '.m4v', '.webm'];

const USAGE = `
Encode clips in ${SRC}/ into looping webm (+ poster) in ${OUT}/.

  npm run video              every clip, skipping ones already encoded
  npm run video -- <name>    only clips whose filename contains <name>

Flags (everything after the -- is passed to the script):
  --help        print this and exit
  --force       re-encode even if the .webm already exists
  --mp4         also write an h264 .mp4 fallback for older Safari
  --crf=<n>     quality, lower is sharper and bigger (default 36, useful 30-40)

Sources: ${SOURCE_EXTS.join(', ')}. GIFs get an extra denoise pass, since GIF
dither is high-frequency noise a video codec would otherwise spend most of its
bitrate preserving; real footage is left alone. Audio is always dropped — these
play muted and autoplaying.

Each clip prints the carousel entry to paste when it finishes.
Requires ffmpeg on PATH (brew install ffmpeg).
`.trim();

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(USAGE);
  process.exit(0);
}

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

const clips = readdirSync(SRC)
  .filter((f) => SOURCE_EXTS.includes(path.extname(f).toLowerCase()))
  .filter((f) => !filters.length || filters.some((needle) => f.includes(needle)));

if (!clips.length) {
  console.log(`No clips to encode in ${SRC}/ (looking for ${SOURCE_EXTS.join(', ')}).`);
  process.exit(0);
}

mkdirSync(OUT, { recursive: true });

let before = 0;
let after = 0;

for (const clip of clips) {
  const ext = path.extname(clip).toLowerCase();
  const name = path.basename(clip, path.extname(clip));
  const input = path.join(SRC, clip);
  const webm = path.join(OUT, `${name}.webm`);
  const mp4 = path.join(OUT, `${name}.mp4`);
  const poster = path.join(SRC, `${name}-poster.png`);

  if (existsSync(webm) && !force) {
    console.log(`- ${name}: skipped (${webm} exists — pass --force to redo)`);
    continue;
  }

  console.log(`- ${name}: ${mb(input)} ${ext.slice(1)} ...`);

  // Even dimensions (some sources are odd-sized, which VP9/H.264 reject), then
  // yuv420p. GIFs get hqdn3d in between: GIF is a 256-colour format, so sources
  // are dithered, and that dither is high-frequency noise a codec spends most of
  // its bitrate faithfully preserving. Real footage has no dither to scrub, and
  // the same denoise would just soften it.
  const even = 'scale=trunc(iw/2)*2:trunc(ih/2)*2';
  const denoise = ext === '.gif' ? ',hqdn3d=2:1.5:6:6' : '';
  const vf = `${even}${denoise},format=yuv420p`;
  // The poster wants the frame as it is, without the denoise.
  const posterVf = even;

  // VP9, CRF-only (bitrate 0) so quality drives the size. -an: these play muted
  // and autoplaying, so an audio track is dead weight even when the source has one.
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
    `\n${(before / 1024 / 1024).toFixed(1)}MB of source -> ` +
      `${(after / 1024 / 1024).toFixed(1)}MB of webm ` +
      `(${(before / after).toFixed(0)}x smaller).`
  );
}
