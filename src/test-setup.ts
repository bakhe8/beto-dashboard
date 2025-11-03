// Import all components to ensure they are registered with the DCE
// before any tests run. This creates a consistent test environment.
import "./components/Loader";
import "./components/Modal";
import "./components/Sidebar";
import "./components/Table";
import "./components/ThemeSwitcher";

// Minimal visibility matcher to support toBeVisible() assertions in jsdom
import { expect } from "vitest";
import { beforeEach } from "vitest";

function isVisible(el: any): boolean {
  const element = el as HTMLElement | null;
  if (!element) return false;
  const inDoc = !!element.ownerDocument && element.ownerDocument.contains(element);
  const hiddenAttr = element.hasAttribute("hidden") || element.getAttribute("aria-hidden") === "true";
  const displayNone = (element as any).style?.display === "none";
  return inDoc && !hiddenAttr && !displayNone;
}

expect.extend({
  toBeVisible(received: any) {
    const pass = isVisible(received);
    return {
      pass,
      message: () => `expected element ${pass ? "not " : ""}to be visible`,
    } as any;
  },
});

// Ensure test isolation across suites by clearing persisted state
beforeEach(() => {
  try { localStorage.clear(); } catch {}
});
