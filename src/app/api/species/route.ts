// src/app/api/species/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Asegúrate de esta importación
import { Especie, CreateEspecieResponse } from "@/app/lib/types";
import { especieSchema } from "@/app/lib/schema";
import { z } from "zod";

// GET: Obtener todas las especies con paginación
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Verificar que los parámetros sean números válidos
    const validPage = isNaN(page) ? 1 : Math.max(1, page);
    const validLimit = isNaN(limit) ? 10 : Math.min(100, Math.max(1, limit));

    // Calcular offset
    const skip = (validPage - 1) * validLimit;

    // Contar el total de registros para la paginación
    const total = await prisma.especie.count();

    // Obtener las especies con la información del usuario
    const especies = await prisma.especie.findMany({
      skip,
      take: validLimit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      especies,
      total,
      page: validPage,
      limit: validLimit,
      totalPages: Math.ceil(total / validLimit),
    });
  } catch (error) {
    console.error("Error al obtener especies:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos" },
      { status: 500 }
    );
  }
}

// POST: Crear una nueva especie
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validación de los datos recibidos usando zod
    const validatedData = especieSchema.parse(body);

    // Crear la nueva especie en la base de datos
    const newEspecie = await prisma.especie.create({
      data: {
        especie: validatedData.especie,
        municipio: validatedData.municipio,
        latitud: validatedData.latitud,
        longitud: validatedData.longitud,
        descripcion: validatedData.descripcion,
        estadoConservacion: validatedData.estadoConservacion,
        user: {
          connect: { id: validatedData.userId },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(newEspecie, { status: 201 });
  } catch (error) {
    console.error("Error al crear especie:", error);

    // Manejar diferentes tipos de errores
    if (error instanceof z.ZodError) {
      // Error de validación de datos
      return NextResponse.json(
        {
          error: "Datos de entrada inválidos",
          details: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // Error de restricción única de la base de datos
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Ya existe una especie registrada en estas coordenadas" },
        { status: 409 }
      );
    }

    // Cualquier otro error
    return NextResponse.json(
      { error: "Error al crear la especie" },
      { status: 500 }
    );
  }
}
