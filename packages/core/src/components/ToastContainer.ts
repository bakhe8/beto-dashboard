import { define } from "./runtime";
import { store } from "../js/store";
import { setHTML } from "../js/dom";
import { on } from "../js/events";

export const ToastContainer = (root: HTMLElement) => {
  const render = () => {
    const toasts = store.get("toasts");

    setHTML(root,
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

  const offClose = on(root, 'click', '.toast-close', (_ev, target) => {
    const btn = target as HTMLButtonElement;
    const toastEl = btn.closest<HTMLElement>('.toast');
    const message = toastEl?.querySelector('p')?.textContent ?? '';
    const currentToasts = store.get("toasts");
    store.set("toasts", currentToasts.filter(t => t.message !== message));
    toastEl?.remove();
  });

  const unsubscribe = store.on("toasts", render);
  render();

  return () => {
    offClose();
    unsubscribe();
  };
};

define("ToastContainer", ToastContainer);
