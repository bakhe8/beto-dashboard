Param(
  [switch]$InPlace,
  [string]$DirName = "betodashboard"
)

$ErrorActionPreference = 'Stop'

Write-Host "🚀 Bootstrapping BetoDashboard Monorepo Structure..."

# Determine target root
if ($InPlace) {
  $root = (Get-Location).Path
} else {
  $root = Join-Path (Get-Location) $DirName
  New-Item -ItemType Directory -Path $root -Force | Out-Null
}

function Write-Text($path, $content) {
  $dir = Split-Path -Parent $path
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Set-Content -Path $path -Value $content -NoNewline
}

# package.json (workspace manifest)
$pkg = @'{
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
'@
Write-Text (Join-Path $root 'package.json') $pkg

# turbo.json
$turbo = @'{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false },
    "lint": {},
    "test": { "outputs": [] }
  }
}
'@
Write-Text (Join-Path $root 'turbo.json') $turbo

# .gitignore
$gitignore = @'
node_modules/
dist/
.turbo/
.DS_Store
**/.vite/
**/.cache/
'@
Write-Text (Join-Path $root '.gitignore') $gitignore

# packages/core
Write-Text (Join-Path $root 'packages/core/package.json') @'{
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
  "devDependencies": { "typescript": "^5.5.0", "vite": "^5.0.0" }
}
'
Write-Text (Join-Path $root 'packages/core/src/index.ts') "export * from './components';`nexport * from './utils';"
Write-Text (Join-Path $root 'packages/core/src/components/Modal.ts') @'export function Modal(root: HTMLElement, props: { open: boolean; onClose: () => void }) {
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
'@
Write-Text (Join-Path $root 'packages/core/tsconfig.json') @'{
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
'@

# packages/tokens
Write-Text (Join-Path $root 'packages/tokens/package.json') @'{
  "name": "@betodashboard/tokens",
  "version": "0.0.0-alpha",
  "main": "colors.json"
}
'
Write-Text (Join-Path $root 'packages/tokens/colors.json') @'{
  "primary": { "50": "#f0f5ff", "500": "#0046FF", "900": "#11224E" },
  "mode": {
    "light": { "background": "#FFFFFF", "text": "#0D1117" },
    "dark": { "background": "#0D1117", "text": "#FFFFFF" }
  }
}
'

# demo app
Write-Text (Join-Path $root 'examples/betodashboard-demo/package.json') @'{
  "name": "betodashboard-demo",
  "private": true,
  "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" },
  "dependencies": { "@betodashboard/core": "workspace:*", "@betodashboard/tokens": "workspace:*" }
}
'
Write-Text (Join-Path $root 'examples/betodashboard-demo/vite.config.ts') @'import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  root: "src",
  build: { outDir: "../dist", emptyOutDir: true },
  resolve: { alias: { "@core": path.resolve(__dirname, "../../packages/core/src") } }
});
'
Write-Text (Join-Path $root 'examples/betodashboard-demo/src/pages/dashboard.html') @'<!DOCTYPE html>
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
'
Write-Text (Join-Path $root 'examples/betodashboard-demo/src/css/demo.css') @'@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --color-primary: #0046FF; --color-text: #11224E; }
'
Write-Text (Join-Path $root 'examples/betodashboard-demo/src/js/main.ts') @'import { Modal } from "@core/components/Modal";
const root = document.getElementById("modal-root")!;
document.getElementById("openModal")?.addEventListener("click", () => {
  const modal = Modal(root, { open: true, onClose: () => modal.close() });
});
'
Write-Text (Join-Path $root 'examples/betodashboard-demo/tailwind.config.js') @'const colors = require("@betodashboard/tokens/colors.json");
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: { extend: { colors: colors.primary, backgroundColor: colors.mode.light, textColor: colors.mode.light } },
  plugins: []
}
'
Write-Text (Join-Path $root 'examples/betodashboard-demo/postcss.config.js') @'module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }'

# docs stub
Write-Text (Join-Path $root 'docs/index.md') @'# BetoDashboard Documentation

Welcome to the BetoDashboard developer documentation.

- **Core Package:** `@betodashboard/core`
- **Tokens:** `@betodashboard/tokens`
- **Demo App:** /examples/betodashboard-demo
'

# scripts
Write-Text (Join-Path $root 'scripts/demo-capture.js') @'import puppeteer from "puppeteer";
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/pages/dashboard.html");
  await page.screenshot({ path: "docs/media/dashboard.png", fullPage: true });
  await browser.close();
})();
'

# CI workflow
Write-Text (Join-Path $root '.github/workflows/ci.yml') @'name: CI
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
'

# npm init at root if not present
if (-not (Test-Path (Join-Path $root 'package-lock.json'))) {
  Push-Location $root
  if (-not (Test-Path (Join-Path $root 'package.json'))) { npm init -y | Out-Null }
  Pop-Location
}

# git init/commit
if (Test-Path (Join-Path $root '.git')) {
  git -C $root add .
  git -C $root commit -m "Bootstrap BetoDashboard Monorepo"
} else {
  git -C $root init
  git -C $root add .
  git -C $root commit -m "Initial BetoDashboard Monorepo Bootstrap"
}

Write-Host "✅ BetoDashboard monorepo initialized successfully!"
Write-Host "💡 Next: npm install && npm run dev -w examples/betodashboard-demo"

