import { define } from "./runtime";
import { sanitize } from "../js/utils/sanitize";

type Props = {
  title: string;
  size?: "sm" | "md" | "lg";
};

export const Modal = (root: HTMLElement, props: Props, slots: Record<string, string>) => {
  root.innerHTML = sanitize(`
    <div class="modal-overlay">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h2 id="modal-title">${props.title}</h2>
          <button class="modal-close" aria-label="Close">×</button>
        </div>
        <div class="modal-body">${slots.default || ""}</div>
        <div class="modal-footer">${slots.footer || ""}</div>
      </div>
    </div>
  `);

  root.querySelectorAll(".modal-close, [data-close]").forEach(btn => btn.addEventListener("click", () => root.remove()));
};

define("Modal", Modal);