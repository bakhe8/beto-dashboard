import { store, State } from './store';

export function createSlice<K extends keyof State>(key: K) {
  return {
    get: () => store.get(key),
    set: (value: State[K]) => store.set(key, value),
    on: (fn: (value: State[K]) => void) => store.on(key, fn),
  };
}

