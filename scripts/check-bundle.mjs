#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function gzipSize(buf) { return zlib.gzipSync(buf).length; }

function sumGzipKb(dir) {
  const assetsDir = path.join(dir, 'assets');
  if (!fs.existsSync(assetsDir)) return 0;
  const files = fs.readdirSync(assetsDir).filter(f => /\.(js|css)$/.test(f));
  let total = 0;
  for (const f of files) total += gzipSize(fs.readFileSync(path.join(assetsDir, f)));
  return Math.round(total / 1024);
}

const args = process.argv.slice(2);
const maxIdx = args.indexOf('--max-kb');
const maxKb = maxIdx !== -1 ? Number(args[maxIdx + 1]) : 60;

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.error('dist not found. Run build first.');
  process.exit(2);
}

const kb = sumGzipKb(distDir);
console.log(`Total gzipped JS+CSS: ${kb} kB (limit ${maxKb} kB)`);
if (kb > maxKb) {
  console.error(`Bundle size gate failed: ${kb} kB > ${maxKb} kB`);
  process.exit(1);
}
process.exit(0);

