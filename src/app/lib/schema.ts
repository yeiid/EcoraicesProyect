import { z } from 'zod';

const municipios = [
  "Barrancas",
  "Hatonuevo",
  "Albania",
  "Fonseca",
  "Distraccion",
  "Cuestecita",
  "Papayal",
  "San Juan"
] as const;

export const schema = z.object({
  data: z.object({
    especie: z.string().min(4, "La especie debe tener al menos 4 caracteres").max(50, "La especie no puede tener más de 50 caracteres"),
    municipio: z.enum(municipios, {
      errorMap: () => ({ message: "Por favor, seleccione un municipio válido" }),
    }),
    ciudadano: z.string().min(4, "El nombre del ciudadano debe tener al menos 4 caracteres").max(50, "El nombre del ciudadano no puede tener más de 50 caracteres"),
  }),
  location: z.object({
    lat: z.number().min(-90).max(90).refine(val => val !== 0, {
      message: "Latitud no puede ser cero❌"
    }),
    lng: z.number().min(-180).max(180).refine(val => val !== 0, {
      message: "Longitud no puede ser cero❌"
    })
  }).refine(location => location.lat !== null && location.lng !== null, {
    message: "Coordenadas no pueden ser nulas ❌"
  }),
  userId: z.number().positive("El ID de usuario debe ser un número positivo"),
});

export type FormSchema = z.infer<typeof schema>;