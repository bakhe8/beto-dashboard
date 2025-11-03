export type AsyncState<T> = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: T;
  error?: unknown;
};

export function createAsyncAction<TArgs extends any[], TRes>(
  fn: (...args: TArgs) => Promise<TRes>
) {
  let state: AsyncState<TRes> = { status: 'idle' };
  const listeners = new Set<(s: AsyncState<TRes>) => void>();

  async function run(...args: TArgs): Promise<TRes> {
    set({ status: 'loading' });
    try {
      const data = await fn(...args);
      set({ status: 'success', data });
      return data;
    } catch (e) {
      set({ status: 'error', error: e });
      throw e;
    }
  }

  function set(next: AsyncState<TRes>) {
    state = next;
    listeners.forEach((l) => l(state));
  }

  return {
    get: () => state,
    subscribe: (l: (s: AsyncState<TRes>) => void) => {
      listeners.add(l);
      l(state);
      return () => listeners.delete(l);
    },
    run,
  };
}

