import { z } from 'zod';

export const schema = z.object({
  data: z.object({
    especie: z.string().min(4).max(50),
    municipio: z.string().min(4).max(50),
    ciudadano: z.string().min(4).max(50)
  }),

  location: z.object({
    lat: z.number().min(-90).max(90).nonnegative().refine(val => val !== 0, {
      message: "Latitud no puede ser cero❌"
    }), // Latitud
    lng: z.number().min(-180).max(180).refine(val => val !== 0, {
      message: "Longitud no puede ser null"
    }) // Longitud
  }).refine(location => location.lat !== null && location.lng !== null, {
    message: "Coordenadas no pueden cero ❌"
  })
});



