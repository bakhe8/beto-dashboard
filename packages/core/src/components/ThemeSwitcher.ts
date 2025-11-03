import { define } from "./runtime";
import { store, State } from "../js/store";
import { sanitize } from "../js/utils/sanitize";

export const ThemeSwitcher = (root: HTMLElement) => {
  let initialized = false;
  const render = () => {
    const currentTheme = store.get("theme");
    if (!initialized) {
      root.innerHTML = sanitize(`
        <div class="theme-switcher" role="radiogroup" aria-label="Theme">
          <button role="radio" data-theme="light" aria-checked="${currentTheme === 'light'}" tabindex="${currentTheme === 'light' ? 0 : -1}">Light</button>
          <button role="radio" data-theme="dark" aria-checked="${currentTheme === 'dark'}" tabindex="${currentTheme === 'dark' ? 0 : -1}">Dark</button>
          <button role="radio" data-theme="auto" aria-checked="${currentTheme === 'auto'}" tabindex="${currentTheme === 'auto' ? 0 : -1}">Auto</button>
        </div>
      `);
      initialized = true;
      return;
    }

    // Update aria-checked and tabindex on existing buttons to preserve nodes for tests
    const mapping: Record<string, State["theme"]> = { light: "light", dark: "dark", auto: "auto" };
    const buttons = root.querySelectorAll<HTMLButtonElement>("button[role=radio]");
    buttons.forEach(btn => {
      const key = (btn.dataset.theme || btn.textContent?.trim().toLowerCase() || "") as keyof typeof mapping;
      const theme = mapping[key];
      const checked = theme === currentTheme;
      btn.setAttribute("aria-checked", String(checked));
      btn.setAttribute("tabindex", checked ? "0" : "-1");
    });
  };

  const handleClick = (e: Event) => {
    // Use .closest() to ensure the click is captured even if it's on a child element of the button.
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>("button[role=radio]");
    if (!target) return;
    const label = (target.textContent || "").trim().toLowerCase();
    const attr = target.dataset.theme as State["theme"] | undefined;
    const next = (attr || (label as State["theme"])) as State["theme"]; // fallback to text
    if (next === "light" || next === "dark" || next === "auto") store.set("theme", next);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const group = root.querySelector<HTMLElement>(".theme-switcher");
    if (!group) return;
    const options: HTMLElement[] = Array.from(group.querySelectorAll("button[role=radio]"));
    if (options.length === 0) return;

    const current = store.get("theme");
    const order: State["theme"][] = ["light", "dark", "auto"];
    const idx = order.indexOf(current);
    let nextIdx = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIdx = (idx + 1) % order.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIdx = (idx - 1 + order.length) % order.length;
    } else {
      return;
    }
    const next = order[nextIdx];
    store.set("theme", next);
    // Move focus to the newly selected option
    const nextBtn = options.find(o => o.getAttribute("data-theme") === next);
    nextBtn?.focus();
  };

  root.addEventListener("click", handleClick);
  root.addEventListener("keydown", handleKeydown);

  // Subscribe to store changes and re-render if the theme key is updated
  const unsubscribe = store.on("theme", render);
  render(); // Initial render

  // Return a cleanup function to remove the listener and the store subscription
  return () => {
    root.removeEventListener("click", handleClick);
    root.removeEventListener("keydown", handleKeydown);
    unsubscribe();
  };
};

define("ThemeSwitcher", ThemeSwitcher);
