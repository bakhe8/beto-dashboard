import { define } from "./runtime";
import { sanitize } from "../js/utils/sanitize";
import { store, State } from "../js/store";

type Props = {
  size?: "sm" | "md" | "lg";
};

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

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Simple focus trap
      const focusables = root.querySelectorAll<HTMLElement>(
        '.modal [autofocus], .modal button, .modal [href], .modal input, .modal select, .modal textarea, .modal [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  const render = () => {
    const { open, title } = store.get("modal");

    if (!open) {
      root.style.display = "none";
      root.innerHTML = ""; // Clear content when closed to remove the overlay
      root.removeEventListener("click", handleClick);
      root.removeEventListener("keydown", handleKeydown);
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

    // Attach listeners only when rendered
    root.addEventListener("click", handleClick);
    root.addEventListener("keydown", handleKeydown);

    // Manage focus: focus the dialog or the first focusable control
    const dialog = root.querySelector<HTMLElement>('.modal[role="dialog"]');
    const initialFocus = dialog?.querySelector<HTMLElement>(
      '[autofocus], .modal-close, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (initialFocus || dialog)?.focus();
  };

  const unsubscribe = store.on("modal", render);
  render();
  return () => {
    root.removeEventListener("click", handleClick);
    root.removeEventListener("keydown", handleKeydown);
    unsubscribe();
  };
};

define("Modal", Modal);
