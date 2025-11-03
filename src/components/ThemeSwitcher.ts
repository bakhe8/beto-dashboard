import { define } from "./runtime";
import { store, State } from "../js/store";
import { sanitize } from "../js/utils/sanitize";

export const ThemeSwitcher = (root: HTMLElement) => {
  const render = () => {
    const currentTheme = store.get("theme");
    root.innerHTML = sanitize(`
      <div class="theme-switcher" role="radiogroup" aria-label="Theme">
        <button role="radio" data-theme="light" aria-checked="${currentTheme === 'light'}">Light</button>
        <button role="radio" data-theme="dark" aria-checked="${currentTheme === 'dark'}">Dark</button>
        <button role="radio" data-theme="auto" aria-checked="${currentTheme === 'auto'}">Auto</button>
      </div>
    `);
  };

  const handleClick = (e: Event) => {
    // Use .closest() to ensure the click is captured even if it's on a child element of the button.
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-theme]");
    if (target) {
      store.set("theme", target.dataset.theme as State["theme"]);
    }
  };

  root.addEventListener("click", handleClick);

  // Subscribe to store changes and re-render if the theme key is updated
  const unsubscribe = store.on("theme", render);
  render(); // Initial render

  // Return a cleanup function to remove the listener and the store subscription
  return () => {
    root.removeEventListener("click", handleClick);
    unsubscribe();
  };
};

define("ThemeSwitcher", ThemeSwitcher);