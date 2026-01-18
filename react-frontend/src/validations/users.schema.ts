import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  role: z.string().optional(),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
