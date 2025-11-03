import { AnalyticsSchema, UsersSchema } from './schemas';
// Import JSON at build-time so preview/dist does not rely on runtime fetch paths
// Vite handles JSON import natively
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import usersData from '../data/users.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import analyticsData from '../data/analytics.json';

export async function getUsers() {
  return UsersSchema.parse(usersData);
}

export async function getAnalytics() {
  return AnalyticsSchema.parse(analyticsData);
}

