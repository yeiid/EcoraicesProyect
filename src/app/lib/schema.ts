import { z } from "zod";

// Esquema para validar las coordenadas
const coordenadasSchema = z
  .object({
    lat: z
      .number()
      .min(-90)
      .max(90)
      .refine((val) => val !== 0, {
        message: "La latitud no puede ser cero",
      }),
    lng: z
      .number()
      .min(-180)
      .max(180)
      .refine((val) => val !== 0, {
        message: "La longitud no puede ser cero",
      }),
  })
  .refine((location) => location.lat !== null && location.lng !== null, {
    message: "Las coordenadas no pueden ser nulas",
  });

// Estados de conservación válidos según UICN (Unión Internacional para la Conservación de la Naturaleza)
const estadosConservacionValidos = [
  "",
  "LC",
  "NT",
  "VU",
  "EN",
  "CR",
  "EW",
  "EX",
  "DD",
  "NE",
] as const;

// Esquema para validar el formulario de especies
export const especieSchema = z.object({
  especie: z
    .string()
    .min(3, "El nombre de la especie debe tener al menos 3 caracteres")
    .max(100, "El nombre de la especie no puede tener más de 100 caracteres")
    .trim(),
  municipio: z
    .string()
    .min(3, "El nombre del municipio debe tener al menos 3 caracteres")
    .max(50, "El nombre del municipio no puede tener más de 50 caracteres")
    .trim(),
  descripcion: z
    .string()
    .max(500, "La descripción no puede tener más de 500 caracteres")
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  estadoConservacion: z
    .enum(estadosConservacionValidos)
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  latitud: z.number().min(-90).max(90),
  longitud: z.number().min(-180).max(180),
  userId: z.number().positive("El ID de usuario debe ser un número positivo"),
});

// Tipo que se infiere del esquema
export type EspecieFormData = z.infer<typeof especieSchema>;

// Para compatibilidad con código existente
export const schema = z.object({
  data: z.object({
    especie: z
      .string()
      .min(3, "La especie debe tener al menos 3 caracteres")
      .max(100, "La especie no puede tener más de 100 caracteres"),
    municipio: z
      .string()
      .min(3, "El municipio debe tener al menos 3 caracteres")
      .max(50, "El municipio no puede tener más de 50 caracteres"),
    descripcion: z
      .string()
      .max(500, "La descripción no puede tener más de 500 caracteres")
      .optional(),
    estadoConservacion: z.enum(estadosConservacionValidos).optional(),
  }),
  location: coordenadasSchema,
  userId: z.number().positive("El ID de usuario debe ser un número positivo"),
});

export type FormSchema = z.infer<typeof schema>;
