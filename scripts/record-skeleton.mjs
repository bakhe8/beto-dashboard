#!/usr/bin/env node
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8088;
const URL = `http://localhost:${PORT}/`;
const mediaDir = path.resolve('media');
if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(URL);
      if (res.ok) return;
    } catch {}
    await wait(200);
  }
  throw new Error('Skeleton server did not start');
}

(async () => {
  // Start server
  const server = spawn(process.execPath, ['scripts/serve-skeleton.mjs'], { stdio: 'inherit' });
  try {
    await waitForServer();
  } catch (e) {
    server.kill('SIGTERM');
    throw e;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: mediaDir, size: { width: 800, height: 600 } } });
  const page = await context.newPage();
  await page.goto(URL);
  // Interact with the demo
  await page.click('#inc');
  await page.click('#inc');
  await page.click('#reset');
  await page.click('#toggle-btn');
  await page.click('#toggle-btn');
  await wait(500);
  await context.close();
  const video = await page.video().path();
  console.log('Recorded demo video →', video);
  server.kill('SIGTERM');
})();

