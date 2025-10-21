import { z } from 'zod';

const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;

export const editProfileSchemas = z.object({
  user_phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: 'El teléfono debe contener solo números',
    }),

  user_dni: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{8}[A-Za-z]$/.test(val), {
      message: 'El DNI debe tener 8 números seguidos de una letra',
    }),

  cif: z
    .string()
    .trim()
    .optional() // No es obligatorio
    .refine((val) => !val || cifRegex.test(val.toUpperCase()), {
      message: 'El CIF tiene un formato incorrecto',
    }),
});
