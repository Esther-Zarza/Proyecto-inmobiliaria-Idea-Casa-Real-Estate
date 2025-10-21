import { z } from "zod";

export const editClassificationSchema = z.object({
  // Estado de la vivienda
  property_status: z
    .number({
      required_error: "El estado de la vivienda es obligatorio",
      invalid_type_error: "Debe seleccionar un estado válido",
    })
    .min(1, "Debe seleccionar un estado válido")
    .max(6, "Debe seleccionar un estado válido")
    .nullable(),

  // Tipo de vivienda
  property_classification: z
    .number({
      required_error: "El tipo de vivienda es obligatorio",
      invalid_type_error: "Debe seleccionar un tipo válido",
    })
    .min(1, "Debe seleccionar un tipo válido")
    .max(16, "Debe seleccionar un tipo válido")
    .nullable(),

  // Tipo de acuerdo
  agreement_type: z
    .number({
      required_error: "El tipo de acuerdo es obligatorio",
      invalid_type_error: "Debe seleccionar un tipo de acuerdo válido",
    })
    .min(1, "Debe seleccionar un tipo de acuerdo válido")
    .max(3, "Debe seleccionar un tipo de acuerdo válido")
    .nullable(),

  // Calificación energética
  energ_qualification: z
    .number({
      required_error: "La clasificación energética es obligatoria",
      invalid_type_error: "Debe seleccionar una clasificación válida",
    })
    .min(1, "Debe seleccionar una clasificación válida")
    .max(10, "Debe seleccionar una clasificación válida")
    .nullable(),

  // Certificación energética
  energ_certification: z
    .number({
      required_error: "El certificado energético es obligatorio",
      invalid_type_error: "Debe seleccionar un certificado válido",
    })
    .min(1, "Debe seleccionar un certificado válido")
    .max(10, "Debe seleccionar un certificado válido")
    .nullable(),

  // Orientación
  orientation: z
    .number({
      required_error: "La orientación es obligatoria",
      invalid_type_error: "Debe seleccionar una orientación válida",
    })
    .min(1, "Debe seleccionar una orientación válida")
    .max(8, "Debe seleccionar una orientación válida")
    .nullable(),

  // Superficies (opcionales, pero deben ser numéricas y positivas si se completan)
  util_surface: z
    .union([
      z.number().nonnegative("Debe ser un número positivo"),
      z.string().transform((val) => (val === "" ? null : Number(val))),
      z.null(),
    ])
    .nullable(),

  garage_surface: z
    .union([
      z.number().nonnegative("Debe ser un número positivo"),
      z.string().transform((val) => (val === "" ? null : Number(val))),
      z.null(),
    ])
    .nullable(),

  terrace_surface: z
    .union([
      z.number().nonnegative("Debe ser un número positivo"),
      z.string().transform((val) => (val === "" ? null : Number(val))),
      z.null(),
    ])
    .nullable(),

  pool_surface: z
    .union([
      z.number().nonnegative("Debe ser un número positivo"),
      z.string().transform((val) => (val === "" ? null : Number(val))),
      z.null(),
    ])
    .nullable(),
});
