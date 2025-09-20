// tools/gen-gallery.mjs
// Usage: node tools/gen-gallery.mjs public/shows
import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';

const root = process.argv[2] || 'public/shows';
const absRoot = path.resolve(root);

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function listDirs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter(e => e.isDirectory()).map(e => e.name);
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && exts.has(path.extname(e.name).toLowerCase()))
    .map(e => e.name)
    .sort();
}

const shows = await listDirs(absRoot);
await fs.writeFile(path.join(absRoot, 'index.json'), JSON.stringify(shows, null, 2));

for (const show of shows) {
  const showDir = path.join(absRoot, show);
  const imgs = await listImages(showDir);
  const arr = imgs.map(name => ({
    src: `/shows/${show}/${name}`,
    caption: ''
  }));
  await fs.writeFile(path.join(showDir, 'photos.json'), JSON.stringify(arr, null, 2));
}

console.log(`Wrote index.json and ${shows.length} photos.json files under ${absRoot}`);