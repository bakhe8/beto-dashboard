/* Simple static server for dist with strict CSP headers for E2E prod tests */
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const demoDistPrimary = path.join(root, 'examples', 'betodashboard-demo', 'dist');
const demoDistAlt = path.join(root, 'dist', 'examples', 'betodashboard-demo');
let demoDist = demoDistPrimary;
if (fs.existsSync(path.join(demoDistPrimary, 'src', 'pages', 'app.html'))) demoDist = demoDistPrimary;
else if (fs.existsSync(path.join(demoDistPrimary, 'pages', 'app.html'))) demoDist = demoDistPrimary;
else if (fs.existsSync(path.join(demoDistAlt, 'src', 'pages', 'app.html'))) demoDist = demoDistAlt;
else if (fs.existsSync(path.join(demoDistAlt, 'pages', 'app.html'))) demoDist = demoDistAlt;

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
      "img-src": ["'self'", 'data:'],
      "font-src": ["'self'", 'data:'],
      "connect-src": ["'self'"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "frame-ancestors": ["'none'"],
    },
  })
);

app.use(express.static(demoDist));

// Fallback to index.html for SPA-style routes
app.get('*', (req, res) => {
  const candidates = [
    path.join(demoDist, 'src', 'pages', 'app.html'),
    path.join(demoDist, 'pages', 'app.html'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return res.sendFile(p);
  }
  res.status(404).send('app.html not found in demo dist');
});

const port = process.env.PORT ? Number(process.env.PORT) : 5173;
app.listen(port, () => {
  console.log(`Serving dist on http://localhost:${port}`);
});
