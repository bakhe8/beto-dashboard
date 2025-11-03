#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const expectLh = process.argv.includes('--expect-lh');
const p = path.resolve('test-results', 'metrics.json');
if (!fs.existsSync(p)) {
  console.error('metrics.json not found');
  process.exit(2);
}
const m = JSON.parse(fs.readFileSync(p, 'utf-8'));
function assert(cond, msg) { if (!cond) { console.error(msg); process.exit(1); } }

assert(typeof m.timestamp === 'string', 'timestamp missing');
assert(typeof m.env === 'string', 'env missing');

// If dist exists, we expect bundle.totalGzipKb to be a number
if (fs.existsSync(path.resolve('dist'))) {
  assert(typeof m.bundle?.totalGzipKb === 'number', 'bundle.totalGzipKb should be a number when dist exists');
}

if (expectLh) {
  assert(typeof m.lighthouse?.performance === 'number', 'lighthouse.performance missing');
  assert(typeof m.lighthouse?.accessibility === 'number', 'lighthouse.accessibility missing');
  assert(typeof m.lighthouse?.bestPractices === 'number', 'lighthouse.bestPractices missing');
  assert(typeof m.lighthouse?.seo === 'number', 'lighthouse.seo missing');
}

console.log('metrics.json validated');
