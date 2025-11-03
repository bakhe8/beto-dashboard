import { define } from "./runtime";
import { store, State } from "../js/store";
import { setHTML } from "../js/dom";
import { on } from "../js/events";
import { BaseComponent } from "./BaseComponent";

class ThemeSwitcherComponent extends BaseComponent {
  private initialized = false;
  private unsubscribe: (() => void) | null = null;

  constructor(root: HTMLElement) {
    super(root);
    // Delegated click handling
    this.on('click' as any, 'button[role=radio]', (_ev, target) => {
      const btn = target as HTMLButtonElement;
      const label = (btn.textContent || "").trim().toLowerCase();
      const attr = btn.dataset.theme as State["theme"] | undefined;
      const next = (attr || (label as State["theme"])) as State["theme"];
      if (next === "light" || next === "dark" || next === "auto") store.set("theme", next);
    });

    const handleKeydown = (e: KeyboardEvent) => {
      const group = this.root.querySelector<HTMLElement>(".theme-switcher");
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
      const nextBtn = options.find(o => o.getAttribute("data-theme") === next);
      nextBtn?.focus();
    };
    this.root.addEventListener('keydown', handleKeydown as any);
    this.effect(() => () => this.root.removeEventListener('keydown', handleKeydown as any));

    // Subscribe to theme changes
    const render = () => {
      const currentTheme = store.get("theme");
      if (!this.initialized) {
        setHTML(this.root, `
          <div class="theme-switcher" role="radiogroup" aria-label="Theme">
            <button role="radio" data-theme="light" aria-checked="${currentTheme === 'light'}" tabindex="${currentTheme === 'light' ? 0 : -1}">Light</button>
            <button role="radio" data-theme="dark" aria-checked="${currentTheme === 'dark'}" tabindex="${currentTheme === 'dark' ? 0 : -1}">Dark</button>
            <button role="radio" data-theme="auto" aria-checked="${currentTheme === 'auto'}" tabindex="${currentTheme === 'auto' ? 0 : -1}">Auto</button>
          </div>
        `);
        this.initialized = true;
        return;
      }
      const mapping: Record<string, State["theme"]> = { light: "light", dark: "dark", auto: "auto" };
      const buttons = this.root.querySelectorAll<HTMLButtonElement>("button[role=radio]");
      buttons.forEach(btn => {
        const key = (btn.dataset.theme || btn.textContent?.trim().toLowerCase() || "") as keyof typeof mapping;
        const theme = mapping[key];
        const checked = theme === currentTheme;
        btn.setAttribute("aria-checked", String(checked));
        btn.setAttribute("tabindex", checked ? "0" : "-1");
      });
    };
    this.unsubscribe = store.on("theme", render);
    render();
  }

  destroy() {
    super.destroy();
    this.unsubscribe?.();
  }
}

export const ThemeSwitcher = (root: HTMLElement) => {
  const instance = new ThemeSwitcherComponent(root);
  return () => instance.destroy();
};

define("ThemeSwitcher", ThemeSwitcher);
