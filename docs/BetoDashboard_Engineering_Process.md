[Docs Index](./index.md) | [Project README](../README.md) | [BetoDashboard v2](./BetoDashboard_v2.md) | [Tradeoffs & Scaling](./BetoDashboard_Tradeoffs_and_Scaling_Strategy.md)

# Engineering Process Behind Our Analysis

This chapter documents how we frame problems, derive requirements, design solutions, and validate outcomes in BetoDashboard. It is a developer-facing record of the engineering reasoning behind our architecture.

## Problem Framing in Action

We ground every architectural decision in a concrete pain we observed during development.

### Manual DOM Management → Fragility and Reflows
- Problem: Components were mutating `innerHTML` directly, duplicating event binding, and causing layout thrash during updates.
- Requirement: Safe, minimal-change DOM updates with centralized event wiring.
- Solution: Introduced DOM helpers and event delegation.

TypeScript (actual code):
```ts
// packages/core/src/js/dom.ts
export function setHTML(el: Element, html: string) {
  (el as HTMLElement).innerHTML = sanitize(html); // DOMPurify
}
export function replaceChildren(el: Element, ...nodes: (Node | string)[]) { /* ... */ }

// packages/core/src/js/events.ts
export function on(root: Document | HTMLElement, type: string, selector: string, handler: (ev: Event, target: Element) => void) { /* ... */ }
```

Adoption example:
```ts
// Sidebar now uses setHTML (sanitized)
setHTML(root, `<header class="sidebar-header">...</header>`);

// Delegated events
on(root, 'click', 'button[role=radio]', (_ev, target) => { /* ... */ });
on(root, 'click', '.toast-close', (_ev, btn) => { /* ... */ });
```

💭 Note: Centralized delegation avoids per-node listeners and allowed us to remove multiple `addEventListener` calls, reducing listener count and GC pressure.

### Boilerplate for Complex UIs → Repeated Logic
- Problem: Repeated patterns for derived values, async status, and single-key store access.
- Requirement: Small, composable primitives to compose behavior without framework lock-in.
- Solution: `createDerived`, `createAsyncAction`, and `createSlice` utilities.

TypeScript (actual code):
```ts
// packages/core/src/js/derived.ts
export function createDerived(keys, compute, cb?) { /* computes from store keys */ }

// packages/core/src/js/asyncAction.ts
export function createAsyncAction(fn) { /* status: idle/loading/success/error */ }

// packages/core/src/js/slice.ts
export function createSlice(key) { /* get/set/on for a single store key */ }
```

Usage examples:
```ts
const themeDir = createDerived(['theme', 'dir'], (s) => `${s.theme}:${s.dir}`);
themeDir.subscribe(v => document.documentElement.dataset.themeDir = v);

const sidebar = createSlice('sidebar');
sidebar.set('collapsed');

const loadUsers = createAsyncAction(async () => fetch('/api/users').then(r => r.json()));
await loadUsers.run();
```

💭 Note: Converting repeated patterns to primitives lowered component LOC and made status handling consistent across modules.

### Learning Curve → Inconsistent Patterns
- Problem: Custom ad-hoc patterns made it harder for new engineers to navigate the code.
- Requirement: Familiar structures (delegation, minimal base class, explicit store APIs) with strong typing.
- Solution: `BaseComponent` with scoped delegation and effects; explicit exports from `@betodashboard/core`.

TypeScript (actual code):
```ts
// packages/core/src/components/BaseComponent.ts
export class BaseComponent {
  protected on(type: any, selector: string, handler: (ev: any, target: Element) => void) { /* ... */ }
  protected effect(setup: () => (() => void) | void) { /* lifecycle-registered disposer */ }
}
```

💭 Note: The base class is intentionally small. It standardizes lifecycle without forcing a framework-level component model.

## Requirements Analysis Process

We translate problems into requirements, then pick verifiable implementations.

- Safety
  - Implementation: `setHTML` sanitizes with DOMPurify; CSP enforced; `sanitize.ts` used in all HTML paths.
  - Verification: Unit tests for sanitization; Playwright a11y scans (axe-core); CI `npm audit --production` gate.
  - Why it scales: Reduces security regressions as team size grows.

- Performance
  - Implementation: Delegated events; minimal HTML updates; planned fragment-diff step; Lighthouse budgets; bundle chunking for vendor.
  - Verification: Lighthouse CI with budgets; bundle gate via `scripts/check-bundle.mjs`; planned reflow sampling via PerformanceObserver.
  - Why it scales: Predictable budgets enable component growth without hidden costs.

- Maintainability
  - Implementation: Slices/Derived/AsyncAction; BaseComponent; clear separation in `packages/core` vs demo app.
  - Verification: LOC reduction per component; test readability; churn tracking in git.
  - Why it scales: Reusable primitives reduce cognitive overhead and duplication.

- Composition
  - Implementation: DCE (`define`, `mountAll`), data-props JSON, slots via `<template data-slot>`.
  - Verification: E2E mounts (playwright) and story-driven examples; integration tests.
  - Why it scales: Decouples authoring from integration (works across MPA/SPAs).

- Debugging & Observability
  - Implementation: Consistent store APIs, error-boundary, Playwright traces; `web-vitals` reporting.
  - Verification: E2E traces; screenshots; perf logs during runs.
  - Why it scales: Production issues are quicker to triage with consistent patterns.

## Solving the Right Problem — Validation Cases

Short case studies from our dev cycle.

1) Replace direct DOM mutations with setHTML/replaceChildren
- Scenario: Components were reconstructing inner markup and rebinding listeners on every change.
- Observation: After migrating to `setHTML` + delegated events, the number of active event listeners in devtools dropped; visual jank decreased when toggling Sidebar/Modal.
- Result: Fewer reflows during interactive updates; simpler cleanup.  
  💭 Note: In local profiling, layout-related time during Sidebar toggle fell noticeably; we plan to codify this with PerformanceObserver sampling.

2) Event delegation for toasts and theme buttons
- Scenario: Toast close buttons and theme radios added and removed frequently.
- Observation: `on(root, 'click', selector, ...)` eliminated repeated binds per element instance.
- Result: Lower memory churn and fewer leaked handlers when rapidly adding/removing toasts.

3) StateSlice + Derived reduce duplication
- Scenario: Repeated access patterns for single keys and composites (theme+dir).
- Observation: Replaced boilerplate with `createSlice('sidebar')` and `createDerived(...)`.
- Result: Cleaner components; easier unit testing; less code churn when store shape evolves.

## Technical Validation Framework

How we evaluate whether a solution is working — and when to iterate.

Planned measurements and harnesses:

- DOM Performance
  - Render cycles: count updates per interaction (e.g., Sidebar toggle, Modal open/close).
  - Fragment-diff time: micro-bench `replaceChildren` vs naive innerHTML for typical nodes.
  - Reflow frequency: PerformanceObserver + DevTools performance profiling in CI (headless samples).

- State Consistency
  - Mutation tracking: instrument store.set keys and update latency (ms) per dispatch.
  - Transaction validation: batch updates (future) to ensure atomic UI transitions.

- Developer Experience
  - Onboarding: track time from clone → first green build.
  - Cognitive load: LOC per component before/after primitives; count of event bindings per component.
  - Error discoverability: time-to-fix for common failures (scripts to surface diffs, failing gates).

Tooling pipeline:
- Lighthouse budgets (lighthouserc.json + lighthouse-budgets.json)
- Bundle gate (scripts/check-bundle.mjs)
- Playwright + axe (accessibility.spec.ts)
- CI coverage gates (vitest coverage thresholds)
- Optional perf dashboards (future): serialize PerformanceObserver samples; visualize trends per PR.

## Architectural Connections

This process directly informs long-term architecture:

- Virtual Fragment Rendering
  - From “minimize DOM churn” → fragment-based updates and (planned) virtual fragment diffing for predictable reflow control.

- Plugin System
  - From “extensibility and autonomy” → a formal component/slot contract with isolated lifecycles and clear store boundaries.

- Config-Driven Modules
  - From “consistency at scale” → `beto.config` (planned) driving tokens, CSP, and guardrails across apps.

These are not isolated features; they emerge from disciplined problem framing and verifiable requirements.

## Developer Commentary (inline examples)

```ts
// Modal focus trap (excerpt) using BaseComponent effects
const keyListener = (e: KeyboardEvent) => this.trapTab(e);
document.addEventListener('keydown', keyListener as any);
this.effect(() => () => document.removeEventListener('keydown', keyListener as any));
```
💭 Note: Using `effect` ensures cleanup is tied to component lifetime — no orphan handlers after unmount.

```ts
// Delegated radio group handling
this.on('click' as any, 'button[role=radio]', (_ev, target) => {
  const next = (target as HTMLButtonElement).dataset.theme as State['theme'];
  if (next === 'light' || next === 'dark' || next === 'auto') store.set('theme', next);
});
```
💭 Note: Delegation lets the markup renew without rebinding listeners.

```ts
// Derived state powering document attributes
const themeDir = createDerived(['theme', 'dir'], (s) => `${s.theme}:${s.dir}`);
themeDir.subscribe(v => document.documentElement.dataset.themeDir = v);
```
💭 Note: Keeping derivations out of components prevents subtle duplication and makes testing trivial.

## Engineering Lessons Learned

- Problem-first discipline works
  - Starting with the real pain (DOM fragility, boilerplate, learning curve) led to small, high-leverage primitives instead of over-engineering.

- Developer experience drives good architecture
  - Reducing boilerplate (Slices/Derived/AsyncAction) improved readability and testability, which in turn made the system safer to evolve.

- Always define measurable requirements before coding
  - Budgets, gates, and test signals make decisions auditable; they’re the guardrails for team growth.

- Lifecycle-aware patterns prevent leaks
  - Effects and delegation ensure no orphaned listeners and predictable cleanup.

- Prepare for scale early, but evolve incrementally
  - Virtual fragment rendering, plugin APIs, and config-driven modules are natural next steps — grounded in the problems we validated.

---

Next: See the [Tradeoffs & Scaling Strategy](./BetoDashboard_Tradeoffs_and_Scaling_Strategy.md) for long-term architectural paths and the [Execution Roadmap v2](./BetoDashboard_v2.md) for phase gates and KPIs.

Also see: [Engineering Metrics & Validation](./architecture/metrics.md) for how we collect and track measurable signals.

See: [Development Morphology](./architecture/morphology.md) for standard forms and scaffolding rules that make features buildable, repeatable, and extensible.
