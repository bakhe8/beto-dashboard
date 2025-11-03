#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Bootstrapping BetoDashboard Monorepo (in-place)..."

ROOT="$(pwd)"

# helper
write() { mkdir -p "$(dirname "$1")"; printf "%s" "$2" > "$1"; }

# workspace manifest
write package.json '{
  "private": true,
  "name": "betodashboard",
  "version": "0.0.0-alpha",
  "workspaces": ["packages/*", "examples/*"],
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
}'

write turbo.json '{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {"dependsOn": ["^build"], "outputs": ["dist/**"]},
    "dev": {"cache": false},
    "lint": {},
    "test": {"outputs": []}
  }
}'

write .gitignore $'node_modules/\ndist/\n.turbo/\n.DS_Store\n**/.vite/\n**/.cache/\n'

# core
write packages/core/package.json '{
  "name": "@betodashboard/core",
  "version": "0.0.0-alpha",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {"build": "tsc --project tsconfig.json", "dev": "vite", "lint": "eslint . --ext .ts", "test": "vitest"},
  "dependencies": {},
  "devDependencies": {"typescript": "^5.5.0", "vite": "^5.0.0"}
}'

write packages/core/src/index.ts $'export * from "./components";\nexport * from "./utils";'
write packages/core/src/components/Modal.ts $'export function Modal(root: HTMLElement, props: { open: boolean; onClose: () => void }) {\n  if (!root) return;\n  const dialog = document.createElement(\'div\');\n  dialog.setAttribute(\'role\', \'dialog\');\n  dialog.className = \"fixed inset-0 bg-black/50 flex items-center justify-center\";\n  dialog.innerHTML = `\n    <div class=\"bg-white rounded-lg p-6 shadow-xl w-96 relative\">\n      <button class=\"absolute top-2 right-3 text-gray-500 hover:text-gray-900\" aria-label=\"Close\">&times;</button>\n      <slot></slot>\n    </div>`;\n  const closeBtn = dialog.querySelector(\'button\');\n  closeBtn?.addEventListener(\'click\', props.onClose);\n  if (props.open) root.appendChild(dialog);\n  return { close: () => dialog.remove() };\n}'
write packages/core/tsconfig.json '{
  "compilerOptions": {"outDir": "dist","rootDir": "src","target": "ESNext","module": "ESNext","declaration": true,"moduleResolution": "Node","esModuleInterop": true,"skipLibCheck": true},
  "include": ["src"]
}'

# tokens
write packages/tokens/package.json '{"name": "@betodashboard/tokens","version": "0.0.0-alpha","main": "colors.json"}'
write packages/tokens/colors.json '{"primary": {"50": "#f0f5ff","500": "#0046FF","900": "#11224E"},"mode": {"light": {"background": "#FFFFFF","text": "#0D1117"},"dark": {"background": "#0D1117","text": "#FFFFFF"}}}'

# demo
write examples/betodashboard-demo/package.json '{"name":"betodashboard-demo","private":true,"scripts":{"dev":"vite","build":"vite build","preview":"vite preview"},"dependencies":{"@betodashboard/core":"workspace:*","@betodashboard/tokens":"workspace:*"}}'
write examples/betodashboard-demo/vite.config.ts $'import { defineConfig } from \"vite\";\nimport path from \"path\";\nexport default defineConfig({ root: \"src\", build: { outDir: \"../dist\", emptyOutDir: true }, resolve: { alias: { \"@core\": path.resolve(__dirname, \"../../packages/core/src\") } } });'
write examples/betodashboard-demo/src/pages/dashboard.html $'<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>BetoDashboard Demo</title>\n  <link rel=\"stylesheet\" href=\"../css/demo.css\">\n  </head>\n<body class=\"bg-white text-[#11224E] font-sans\">\n  <header class=\"p-4 bg-[#0046FF] text-white font-bold text-lg\">BetoDashboard Demo</header>\n  <main class=\"p-6\">\n    <h1 class=\"text-2xl mb-4\">Dashboard Overview</h1>\n    <div id=\"modal-root\"></div>\n    <button id=\"openModal\" class=\"px-4 py-2 bg-[#0046FF] text-white rounded\">Open Modal</button>\n  </main>\n  <script type=\"module\" src=\"../js/main.ts\"></script>\n</body>\n</html>'
write examples/betodashboard-demo/src/css/demo.css $'@tailwind base;\n@tailwind components;\n@tailwind utilities;\n:root { --color-primary: #0046FF; --color-text: #11224E; }'
write examples/betodashboard-demo/src/js/main.ts $'import { Modal } from \"@core/components/Modal\";\nconst root = document.getElementById(\"modal-root\")!;\ndocument.getElementById(\"openModal\")?.addEventListener(\"click\", () => {\n  const modal = Modal(root, { open: true, onClose: () => modal.close() });\n});'
write examples/betodashboard-demo/tailwind.config.js $'const colors = require(\'@betodashboard/tokens/colors.json\');\nmodule.exports = { content: [\"./src/**/*.{html,js,ts}\"], theme: { extend: { colors: colors.primary, backgroundColor: colors.mode.light, textColor: colors.mode.light } }, plugins: [] }'
write examples/betodashboard-demo/postcss.config.js 'module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }'

# docs stub
write docs/index.md $'# BetoDashboard Documentation\n\nWelcome to the BetoDashboard developer documentation.\n\n- **Core Package:** `@betodashboard/core`\n- **Tokens:** `@betodashboard/tokens`\n- **Demo App:** /examples/betodashboard-demo\n'

# workflow
write .github/workflows/ci.yml $'name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n      - run: npm install\n      - run: npm run lint\n      - run: npm run test\n      - run: npm run build\n'

if [ -d .git ]; then
  git add .
  git commit -m "Bootstrap BetoDashboard Monorepo (in-place)" || true
else
  git init
  git add .
  git commit -m "Initial BetoDashboard Monorepo Bootstrap (in-place)"
fi

echo "✅ BetoDashboard monorepo initialized successfully (in-place)!"
echo "💡 Next: npm install && npm run dev -w examples/betodashboard-demo"

