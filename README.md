# BetoDashboard

> Proof Phase (Walking Skeleton) — Documentation freeze in effect. We are prioritizing running code over new docs until the skeleton is validated.

Quick proof entry points:
- Minimal DOMRenderer + StateSlice demo: `examples/demo.html`
- Serve locally: `npm run demo:skeleton` (opens a static server for the demo)
- Definition of Working: see `PROOF.md`

Live Demo (Pages)
- After CI deploy, open:
  - Demo App: `https://bakhe8.github.io/beto-dashboard/demo/app.html`
  - Demo Dashboard: `https://bakhe8.github.io/beto-dashboard/demo/demo-dashboard.html`

[![CI](https://github.com/bakhe8/beto-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/bakhe8/beto-dashboard/actions/workflows/ci.yml)
[![Lighthouse](https://github.com/bakhe8/beto-dashboard/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/bakhe8/beto-dashboard/actions/workflows/lighthouse.yml)
[![CodeQL](https://github.com/bakhe8/beto-dashboard/actions/workflows/codeql.yml/badge.svg)](https://github.com/bakhe8/beto-dashboard/actions/workflows/codeql.yml)
[![Chromatic](https://github.com/bakhe8/beto-dashboard/actions/workflows/chromatic.yml/badge.svg)](https://github.com/bakhe8/beto-dashboard/actions/workflows/chromatic.yml)
[![Docs Site](https://img.shields.io/badge/docs-live-brightgreen?logo=githubpages)](https://bakhe8.github.io/beto-dashboard/)
[![Docs](https://github.com/bakhe8/beto-dashboard/actions/workflows/docs-deploy.yml/badge.svg)](https://github.com/bakhe8/beto-dashboard/actions/workflows/docs-deploy.yml)
[![Docs Uptime](https://img.shields.io/website?label=docs&url=https%3A%2F%2Fbakhe8.github.io%2Fbeto-dashboard%2F)](https://bakhe8.github.io/beto-dashboard/)

A Modern, Type-Safe Dashboard Framework built with TypeScript, zero dependencies, and a focus on performance and accessibility.

This repository contains the source code for the BetoDashboard framework. For full component documentation, architecture guides, and live examples, please visit the **[official documentation site](https://bakhe8.github.io/beto-dashboard/)**.

## Quick Start

To get the project running locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bakhe8/beto-dashboard.git
    cd beto-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm ci
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## Monorepo Workflow

- Dev (all packages): `npm run dev`
- Dev Demo only: `npm run dev:demo`
- Build (all): `npm run build`
- Build Core only: `npm run build:core`
- Test (unit): `npm run test`
- Test Core only: `npm run test:core`
- Test E2E (dev preview): `npm run test:e2e`
- Test E2E (clean + ports kill): `npm run test:e2e:clean`
- Test E2E (prod preview): `npm run test:e2e:prod`
- Open last E2E HTML report: `npm run report:e2e`
- Lint / Typecheck: `npm run lint` / `npm run typecheck`
- Docs dev/build/preview: `npm run docs:dev` / `npm run docs:build` / `npm run docs:preview`
- Storybook: `npm run storybook` / `npm run build-storybook`
- Ports utilities: `npm run ports:kill` / `npm run ports:who`
- Demo preview (5174): `npm run demo:preview:5174`

Notes
- Dev server defaults: app `5173`, demo preview often uses `5174`.
- If ports stick, run `npm run ports:kill` and retry.
- E2E starts/stops its own preview server; prefer `test:e2e:clean` for a fresh run.

## Proof Phase (14-day focus)

- Primary files for the walking skeleton:
  - `core/dom/DOMRenderer.ts`
  - `core/state/StateSlice.ts`
  - `examples/demo.html`
- Run the skeleton: `npm run demo:skeleton` (or open `examples/demo.html` directly)
- Checklist and cadence: see `PROOF.md`

## Browser Support

BetoDashboard is built for modern browsers and officially supports the following versions based on the features used in the framework:

-   **Chrome**: 110+
-   **Edge**: 110+
-   **Firefox**: 100+
-   **Safari**: 16+

## Developer Resources

-   [📘 BetoDashboard v1](BetoDashboard_v1.md)

This handbook is the single source of truth for the project's architecture, component specifications, and development workflows. All contributors are expected to be familiar with its contents.

## Local Documentation

You can browse the documentation in this repository directly via Markdown:

- Root index: [index.md](index.md)
- Docs index: [docs/index.md](docs/index.md)
- Getting started: [docs/getting-started.md](docs/getting-started.md)
- Architecture: [docs/architecture.md](docs/architecture.md)
- Components: [docs/components/](docs/components/)
- API fetching: [docs/api.md](docs/api.md)

## How to Contribute

- Use feature branches and open Pull Requests targeting `main`.
- Required before merge:
  - All checks green (CI, E2E, Lighthouse, Chromatic, Docs, CodeQL).
  - At least 1 approving review; all review threads resolved.
  - Linear history (no merge commits; use rebase if needed).
- Status checks enforced (set in repo settings):
  - Analyze (javascript), build, build-deploy, build-test, chromatic-deployment,
    deploy, docs, e2e, generate, lhci, report-build-status.
 - Pages is configured to deploy via Actions workflow.

If you hit port conflicts locally, run `npm run ports:kill` and retry.
- Testing: [docs/testing.md](docs/testing.md)
- Code style: [docs/code-style.md](docs/code-style.md)
- BetoDashboard v2: [docs/BetoDashboard_v2.md](docs/BetoDashboard_v2.md)
 - Tradeoffs & Scaling Strategy: [docs/BetoDashboard_Tradeoffs_and_Scaling_Strategy.md](docs/BetoDashboard_Tradeoffs_and_Scaling_Strategy.md)

Every doc page links back to the docs index and this README for easy navigation on GitHub.

## Repository Protection & Pages (manual setup)

- Enable GitHub Pages: Source = GitHub Actions; Custom domain not required.
- Protect `main`: require status checks (CI, Lighthouse, Chromatic, CodeQL, Docs Deploy, Badges) to pass before merge.
- Secrets: add `NPM_TOKEN` (for package publish) and `CHROMATIC_PROJECT_TOKEN` if using Chromatic.






[![Coverage](https://raw.githubusercontent.com/bakhe8/beto-dashboard/main/badges/coverage.svg)](https://github.com/bakhe8/beto-dashboard/actions/workflows/badges.yml) [![Bundle](https://raw.githubusercontent.com/bakhe8/beto-dashboard/main/badges/bundle.svg)](https://github.com/bakhe8/beto-dashboard/actions/workflows/badges.yml)

## Bootstrap Monorepo

You can scaffold a Turborepo-based monorepo (packages, demo, docs) directly from this repo using the provided scripts:

- Windows PowerShell (in-place):
  - `npm run bootstrap:ps1`
- Bash (macOS/Linux/WSL, in-place):
  - `npm run bootstrap:sh`

What it creates:
- `packages/core` (sample `Modal` component + TS build)
- `packages/tokens` (shared design tokens)
- `examples/betodashboard-demo` (Vite app wired to `@betodashboard/*` workspaces)
- `docs/` (stub index)
- `.github/workflows/ci.yml` (basic CI)
- `turbo.json` and workspace `package.json`

Next commands after bootstrapping:
- `npm install`
- `npm run dev -w examples/betodashboard-demo`
- Open `http://localhost:5173/pages/dashboard.html`

## Monorepo Workflow

- Dev (all): `npm run dev`
- Dev (demo only): `npm run dev:demo`
- Build (all): `npm run build`
- Build core only: `npm run build:core`
- Unit tests: `npm test -- --run`
- Coverage report: `npm run test:coverage`
- E2E (dev preview on 5174): `npm run test:e2e`
- E2E (prod preview on 5173): `npm run test:e2e:prod`
- Open last E2E report: `npm run report:e2e` (random free port)
- Collect engineering metrics (placeholder): `npm run metrics:collect` → see `test-results/metrics.json`
- Preview demo (5174): `npm run demo:preview:5174` → visit `/src/pages/app.html`
- Clean artifacts: `npm run clean`
- Full reset (incl. node_modules): `npm run reset`
- Free ports (5173/5174): `npm run ports:kill`

Notes
- Ports: dev uses 5174 for preview-based E2E and 5173 for prod.
- Strict-CSP prod server: `npm run serve:prod` serves built demo with locked CSP for manual checks.
- Playwright report: `npx playwright show-report` opens the latest HTML report.
  - When tests finish, CLI prints a local report URL (e.g., `http://localhost:58983/`).
  - If the default report port is busy, use `npm run report:e2e`.
 - Engineering metrics: CI uploads `engineering-metrics` artifact with `test-results/metrics.json`.
