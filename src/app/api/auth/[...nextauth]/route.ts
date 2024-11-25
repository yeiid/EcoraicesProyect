// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { UserType } from "@/app/lib/types"; // Asegúrate de que la ruta sea correcta
import { z } from "zod";

const prisma = new PrismaClient();

const credentialsSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const handler = NextAuth({
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
          const parsedCredentials = credentialsSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: { email: parsedCredentials.email },
          });

          if (!user) {
            throw new Error("Usuario no encontrado");
          }

          const isValid = await compare(parsedCredentials.password, user.password);

          if (!isValid) {
            throw new Error("Contraseña incorrecta");
          }

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
        token.id = Number(user.id);
        token.userType = user.userType;
        token.groupName = user.groupName;
        token.groupAdmin = user.groupAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: Number(token.id),
          name: token.name as string,
          email: token.email as string,
          userType: token.userType as UserType,
          groupName: token.groupName as string | undefined,
          groupAdmin: token.groupAdmin as string | undefined,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
