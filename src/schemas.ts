import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const UsersResponseSchema = z.array(UserSchema);

export const ErrorResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});