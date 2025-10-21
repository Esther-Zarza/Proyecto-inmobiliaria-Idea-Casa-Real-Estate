import {z} from 'zod';

export const editAddressSchema = z.object({
  type_via: z.string({message: "Campo obligatorio"})
    .regex(/^.{1,50}$/, { message: "El tipo de vía es obligatorio" }),
  street_name: z.string({message: "Campo obligatorio"})
    .regex(/^.{1,100}$/, { message: "El nombre de la vía es obligatorio" }),
  street_number: z.string({message: "Campo obligatorio"})
    .regex(/^[A-Za-z0-9]{1,10}$/, { message: "Número inválido, obligatorio" }),
  block: z.string()
    .regex(/^.{0,10}$/, { message: "Bloque inválido" })
    .nullable()
    .optional(),
  stairs: z.string()
    .regex(/^.{0,10}$/, { message: "Escalera inválida" })
    .nullable()
    .optional(),
  floor: z.string()
    .regex(/^.{0,10}$/, { message: "Planta inválida" })
    .nullable()
    .optional(),
  door: z.string()
    .regex(/^.{0,10}$/, { message: "Puerta inválida" })
    .nullable()
    .optional(),
  zip_code: z.string({message: "Campo obligatorio"})
    .regex(/^[0-9]{5}$/, { message: "El código postal debe tener 5 dígitos" }),
  city: z.string({message: "Campo obligatorio"})
    .regex(/^.{1,50}$/, { message: "La ciudad es obligatoria" }),
  municipality: z.string({message: "Campo obligatorio"})
    .regex(/^.{1,50}$/, { message: "El municipio es obligatorio" }),
  locality: z.string({message: "Campo obligatorio"})
    .regex(/^.{1,50}$/, { message: "La localidad es obligatoria" }),
  urbanization: z.string()
    .regex(/^.{0,100}$/, { message: "Urbanización inválida" })
    .nullable()
    .optional(),
  neighbourhood: z.string()
    .regex(/^.{0,50}$/, { message: "La localidad es obligatoria" })
    .nullable()
    .optional(),
  street_observation: z.string()
    .max(200, {
      message: 'Las observaciones no pueden superar los 200 carácteres',
    })
    .nullable()
    .optional(),
});
