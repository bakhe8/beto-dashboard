import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = {
  items: Array<string>;
};

const List = ComponentMorph.create<Props>("List", {
  render: ({ props, slots }) => {
    const items = props.items || [];
    if (!items.length) return slots.empty || `<p>No items</p>`;
    const lis = items
      .map((label, i) =>
        `<li><button class="list-item" type="button" data-index="${i}" data-label="${label}">${label}</button></li>`
      )
      .join("");
    return `<ul class="list">${lis}</ul>`;
  },
  events: {
    'click:.list-item': (_ev, target, { root, props }) => {
      const btn = target as HTMLElement;
      let idx = Number(btn.getAttribute('data-index'));
      if (!Number.isFinite(idx) || idx < 0) {
        const txt = btn.getAttribute('data-label') || btn.textContent?.trim() || '';
        idx = Array.isArray(props.items) ? props.items.indexOf(txt) : -1;
      }
      const label = Array.isArray(props.items) && idx >= 0 ? props.items[idx] : undefined;
      root.dispatchEvent(new CustomEvent('list:select', { bubbles: true, detail: { index: idx, label } }));
    },
  },
});

define("List", List);
export default List;

