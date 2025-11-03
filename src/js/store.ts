export type State = {
  theme: "light" | "dark" | "auto";
  dir: "ltr" | "rtl";
  sidebar: "default" | "compact" | "collapsed";
  user: null | { id: string; name: string };
  cache: Record<string, unknown>;
};

const persisted = JSON.parse(localStorage.getItem("beto-state") || "{}");

const state: State = { theme:"auto", dir:"ltr", sidebar:"default", user:null, cache:{}, ...persisted };

const listeners = new Set<(k: keyof State, v: State[keyof State]) => void>();

export const store = {
  get: <K extends keyof State>(k: K) => state[k],
  set: <K extends keyof State>(k: K, v: State[K]): void => {
    state[k] = v;
    if (["theme", "dir", "sidebar"].includes(k)) {
      localStorage.setItem("beto-state", JSON.stringify({
        theme: state.theme, dir: state.dir, sidebar: state.sidebar
      }));
    }
    listeners.forEach(l => l(k, v));
  },
  on: (fn: (k: keyof State, v: State[keyof State]) => void) => {
    listeners.add(fn); return () => listeners.delete(fn);
  }
};