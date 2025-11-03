[Docs Index](./index.md) | [Project README](../README.md)

<div v-pre>

**BetoDashboard Handbook**

*Version 1 --- Unified Developer & Architecture Manual*\
*Prepared by: Beto Theme Engineering Team*

**Table of Contents**

1.  **Executive Summary**\
    1.1 Purpose\
    1.2 Vision\
    1.3 Mission Statement\
    1.4 Project Objectives\
    1.5 Core Principles\
    1.6 Stakeholders & Roles\
    1.7 High-Level Lifecycle Diagram

2.  **Project Roadmap**\
    2.1 Phase Overview\
    2.2 Timeline Summary\
    2.3 Deliverables by Phase

3.  **Phase 1 --- Bootstrapping & Safety**

4.  **Phase 2 --- Core Architecture & State Layer**

5.  **Phase 3 --- Component System & Theming**

6.  **Phase 4 --- Testing, Accessibility & QA**

7.  **Phase 5 --- Performance & Security Hardening**

8.  **Phase 6 --- Documentation & Release**

9.  **Architecture Blueprint**

    - Global Store

    - Dynamic Component Engine (DCE)

    - API Fetcher

    - Error Boundary

    - Schema Registry

10. **Component Specifications**

- Modal

- Table

- Loader

- Toast (Planned)

11. **Theme & Design Tokens**

12. **Workflow & Collaboration Process**

- Code Review

- Git Branching

- Standups & Project Management

13. **Testing & Continuous Integration**

14. **Deployment, QA & Release**

15. **Security, Accessibility & Performance Standards**

16. **Appendices**

- A. File Tree Reference

- B. Sample Configurations

- C. Glossary of Terms

- D. Developer Checklists

- E. Example Commands

**1. Executive Summary**

**1.1 Purpose**

The **BetoDashboard Handbook** serves as the complete, authoritative
guide for engineers, designers, and QA members working on the
**BetoDashboard Framework** --- the flagship admin and control-panel
project of the **Beto Theme ecosystem**.

It consolidates every phase, technical detail, process, and decision
required to take the framework from **clone → build → test → secure →
ship** without ambiguity.

> Related reading: [Engineering Process Behind Our Analysis](./BetoDashboard_Engineering_Process.md) — the playbook describing how we framed problems, derived requirements, and validated solutions.

**1.2 Vision**

BetoDashboard aims to become a **universal, enterprise-grade admin
framework** for all Beto Theme projects.\
It balances **static simplicity** (MPA-friendly) with **dynamic
flexibility**, ensuring developers can create fast, secure, accessible
dashboards without framework lock-in.

**1.3 Mission Statement**

"To deliver a scalable, accessible, and developer-friendly dashboard
framework that empowers teams to build enterprise interfaces faster,
safer, and with design consistency."

**1.4 Project Objectives**

1.  **Type Safety:** 100% TypeScript with Zod validation for runtime
    contracts.

2.  **Performance:** Sub-50KB core bundle, code-splitting, and
    lazy-loading.

3.  **Accessibility:** WCAG 2.1 AA compliance across all components.

4.  **Security:** Enforced CSP, DOMPurify sanitization, schema
    validation, and dependency auditing.

5.  **Developer Experience:** Zero setup friction, clear folder
    structure, and live-reload tooling.

6.  **Maintainability:** Modular components, single source of truth for
    state and tokens.

7.  **Extensibility:** Plugin-ready DCE architecture for future widgets.

8.  **Documentation:** Human-readable Markdown guides and auto-generated
    API references.

**1.5 Core Principles**

  ---------------------------------------------------------------------
  **Principle**          **Description**
  ---------------------- ----------------------------------------------
  **Type-Safe by         Every module typed via TypeScript; data
  Design**               validated via Zod.

  **RTL-First &          Uses CSS logical properties and CSS variables
  Theme-Aware**          for color/mode.

  **Composable           Props, slots, and events allow modular UI
  Components**           reuse.

  **State Consistency**  A global store provides persistence and
                         reactivity.

  **Accessibility        Meets WCAG 2.1 AA by default; tested via
  Baseline**             axe-core.

  **Security             CSP, sanitization, and audits implemented from
  Shift-Left**           Phase 1.

  **Performance Budget** Core + vendor bundles must remain under target
                         size.

  **Testing Culture**    Automated unit, integration, E2E, and
                         accessibility testing.
  ---------------------------------------------------------------------

**1.6 Stakeholders & Roles**

  -----------------------------------------------------------------------
  **Role**            **Responsibilities**
  ------------------- ---------------------------------------------------
  **Architecture      Defines core patterns (store, API, DCE). Approves
  Lead**              structural PRs.

  **Backend           Integrates APIs, ensures schema compliance, manages
  Engineer**          data contracts.

  **UX Engineer**     Designs and implements reusable components with
                      built-in accessibility.

  **Infrastructure    Maintains CI/CD, performs automated audits and
  Engineer**          build analysis.

  **QA Lead**         Oversees automated testing coverage, ensures
                      regression prevention.

  **Technical         Maintains documentation and developer onboarding
  Writer**            materials.

  **Project Manager** Coordinates sprints, standups, milestones, and
                      deliverables.
  -----------------------------------------------------------------------

**1.7 Lifecycle Diagram**

flowchart LR

A(Clone & Setup)

B(Architecture & Store)

C(Component System)

D(Testing & QA)

E(Security & Performance)

F(Documentation & Release)

A \--\> B \--\> C \--\> D \--\> E \--\> F

**2. Project Roadmap**

**2.1 Phase Overview**

  -------------------------------------------------------------------------------------
  **Phase**   **Focus**                  **Duration**   **Outcome**
  ----------- -------------------------- -------------- -------------------------------
  **1**       Bootstrapping & Safety     Week 1--2      Type-safe project base, CI/CD
                                                        ready

  **2**       Core Architecture & State  Week 3--4      Store, API, error handling,
              Layer                                     persistence

  **3**       Component System & Theming Week 5--6      Dynamic engine, reusable
                                                        components

  **4**       Testing, Accessibility &   Week 7         Full test suite + accessibility
              QA                                        compliance

  **5**       Performance & Security     Week 8         Optimized, secured,
              Hardening                                 production-ready build

  **6**       Documentation & Release    Week 9         Published docs, version
                                                        tagging, release
  -------------------------------------------------------------------------------------

**2.2 Timeline Summary**

gantt

dateFormat YYYY-MM-DD

title BetoDashboard Project Timeline

section Setup

Phase 1: Bootstrapping & Safety :a1, 2025-01-05, 14d

section Architecture

Phase 2: Core Architecture & State :a2, after a1, 14d

section Components

Phase 3: Component System & Theming :a3, after a2, 14d

section QA

Phase 4: Testing & Accessibility :a4, after a3, 7d

section Optimization

Phase 5: Performance & Security :a5, after a4, 7d

section Release

Phase 6: Documentation & Launch :a6, after a5, 7d

**2.3 Deliverables by Phase**

  -----------------------------------------------------------------------------
  **Phase**   **Key Deliverables**                  **Review Gate**
  ----------- ------------------------------------- ---------------------------
  **1**       Project scaffold, CSP, linting, type  All checks green
              checks, CI pipeline                   

  **2**       store.ts, api.ts, error-boundary.ts,  Type + unit tests pass
              schemas.ts                            

  **3**       runtime.ts, base components,          Components functional +
              \_tokens.css                          a11y baseline

  **4**       Unit, E2E, and accessibility tests    85% coverage + zero WCAG
                                                    violations

  **5**       Lazy load, analyzer, audit report,    Perf + security gate pass
              Lighthouse 95+                        

  **6**       Docs site, CHANGELOG, release tag     CI/CD publish succeeds
  -----------------------------------------------------------------------------

**Bootstrapping, Architecture & Component System**

**Bootstrapping and Safety**

**3.1 Objective**

Create a reproducible, type-safe, and secure developer environment.\
All team members must be able to clone, build, lint, and test locally
within one hour.

**3.2 Core Tasks**

1.  **Repository Setup**

    - Clone the repo

    - git clone https://github.com/bakhe8/beto-dashboard.git

    - cd beto-dashboard

    - npm ci

    - Verify Node ≥ 20 and npm ≥ 10.

2.  **TypeScript Configuration**

    - Add tsconfig.json

    - {

    - \"compilerOptions\": {

    - \"target\": \"ES2020\",

    - \"module\": \"ESNext\",

    - \"strict\": true,

    - \"moduleResolution\": \"Bundler\",

    - \"allowJs\": true,

    - \"baseUrl\": \"./src\"

    - },

    - \"include\": \[\"src\"\]

    - }

3.  **Lint & Format**

    - .eslintrc with Prettier rules.

    - Pre-commit hook via lint-staged.

4.  **CSP Meta Tag**

    - In public/index.html:

    - \<meta http-equiv=\"Content-Security-Policy\"

    - content=\"default-src \'self\';

    - script-src \'self\' \'unsafe-inline\' \'wasm-unsafe-eval\';

    - style-src \'self\' \'unsafe-inline\';

    - img-src \'self\' data:;

    - object-src \'none\';

    - base-uri \'self\';

    - frame-ancestors \'none\';\"\>

5.  **Security Packages**

    - npm i dompurify zod

6.  **Sanitization Utility**

    - src/js/utils/sanitize.ts

    - import DOMPurify from \"dompurify\";

    - export const sanitize = (html:string) =\>

    - DOMPurify.sanitize(html,{SAFE_FOR_TEMPLATES:true});

7.  **Zod Schema Registry**

    - src/schemas.ts defines UserSchema, ErrorResponse, etc.

8.  **CI/CD Initialization**

    - .github/workflows/ci.yml runs typecheck, lint, unit tests.

9.  **Unit Test Smoke Suite**

    - Using Vitest and jsdom.

    - import { describe,it,expect } from \"vitest\";

    - describe(\"setup\",()=\>{ it(\"runs\",()=\> expect(1).toBe(1));
      });

**3.3 Definition of Done**

  --------------------------------------------
  **Criterion**   **Requirement**
  --------------- ----------------------------
  Type-Safety     npm run typecheck passes

  Linting         No ESLint errors

  Security        CSP present, DOMPurify
                  imported

  CI Pipeline     All jobs green

  Docs            README.md includes setup
                  instructions
  --------------------------------------------

**3.4 Outputs**

- Verified CSP

- TypeScript project builds cleanly

- CI workflow automatically runs on push

- First unit test executed

**Core Architecture and State Layer**

**4.1 Objective**

Establish the core runtime foundation: global state store, API fetcher,
error boundary, and persistence mechanism.

**4.2 Global Store (src/js/store.ts)**

**Technology:** Custom Proxy-based reactive store (no library).\
**Persistence:** LocalStorage for theme, dir, sidebar.

type State = {
  theme: "light" | "dark" | "auto";
  dir: "ltr" | "rtl";
  sidebar: "default" | "compact" | "collapsed";
  user: null | { id: string; name: string };
  cache: Record<string, unknown>;
};

type StateKeys = keyof State;
type Listener = (value: any) => void;
type UnsubscribeFn = () => void;

const PERSISTED_KEYS: StateKeys[] = ["theme", "dir", "sidebar"];

function getInitialState(): State {
  let persistedState = {};
  try {
    persistedState = JSON.parse(localStorage.getItem("beto-state") || "{}");
  } catch (e) {
    console.error("Failed to parse persisted state from localStorage", e);
  }
  return { theme: "auto", dir: "ltr", sidebar: "default", user: null, cache: {}, ...persistedState };
}

const state: State = getInitialState();
const listeners = new Map<StateKeys, Set<Listener>>();

export const store = {
  get: <K extends StateKeys>(key: K): State[K] => state[key],

  set: <K extends StateKeys>(key: K, value: State[K]): void => {
    state[key] = value;

    if ((PERSISTED_KEYS as string[]).includes(key)) {
      const persistedState = PERSISTED_KEYS.reduce((acc, k) => ({ ...acc, [k]: state[k] }), {});
      localStorage.setItem("beto-state", JSON.stringify(persistedState));
    }

    listeners.get(key)?.forEach(fn => fn(value));
  },

```ts
on: <K extends StateKeys>(key: K, fn: Listener): UnsubscribeFn => {
  if (!listeners.has(key)) {
    listeners.set(key, new Set());
  }
  listeners.get(key)!.add(fn);
  return () => listeners.get(key)!.delete(fn);
}
};
```

**4.3 API Fetcher (src/js/api.ts)**

**Pattern:** Zod-validated SWR-style fetcher.

```ts
import { z } from "zod";

const cache = new Map<string,{t:number,v:any}>();

async function revalidate<T>(key:string,url:string,schema:z.ZodTypeAny,ttl:number){
  const res = await fetch(url);
  if(!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  const v = schema.parse(data);
  cache.set(key,{t:Date.now(),v});
  return v;
}

export async function swr<T>(key:string,url:string,schema:z.ZodTypeAny,ttl=60000):Promise<T>{
  const c=cache.get(key);
  if(c && Date.now()-c.t<ttl){ revalidate(key,url,schema,ttl); return c.v; }
  return revalidate(key,url,schema,ttl);
}
```

**4.4 Error Boundary (src/js/error-boundary.ts)**

**Purpose:** Centralized runtime guard for asynchronous failures.

```ts
export const withErrorBoundary = (fn:()=>Promise<void>) =>
  fn().catch(err=>{
    console.error(err);
    document.body.dataset.appError="true";
    document.querySelector(".global-error")?.classList.remove("hidden");
  });

window.addEventListener("error", e=>{
  document.body.dataset.appError="true";
  console.error("Global error:", (e as ErrorEvent).error);
});
```

**4.5 Definition of Done**

  ----------------------------------------------
  **Area**     **Criteria**
  ------------ ---------------------------------
  Store        Reactive set/get working +
               persistence tested

  API          Zod validated, cache revalidates

  Error        Captures network and runtime
  Boundary     errors

  Tests        Unit coverage ≥ 70 %

  Security     No unsanitized innerHTML calls
  ----------------------------------------------

**5. Component System and Theming**

**5.1 Objective**

Build the Dynamic Component Engine (DCE) and base UI components that
define the framework's visual and interactive foundation.

**5.2 Dynamic Component Engine (src/components/runtime.ts)**

**Design Pattern:** Lightweight registry + DOM mounting.

type Ctor = (root:HTMLElement, props:any,
slots:Record\<string,string\>)=\>void;

const registry = new Map\<string,Ctor\>();

export const define = (name:string, ctor:Ctor) =\>

registry.set(name.toLowerCase(), ctor);

export function mountAll(){

document.querySelectorAll\<HTMLElement\>(\"\[data-component\]\").forEach(el=\>{

const name = el.dataset.component!.toLowerCase();

const ctor = registry.get(name); if(!ctor) return;

const props = el.dataset.props ? JSON.parse(el.dataset.props) : {};

const slots:Record\<string,string\> = {};

el.querySelectorAll(\"template\[data-slot\]\").forEach(t=\>{

slots\[(t as HTMLElement).dataset.slot!\] = (t as
HTMLTemplateElement).innerHTML;

});

ctor(el, props, slots);

});

}

**5.3 Example Modal Component**

import { define } from \"./runtime\";

import { sanitize } from \"../js/utils/sanitize\";

define(\"Modal\",(root,props:{title:string},slots)=\>{

root.innerHTML = sanitize(\`

\<div class=\"modal\" role=\"dialog\" aria-modal=\"true\"
tabindex=\"-1\"\>

\<h2\>\${props.title}\</h2\>

\<div class=\"body\"\>\${slots.default \|\| \"\"}\</div\>

\<button data-close\>×\</button\>

\</div\>

\`);

const close = root.querySelector(\"\[data-close\]\");

close?.addEventListener(\"click\",()=\>root.remove());

});

Usage in HTML:

\<div data-component=\"Modal\" data-props=\'{\"title\":\"Saved\"}\'\>

\<template data-slot=\"default\"\>\<p\>Changes saved
successfully.\</p\>\</template\>

\</div\>

**5.4 Theme Tokens (src/css/\_tokens.css)**

:root {

\--color-primary: #0046FF;

\--color-bg: #FFFFFF;

\--font-body: \"Inter\", sans-serif;

\--font-heading: \"Tajawal\", sans-serif;

\--space-sm: 8px;

\--space-md: 16px;

\--space-lg: 24px;

\--bp-sm: 640px;

\--bp-md: 768px;

\--bp-lg: 1024px;

}

\@media (prefers-color-scheme: dark) {

:root {

\--color-bg: #111827;

\--color-text: #F9FAFB;

}

}

**5.5 Accessibility Baseline**

- **Focus Trap:** Modal keeps keyboard focus inside.

- **Esc to Close:** Must be implemented in Modal component.

- **Table Keyboard Nav:** ↑ ↓ move between rows; Home/End jump edges.

- **Visible Focus:** Custom outline for active elements.

**5.6 Definition of Done**

  -------------------------------------------------
  **Criterion**   **Description**
  --------------- ---------------------------------
  DCE Works       Components register and mount
                  successfully

  Props Parsed    JSON props and slot templates
                  render

  Accessibility   Modal & Table pass axe-core tests

  Theme           Light/Dark toggle via store.theme

  Code            80 % unit test coverage for
                  components
  -------------------------------------------------

**Testing, QA, Performance, Security & Release**

**6. Phase 4 --- Testing, Accessibility and QA Automation**

**6.1 Objective**

Guarantee reliability and compliance by embedding automated testing,
coverage enforcement, and accessibility validation directly into CI/CD.

**6.2 Testing Matrix**

  -----------------------------------------------------------------------------
  **Level**           **Tool**                **Purpose**
  ------------------- ----------------------- ---------------------------------
  **Unit**            Vitest + jsdom          Validate functions, store, API
                                              logic

  **Integration**     Testing Library         Verify component rendering and
                                              interactions

  **E2E**             Playwright              Simulate real user workflows

  **Accessibility**   axe-core                Detect WCAG 2.1 AA issues

  **Visual**          Storybook + Loki or     Catch visual regressions
                      Chromatic               

  **Coverage**        vitest-coverage         Track metrics across PRs
  -----------------------------------------------------------------------------

**6.3 CI Workflow Structure**

on: \[push, pull_request\]

jobs:

test:

runs-on: ubuntu-latest

steps:

\- uses: actions/checkout@v4

\- uses: actions/setup-node@v4

with: { node-version: 20 }

\- run: npm ci

\- run: npm run typecheck

\- run: npm run lint

\- run: npm test

\- run: npm run e2e

All CI jobs must pass before merging to develop or main.

**6.4 Accessibility Standards**

**Minimum Compliance:** WCAG 2.1 AA

**Testing Integration**

import { test, expect } from \"@playwright/test\";

import AxeBuilder from \"@axe-core/playwright\";

test(\"a11y scan\", async ({ page }) =\> {

await page.goto(\"http://localhost:5173/\");

const results = await new AxeBuilder({ page }).analyze();

expect(results.violations).toEqual(\[\]);

});

**Key Rules**

- All interactive elements reachable via Tab.

- Focus ring visible at all times.

- aria-\* attributes on all custom widgets.

- Modal = role=\"dialog\" aria-modal=\"true\"

- Table = aria-rowcount and keyboard navigation ↑ ↓ Home End.

**6.5 Testing Philosophy**

"No feature is done until it's tested, accessible, and typed."

Every new component requires its own \*.test.ts and axe scan.

**6.6 Definition of Done**

  ------------------------------------
  **Area**        **Requirement**
  --------------- --------------------
  Unit Coverage   ≥ 80 %

  E2E Flows       All major flows
                  tested

  Accessibility   Zero serious axe
                  violations

  CI Integration  Green pipeline on PR

  Visual          Baseline snapshots
  Regression      updated
  ------------------------------------

**7. Phase 5 --- Performance and Security Hardening**

**7.1 Objective**

Optimize bundle size, load time, and security to achieve
production-grade stability.

**7.2 Performance Blueprint**

  -------------------------------------------
  **Aspect**           **Target**
  -------------------- ----------------------
  **Core Bundle Size** ≤ 50 KB gzip

  **Vendor Bundle      ≤ 80 KB gzip
  Size**               

  **Lighthouse Score** ≥ 95

  **Time to            \< 2 seconds
  Interactive (TTI)**  

  **Code Splitting**   By page + heavy
                       components
  -------------------------------------------

**Analyzer Config (vite.config.ts)**

import { visualizer } from \"rollup-plugin-visualizer\";

export default { build:{ plugins:\[visualizer({ filename:\"stats.html\"
})\] } };

**7.3 Security Checklist**

  ----------------------------------------------------
  **Risk**               **Mitigation**
  ---------------------- -----------------------------
  **XSS**                DOMPurify in sanitize helper

  **CSP violations**     Policy defined in index.html

  **Unvalidated Data**   Zod schemas for all API and
                         form data

  **CSRF (Future)**      Include token header plan in
                         API calls

  **Dependency           npm audit \--production in CI
  Vulnerabilities**      

  **Error Leaks**        Error boundary masks stack
                         trace in UI
  ----------------------------------------------------

**Automation**

npm audit \--production

Fail the build if any high-severity CVE is found.

**7.4 Lighthouse & Web Vitals**

Run:

npx lighthouse http://localhost:5173 \--view

Integrate web-vitals reporter for LCP, FID, CLS tracking.

**7.5 Performance Review Gate**

- stats.html attached to release PR

- Lighthouse report ≥ 95

- No blocking render-path CSS

- Bundle budget met

**8. Phase 6 --- Documentation and Release**

**8.1 Objective**

Deliver human-readable documentation, changelog, and an automated
release pipeline to npm or internal registry.

**8.2 Documentation Framework**

- **VitePress** used for the docs site.

- Markdown files located in /docs.

- Must include:

  - architecture.md

  - api.md

  - component-apis/

  - development-workflow/

  - technical-specs/

  - CHANGELOG.md

**8.3 Changelog Format**

Example entry:

\## \[2.4.0\] -- 2025-05-20

\### Added

\- Dynamic Component Engine (DCE)

\- Proxy Store with Persistence

\### Fixed

\- CSP header for Safari

\### Security

\- DOMPurify policy tightened

**8.4 Release Workflow**

npm run build

npm run analyze

npm audit \--production

git tag -a v2.4.0 -m \"Release BetoDashboard 2.4\"

git push origin v2.4.0

npm publish \--access public

**CI/CD Automations**

- Release triggered on tag push.

- Artifacts uploaded to /dist.

- Changelog auto-linked in GitHub Release.

**8.5 Post-Deployment Verification**

  -------------------------------------------------------
  **Category**        **Verification**
  ------------------- -----------------------------------
  **Performance**     Lighthouse ≥ 95

  **Security**        No CSP/XSS violations

  **Accessibility**   axe 0 critical issues

  **Browser Matrix**  Chrome/Edge ≥ 110, Safari ≥ 16,
                      Firefox ≥ 100

  **Mobile**          Responsive verified ≤ 768 px

  **Regression**      Visual diffs match baseline
  -------------------------------------------------------

**8.6 Definition of Done**

  -------------------------------------
  **Area**            **Requirement**
  ------------------- -----------------
  **Type & Lint**     Clean build

  **Tests**           All CI green

  **Accessibility**   AA compliance

  **Performance**     Budgets met

  **Docs**            Updated + linked

  **Release**         Tag + artifact
                      verified
  -------------------------------------

**8.7 Release Lifecycle Diagram**

flowchart LR

A(Build) \--\> B(Test)

B \--\> C(Security Scan)

C \--\> D(Performance Audit)

D \--\> E(Release Tag)

E \--\> F(CI/CD Publish)

F \--\> G(Verification)

**Architecture Blueprint & Component Specifications**

**9. Architecture Blueprint**

**9.1 Global Store (State Layer)**

**Purpose**\
A minimal, framework-agnostic, reactive state container that persists UI
preferences and exposes a simple publish/subscribe API.

**Design Choices**

- Technology: ES6 Proxy + typed getters/setters (no external libs).

- Persistence: localStorage for UI prefs; volatile memory for user and
  cache.

- Reactivity: Dispatch a DOM CustomEvent(\"statechange\") on mutation.

**State Shape**

State

theme : \"light\" \| \"dark\" \| \"auto\" (persisted)

dir : \"ltr\" \| \"rtl\" (persisted)

sidebar : \"default\" \| \"compact\" \| \"collapsed\" (persisted)

user : { id: string; name?: string } \| null (volatile)

cache : Record\<string, unknown\> (volatile)

**Persistence Policy**\
Persist only theme, dir, sidebar. Never persist user or cache.

**Core API**

store.get(key) → any

store.set(key, val) → void

store.on(listener) → unsubscribe()

**Usage Contracts**

- Any UI that depends on these keys MUST listen for \"statechange\".

- Pages MUST set document.documentElement.dir to store.get(\"dir\") on
  boot.

- Theme switching MUST set \[data-theme\] on \<html\> or \<body\>.

**9.2 Dynamic Component Engine (DCE)**

**Purpose**\
A tiny runtime that mounts components declared in HTML with
data-component, passing JSON props and named slots, and wiring DOM
events.

**Design Choices**

- No Web Components or frameworks; plain TS functions.

- Registration via define(name, ctor); mounting via mountAll().

- Slots provided with \<template data-slot=\"\...\"\>.

**Component Contract**

type Ctor = (root: HTMLElement, props: any, slots:
Record\<string,string\>) =\> void;

define(name: string, ctor: Ctor): void

mountAll(): void

**Mounting Rules**

- DCE scans document for \[data-component\].

- Props are parsed from data-props (JSON).

- Slots are inner \<template data-slot=\"\...\"\>.

- Component is responsible for cleanup on removal.

**Update Strategy**

- Components should re-render selectively when needed on
  \"statechange\".

- For heavy re-renders, prefer inner updates (diff small regions) over
  full innerHTML replacement.

**9.3 API Fetcher (SWR + Zod)**

**Purpose**\
Typed, validated data retrieval with minimal caching and background
revalidation.

**Design Choices**

- Tech: native fetch, in-memory TTL Map, Zod schemas.

- Pattern: SWR ("Serve stale immediately; fetch fresh in background").

- Errors: Normalize as { code: number; message: string } for UI display.

**Fetcher Contract**

swr\<T\>(key, url, schema, ttlMs = 60000) → Promise\<T\>

**Error Handling**

- Network or schema errors bubble to caller; wrap calls in page-level
  withErrorBoundary.

- UI must display loading/empty/error states (Table & Modal examples
  provided later).

**9.4 Error Boundary (Non-React)**

**Purpose**\
Prevent async boot failures from freezing the UI and provide
deterministic fallback.

**Design**

- Wrapper: withErrorBoundary(asyncTask) --- sets a global error flag in
  DOM.

- Global listeners: window.onerror, unhandledrejection → mark
  data-app-error=\"true\" and reveal .global-error banner.

**Display Strategy**

- Page-wide, dismissible error banner.

- Optionally toast a succinct error message.

**9.5 Schema Registry**

**Purpose**\
Single source of truth for data contracts used by the API and UI.

**Conventions**

- File: /src/schemas.ts.

- Export Zod schemas (e.g., UserSchema, UsersResponse, ErrorResponse).

- Reference schemas in API calls and form validation.

**10. Component Specifications**

Each component definition includes: **Purpose, Props, Events, Slots,
A11y, States, Examples, and Acceptance Criteria**.

**10.1 Modal**

**Purpose**\
A generic dialog container with overlay, focus management, and ARIA
compliance.

**Props**

- title: string

- size: \"sm\" \| \"md\" \| \"lg\" (default \"md\")

- open: boolean (default false)

**Events**

- onOpen()

- onClose() --- must fire when Esc pressed, overlay clicked, or close
  button pressed.

**Slots**

- default --- modal body

- footer --- primary/secondary actions

**Accessibility**

- role=\"dialog\" aria-modal=\"true\"

- Focus trap within modal; Esc to close; restore focus to opener.

**States**

- Default, Loading (skeleton/loader in body), Error (inline message),
  Success (optional CTA)

**Usage Example**

\<div data-component=\"Modal\"
data-props=\'{\"title\":\"Saved\",\"size\":\"sm\",\"open\":true}\'\>

\<template data-slot=\"default\"\>

\<p\>Your changes have been saved successfully.\</p\>

\</template\>

\<template data-slot=\"footer\"\>

\<button data-close\>Close\</button\>

\</template\>

\</div\>

**Acceptance Criteria**

- Keyboard-only users can open, interact, and close.

- Axe scan yields no serious violations.

- Focus returns to trigger.

**10.2 Table**

**Purpose**\
Accessible data grid with optional sorting and pagination.

**Props**

- columns: Array\<{ key: string; label: string; sortable?: boolean }\>

- data: any\[\]

- sortable: boolean (default true)

- paginate: boolean (default false)

- Optional: pageSize: number (default 10)

**Events**

- onSort(columnKey: string, direction: \"asc\" \| \"desc\")

- onRowSelect(row: any)

**Slots**

- empty --- content for no rows

- loading --- skeleton/spinner region

**Accessibility**

- aria-rowcount & aria-colcount

- Keyboard navigation:

  - ↑/↓: move row focus; Home/End: first/last row

  - Enter/Space: select row (fires onRowSelect)

**States**

- Loading (skeleton rows), Empty (empty slot), Error (inline message),
  Paginated

**Acceptance Criteria**

- Sorting operates solely via keyboard and mouse.

- Screen readers announce column headers and sort direction.

**10.3 Loader**

**Purpose**\
Provide both spinner and skeleton variants to unify loading states.

**Props**

- type: \"spinner\" \| \"skeleton\"

- size: \"sm\" \| \"md\" \| \"lg\"

**A11y**

- role=\"status\" with visually-hidden text: "Loading..."

**Acceptance Criteria**

- Loader visible for \> 1s fetches; skeleton recommended for content
  grids.

**10.4 Toast (Planned)**

**Purpose**\
Non-blocking notifications with auto-dismiss.

**Props**

- message: string

- type: \"info\" \| \"success\" \| \"warning\" \| \"danger\"

- duration: number (ms; default 3000)

**A11y**

- aria-live=\"polite\" for non-critical; \"assertive\" for critical.

**11. Theme & Design Tokens**

**11.1 Token Philosophy**

- Tokens are **the design API** of the system: stable names, adjustable
  values.

- All styling must reference tokens; no hard-coded color/spacing in
  components.

**11.2 Token Categories & Baseline Values**

**Colors**

\--color-primary : #0046FF

\--color-primary-600 : #1F6FEB

\--color-bg : #FFFFFF

\--color-bg-muted : #F9FAFB

\--color-text : #11224E

\--color-text-muted : #4B5563

\--color-border : #E5E7EB

\--color-success : #16A34A

\--color-warning : #D97706

\--color-danger : #DC2626

**Typography**

\--font-body : \"Inter\", system-ui, -apple-system, sans-serif

\--font-heading : \"Tajawal\", \"Inter\", sans-serif

\--text-xs : 12px

\--text-sm : 14px

\--text-md : 16px

\--text-lg : 18px

\--text-xl : 20px

**Spacing & Radii**

\--space-2 : 8px

\--space-3 : 12px

\--space-4 : 16px

\--space-6 : 24px

\--radius : 10px

**Elevation**

\--shadow-sm : 0 1px 2px rgba(0,0,0,0.05)

\--shadow-md : 0 3px 6px rgba(0,0,0,0.10)

**Breakpoints**

\--bp-sm : 640px

\--bp-md : 768px

\--bp-lg : 1024px

\--bp-xl : 1280px

**Motion**

\--ease : cubic-bezier(0.2, 0.8, 0.2, 1)

\--speed : 220ms

**11.3 Dark Mode**

**Automatic** via media query with manual override using
\[data-theme=\"dark\"\].

\@media (prefers-color-scheme: dark) {

:root {

\--color-bg : #0D1117;

\--color-text : #E6EDF3;

}

}

:root\[data-theme=\"dark\"\] { /\* same as above to force dark \*/ }

**Policy**

- App starts in \"auto\" mode (follow system).

- User override persists in store.theme.

- Components only read tokens; they never check system prefs directly.

**11.4 RTL/LTR Direction Handling**

**Rule**\
Use **CSS logical properties** everywhere (e.g., margin-inline-start not
margin-left).\
Toggle dir via store.set(\"dir\", \"rtl\" \| \"ltr\") → applied to
\<html\>.

**Examples**

padding-inline: var(\--space-4);

border-inline-end: 1px solid var(\--color-border);

**11.5 Token Usage Acceptance Criteria**

- No hard-coded hex colors in component CSS.

- No physical-direction CSS properties.

- All font sizes/spacing reference tokens.

- Theme switch toggles across the app with zero component changes.

**12. Architecture & Components --- Acceptance Checklists**

**12.1 Architecture Checklist**

- Global store persists only UI prefs; emits statechange.

- API fetcher validates every payload with Zod; uses SWR TTL.

- Error boundary shows a global, dismissible banner; no uncaught errors.

- CSP present; no inline scripts beyond allowed policy.

- All HTML injection passes through the sanitize() helper.

**12.2 Component Checklist**

- Modal: Esc close, focus trap, restore focus to opener, axe clean.

- Table: Keyboard navigation, sortable headers toggle aria state, slots
  work.

- Loader: Uses role=\"status\" and hidden "Loading..." text.

- All: Tokens only; no hard-coded styles.

**12.3 Theme Checklist**

- Light/Dark mode switches via store.theme and updates instantly.

- RTL flips correctly using logical properties.

- Typography and spacing consistent across pages.

**Workflows, Branching, CI/CD, Deployment, Checklists & Appendices**

**13. Workflow & Collaboration Process**

**13.1 Collaboration Principles**

- Every contribution must pass **type, lint, and test gates** before
  merging.

- Documentation and changelogs are **first-class deliverables**.

- Code reviews ensure architectural and accessibility compliance, not
  just syntax.

- Security, performance, and accessibility are **continuous**---not
  post-hoc phases.

**13.2 Code Review Roles**

  ----------------------------------------------
  **Reviewer**        **Focus Area**
  ------------------- --------------------------
  **Architecture      Core logic, store, API,
  Lead**              DCE

  **UX Engineer**     Components, tokens, a11y
                      patterns

  **Infrastructure    Build, CI/CD, performance
  Engineer**          reports

  **QA Lead**         Tests, coverage,
                      regression results
  ----------------------------------------------

**Approval Rules**

- At least two approvals (technical + QA).

- All CI checks green before merge.

- Each PR links to a tracked issue and updates docs when APIs change.

**13.3 Git Branching Model**

main → protected branch (release)

develop → integration branch

feature/\* → new features

fix/\* → minor corrections

hotfix/\* → urgent production fixes

docs/\* → documentation updates

**Merge Flow**

flowchart TD

A(feature/\*) \--\> B(develop)

B \--\> C(main)

C \--\> D(Release Tag)

1.  Feature → develop (PR + review + CI)

2.  develop → main (version PR + tag)

3.  Tag → auto deploy via CI/CD

**13.4 Daily Work Cadence**

- **Daily stand-up:** Async report in project board.

- **Weekly review:** Architecture Lead + QA + PM.

- **Sprint length:** 2 weeks (default).

- **Tracking:** GitHub Projects (To-Do → In-Progress → Review → Done).

**14. Testing & Continuous Integration**

**14.1 Automated Test Pipeline**

1.  Type Check → Lint → Unit Tests

2.  Integration Tests → E2E → Accessibility

3.  Coverage → Visual Regression

4.  Security Audit → Performance Analysis

**14.2 Metrics Thresholds**

  -------------------------------------
  **Metric**             **Target**
  ---------------------- --------------
  Coverage (Unit +       ≥ 85 %
  Integration)           

  Lighthouse Performance ≥ 95

  Accessibility Score    AA (axe 0
                         critical)

  Bundle Size (Core)     ≤ 50 KB gzip

  Dependency             0 high
  Vulnerabilities        severity
  -------------------------------------

**15. Deployment & QA Verification**

**15.1 CI/CD Pipeline**

flowchart LR

A\[Push Tag\] \--\> B(Build)

B \--\> C(Test)

C \--\> D(Audit Security)

D \--\> E(Analyze Performance)

E \--\> F(Publish Artifacts)

F \--\> G(Notify QA)

**15.2 Build Commands**

npm run build

npm run analyze

npm audit \--production

Artifacts: /dist + stats.html

**15.3 Release Procedure**

1.  Update CHANGELOG.md

2.  Increment package.json version

3.  Tag and push:

git tag -a vX.Y.Z -m \"Release BetoDashboard vX.Y.Z\"

git push origin vX.Y.Z

4.  CI build → npm publish → GitHub Release

**15.4 Post-Deployment Verification**

  ---------------------------------------------------
  **Aspect**      **Verification**
  --------------- -----------------------------------
  Security        CSP valid, DOMPurify active

  Performance     Lighthouse ≥ 95

  Accessibility   axe 0 critical

  Browser Support Chrome/Edge ≥ 110, Safari ≥ 16,
                  Firefox ≥ 100

  Mobile          Responsive \< 768 px

  Regression      Visual baseline matches
  ---------------------------------------------------

**16. Appendices**

**A. File Tree Reference**

BetoDashboard/

├── public/

│ └── index.html

├── src/

│ ├── css/

│ │ ├── \_tokens.css

│ │ └── base.css

│ ├── js/

│ │ ├── store.ts

│ │ ├── api.ts

│ │ ├── error-boundary.ts

│ │ └── utils/sanitize.ts

│ ├── components/

│ │ ├── runtime.ts

│ │ ├── Modal.ts

│ │ ├── Table.ts

│ │ └── Loader.ts

│ ├── partials/

│ │ ├── sidebar.html

│ │ ├── header.html

│ │ └── footer.html

│ ├── pages/

│ │ ├── index.html

│ │ └── users.html

│ └── schemas.ts

├── docs/

│ ├── component-apis/

│ ├── development-workflow/

│ └── technical-specs/

├── vite.config.ts

├── postcss.config.js

├── package.json

└── README.md

**B. Sample Configs**

**postcss.config.js**

export default {

plugins: {

autoprefixer: {},

\'postcss-logical\': {},

\'postcss-dir-pseudo-class\': {}

}

}

**vite.config.ts**

import { defineConfig } from \"vite\";

import { visualizer } from \"rollup-plugin-visualizer\";

export default defineConfig({

build: {

rollupOptions: {

output: {

manualChunks: {

vendor: \[\"lodash\",\"axios\"\],

utils: \[\"./src/js/utils/\*\"\]

}

}

},

plugins: \[visualizer({ filename: \"stats.html\" })\]

}

});

**C. Glossary of Key Terms**

  -------------------------------------------------------------------------
  **Term**       **Definition**
  -------------- ----------------------------------------------------------
  **DCE**        Dynamic Component Engine, mounts HTML components with
                 props and slots

  **Zod**        Type-safe runtime schema validator

  **CSP**        Content Security Policy, browser enforcement against XSS

  **SWR**        Serve Stale While Revalidate data fetch pattern

  **WCAG 2.1     Web Content Accessibility Guidelines compliance level
  AA**           

  **Vitest**     Vite's unit testing framework

  **axe-core**   Accessibility testing engine

  **CI/CD**      Continuous Integration / Continuous Delivery pipeline

  **Tokens**     Design variables for color, typography, spacing

  **Proxy        Reactive state object using ES6 Proxy
  Store**        

  **Salla**      Platform baseline that inspired theme architecture
  -------------------------------------------------------------------------

**D. Developer Checklists**

**Before Commit**

- ✅ npm run typecheck

- ✅ npm run lint

- ✅ npm test

- ✅ axe scan (no violations)

- ✅ update CHANGELOG.md if API changed

**Before Release**

- ✅ All CI stages green

- ✅ Bundle \< target size

- ✅ Security audit clean

- ✅ Docs updated

- ✅ Version tagged

**E. Example Commands**

  ---------------------------------------
  **Purpose**   **Command**
  ------------- -------------------------
  Dev Server    npm run dev

  Build         npm run build

  Analyze       npm run analyze
  Bundle        

  Test All      npm test

  E2E           npm run e2e

  Audit         npm audit \--production
  Security      

  Publish       npm publish \--access
  Release       public
  ---------------------------------------

**F. Final Lifecycle Overview**

flowchart LR

A(Clone Repo)

B(Install Dependencies)

C(Build & Typecheck)

D(Test & A11y)

E(Security Audit)

F(Performance Review)

G(Release Tag)

H(Publish)

A \--\> B \--\> C \--\> D \--\> E \--\> F \--\> G \--\> H

**Conclusion**

The **BetoDashboard Handbook** now consolidates every technical,
procedural, and architectural element required for the project:

- Full roadmap from clone → build → test → secure → ship

- Explicit roles and responsibilities

- Concrete coding patterns for store, DCE, API, and components

- Detailed security, performance, and accessibility requirements

- Reproducible release workflow and verification steps

This document is now **developer-complete**---no stage of the project requires external clarification.

---

Prev: [BetoDashboard v2](./BetoDashboard_v2.md) | Next: [Handbook (WIP)](./handbook/BetoDashboard.md)

See also: [Docs Index](./index.md) | [Project README](../README.md)

</div>
