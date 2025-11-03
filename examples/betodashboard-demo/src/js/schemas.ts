import { z } from 'zod';

export const UserSchema = z.object({ id: z.number(), name: z.string(), role: z.string() });
export const UsersSchema = z.array(UserSchema);

export const AnalyticsSchema = z.object({
  kpis: z.object({ users: z.number(), active: z.number(), sales: z.number(), conversion: z.number() }),
  series: z.object({ labels: z.array(z.string()), values: z.array(z.number()) })
});

export type User = z.infer<typeof UserSchema>;
export type Analytics = z.infer<typeof AnalyticsSchema>;

