[Docs Index](./index.md) | [Project README](../README.md)

# Deployment

This guide covers how to deploy the VitePress documentation site to GitHub Pages.

## 1. Configure VitePress

To ensure the site works correctly on GitHub Pages, you must set the `base` path in the VitePress configuration. This should match your repository name.

Open `docs/.vitepress/config.ts` and add the `base` property:

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/beto-dashboard/', // Add this line
  title: "BetoDashboard",
  // ... rest of the config
})
```

## 2. Create a Deployment Workflow

Create a new GitHub Actions workflow file at `.github/workflows/docs-deploy.yml`. This workflow will automatically build the documentation and push it to the `gh-pages` branch every time you push to `main`.

```yaml
name: Deploy Docs to GitHub Pages

on:
  push:
    branches:
      - main # Trigger on pushes to the main branch

permissions:
  contents: write # Allow writing to the repository (for gh-pages branch)

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build documentation site
        run: npm run docs:build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

## 3. Configure GitHub Pages

Finally, configure your repository to serve the documentation from the `gh-pages` branch:

1.  Go to your repository's **Settings > Pages**.
2.  Under "Build and deployment", select **GitHub Actions** as the source.

Now, every push to the `main` branch will trigger the workflow and update your live documentation site.
