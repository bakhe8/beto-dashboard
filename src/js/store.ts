export type State = {
  theme: "light" | "dark" | "auto";
  dir: "ltr" | "rtl";
  sidebar: "default" | "collapsed";
  user: null | { id: string; name: string };
  cache: Record<string, unknown>;
  modal: { open: boolean; title: string };
};

const PERSIST_KEY = "beto-state";
const persistedKeys: (keyof State)[] = ["theme", "dir", "sidebar"];

const getInitialState = (): State => {
  const persisted = JSON.parse(localStorage.getItem(PERSIST_KEY) || "{}");
  return { theme: "auto", dir: "ltr", sidebar: "default", user: null, cache: {}, modal: { open: false, title: "" }, ...persisted };
};

let state: State = getInitialState();
// Key-scoped listeners receive only the value for a specific key
const keyListeners = new Map<keyof State, Set<(value: any) => void>>();
// Global listeners receive (key, value) pairs for any change
type GlobalListener = (key: keyof State, value: State[keyof State]) => void;
const globalListeners = new Set<GlobalListener>();

type OnType = {
  <K extends keyof State>(key: K, fn: (value: State[K]) => void): () => void;
  (fn: (key: keyof State, value: State[keyof State]) => void): () => void;
};

const on: OnType = ((arg1: any, arg2?: any): () => void => {
  // Global subscription
  if (typeof arg1 === "function") {
    const listener = arg1 as GlobalListener;
    globalListeners.add(listener);
    return () => {
      globalListeners.delete(listener);
    };
  }

  // Key-specific subscription
  const key = arg1 as keyof State;
  const fn = arg2 as (value: any) => void;
  if (!keyListeners.has(key)) {
    keyListeners.set(key, new Set());
  }
  keyListeners.get(key)!.add(fn);
  return () => {
    const set = keyListeners.get(key);
    if (set) {
      set.delete(fn);
      if (set.size === 0) keyListeners.delete(key);
    }
  };
}) as OnType;

export const store = {
  get: <K extends keyof State>(k: K) => state[k],
  set: <K extends keyof State>(k: K, v: State[K]): void => {
    state[k] = v;
    if (persistedKeys.includes(k)) {
      const persistedState: Partial<State> = {};
      for (const key of persistedKeys) {
        (persistedState as any)[key] = state[key];
      }
      localStorage.setItem(PERSIST_KEY, JSON.stringify(persistedState));
    }
    // Notify key-specific listeners
    keyListeners.get(k)?.forEach(fn => fn(v));
    // Notify global listeners with (key, value)
    globalListeners.forEach(fn => fn(k, v));
  },
  on,
  // Method for test environments to reset the store state
  _resetForTesting: () => {
    state = getInitialState();
    keyListeners.clear();
    globalListeners.clear();
  },
};
