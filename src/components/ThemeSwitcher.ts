import { define } from "./runtime";
import { store } from "../js/store";

define("ThemeSwitcher", (root) => {
  const render = () => {
    const currentTheme = store.get("theme");
    root.innerHTML = `
      <div class="theme-switcher">
        <button data-theme="light" aria-pressed="${currentTheme === "light"}">Light</button>
        <button data-theme="dark" aria-pressed="${currentTheme === "dark"}">Dark</button>
        <button data-theme="auto" aria-pressed="${currentTheme === "auto"}">Auto</button>
      </div>
    `;
  };

  render();

  root.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const theme = target.dataset.theme;

    if (theme === "light" || theme === "dark" || theme === "auto") {
      store.set("theme", theme);
    }
  });

  // Re-render the component when the theme changes from another source
  const unsubscribe = store.on((key) => {
    if (key === "theme") render();
  });

  return unsubscribe;
});