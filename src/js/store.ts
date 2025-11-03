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
let listeners = new Set<(k: keyof State, v: State[keyof State]) => void>();

export const store = {
  get: <K extends keyof State>(k: K) => state[k],
  set: <K extends keyof State>(k: K, v: State[K]): void => {
    state[k] = v;
    if (persistedKeys.includes(k)) {
      const persistedState = persistedKeys.reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {} as Partial<State>);
      localStorage.setItem(PERSIST_KEY, JSON.stringify(persistedState));
    }
    listeners.forEach(l => l(k, v));
  },
  on: (fn: (k: keyof State, v: State[keyof State]) => void) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  // Method for test environments to reset the store state
  _resetForTesting: () => {
    state = getInitialState();
    listeners.clear();
  },
};