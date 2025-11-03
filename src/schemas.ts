import { z } from "zod";

// As per section 9.5 of the handbook

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
});

export const ErrorResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});