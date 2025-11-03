import { sanitize } from './utils/sanitize';

export type Attrs = Record<string, string | number | boolean | null | undefined>;

export function setHTML(el: Element, html: string): void {
  // Sanitize before injecting to avoid XSS
  (el as HTMLElement).innerHTML = sanitize(html);
}

export function setText(el: Element, text: string): void {
  el.textContent = text;
}

export function setAttrs(el: Element, attrs: Attrs): void {
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v === null || v === undefined) {
      (el as HTMLElement).removeAttribute(k);
    } else if (v === true) {
      (el as HTMLElement).setAttribute(k, '');
    } else {
      (el as HTMLElement).setAttribute(k, String(v));
    }
  }
}

export function replaceChildren(el: Element, ...nodes: (Node | string)[]): void {
  const frag = document.createDocumentFragment();
  for (const n of nodes) frag.append(n instanceof Node ? n : document.createTextNode(n));
  el.replaceChildren(frag);
}

