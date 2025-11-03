import { sanitize } from './utils/sanitize';

export type Attrs = Record<string, string | number | boolean | null | undefined>;

export function setHTML(el: Element, html: string): void {
  const start = (globalThis.performance?.now?.() ?? 0) as number;
  (el as HTMLElement).innerHTML = sanitize(html);
  const end = (globalThis.performance?.now?.() ?? 0) as number;
  try {
    // Lightweight instrumentation hook for E2E metrics
    const g: any = globalThis as any;
    if (g.__BD_COLLECT) {
      g.__BD_METRICS = g.__BD_METRICS || { fragmentDiffMs: 0, renderCycles: 0 };
      g.__BD_METRICS.fragmentDiffMs = (g.__BD_METRICS.fragmentDiffMs || 0) + Math.max(0, end - start);
      g.__BD_METRICS.renderCycles = (g.__BD_METRICS.renderCycles || 0) + 1;
    }
  } catch {}
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
