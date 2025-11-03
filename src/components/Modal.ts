import { define } from "./runtime";
import { sanitize } from "../js/utils/sanitize";
import { store, State } from "../js/store";

type Props = {
  size?: "sm" | "md" | "lg";
};

export const Modal = (root: HTMLElement, props: Props, slots: Record<string, string>) => {
  const handleClose = (e: Event) => {
    if ((e.target as HTMLElement).closest(".modal-close, [data-close]")) {
      store.set("modal", { ...store.get("modal"), open: false });
    }
  };

  const render = () => {
    const { open, title } = store.get("modal");

    if (!open) {
      root.style.display = "none";
      root.innerHTML = ""; // Clear content when closed to remove the overlay
      // Detach the event listener when the modal is not rendered
      root.removeEventListener("click", handleClose); 
      return;
    }

    root.style.display = "";
    root.innerHTML = sanitize(`
      <div class="modal-overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-size="${props.size || 'md'}">
          <div class="modal-header">
            <h2 id="modal-title">${title}</h2>
            <button class="modal-close" aria-label="Close">×</button>
          </div>
          <div class="modal-body">${slots.default || ""}</div>
          <div class="modal-footer">${slots.footer || ""}</div>
        </div>
      </div>
    `);
    // Attach the event listener only when the modal is rendered
    root.addEventListener("click", handleClose);
  };

  const unsubscribe = store.on("modal", render);
  render();
  return () => {
    // Final cleanup for the component
    root.removeEventListener("click", handleClose);
    unsubscribe();
  };
};

define("Modal", Modal);