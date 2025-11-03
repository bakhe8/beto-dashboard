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
      .map((label, i) => `<li data-index="${i}"><button class="list-item" type="button">${label}</button></li>`) 
      .join("");
    return `<ul class="list">${lis}</ul>`;
  },
  events: {
    'click:.list-item': (ev, target, { root, props }) => {
      const li = (target as HTMLElement).closest('li');
      let idx = Number(li?.getAttribute('data-index'));
      if (!Number.isFinite(idx) || idx < 0) {
        const txt = (target as HTMLElement).textContent?.trim() || '';
        idx = Array.isArray(props.items) ? props.items.indexOf(txt) : -1;
      }
      const label = Array.isArray(props.items) && idx >= 0 ? props.items[idx] : undefined;
      root.dispatchEvent(new CustomEvent('list:select', { bubbles: true, detail: { index: idx, label } }));
    },
  },
});

define("List", List);
export default List;

