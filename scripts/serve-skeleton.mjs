#!/usr/bin/env node
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8088;
const root = process.cwd();

const mime = (p) => {
  if (p.endsWith('.html')) return 'text/html; charset=utf-8';
  if (p.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (p.endsWith('.ts')) return 'application/typescript; charset=utf-8';
  if (p.endsWith('.css')) return 'text/css; charset=utf-8';
  if (p.endsWith('.json')) return 'application/json; charset=utf-8';
  return 'text/plain; charset=utf-8';
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  let pathname = parsed.pathname || '/';
  if (pathname === '/') pathname = '/examples/demo.html';
  const filePath = path.join(root, pathname);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.statusCode = 404; res.end('Not found'); return;
  }
  res.setHeader('Content-Type', mime(filePath));
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Skeleton server running: http://localhost:${PORT}/`);
  console.log(`Opening examples/demo.html…`);
});

