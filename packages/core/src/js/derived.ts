import { store, State } from './store';

export type Unsubscribe = () => void;

// Creates a derived value from one or more state keys.
export function createDerived<Ks extends (keyof State)[], T>(
  keys: [...Ks],
  compute: (s: Pick<State, Ks[number]>) => T,
  cb?: (value: T) => void
): { get: () => T; subscribe: (fn: (value: T) => void) => Unsubscribe } {
  let current = compute(pick(keys));
  if (cb) cb(current);
  const unsubscribers = keys.map((k) => store.on(k, () => {
    const next = compute(pick(keys));
    current = next;
    if (cb) cb(next);
  }));

  function pick(keys: (keyof State)[]): any {
    const obj: Partial<State> = {};
    for (const k of keys) (obj as any)[k] = store.get(k as any);
    return obj as Pick<State, Ks[number]>;
  }

  return {
    get: () => current,
    subscribe: (fn) => {
      fn(current);
      const unsubs = keys.map((k) => store.on(k, () => fn(compute(pick(keys)))));
      return () => unsubs.forEach((u) => u());
    }
  };
}

