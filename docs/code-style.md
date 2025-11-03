# Code Style

To maintain a consistent and high-quality codebase, this project uses **ESLint** for code analysis and **Prettier** for automated code formatting.

## ESLint

ESLint is used to find and fix problems in your JavaScript/TypeScript code. It helps enforce coding standards and avoid common pitfalls.

### Running ESLint

You can run the linter across the entire project with the following command:

```bash
npm run lint
```

## Prettier

Prettier is an opinionated code formatter that enforces a consistent style by parsing your code and re-printing it with its own rules.

### Running Prettier

To format all files in the project, run:

```bash
npm run format
```

## Pre-commit Hooks

This project uses **Husky** and **lint-staged** to automatically format your code before you commit. When you run `git commit`, Prettier will automatically run on all staged files (`.js`, `.ts`, `.css`, `.md`).

This ensures that all code contributed to the repository adheres to the same formatting standards without any manual effort. The configuration can be found in the `lint-staged` section of `package.json`.