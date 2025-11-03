[Docs Index](./index.md) | [Project README](../README.md)

# Contribution Guide

We welcome contributions from the community! To ensure a smooth and collaborative process, please follow these guidelines, which are derived from our internal handbook.

## Core Principles

-   **Quality Gates:** Every contribution must pass type, lint, and test gates before merging.
-   **Documentation:** Documentation and changelogs are first-class deliverables.
-   **Holistic Reviews:** Code reviews ensure architectural and accessibility compliance, not just syntax.
-   **Continuous Standards:** Security, performance, and accessibility are continuous concerns, not afterthoughts.

## Git Branching Model

We use a GitFlow-like branching model:

-   `main`: Protected branch for stable releases.
-   `develop`: Integration branch for new features.
-   `feature/*`: For developing new features.
-   `fix/*`: For minor bug fixes.
-   `docs/*`: For documentation updates.

### Merge Flow

1.  Create your `feature/*` or `fix/*` branch from `develop`.
2.  Once complete, open a Pull Request (PR) to merge back into `develop`.
3.  After passing CI and code review, your PR will be merged.
4.  Periodically, `develop` is merged into `main` to create a new release.

## Code Review Process

-   **Approvals:** At least two approvals are required (one technical, one QA/UX).
-   **CI Checks:** All CI checks must be green before a PR can be merged.
-   **Issue Linking:** Each PR should link to a tracked issue.
-   **Documentation:** If your PR changes an API, the documentation must be updated accordingly.

### Reviewer Focus Areas

| Reviewer         | Focus Area                               |
| ---------------- | ---------------------------------------- |
| Architecture Lead| Core logic, store, API, DCE              |
| UX Engineer      | Components, design tokens, accessibility |
| Infrastructure   | Build, CI/CD, performance reports        |
| QA Lead          | Tests, coverage, regression results      |
