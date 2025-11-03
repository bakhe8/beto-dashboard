import { define } from "./runtime";
import { sanitize } from "../js/utils/sanitize";

interface ModalProps {
  title: string;
  size?: "sm" | "md" | "lg";
  open?: boolean;
}

define("Modal", (root, props: ModalProps, slots) => {
  const { title, size = "md" } = props;
  const previouslyFocused = document.activeElement as HTMLElement | null;

  root.innerHTML = sanitize(`
    <div class="modal-overlay">
      <div class="modal" data-size="${size}" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
        <div class="modal-header">
          <h2 id="modal-title">${title}</h2>
          <button data-close aria-label="Close dialog">&times;</button>
        </div>
        <div class="modal-body">${slots.default || ""}</div>
        <div class="modal-footer">${slots.footer || ""}</div>
      </div>
    </div>
  `);

  const modal = root.querySelector<HTMLElement>(".modal");
  if (!modal) return;

  const focusable = modal.querySelectorAll<HTMLElement>(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  const close = () => {
    document.removeEventListener("keydown", handleKeyDown);
    root.innerHTML = ""; // Clear content to remove listeners
    previouslyFocused?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstFocusable) { e.preventDefault(); lastFocusable.focus(); }
      if (!e.shiftKey && document.activeElement === lastFocusable) { e.preventDefault(); firstFocusable.focus(); }
    }
  };

  root.querySelector("[data-close]")?.addEventListener("click", close);
  root.querySelector(".modal-overlay")?.addEventListener("click", (e) => { if (e.target === e.currentTarget) close(); });
  document.addEventListener("keydown", handleKeyDown);
  firstFocusable?.focus();
});