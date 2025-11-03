import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import { swr } from './api';

describe('api.swr', () => {
  const schema = z.object({ ok: z.boolean() });

  beforeEach(() => {
    vi.restoreAllMocks();
    // Reset cookie
    Object.defineProperty(document, 'cookie', { writable: true, value: '' });
  });

  it('adds CSRF header from cookie and validates with Zod', async () => {
    document.cookie = 'CSRF-Token=abc123';

    const fetchMock = vi.spyOn(globalThis, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
      statusText: 'OK',
    } as any);

    const res = await swr('k1', '/api/test', schema, 60000);
    expect(res.ok).toBe(true);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as any;
    expect(init.headers['X-CSRF-Token']).toBe('abc123');
    expect(init.headers['Content-Type']).toBe('application/json');
  });

  it('returns cached value immediately and revalidates in background', async () => {
    // First call returns true, second revalidation may return true as well
    const fetchMock = vi.spyOn(globalThis, 'fetch' as any)
      .mockResolvedValue({ ok: true, json: async () => ({ ok: true }), statusText: 'OK' } as any);

    const v1 = await swr('k2', '/api/test2', schema, 60000);
    expect(v1.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const v2 = await swr('k2', '/api/test2', schema, 60000);
    expect(v2.ok).toBe(true);
    // Background revalidate triggers another fetch
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

