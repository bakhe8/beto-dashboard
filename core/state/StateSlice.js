export class StateSlice {
  constructor(initial) {
    this.value = initial;
    this.listeners = new Set();
  }
  get() { return this.value; }
  set(next) {
    this.value = next;
    this.listeners.forEach(fn => fn(next));
  }
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export default StateSlice;

