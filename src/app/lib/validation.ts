// src/app/lib/validation.ts

import { z } from "zod";

// Esquema de Registro
export const registrationSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La confirmación de la contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Esquema de Inicio de Sesión
export const loginSchema = z.object({
  email: z.string().email("Correo electrónico no es válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
