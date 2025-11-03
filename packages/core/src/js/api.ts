import { z } from "zod";

const cache = new Map<string, { t: number; v: any }>();

async function revalidate<T>(
  key: string,
  url: string,
  schema: z.ZodTypeAny,
  ttl: number
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken(),
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  const v = schema.parse(data);
  cache.set(key, { t: Date.now(), v });
  return v;
}

export async function swr<T>(key: string, url: string, schema: z.ZodTypeAny, ttl = 60000): Promise<T> {
  const c = cache.get(key);
  if (c && Date.now() - c.t < ttl) { revalidate(key, url, schema, ttl); return c.v; }
  return revalidate(key, url, schema, ttl);
}

function getCSRFToken(): string {
  try {
    const match = document.cookie.match(/CSRF-Token=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  } catch {
    return '';
  }
}
