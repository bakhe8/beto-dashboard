[Docs Index](./index.md) | [Project README](../README.md)

# Security

This project ships with a strong default security posture, including DOMPurify for HTML sanitization, Zod for schema validation, and a Content Security Policy (CSP) meta tag for baseline protection. This guide explains how to harden the CSP for production.

## Content Security Policy (CSP)

The project includes a `<meta>` tag in `index.html` with a default CSP. While this is great for development, it is **highly recommended** to implement a stricter policy via HTTP headers in a production environment.

### Development vs. Production

-   **Development:** The default CSP is more permissive to allow for Vite's Hot Module Replacement (HMR), which uses WebSockets (`connect-src ws:`) and injects styles (`style-src 'unsafe-inline'`).
-   **Production:** The production build generates static assets with no inline scripts or styles, allowing for a much stricter policy.

### Recommended Production CSP

You should configure your web server to send the `Content-Security-Policy` HTTP header. This is more secure than using a meta tag.

**Nginx Example:**

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';" always;
```

**Express.js Example (with `helmet`):**

```javascript
import helmet from 'helmet';

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", "data:"],
    fontSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    frameAncestors: ["'none'"],
  },
}));
```

> **Note:** If you use external assets (e.g., from a CDN), you must explicitly whitelist those origins in the appropriate directives (e.g., `script-src`, `style-src`).

## HTML Sanitization

All dynamic HTML rendered by components is passed through a `sanitize` utility, which uses **DOMPurify**. This is a critical defense against Cross-Site Scripting (XSS) attacks by ensuring that any potentially malicious code is stripped from user-provided or API-sourced content before it is injected into the DOM.

The configuration `{ SAFE_FOR_TEMPLATES: true }` is used to ensure that HTML `<template>` elements, which are used by the component engine for slots, are preserved.

## Runtime Schema Validation

The project uses **Zod** to validate the structure of data at runtime, particularly for API responses. This prevents malformed or unexpected data from propagating through the application, which could otherwise lead to security vulnerabilities or crashes. All data contracts are defined in `src/schemas.ts`.
