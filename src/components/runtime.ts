type ComponentConstructor<T = any> = (
  root: HTMLElement,
  props: T,
  slots: Record<string, string>
) => (() => void) | void;

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

  // Initial mount for any declared components
  document.querySelectorAll<HTMLElement>("[data-component]").forEach(el => {
    tryMountElement(el, cleanupsToRun);
  });

  // Return a cleanup function for the test environment
  return () => {
    observer.disconnect();
    cleanupsToRun.forEach(cleanup => cleanup());
  };
}

function handleMutations(mutations: MutationRecord[]) {
  for (const mutation of mutations) {
    if (mutation.type !== "childList") continue;

    // Handle added nodes: mount any components found
    mutation.addedNodes.forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches && node.matches("[data-component]")) {
        tryMountElement(node);
      }
      node.querySelectorAll?.("[data-component]")?.forEach(el => {
        tryMountElement(el as HTMLElement);
      });
    });

    // Handle removed nodes: cleanup components whose roots were removed
    mutation.removedNodes.forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      tryCleanupElement(node);
      node.querySelectorAll?.("[data-component]")?.forEach(el => {
        tryCleanupElement(el as HTMLElement);
      });
    });
  }
}

function tryMountElement(el: HTMLElement, collect?: (() => void)[]) {
  const name = el.dataset.component?.toLowerCase();
  if (!name) return;
  if (cleanupRegistry.has(el)) return; // already mounted
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
    if (collect) collect.push(cleanup);
  }
}

function tryCleanupElement(el: HTMLElement) {
  const cleanup = cleanupRegistry.get(el);
  if (cleanup) {
    try {
      cleanup();
    } finally {
      cleanupRegistry.delete(el);
    }
  }
}
