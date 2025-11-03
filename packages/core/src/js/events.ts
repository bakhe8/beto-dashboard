type Handler = (ev: Event, target: Element) => void;

// Simple event delegation utility
export function on(
  root: Document | HTMLElement,
  type: string,
  selector: string,
  handler: Handler
): () => void {
  const listener = (ev: Event) => {
    const origin = ev.target as Element | null;
    if (!origin) return;
    const target = (origin as Element).closest(selector);
    if (target && (root === document ? document.documentElement.contains(target) : (root as HTMLElement).contains(target))) {
      handler(ev, target);
    }
  };
  root.addEventListener(type, listener as EventListener, { passive: true });
  return () => root.removeEventListener(type, listener as EventListener);
}

// Keydown helper without selector matching
export function onKey(
  root: Document | HTMLElement,
  key: string,
  handler: (ev: KeyboardEvent) => void
): () => void {
  const listener = (ev: KeyboardEvent) => {
    if (ev.key === key) handler(ev);
  };
  root.addEventListener('keydown', listener as EventListener);
  return () => root.removeEventListener('keydown', listener as EventListener);
}
