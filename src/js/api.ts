import { z } from "zod";

const cache = new Map<string, { t: number; v: unknown }>();

async function revalidate<T>(key: string, url: string, schema: z.ZodType<T>, ttl: number): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);

  const data = await res.json();
  const v = schema.parse(data);

  cache.set(key, { t: Date.now(), v });
  return v;
}

export async function swr<T>(key: string, url: string, schema: z.ZodType<T>, ttl = 60000): Promise<T> {
  const c = cache.get(key);
  if (c && Date.now() - c.t < ttl) {
    // Fire-and-forget revalidation, but catch errors to prevent unhandled rejections.
    revalidate(key, url, schema, ttl).catch(err => console.warn(`SWR background revalidation failed for ${key}:`, err));
    return c.v as T;
  }
  return revalidate(key, url, schema, ttl);
}