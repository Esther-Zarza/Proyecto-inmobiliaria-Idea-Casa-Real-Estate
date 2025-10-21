import { z } from 'zod';

export const formularioContactoSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es obligatorio' }),

  email: z.string().email({ message: 'Email inválido' }),

  phone: z
    .string()
    .nonempty('El teléfono es obligatorio')
    .regex(/^\d+$/, 'El teléfono debe contener sólo números'),

  contactType: z
  .string().min(1, 'Debes seleccionar una opción'),

  politcy: z
    .boolean()
    .refine((v) => v === true, {
      message: 'Debes aceptar la política de privacidad',
    }),
});
