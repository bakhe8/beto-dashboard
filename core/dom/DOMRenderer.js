export class DOMRenderer {
  constructor(root) {
    if (!root) throw new Error('DOMRenderer: root element is required');
    this.root = root;
  }

  render(html) {
    this.root.innerHTML = html;
  }

  update(text) {
    const el = this.root.querySelector('[data-domrenderer-text]');
    if (el) el.textContent = text;
  }
}

export default DOMRenderer;

