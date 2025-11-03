export class DOMRenderer {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    if (!root) throw new Error('DOMRenderer: root element is required');
    this.root = root;
  }

  // Renders raw HTML into the root (walking skeleton scope)
  render(html: string) {
    this.root.innerHTML = html;
  }

  // Updates the text content of the first [data-domrenderer-text] node
  update(text: string) {
    const el = this.root.querySelector<HTMLElement>('[data-domrenderer-text]');
    if (el) el.textContent = text;
  }
}

export default DOMRenderer;

