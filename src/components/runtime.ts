type ComponentConstructor<T = any> = (root: HTMLElement, props: T, slots: Record<string, string>) => (() => void) | void;

const registry = new Map<string, ComponentConstructor>();
const cleanupRegistry = new WeakMap<HTMLElement, () => void>();

export const define = (name: string, ctor: ComponentConstructor): void => {
  registry.set(name.toLowerCase(), ctor);
};

export function mountAll(): void {
  const observer = new MutationObserver(handleMutations);
  observer.observe(document.body, { childList: true, subtree: true });

  document.querySelectorAll<HTMLElement>("[data-component]").forEach(el => {
    const name = el.dataset.component!.toLowerCase();
    const ctor = registry.get(name);
    if (!ctor) return;

    const props = el.dataset.props ? JSON.parse(el.dataset.props) : {};
    const slots: Record<string, string> = {};
    el.querySelectorAll("template[data-slot]").forEach(t => {
      slots[(t as HTMLElement).dataset.slot!] = (t as HTMLTemplateElement).innerHTML;
    });

    const cleanup = ctor(el, props, slots);
    if (cleanup) {
      cleanupRegistry.set(el, cleanup);
    }
  });
}

function handleMutations(mutations: MutationRecord[]) {
  for (const mutation of mutations) {
    mutation.removedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && cleanupRegistry.has(node as HTMLElement)) {
        cleanupRegistry.get(node as HTMLElement)!();
        cleanupRegistry.delete(node as HTMLElement);
      }
    });
  }
}