import { describe, it, expect } from 'vitest';
import { createDerived } from './derived';
import { store } from './store';

describe('createDerived', () => {
  it('computes from store keys and updates on change', () => {
    store._resetForTesting();
    const d = createDerived(['theme', 'dir'], (s) => `${s.theme}:${s.dir}`);
    expect(d.get()).toBe('auto:ltr');
    store.set('dir', 'rtl');
    expect(d.get()).toBe('auto:rtl');
    store.set('theme', 'dark');
    expect(d.get()).toBe('dark:rtl');
  });
});

