[Docs Index](./index.md) | [Project README](../README.md)

# Roadmap Completion Status (v1 + v2)

This checklist reflects the current state of the repository against the v1 Handbook and v2 Execution Roadmap.

## Phase 0 — Infrastructure Bootstrap
- [x] Repository structure
- [x] CI/CD (typecheck, lint, test, build) — .github/workflows/ci.yml
- [x] Security automation — Dependabot + CodeQL
- [x] CODEOWNERS and permissions matrix — .github/CODEOWNERS
- [ ] Branch protection — requires GitHub repo settings (cannot be committed as code)
- [ ] Figma → token sync (optional) — not applicable in repo

## Phase 1 — Bootstrapping & Safety
- [x] TypeScript config — tsconfig.json
- [x] ESLint — .eslintrc.json
- [x] Prettier — .prettierrc + script
- [x] CSP in index.html — meta tag present
- [x] DOMPurify + Zod installed and wired — sanitize helper + schemas + API
- [x] CI pipeline file — ci.yml
- [x] README quick start
- [x] First unit tests run (test suite present and CI configured)

## Phase 2 — Core Architecture & State Layer
- [x] src/js/store.ts — reactive store + persistence
- [x] src/js/api.ts — Zod‑validated SWR fetcher
- [x] src/js/error-boundary.ts — global runtime guard (imported in main)
- [x] src/schemas.ts — Zod schema registry
- [x] Security: sanitize helper uses DOMPurify
- [x] Unit tests exist for store and components

## Phase 3 — Component System & Theming
- [x] DCE engine — src/components/runtime.ts
- [x] Base components — Modal, Table, Loader, Sidebar, ThemeSwitcher
- [x] Toast system — ToastContainer component wired into index.html
- [x] Theme tokens — src/css/_tokens.css
- [~] Accessibility baseline tests — present for modal and a11y scan; continue expanding

## Phase 4 — Testing, Accessibility & QA Automation
- [x] Unit + Integration tests (Vitest)
- [x] E2E tests (Playwright configs present + specs)
- [x] Accessibility tests (axe-core with Playwright)
- [~] Visual regression — Playwright screenshots in place (Chromatic optional, not added)
- [x] Coverage command available

## Phase 5 — Performance & Security Hardening
- [x] Bundle analyzer — wired in CI (artifact: dist/stats.html)
- [x] Lighthouse audit workflow added (see .github/workflows/lighthouse.yml)
- [x] npm audit --production — added to CI
- [x] Web‑vitals reporting — basic client reporter added (console)

## Phase 6 — Documentation & Release
- [x] VitePress docs site scaffolding
- [x] Local docs navigation + index
- [x] CHANGELOG.md
- [x] Automated npm publish on tag — release workflow added (requires NPM_TOKEN secret)
- [x] Post‑deployment verification steps documented in v2

## Phase 7 — Expansion & Integration (multi‑year)
- [ ] Plugin SDK and marketplace — not in scope for this repo iteration
- [ ] Multi‑tenant model — not in scope
- [ ] Enterprise integrations (OAuth/SAML) — not in scope

## Notes
- Items marked [~] are partially complete or intentionally deferred.
- Branch protection and some release automation require repository settings that cannot be committed via code.


