#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function colorForCoverage(pct) {
  if (pct >= 95) return '#2ea44f'; // green
  if (pct >= 85) return '#dfb317'; // yellow
  return '#e05d44'; // red
}

function colorForSize(kb) {
  if (kb <= 100) return '#2ea44f';
  if (kb <= 200) return '#dfb317';
  return '#e05d44';
}

function svgBadge(label, value, color) {
  const labelText = label;
  const valueText = value;
  const labelWidth = 6 * labelText.length + 20;
  const valueWidth = 6 * valueText.length + 20;
  const width = labelWidth + valueWidth;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20" role="img" aria-label="${labelText}: ${valueText}">
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r"><rect width="${width}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/>
    <rect width="${width}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11">
    <text x="${Math.round(labelWidth / 2)}" y="15" fill="#010101" fill-opacity=".3">${labelText}</text>
    <text x="${Math.round(labelWidth / 2)}" y="14">${labelText}</text>
    <text x="${labelWidth + Math.round(valueWidth / 2)}" y="15" fill="#010101" fill-opacity=".3">${valueText}</text>
    <text x="${labelWidth + Math.round(valueWidth / 2)}" y="14">${valueText}</text>
  </g>
</svg>`;
}

function readCoverage() {
  const summaryPath = path.join(repoRoot, 'coverage', 'coverage-summary.json');
  if (!fs.existsSync(summaryPath)) return null;
  const data = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
  const pct = data.total?.lines?.pct ?? data.total?.statements?.pct ?? 0;
  return Math.round(pct);
}

function gzipSize(buf) {
  return zlib.gzipSync(buf).length;
}

function computeBundleGzipKb() {
  const assetsDir = path.join(repoRoot, 'dist', 'assets');
  if (!fs.existsSync(assetsDir)) return null;
  const files = fs.readdirSync(assetsDir).filter(f => /\.(js|css)$/.test(f));
  let total = 0;
  for (const f of files) {
    const p = path.join(assetsDir, f);
    const buf = fs.readFileSync(p);
    total += gzipSize(buf);
  }
  return Math.round(total / 1024); // KB
}

function main() {
  const badgesDir = path.join(repoRoot, 'badges');
  ensureDir(badgesDir);

  const cov = readCoverage();
  if (cov !== null) {
    const covSvg = svgBadge('coverage', `${cov}%`, colorForCoverage(cov));
    fs.writeFileSync(path.join(badgesDir, 'coverage.svg'), covSvg);
  }

  const kb = computeBundleGzipKb();
  if (kb !== null) {
    const sizeSvg = svgBadge('bundle', `${kb} kB gzip`, colorForSize(kb));
    fs.writeFileSync(path.join(badgesDir, 'bundle.svg'), sizeSvg);
  }
}

main();

