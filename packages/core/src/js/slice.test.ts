import { describe, it, expect } from 'vitest';
import { createSlice } from './slice';
import { store } from './store';

describe('createSlice', () => {
  it('gets and sets a store key', () => {
    store._resetForTesting();
    const sidebar = createSlice('sidebar');
    expect(sidebar.get()).toBe('default');
    sidebar.set('collapsed');
    expect(store.get('sidebar')).toBe('collapsed');
  });
});

