import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

const ConfirmDialog = ComponentMorph.create<Props>("ConfirmDialog", {
  render: ({ props, slots }) => {
    const title = props.title || 'Confirm';
    const message = props.message || slots.default || '';
    const ok = props.confirmLabel || 'Confirm';
    const cancel = props.cancelLabel || 'Cancel';
    return `
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="cd-title" aria-describedby="cd-desc">
        <div class="cd-header"><h3 id="cd-title">${title}</h3></div>
        <div id="cd-desc" class="cd-body">${message}</div>
        <div class="cd-footer">
          <button type="button" class="cd-cancel">${cancel}</button>
          <button type="button" class="cd-confirm">${ok}</button>
        </div>
      </div>
    `;
  },
  events: {
    'click:.cd-confirm': (_ev, _target, { root }) => {
      root.dispatchEvent(new CustomEvent('confirm:ok', { bubbles: true }));
      // remove node by default to simulate closing
      root.innerHTML = '';
    },
    'click:.cd-cancel': (_ev, _target, { root }) => {
      root.dispatchEvent(new CustomEvent('confirm:cancel', { bubbles: true }));
      root.innerHTML = '';
    },
  },
});

define("ConfirmDialog", ConfirmDialog);
export default ConfirmDialog;

