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
      const li = target.closest('li');
      const idx = Number(li?.getAttribute('data-index') || -1);
      const label = props.items?.[idx];
      root.dispatchEvent(new CustomEvent('list:select', { bubbles: true, detail: { index: idx, label } }));
    },
  },
});

define("List", List);
export default List;

