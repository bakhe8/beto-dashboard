import { describe, it, expect } from 'vitest';
import { createAsyncAction } from './asyncAction';

describe('createAsyncAction', () => {
  it('tracks loading and success', async () => {
    const act = createAsyncAction(async (x: number) => x * 2);
    const states: string[] = [];
    const unsub = act.subscribe((s) => states.push(s.status));
    await act.run(2);
    expect(states).toEqual(['idle', 'loading', 'success']);
    expect(act.get().data).toBe(4);
    unsub();
  });

  it('tracks error', async () => {
    const act = createAsyncAction(async () => { throw new Error('no'); });
    await expect(act.run()).rejects.toThrow('no');
    expect(act.get().status).toBe('error');
  });
});

