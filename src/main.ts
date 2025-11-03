import "./css/base.css";

// Import all components to register them
import "./components/Loader";
import "./components/Modal";
import "./components/Table";
import "./components/ThemeSwitcher";
import "./components/Sidebar";

import { mountAll } from "./components/runtime";
import { store, State } from "./js/store";

function applyTheme(theme: State["theme"]) {
  const root = document.documentElement;
  if (theme === "auto") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    root.dataset.theme = prefersDark ? "dark" : "light";
  } else {
    root.dataset.theme = theme;
  }
}

// Apply theme on initial load
applyTheme(store.get("theme"));

// Re-apply theme when the store value changes
store.on((key, value) => key === "theme" && applyTheme(value as State["theme"]));

// Listen for system theme changes to make "auto" mode reactive
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (store.get("theme") === "auto") {
      applyTheme("auto");
    }
  });

// Mount all components declared in the HTML
mountAll();