import { define } from "./runtime";
import { store } from "../js/store";
import { sanitize } from "../js/utils/sanitize";

export const ToastContainer = (root: HTMLElement) => {
  const render = () => {
    const toasts = store.get("toasts");

    root.innerHTML = sanitize(
      toasts
        .map(
          toast => `
        <div class="toast" data-type="${toast.type}" role="status" aria-live="polite">
          <p>${toast.message}</p>
          <button class="toast-close" data-id="${toast.id}" aria-label="Close">×</button>
        </div>
      `
        )
        .join("")
    );
  };

  const handleClick = (e: Event) => {
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>(".toast-close");
    if (target) {
      const idAttr = target.getAttribute('data-id');
      const id = idAttr ? Number.parseInt(idAttr, 10) : NaN;
      const currentToasts = store.get("toasts");
      store.set("toasts", currentToasts.filter(t => t.id !== id));
      // Optimistically remove from DOM to ensure immediate visual update
      target.closest('.toast')?.remove();
    }
  };

  root.addEventListener("click", handleClick);

  const unsubscribe = store.on("toasts", render);
  render();

  return () => {
    root.removeEventListener("click", handleClick);
    unsubscribe();
  };
};

define("ToastContainer", ToastContainer);
