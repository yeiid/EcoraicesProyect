import { z } from 'zod';

export const schema = z.object({
  
  data : z.object({
  especie: z.string().min(1).max(50),
  municipio: z.string().min(1).max(50),
  ciudadano: z.string().min(1).max(50)}),

  location: z.object({
    lat: z.number().min(-180).max(180), // Latitud
    lng:z.number().min(-90).max(90), // Longitud
  })

});