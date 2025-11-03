import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = {
  name: string;
  label?: string;
  type?: string; // text, email, number, etc.
  value?: string;
  placeholder?: string;
  required?: boolean;
};

const FormGroup = ComponentMorph.create<Props>("FormGroup", {
  render: ({ props }) => {
    const type = props.type || 'text';
    const label = props.label || props.name;
    const value = props.value || '';
    const placeholder = props.placeholder || '';
    const required = props.required ? 'required' : '';
    return `
      <div class="form-group">
        <label for="fg-${props.name}">${label}</label>
        <input id="fg-${props.name}" name="${props.name}" type="${type}" value="${value}" placeholder="${placeholder}" ${required} />
      </div>
    `;
  },
  events: {
    'input:input': (_ev, target, { root, props }) => {
      const input = target as HTMLInputElement;
      root.dispatchEvent(new CustomEvent('form:update', { bubbles: true, detail: { name: props.name, value: input.value } }));
    }
  }
});

define("FormGroup", FormGroup);
export default FormGroup;

