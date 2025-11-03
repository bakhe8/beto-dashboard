import 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeVisible(): void;
  }
  interface AsymmetricMatchersContaining {
    toBeVisible(): void;
  }
}

