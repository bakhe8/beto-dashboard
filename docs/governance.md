---
title: Repository Governance & CI Gates
---

# Repository Governance & CI Gates

This page summarizes the rules for contributing, the CI/CD checks enforced on `main`, and the release/deploy flow.

## Contribution Policy

- Open a PR targeting `main` from a feature branch.
- Require at least 1 approving review; resolve all review threads.
- Keep a linear history (rebase preferred; no merge commits).
- Ensure status checks are green before merging.

## Required Checks

The following checks must pass on PRs and on `main`:

- Analyze (javascript)
- build, build-test, build-deploy
- docs (builds site)
- e2e (Playwright E2E, manages preview automatically)
- lhci (Lighthouse assertions + budgets)
- chromatic-deployment (visual baseline)
- report-build-status / deploy (Pages deploy workflow)

Budgets and thresholds:
- Coverage (Vitest): lines 90, functions 90, statements 90, branches 80.
- Bundle size gate: total gzipped JS+CSS <= 50 kB (dist/assets).
- Lighthouse minimums: Perf 0.98, A11y 0.95, BP 0.95, SEO 0.95.
- Lighthouse budgets: scripts 70 kB, styles 50 kB, 3rd‑party 40 kB (see `lighthouse-budgets.json`).

## Pre‑Push Hook

Husky runs lint, typecheck, and unit tests on `git push`. Skip with `--no-verify` only in emergencies.

## Release & Pages

- Docs deploy uses GitHub Actions; Pages is configured for workflow builds.
- Demo is published under `/demo` in the docs site.
- Release workflow tags and publishes packages when enabled.

## Useful Commands

- Dev: `npm run dev` (all) / `npm run dev:demo`
- E2E (clean): `npm run test:e2e:clean` / Report: `npm run report:e2e`
- Docs: `npm run docs:dev` / `npm run docs:build`
- Ports: `npm run ports:kill` / `npm run ports:who`

See also: [README → Monorepo Workflow](../README.md)

