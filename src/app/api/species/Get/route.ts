import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
