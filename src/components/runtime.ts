type ComponentConstructor<T = any> = (root: HTMLElement, props: T, slots: Record<string, string>) => (() => void) | void;

const registry = new Map<string, ComponentConstructor>();

export const define = (name: string, ctor: ComponentConstructor): void => {
  registry.set(name.toLowerCase(), ctor);
};

export function mountAll(): void {
  document.querySelectorAll<HTMLElement>("[data-component]").forEach(el => {
    const name = el.dataset.component!.toLowerCase();
    const ctor = registry.get(name);
    if (!ctor) return;

    const props = el.dataset.props ? JSON.parse(el.dataset.props) : {};
    const slots: Record<string, string> = {};
    el.querySelectorAll("template[data-slot]").forEach(t => {
      slots[(t as HTMLElement).dataset.slot!] = (t as HTMLTemplateElement).innerHTML;
    });

    ctor(el, props, slots);
  });
}