import { store, State } from "./store";

/**
 * Manages global UI state like theme and text direction based on the store.
 */
function applyUIState(key: keyof State) {
  if (key === "theme") {
    const theme = store.get("theme");
    if (theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
  }

  if (key === "dir") {
    document.documentElement.dir = store.get("dir");
  }
}

// Apply initial state on load
applyUIState("theme");
applyUIState("dir");

// Subscribe to future changes
store.on((key) => applyUIState(key));