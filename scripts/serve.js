/* Simple static server for dist with strict CSP headers for E2E prod tests */
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

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

app.use(express.static(path.join(root, 'dist')));

// Fallback to index.html for SPA-style routes
app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'dist', 'index.html'));
});

const port = process.env.PORT ? Number(process.env.PORT) : 5173;
app.listen(port, () => {
  console.log(`Serving dist on http://localhost:${port}`);
});

