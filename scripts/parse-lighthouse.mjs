#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const dir = process.argv[2] || 'lhci';
let perf = null, a11y = null, bp = null, seo = null;

function tryParse(file) {
  try {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (json.categories) {
      perf = json.categories.performance?.score ?? perf;
      a11y = json.categories.accessibility?.score ?? a11y;
      bp = json.categories['best-practices']?.score ?? bp;
      seo = json.categories.seo?.score ?? seo;
    }
  } catch {}
}

if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  for (const f of files) tryParse(path.join(dir, f));
}

const outDir = path.resolve('test-results');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'lighthouse.json');
const data = { performance: perf, accessibility: a11y, bestPractices: bp, seo };
fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
console.log('Wrote Lighthouse parsed metrics →', outFile);

// Optionally export as env for subsequent step
for (const [k, v] of Object.entries({ BD_LH_PERF: perf, BD_LH_A11Y: a11y, BD_LH_BP: bp, BD_LH_SEO: seo })) {
  if (v != null) console.log(`${k}=${v}`);
}

