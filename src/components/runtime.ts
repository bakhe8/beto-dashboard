type ComponentConstructor<T = any> = (root: HTMLElement, props: T, slots: Record<string, string>) => (() => void) | void;

const registry = new Map<string, ComponentConstructor>();
const cleanupRegistry = new WeakMap<HTMLElement, () => void>();

export const define = (name: string, ctor: ComponentConstructor): void => {
  registry.set(name.toLowerCase(), ctor);
};

/**
 * Mounts a single component for testing purposes.
 * @param el The root element of the component.
 * @param ctor The component's constructor function.
 * @returns A cleanup function.
 */
export function mount(el: HTMLElement, ctor: ComponentConstructor): () => void {
  const props = el.dataset.props ? JSON.parse(el.dataset.props) : {};
  const slots: Record<string, string> = {};
  el.querySelectorAll("template[data-slot]").forEach(t => {
    slots[(t as HTMLElement).dataset.slot!] = (t as HTMLTemplateElement).innerHTML;
  });

  const cleanup = ctor(el, props, slots);
  return cleanup || (() => {});
}

export function mountAll(): () => void {
  const observer = new MutationObserver(handleMutations);
  observer.observe(document.body, { childList: true, subtree: true });
  const cleanupsToRun: (() => void)[] = [];

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
      // This was the missing piece. The cleanup function must be registered.
      cleanupsToRun.push(cleanup);
    }
  });

  // Return a cleanup function for the test environment
  return () => {
    observer.disconnect();
    cleanupsToRun.forEach(cleanup => cleanup());
  };
}

function handleMutations(mutations: MutationRecord[]) {
  for (const mutation of mutations) {
    // This logic is currently not used but is kept for future robustness
    // if components are ever dynamically removed from the DOM.
    mutation.removedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && cleanupRegistry.has(node as HTMLElement)) {
        cleanupRegistry.get(node as HTMLElement)!();
        cleanupRegistry.delete(node as HTMLElement);
      }
    });
  }
}