import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});
export type SignupInput = z.infer<typeof SignupSchema>;

export const TransactionCreateSchema = z.object({
  amount: z.string().min(1),
  type: z.enum(['expense','income','transfer']),
  accountId: z.string().optional(),
  categoryId: z.string().optional(),
  notes: z.string().optional(),
});
