import {z} from "zod";

export const addEstateSchema = z.object({
  title: z.string()
    .regex(/^.{6,}$/, {message: "El título debe tener al menos 6 caracteres"})
    .optional(),
   description: z.string()
    .regex(/^[\s\S]{6,5000}$/, {
      message: 'La descripción debe tener al menos 6 caracteres',
    })
    .optional(),

  price: z.number()
    .nonnegative("El precio debe ser positivo")
    .max(999999999999.99, "El precio es demasiado grande")
    .refine(val => /^\d{1,12}(\.\d{1,2})?$/.test(val.toString()), {
    message: "Máximo 12 dígitos enteros y 2 decimales"})
    .optional()
    .nullable(),

  price_hidden: z.boolean(),

  ibi: z.number({message: "El IBI ha de ser un número positivo, con máximo de 9 enteros y 2 decimales"})
    .nonnegative("El precio debe ser positivo")
    .max(999999999.99, "El precio es demasiado grande")
    .refine(val => /^\d{1,9}(\.\d{1,2})?$/.test(val.toString()), {
    message: "Máximo 12 dígitos enteros y 2 decimales"})
    .optional()
    .nullable(),


  // AAAAA BBBBB CC DDDDDDDDDD (estructura de referencia catastral)
  catastral_reference: z.string()
    .regex(/^$|^[0-9A-Z]{20}$/, {message: "La referencia catastral debe tener 20 caracteres alfanuméricos"})
    .transform(val => val.toUpperCase())
    .optional(),
  // VERSIÓN ESTRICTA: los caracteres CC solamente pueden ser números. 
  // catastral_reference: z.string()
  //   .transform(val => val.toUpperCase())
  //   .regex(/^[0-9A-Z]{5}[0-9A-Z]{5}[0-9]{2}[0-9A-Z]{10}$/, {message: "La referencia catastral debe tener el formato oficial (AAAAABBBBBCCDDDDDDDDDD)."})
  //   .optional(),

  registry_surface: z.number()
    .nonnegative({message: "La superficie registral debe ser positiva"})
    .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {message: "Máximo 2 decimales permitidos"})
    .nullable()
    .optional(),

  year_built: z
    .number({
      invalid_type_error: "El año de construcción debe ser un número",
    })
    .int("El año de construcción debe ser un número entero")
    .min(0, "El año de construcción no puede ser negativo")
    .nullable()
    .optional(),

  property_type: z.number({message: "Se debe seleccionar un tipo"})
    .int()
    .min(1, {message: "El valor mínimo permitido es 1"})
    .max(4, {message: "El valor máximo permitido es 4"}),

  is_public: z.boolean(),
  is_highlighted: z.boolean(),

  // estos no pueden ser ni recibir null, han de ser rellenados ***
  bedrooms: z
    .number({ invalid_type_error: "El número de baños debe ser un número" })
    .int("Debe ser un número entero")
    .min(0, "El número de baños no puede ser negativo")
    .max(255, "El número de baños no puede superar 255"),

  toilets: z
    .number({ invalid_type_error: "El número de baños debe ser un número" })
    .int("Debe ser un número entero")
    .min(0, "El número de baños no puede ser negativo")
    .max(255, "El número de baños no puede superar 255"),
  // ***
  
  number_floors: z
    .number({
      invalid_type_error: "El número de plantas debe ser un número",
    })
    .int("El número de plantas debe ser un número entero")
    .min(-255, "El número de plantas no puede ser menor de -255")
    .max(255, "El número de plantas no puede superar 255")
    .nullable()
    .optional(),

  keys_delivered: z.boolean(),
  elevator: z.boolean(),

  start_date: z.string()
    .refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {message: "La fecha de inicio debe tener formato YYYY-MM-DD"})
    .optional(), 
  end_date: z.string()
    .refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {message: "La fecha de fin debe tener formato YYYY-MM-DD"})
    .optional(),

  private_observations: z.string()
    .max(200, {message: "Las observaciones privadas no pueden superar 200 caracteres"})
    .optional()
});