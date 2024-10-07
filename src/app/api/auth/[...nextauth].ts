// src/app/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { UserType } from "@/app/lib/types"; // Asegúrate de que la ruta sea correcta
import { z } from "zod";

// Inicializa Prisma Client
const prisma = new PrismaClient();

// Define el esquema de validación con Zod
const credentialsSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo Electrónico",
          type: "email",
          placeholder: "correo@ejemplo.com",
        },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // Validar credenciales
          const parsedCredentials = credentialsSchema.parse(credentials);

          // Buscar al usuario en la base de datos
          const user = await prisma.user.findUnique({
            where: { email: parsedCredentials.email },
          });

          if (!user) {
            throw new Error("Usuario no encontrado");
          }

          // Verificar la contraseña
          const isValid = await compare(parsedCredentials.password, user.password);

          if (!isValid) {
            throw new Error("Contraseña incorrecta");
          }

          // Retornar el objeto de usuario, asegurando que groupName y groupAdmin sean undefined si son null
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType as UserType,
            groupName: user.groupName || undefined,
            groupAdmin: user.groupAdmin || undefined,
          };
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(error.errors.map(e => e.message).join(", "));
          }
          console.error("Error en la autorización:", error);
          throw new Error("Error en la autorización");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id) // Asegúrate de que sea un número
        token.userType = user.userType; // Asegúrate de que es UserType
        token.groupName = user.groupName; // groupName puede ser undefined ahora
        token.groupAdmin = user.groupAdmin; // groupAdmin puede ser undefined ahora
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: Number(token.id), // Asegúrate de que sea un número
          name: token.name as string,
          email: token.email as string,
          userType: token.userType as UserType, // Asegúrate de que es UserType
          groupName: token.groupName as string | undefined,
          groupAdmin: token.groupAdmin as string | undefined,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
