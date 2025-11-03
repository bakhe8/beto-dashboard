---
title: Security
---

# Security

This project ships with a strong default posture: DOMPurify HTML sanitization, Zod validation, and a CSP meta tag. Use this guide to harden CSP in production and apply nonces if you must keep inline content.

## CSP Overview

- Dev: Vite injects styles and uses WebSocket HMR — requires `style-src 'unsafe-inline'` and `connect-src ws:`.
- Prod: No inline scripts/styles are needed. Use a strict header-based CSP.

### Recommended Production CSP

Set via HTTP response headers (prefer this over `<meta>`):

Nginx example:

```
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" always;
```

Express example:

```ts
import helmet from 'helmet';
app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'"],
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'", 'data:'],
    'connect-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'frame-ancestors': ["'none'"],
  },
}));
```

If you rely on CDNs, whitelist them explicitly instead of using wildcards.

## Using Nonces (if you must use inline)

This app avoids inline scripts/styles by default. If you need inline blocks, use nonces instead of `'unsafe-inline'`.

1. Generate a random nonce per response (base64).
2. Add it to your CSP as `'nonce-<value>'` in `script-src` or `style-src`.
3. Add the same `nonce` attribute to the inline `<script>`/`<style>` tags.

Express example:

```ts
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

app.use((req, res, next) => {
  const nonce = res.locals.nonce;
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ].join('; '));
  next();
});
```

Then render inline tags as:

```html
<script nonce="{{nonce}}">/* inline js */</script>
<style nonce="{{nonce}}">/* inline css */</style>
```

## Trusted Types (advanced)

To further mitigate DOM XSS, enable Trusted Types and configure DOMPurify:

```html
<!-- Add to CSP -->
<meta http-equiv="Content-Security-Policy" content="...; require-trusted-types-for 'script'; trusted-types dompurify;" />
```

```ts
// Example: create policy name 'dompurify' to match CSP trusted-types list.
// DOMPurify integrates with Trusted Types automatically when available.
// Ensure all HTML insertion flows pass through DOMPurify.sanitize().
```

## Playwright & Dev

- For local dev and E2E, a more permissive CSP may be necessary to allow HMR (`connect-src ws:`) and injected styles (`style-src 'unsafe-inline'`).
- Keep production CSP strict via server headers; do not rely on `<meta>` in prod.
