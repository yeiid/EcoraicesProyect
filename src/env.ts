import { z } from 'zod';

// Esquema para validar las variables de entorno
const envSchema = z.object({
  // Base de datos
  DATABASE_URL: z.string().url().min(1),
  
  // Autenticación
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url().optional().default('http://localhost:3000'),
  
  // Entorno
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Configuración de correo (opcional)
  EMAIL_SERVER: z.string().url().optional(),
  EMAIL_FROM: z.string().email().optional(),
  
  // Configuración de almacenamiento (opcional)
  UPLOADTHING_SECRET: z.string().optional(),
  UPLOADTHING_APP_ID: z.string().optional(),
});

// Validar las variables de entorno en tiempo de ejecución
export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_FROM: process.env.EMAIL_FROM,
  UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
});

// Exportar los tipos
export type Env = z.infer<typeof envSchema>;
