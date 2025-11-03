type Listener<T> = (value: T) => void;

export class StateSlice<T> {
  private value: T;
  private listeners = new Set<Listener<T>>();

  constructor(initial: T) {
    this.value = initial;
  }

  get() { return this.value; }

  set(next: T) {
    this.value = next;
    this.listeners.forEach(fn => fn(next));
  }

  subscribe(fn: Listener<T>) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export default StateSlice;

