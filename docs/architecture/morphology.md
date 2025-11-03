---
title: Development Morphology
---

# Development Morphology

This guide standardizes the shape, flow, and semantics of how we build within BetoDashboard.

## Component Structure Morphology

- Naming: PascalCase component names; files at `packages/core/src/components/Name.ts`.
- Entry: `define('Name', Component)` via DCE; export default for direct imports.
- Form: Prefer the `ComponentMorph.create()` template for simple components.
- HTML: Generate markup via `render(ctx) => string` and inject with `setHTML()`.
- Events: Use delegated selectors in `events` map.
- Slots: Consume `ctx.slots` for composition; prefer semantic regions.

Outline
```
Name.ts
  └─ ComponentMorph.create('Name', {
       stateKeys: ['theme'|'dir'|...],
       render({ root, props, slots, state }) => string,
       events: { selector: (ev, target, ctx) => void },
       afterRender?: (ctx) => void
     })
```

## Lifecycle Flow Morphology

Sequence: create → (subscribe) → render → events/effects → update → teardown.
- Creation: Initialize ctx (root, props, slots, state snapshot).
- Subscription: For `stateKeys`, re-render on change.
- Render: Produce and set sanitized HTML.
- Events: Delegated handlers are attached once via BaseComponent.
- Teardown: Unsubscribe and dispose effects.

## State Morphology

- Single key access: `createSlice('key')` for get/set/on.
- Derived values: `createDerived([...keys], compute)` for stable compositions.
- Async flows: `createAsyncAction(fn)` for predictable status transitions.

## Development Process Morphology

- Scaffolding: `npm run morph:component -- --name=UserList` generates a component skeleton.
- Tests: Prefer unit tests per primitive; E2E for composition and a11y.
- Docs: Add a short usage snippet under `docs/components/` when stabilizing.

## Morphological Patterns for Scalability

- Reusable UI templates: Notice, Modal, Table, FormGroup (planned) via ComponentMorph.
- Store key conventions: kebab-case in HTML `data-props`, camelCase in TypeScript, keys declared in `State`.
- Unified config (planned): `beto.config.ts` to drive tokens, CSP toggles, and component defaults.

## Rules (Adopt as Defaults)

- Prefer `ComponentMorph.create()` for non-trivial DOM components.
- Always delegate events through `BaseComponent.on()` or `events` map.
- Avoid raw `innerHTML`; use `setHTML()`.
- Persist only whitelisted state keys.
- Add unit tests when introducing a new primitive.

## Prototype Implementations

- ComponentMorph factory: `@betodashboard/core/js/morph`.
- Example component using Morph: `Notice` (dismissible message).
- CLI generator: `npm run morph:component -- --name=MyComponent`.

