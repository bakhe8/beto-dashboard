type Disposer = () => void;

export class BaseComponent {
  protected root: HTMLElement;
  private disposers: Disposer[] = [];

  constructor(root: HTMLElement) {
    this.root = root;
  }

  protected on<K extends keyof HTMLElementEventMap>(
    type: K,
    selector: string,
    handler: (ev: HTMLElementEventMap[K], target: Element) => void
  ) {
    const listener = (ev: Event) => {
      const origin = ev.target as Element | null;
      const target = origin?.closest(selector);
      if (target && this.root.contains(target)) {
        handler(ev as any, target);
      }
    };
    this.root.addEventListener(type as string, listener as EventListener);
    this.disposers.push(() => this.root.removeEventListener(type as string, listener as EventListener));
  }

  protected effect(setup: () => Disposer | void) {
    const maybe = setup();
    if (typeof maybe === 'function') this.disposers.push(maybe);
  }

  destroy() {
    for (const d of this.disposers.splice(0)) {
      try { d(); } catch {}
    }
  }
}

