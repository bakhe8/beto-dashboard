import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = {
  title?: string;
  footer?: string;
};

const Card = ComponentMorph.create<Props>("Card", {
  render: ({ props, slots }) => {
    const title = props.title || '';
    const footer = props.footer || '';
    return `
      <section class="card">
        ${title ? `<header class="card-header">${title}</header>` : ''}
        <div class="card-body">${slots.default || ''}</div>
        ${footer ? `<footer class="card-footer">${footer}</footer>` : ''}
      </section>
    `;
  },
});

define("Card", Card);
export default Card;

