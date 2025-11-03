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

const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const handleThemeChange = () => {
  applyTheme(store.get("theme"));
};

// 1. Apply theme on initial load
handleThemeChange();

// 2. Re-apply theme when the store value changes
store.on("theme", handleThemeChange);

// 3. Listen for system theme changes ONLY if the mode is "auto"
themeMediaQuery.addEventListener("change", () => {
  if (store.get("theme") === "auto") {
    handleThemeChange();
  }
});

// Mount all components declared in the HTML
mountAll();

// --- Add interactive modal logic ---
document.getElementById("open-modal-btn")?.addEventListener("click", () => {
  // Update the store to open the modal; the component will reactively render itself.
  store.set("modal", { open: true, title: "Confirm Action" });
});