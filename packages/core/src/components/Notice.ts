import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = {
  type?: "info" | "success" | "warning" | "danger";
  message?: string;
};

const Notice = ComponentMorph.create<Props>("Notice", {
  render: ({ props, slots }) => {
    const type = props.type || "info";
    const msg = props.message || slots.default || "";
    return `
      <div class="notice" data-type="${type}" role="status" aria-live="polite">
        <div class="notice-body">${msg}</div>
        <button class="notice-close" aria-label="Dismiss notice">×</button>
      </div>
    `;
  },
  events: {
    ".notice-close": (_ev, target, { root }) => {
      target.closest(".notice")?.remove();
      root.dispatchEvent(new CustomEvent("notice:closed", { bubbles: true }));
    },
  },
});

define("Notice", Notice);
export default Notice;
