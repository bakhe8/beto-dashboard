import { define } from "./runtime";
import { sanitize } from "../js/utils/sanitize";

type ModalProps = {
  title: string;
  size?: "sm" | "md" | "lg";
  open?: boolean;
};

define("Modal", (root, props: ModalProps, slots) => {
  const { title, size = "md" } = props;

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

  const close = () => root.remove();

  root.querySelector("[data-close]")?.addEventListener("click", close);
  root.querySelector(".modal-overlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) close();
  });
});