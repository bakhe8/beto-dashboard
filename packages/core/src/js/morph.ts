import { BaseComponent } from "../components/BaseComponent";
import { store, State } from "./store";
import { setHTML } from "./dom";

type RenderCtx<P> = {
  root: HTMLElement;
  props: P;
  slots: Record<string, string>;
  state: Partial<State>;
};

type MorphOptions<P> = {
  stateKeys?: (keyof State)[];
  render: (ctx: RenderCtx<P>) => string;
  events?: Record<string, (ev: Event, target: Element, ctx: RenderCtx<P>) => void>;
  afterRender?: (ctx: RenderCtx<P>) => void;
};

export const ComponentMorph = {
  create<P = Record<string, unknown>>(name: string, options: MorphOptions<P>) {
    class MorphComponent extends BaseComponent {
      private unsubscribers: (() => void)[] = [];
      private ctx: RenderCtx<P>;

      constructor(root: HTMLElement, props: P, slots: Record<string, string>) {
        super(root);
        const state: Partial<State> = {};
        if (options.stateKeys) {
          for (const k of options.stateKeys) (state as any)[k] = store.get(k);
          this.unsubscribers = options.stateKeys.map((k) =>
            store.on(k, (v: any) => {
              (this.ctx.state as any)[k] = v;
              this.render();
            })
          );
        }
        this.ctx = { root, props, slots, state };

        // Wire delegated events if provided. Supports keys like 'click:.selector' or just '.selector' (click default)
        if (options.events) {
          for (const [key, handler] of Object.entries(options.events)) {
            const hasType = key.includes(':');
            const [type, selector] = hasType ? (key.split(':', 2) as [string, string]) : ['click', key];
            this.on(type as any, selector, (ev, target) => handler(ev, target, this.ctx));
          }
        }

        this.render();
      }

      private render() {
        const html = options.render(this.ctx);
        setHTML(this.ctx.root, html);
        options.afterRender?.(this.ctx);
      }

      destroy(): void {
        super.destroy();
        this.unsubscribers.forEach((u) => u());
        this.unsubscribers = [];
      }
    }

    return function (root: HTMLElement, props: P, slots: Record<string, string>) {
      const inst = new MorphComponent(root, props as P, slots);
      return () => inst.destroy();
    };
  },
};

export default ComponentMorph;
