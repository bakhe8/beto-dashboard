#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('test-results');
const outFile = path.join(outDir, 'metrics.json');

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function readNumberEnv(name) {
  const v = process.env[name];
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// Placeholder aggregation — populate from env or leave null.
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

ensureDir(outDir);
fs.writeFileSync(outFile, JSON.stringify(metrics, null, 2));
console.log(`Wrote metrics → ${outFile}`);
// Try to merge DOM metrics if produced by E2E
const domMetricsPath = path.resolve('test-results', 'dom-metrics.json');
if (fs.existsSync(domMetricsPath)) {
  try {
    const dm = JSON.parse(fs.readFileSync(domMetricsPath, 'utf-8'));
    if (typeof dm.fragmentDiffMs === 'number') metrics.dom.fragmentDiffMs = dm.fragmentDiffMs;
    if (typeof dm.renderCycles === 'number') metrics.dom.renderCycles = dm.renderCycles;
    if (typeof dm.reflows === 'number') metrics.dom.reflows = dm.reflows;
  } catch {}
}
