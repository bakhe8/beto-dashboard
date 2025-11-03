[Docs Index](./index.md) | [Project README](../README.md)

# Testing

This project follows a comprehensive testing strategy to ensure code quality, prevent regressions, and maintain accessibility standards. Our testing philosophy is "No feature is done until it's tested, accessible, and typed."

We use a combination of unit, end-to-end (E2E), and accessibility tests.

## Unit Tests

Unit tests are used to validate individual functions, components, and logic in isolation.

-   **Framework:** [Vitest](https://vitest.dev/)
-   **Environment:** [jsdom](https://github.com/jsdom/jsdom) to simulate a browser environment.
-   **Library:** [@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro/) for querying and interacting with components.

### Running Unit Tests

To run all unit tests, use the following command:

```bash
npm test
```

To run tests in watch mode during development:

```bash
npm run test -- --watch
```

## End-to-End (E2E) Tests

E2E tests simulate real user workflows by running tests in an actual browser. They are crucial for verifying that components work together correctly and for catching visual regressions.

-   **Framework:** [Playwright](https://playwright.dev/)
-   **Features:** Cross-browser testing and visual regression testing using snapshots.

### Running E2E Tests

To run all E2E tests, use the following command:

```bash
npm run test:e2e
```

Run against the production build with strict CSP headers (recommended before release):

```bash
npm run build
npm run test:e2e:prod
```

Update visual snapshots when intentional UI changes occur:

```bash
# Update all snapshots
npm run test:e2e -- --update-snapshots

# Update only matching tests
npm run test:e2e -- --grep "Modal component should match snapshots" --update-snapshots
```

Stabilize screenshots across machines:

- Disable animations (already done in tests via `page.addStyleTag`).
- Consider pinning `deviceScaleFactor: 1` and a fixed `viewport` in `playwright.config.ts` under `use`.
- Force a deterministic font in tests if you see reflow: add a global `font-family` via `page.addStyleTag`.

## Accessibility Tests

Accessibility is a core requirement. We use **axe-core** integrated with Playwright to automatically scan for WCAG (Web Content Accessibility Guidelines) violations. These tests are part of our E2E suite (`accessibility.spec.ts`) and run automatically in CI, failing the build if any serious or critical violations are detected.

## Unit Test Configuration

- Config: `vitest.config.ts:1` (jsdom, setup file, exclusions)
- Setup: `src/test-setup.ts:1` registers components and custom matchers
- Run coverage: `npm run test:coverage`

## E2E Configuration

- Dev server config: `playwright.config.ts:1` (uses Vite dev server)
- Production server config (strict CSP): `playwright.config.prod.ts:1` (serves `dist` via Express + Helmet)
