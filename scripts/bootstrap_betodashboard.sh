#!/usr/bin/env bash
set -e

echo "🚀 Bootstrapping BetoDashboard Monorepo Structure..."

# --- root setup ---
mkdir -p betodashboard && cd betodashboard
npm init -y

# workspace manifest
cat <<'JSON' > package.json
{
  "private": true,
  "name": "betodashboard",
  "version": "0.0.0-alpha",
  "workspaces": [
    "packages/*",
    "examples/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "ci": "npm run lint && npm run test && npm run build"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.5.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.50.0",
    "prettier": "^3.0.0",
    "vitest": "^1.2.0"
  }
}
JSON

# turbo configuration
cat <<'JSON' > turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {},
    "test": {
      "outputs": []
    }
  }
}
JSON

# --- packages/core ---
mkdir -p packages/core/src/{components,utils,styles,js}
cat <<'JSON' > packages/core/package.json
{
  "name": "@betodashboard/core",
  "version": "0.0.0-alpha",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc --project tsconfig.json",
    "dev": "vite",
    "lint": "eslint . --ext .ts",
    "test": "vitest"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.5.0",
    "vite": "^5.0.0"
  }
}
JSON

cat <<'TS' > packages/core/src/index.ts
export * from "./components";
export * from "./utils";
TS

# sample component
cat <<'TS' > packages/core/src/components/Modal.ts
export function Modal(root: HTMLElement, props: { open: boolean; onClose: () => void }) {
  if (!root) return;
  const dialog = document.createElement('div');
  dialog.setAttribute('role', 'dialog');
  dialog.className = 'fixed inset-0 bg-black/50 flex items-center justify-center';
  dialog.innerHTML = `
    <div class="bg-white rounded-lg p-6 shadow-xl w-96 relative">
      <button class="absolute top-2 right-3 text-gray-500 hover:text-gray-900" aria-label="Close">&times;</button>
      <slot></slot>
    </div>`;
  const closeBtn = dialog.querySelector('button');
  closeBtn?.addEventListener('click', props.onClose);
  if (props.open) root.appendChild(dialog);
  return { close: () => dialog.remove() };
}
TS

cat <<'TS' > packages/core/tsconfig.json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "target": "ESNext",
    "module": "ESNext",
    "declaration": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
TS

# --- packages/tokens ---
mkdir -p packages/tokens
cat <<'JSON' > packages/tokens/package.json
{
  "name": "@betodashboard/tokens",
  "version": "0.0.0-alpha",
  "main": "colors.json"
}
JSON

cat <<'JSON' > packages/tokens/colors.json
{
  "primary": {
    "50": "#f0f5ff",
    "500": "#0046FF",
    "900": "#11224E"
  },
  "mode": {
    "light": {
      "background": "#FFFFFF",
      "text": "#0D1117"
    },
    "dark": {
      "background": "#0D1117",
      "text": "#FFFFFF"
    }
  }
}
JSON

# --- examples/betodashboard-demo ---
mkdir -p examples/betodashboard-demo/src/{components,pages,js,css}
cat <<'JSON' > examples/betodashboard-demo/package.json
{
  "name": "betodashboard-demo",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@betodashboard/core": "workspace:*",
    "@betodashboard/tokens": "workspace:*"
  }
}
JSON

cat <<'JS' > examples/betodashboard-demo/vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../packages/core/src')
    }
  }
});
JS

cat <<'HTML' > examples/betodashboard-demo/src/pages/dashboard.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BetoDashboard Demo</title>
  <link rel="stylesheet" href="../css/demo.css">
  </head>
<body class="bg-white text-[#11224E] font-sans">
  <header class="p-4 bg-[#0046FF] text-white font-bold text-lg">BetoDashboard Demo</header>
  <main class="p-6">
    <h1 class="text-2xl mb-4">Dashboard Overview</h1>
    <div id="modal-root"></div>
    <button id="openModal" class="px-4 py-2 bg-[#0046FF] text-white rounded">Open Modal</button>
  </main>
  <script type="module" src="../js/main.ts"></script>
</body>
</html>
HTML

cat <<'CSS' > examples/betodashboard-demo/src/css/demo.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #0046FF;
  --color-text: #11224E;
}
CSS

cat <<'TS' > examples/betodashboard-demo/src/js/main.ts
import { Modal } from "@core/components/Modal";

const root = document.getElementById("modal-root")!;
document.getElementById("openModal")?.addEventListener("click", () => {
  const modal = Modal(root, { open: true, onClose: () => modal.close() });
});
TS

# tailwind config for demo
cat <<'JS' > examples/betodashboard-demo/tailwind.config.js
const colors = require('@betodashboard/tokens/colors.json');
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: colors.primary,
      backgroundColor: colors.mode.light,
      textColor: colors.mode.light
    }
  },
  plugins: []
}
JS

# --- docs/vitepress stub ---
mkdir -p docs
cat <<'MD' > docs/index.md
# BetoDashboard Documentation

Welcome to the BetoDashboard developer documentation.

- **Core Package:** `@betodashboard/core`
- **Tokens:** `@betodashboard/tokens`
- **Demo App:** /examples/betodashboard-demo
MD

# --- scripts ---
mkdir -p scripts
cat <<'JS' > scripts/demo-capture.js
import puppeteer from "puppeteer";
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/pages/dashboard.html");
  await page.screenshot({ path: "docs/media/dashboard.png", fullPage: true });
  await browser.close();
})();
JS

# --- GitHub workflow ---
mkdir -p .github/workflows
cat <<'YAML' > .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
YAML

# --- finalize ---
git init
git add .
git commit -m "Initial BetoDashboard Monorepo Bootstrap"
echo "✅ BetoDashboard monorepo initialized successfully!"

# 🧩 Resulting Structure (informational)
# betodashboard/
# ├── packages/
# │   ├── core/
# │   └── tokens/
# ├── examples/
# │   └── betodashboard-demo/
# ├── docs/
# ├── scripts/
# ├── .github/workflows/ci.yml
# ├── turbo.json
# └── package.json

# 🧠 Next Commands
# npm install
# npm run build
# npm run dev -w examples/betodashboard-demo

