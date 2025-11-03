# BetoDashboard

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

## Browser Support

BetoDashboard is built for modern browsers and officially supports the following versions based on the features used in the framework:

-   **Chrome**: 110+
-   **Edge**: 110+
-   **Firefox**: 100+
-   **Safari**: 16+

## Developer Resources

-   [📘 BetoDashboard v1](docs/BetoDashboard_v1.md)

This handbook is the single source of truth for the project's architecture, component specifications, and development workflows. All contributors are expected to be familiar with its contents.

## Local Documentation

You can browse the documentation in this repository directly via Markdown:

- Root index: [index.md](index.md)
- Docs index: [docs/index.md](docs/index.md)
- Getting started: [docs/getting-started.md](docs/getting-started.md)
- Architecture: [docs/architecture.md](docs/architecture.md)
- Components: [docs/components/](docs/components/)
- API fetching: [docs/api.md](docs/api.md)
- Testing: [docs/testing.md](docs/testing.md)
- Code style: [docs/code-style.md](docs/code-style.md)
- BetoDashboard v2: [docs/BetoDashboard_v2.md](docs/BetoDashboard_v2.md)

Every doc page links back to the docs index and this README for easy navigation on GitHub.






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
