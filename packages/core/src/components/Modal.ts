import { define } from "./runtime";
import { setHTML } from "../js/dom";
import { store } from "../js/store";
import { BaseComponent } from "./BaseComponent";
import { onKey } from "../js/events";

type Props = {
  size?: "sm" | "md" | "lg";
};

const FOCUSABLE_SELECTOR = [
  "[autofocus]",
  "button",
  "[href]",
  "input:not([type='hidden'])",
  "select", "textarea", "[tabindex]:not([tabindex='-1'])"
].join(', ');

class ModalComponent extends BaseComponent {
  private lastActiveElement: HTMLElement | null = null;
  private wasOpen = false;
  private unsubscribe: (() => void) | null = null;
  private props: Props;
  private slots: Record<string, string>;
  private offEsc: (() => void) | null = null;

  constructor(root: HTMLElement, props: Props, slots: Record<string, string>) {
    super(root);
    this.props = props;
    this.slots = slots;

    // Delegated close clicks
    this.on('click' as any, '.modal-close, [data-close], .modal-footer button', () => this.close());

    // Subscribe to modal state and render
    this.unsubscribe = store.on("modal", () => this.render());
    this.render();
  }

  private close() {
    const current = store.get("modal");
    store.set("modal", { ...current, open: false });
  }

  private trapTab(e: KeyboardEvent) {
    const modalElement = this.root.querySelector<HTMLElement>('.modal');
    const focusable = Array.from(modalElement?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) || []);
    if (e.key === 'Tab' && focusable.length > 0) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private render() {
    const { open, title } = store.get("modal");
    if (!open) {
      this.root.style.display = "none";
      this.root.innerHTML = "";
      this.offEsc?.();
      if (this.wasOpen && this.lastActiveElement?.focus) this.lastActiveElement.focus();
      this.wasOpen = false;
      return;
    }

    if (!this.wasOpen) {
      this.lastActiveElement = (document.activeElement as HTMLElement) || null;
      this.wasOpen = true;
    }

    this.root.style.display = "";
    setHTML(this.root, `
      <div class="modal-overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc" data-size="${this.props.size || 'md'}" tabindex="-1">
          <div class="modal-header">
            <h2 id="modal-title">${title}</h2>
            <button class="modal-close" aria-label="Close">×</button>
          </div>
          <div id="modal-desc" class="modal-body">${this.slots.default || ""}</div>
          <div class="modal-footer">${this.slots.footer || ""}</div>
        </div>
      </div>
    `);

    // ESC to close and Tab trap
    this.offEsc?.();
    this.offEsc = onKey(document, 'Escape', (e) => { e.preventDefault(); this.close(); });
    this.effect(() => () => { this.offEsc?.(); this.offEsc = null; });

    // Focus management
    const modalElement = this.root.querySelector<HTMLElement>('.modal');
    const focusableElements = Array.from(modalElement?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) || []);
    const initialFocus = focusableElements.find(el => el.hasAttribute('autofocus')) || focusableElements[0] || modalElement;
    initialFocus?.focus();

    // Attach tab trap on document keydown
    const keyListener = (e: KeyboardEvent) => this.trapTab(e);
    document.addEventListener('keydown', keyListener as any);
    this.effect(() => () => document.removeEventListener('keydown', keyListener as any));
  }

  destroy() {
    super.destroy();
    this.unsubscribe?.();
    this.offEsc?.();
  }
}

export const Modal = (root: HTMLElement, props: Props, slots: Record<string, string>) => {
  const instance = new ModalComponent(root, props, slots);
  return () => instance.destroy();
};

define("Modal", Modal);
