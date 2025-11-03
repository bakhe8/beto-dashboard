import "@core/css/base.css";

import "@core/components/Loader";
import "@core/components/Modal";
import "@core/components/Table";
import "@core/components/ThemeSwitcher";
import "@core/components/Sidebar";
import "@core/components/ToastContainer";

import { mountAll } from "@core/components/runtime";
import { store, State } from "@core/js/store";
import "@core/js/error-boundary";
import { initWebVitals } from "@core/js/web-vitals";

function applyTheme(theme: State["theme"]) {
  const root = document.documentElement;
  if (theme === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = prefersDark ? "dark" : "light";
  } else {
    root.dataset.theme = theme;
  }
}

const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const handleThemeChange = () => { applyTheme(store.get("theme")); };
handleThemeChange();
store.on("theme", handleThemeChange);

themeMediaQuery.addEventListener("change", () => {
  if (store.get("theme") === "auto") handleThemeChange();
});

mountAll();

document.getElementById("open-modal-btn")?.addEventListener("click", () => {
  store.set("modal", { open: true, title: "Confirm Action" });
});

initWebVitals();