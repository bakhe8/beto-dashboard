#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const outDir = path.resolve('test-results');
const outFile = path.join(outDir, 'metrics.json');

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function readNumberEnv(name) {
  const v = process.env[name];
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// Aggregation — populate from env or compute below
const metrics = {
  timestamp: new Date().toISOString(),
  env: process.env.CI ? 'ci' : 'dev',
  bundle: {
    totalGzipKb: readNumberEnv('BD_BUNDLE_TOTAL_KB') ?? null,
    vendorGzipKb: readNumberEnv('BD_BUNDLE_VENDOR_KB') ?? null,
  },
  lighthouse: {
    performance: readNumberEnv('BD_LH_PERF') ?? null,
    accessibility: readNumberEnv('BD_LH_A11Y') ?? null,
    bestPractices: readNumberEnv('BD_LH_BP') ?? null,
    seo: readNumberEnv('BD_LH_SEO') ?? null,
  },
  dom: {
    renderCycles: readNumberEnv('BD_DOM_CYCLES') ?? null,
    fragmentDiffMs: readNumberEnv('BD_DOM_DIFF_MS') ?? null,
    reflows: readNumberEnv('BD_DOM_REFLOWS') ?? null,
  },
  state: {
    updateLatencyMs: readNumberEnv('BD_STATE_LAT_MS') ?? null,
    transactions: readNumberEnv('BD_STATE_TX') ?? null,
  },
  dx: {
    avgOnboardingMins: readNumberEnv('BD_DX_ONBOARD_M') ?? null,
    avgLocPerComponent: readNumberEnv('BD_DX_LOC') ?? null,
    eventBindingsPerComponent: readNumberEnv('BD_DX_EVT') ?? null,
  }
};

// Fill bundle metrics from dist if available and not provided
try {
  const dist = path.resolve('dist');
  const assets = path.join(dist, 'assets');
  if (fs.existsSync(assets)) {
    const files = fs.readdirSync(assets).filter(f => /\.(js|css)$/.test(f));
    const gzip = (buf) => zlib.gzipSync(buf).length;
    let total = 0;
    let vendor = 0;
    for (const f of files) {
      const p = path.join(assets, f);
      const size = gzip(fs.readFileSync(p));
      total += size;
      if (/(vendor|vendors|chunk-vendor)/i.test(f)) vendor += size;
    }
    if (metrics.bundle.totalGzipKb == null) metrics.bundle.totalGzipKb = Math.round(total / 1024);
    if (metrics.bundle.vendorGzipKb == null && vendor) metrics.bundle.vendorGzipKb = Math.round(vendor / 1024);
  }
} catch {}

// Merge DOM metrics if produced by E2E
const domMetricsPath = path.resolve('test-results', 'dom-metrics.json');
if (fs.existsSync(domMetricsPath)) {
  try {
    const dm = JSON.parse(fs.readFileSync(domMetricsPath, 'utf-8'));
    if (typeof dm.fragmentDiffMs === 'number') metrics.dom.fragmentDiffMs = dm.fragmentDiffMs;
    if (typeof dm.renderCycles === 'number') metrics.dom.renderCycles = dm.renderCycles;
    if (typeof dm.reflows === 'number') metrics.dom.reflows = dm.reflows;
  } catch {}
}

ensureDir(outDir);
fs.writeFileSync(outFile, JSON.stringify(metrics, null, 2));
console.log(`Wrote metrics → ${outFile}`);
