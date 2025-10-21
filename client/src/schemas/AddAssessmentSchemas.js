import { z } from 'zod';

export const addAssessmentSchemas = z.object({
  user_name: 
    z.string()
    .regex(/^.{2,50}$/, {
      message: 'El nombre debe tener entre 2 y 50 caracteres',
    }),
  user_last_name: 
    z.string()
    .regex(/^.{2,100}$/, {
      message: 'Los apellidos deben tener entre 2 y 100 caracteres',
    }),
  email: 
    z.string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'Introduce un email válido',
    }),
  //uno o más caracteres que no sean ni espacio en blanco
  //debe haber exactamente un @
  //meter un dominio: gmail,hotmail...
  //debe llevar un punto
  //debe llevar una ext del dominio: com, es, org...
  user_phone: 
    z.string()
    .regex(/^(?:\+?[1-9]\d{0,3}[- ]?)?(?:\d[- ]?){6,14}\d$/, {
      message: 'Introduce un teléfono válido (ej: 600111222 o +34 600 111 222)',
    }),
  bedrooms: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)), // convierte string → número    
      z.number({ message: 'El número de habitaciones debe ser entero' })
      .int({ message: 'El número de habitaciones debe ser entero' })
      .min(0, { message: 'Mínimo 0 habitaciones' })
      .max(20, { message: 'Máximo 20 habitaciones' })
  ),
  toilets: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),    
      z.number({ message: 'El número de baños debe ser entero' })
      .int({ message: 'El número de baños debe ser entero' })
      .min(0, { message: 'Mínimo 0 baños' })
      .max(20, { message: 'Máximo 20 baños' })
  ),
  catastral_reference: z.string()
  .transform(val => (val || "").replace(/[\s-]/g, "").toUpperCase()) // limpiar espacios/guiones y mayúsculas
  .refine(val => val === "" || /^[0-9A-Z]{20}$/.test(val), {
    message: "La referencia catastral debe tener exactamente 20 caracteres alfanuméricos",
  }),
  remodeled: z.boolean(),
  type_via: 
    z.string()
    .regex(/^.{1,50}$/, { message: 'El tipo de vía es obligatorio' }),
  street_name: 
    z.string()
    .regex(/^.{1,100}$/, { message: 'El nombre de la vía es obligatorio' }),
  street_number: 
    z.string()
    .regex(/^[A-Za-z0-9]{1,10}$/, { message: 'Número inválido' }),
  block: z.string().regex(/^.{0,10}$/, { message: 'Bloque inválido' }),
  stairs: z.string().regex(/^.{0,10}$/, { message: 'Escalera inválida' }),
  floor: z.string().regex(/^.{0,10}$/, { message: 'Planta inválida' }),
  door: z.string().regex(/^.{0,10}$/, { message: 'Puerta inválida' }),
  zip_code: 
    z.string()
    .regex(/^[0-9]{5}$/, { message: 'El código postal debe tener 5 dígitos' }),
  city: z.string().regex(/^.{1,50}$/, { message: 'La ciudad es obligatoria' }),
  municipality: 
    z.string()
    .regex(/^.{1,50}$/, { message: 'El municipio es obligatorio' }),
  locality: 
    z.string()
    .regex(/^.{1,50}$/, { message: 'La localidad es obligatoria' }),
  urbanization: 
    z.string()
    .regex(/^.{0,100}$/, { message: 'Urbanización inválida' }),
  street_observation: 
    z.string()
    .regex(/^.{0,200}$/, { message: 'Observaciones demasiado largas' }),
});
