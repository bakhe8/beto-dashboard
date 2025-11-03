import { define } from "./runtime";
import { sanitize } from "../js/utils/sanitize";
import { store } from "../js/store";

type Props = {
  size?: "sm" | "md" | "lg";
};

const FOCUSABLE_SELECTOR = [
  "[autofocus]",
  "button",
  "[href]",
  "input:not([type='hidden'])",
  "select", "textarea", "[tabindex]:not([tabindex='-1'])"
].join(', ');

export const Modal = (root: HTMLElement, props: Props, slots: Record<string, string>) => {
  let lastActiveElement: HTMLElement | null = null;
  let wasOpen = false;

  const close = () => {
    const current = store.get("modal");
    store.set("modal", { ...current, open: false });
  };

  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(".modal-close, [data-close]") ||
      target.closest(".modal-footer button")
    ) {
      close();
    }
  };

  const handleKeydown = (e: KeyboardEvent, focusableElements: HTMLElement[]) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === "Tab" && focusableElements.length > 0) {
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  let keydownHandler: (e: KeyboardEvent) => void;

  const render = () => {
    const { open, title } = store.get("modal");

    if (!open) {
      root.style.display = "none";
      root.innerHTML = ""; // Clear content when closed to remove the overlay
      root.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", keydownHandler);
      if (wasOpen && lastActiveElement && typeof lastActiveElement.focus === "function") {
        // Restore focus to the trigger element
        lastActiveElement.focus();
      }
      wasOpen = false;
      return;
    }

    // Opening transition
    if (!wasOpen) {
      lastActiveElement = (document.activeElement as HTMLElement) || null;
      wasOpen = true;
    }

    root.style.display = "";
    root.innerHTML = sanitize(`
      <div class="modal-overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc" data-size="${props.size || 'md'}" tabindex="-1">
          <div class="modal-header">
            <h2 id="modal-title">${title}</h2>
            <button class="modal-close" aria-label="Close">×</button>
          </div>
          <div id="modal-desc" class="modal-body">${slots.default || ""}</div>
          <div class="modal-footer">${slots.footer || ""}</div>
        </div>
      </div>
    `);

    const modalElement = root.querySelector<HTMLElement>('.modal');
    const focusableElements = Array.from(modalElement?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) || []);

    // Create a specific handler instance for this render
    keydownHandler = (e: KeyboardEvent) => handleKeydown(e, focusableElements);

    // Attach listeners
    root.addEventListener("click", handleClick);
    document.addEventListener("keydown", keydownHandler);

    // Manage focus: focus the dialog or the first focusable control
    const initialFocus = focusableElements.find(el => el.hasAttribute('autofocus')) || focusableElements[0] || modalElement;
    initialFocus?.focus();
  };

  const unsubscribe = store.on("modal", render);
  render();
  return () => {
    root.removeEventListener("click", handleClick);
    if (keydownHandler) document.removeEventListener("keydown", keydownHandler);
    unsubscribe();
  };
};

define("Modal", Modal);
