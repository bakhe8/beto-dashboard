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
        <div class="toast" data-id="${toast.id}" data-type="${toast.type}" role="status" aria-live="polite">
          <p>${toast.message}</p>
          <button class="toast-close" aria-label="Close">×</button>
        </div>
      `
        )
        .join("")
    );
  };

  const handleClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".toast-close");
    if (btn) {
      const toastEl = btn.closest<HTMLElement>('.toast');
      const message = toastEl?.querySelector('p')?.textContent ?? '';
      const currentToasts = store.get("toasts");
      store.set("toasts", currentToasts.filter(t => t.message !== message));
      // Optimistically remove from DOM to ensure immediate visual update
      toastEl?.remove();
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
