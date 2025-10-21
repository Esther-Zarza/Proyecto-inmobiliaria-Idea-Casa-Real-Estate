import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Email no válido, introduce otro'),
  password: z
    .string()
});
