import { AnalyticsSchema, UsersSchema } from './schemas';

export async function getUsers() {
  const res = await fetch('../data/users.json');
  const json = await res.json();
  return UsersSchema.parse(json);
}

export async function getAnalytics() {
  const res = await fetch('../data/analytics.json');
  const json = await res.json();
  return AnalyticsSchema.parse(json);
}

