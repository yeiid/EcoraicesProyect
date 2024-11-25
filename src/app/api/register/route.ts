// src/app/api/register/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar los datos del formulario
    const parsedData = registerSchema.parse(body);

    const { name, email, password, confirmPassword } = parsedData;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Las contraseñas no coinciden" }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // userType: "", // Ajusta según tu lógica
      },
    });

    return NextResponse.json({ message: "Usuario creado exitosamente" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors.map((e) => e.message).join(", ") }, { status: 400 });
    }
    console.error("Error en el registro:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
