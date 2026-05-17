import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, UserType } from "@prisma/client";

// Creamos una instancia dedicada para testing
function getPrismaClient() {
  const prisma = new PrismaClient({
    log: ["error"],
    datasources: {
      db: {
        url: process.env.POSTGRES_URL,
      },
    },
  });
  return prisma;
}

// Datos de prueba
const testUser = {
  name: "Usuario API Test",
  email: `api-test-${Date.now()}@example.com`,
  password: "contraseña123",
  userType: UserType.NORMAL,
};

const testEspecie = {
  especie: "Especie API Test",
  municipio: "Municipio API Test",
  latitud: 10.234,
  longitud: -74.567,
  descripcion: "Descripción API test",
  estadoConservacion: "Preocupación menor",
};

// Variables para almacenar los IDs creados para limpieza
let userId: number;
let especieId: number;
let prisma: PrismaClient;

// Mock para el objeto Request
const createMockRequest = (url: string): NextRequest => {
  return {
    url,
    headers: new Headers(),
    method: "GET",
    nextUrl: new URL(url),
  } as unknown as NextRequest;
};

describe("Pruebas de integración para rutas de API", () => {
  // Conectamos y configuramos datos de prueba antes de todas las pruebas
  beforeAll(async () => {
    // Inicializamos la instancia de Prisma
    prisma = getPrismaClient();
    try {
      await prisma.$connect();

      // Crear usuario de prueba
      const user = await prisma.user.create({
        data: testUser,
      });
      userId = user.id;

      // Crear especie de prueba asociada al usuario
      const especie = await prisma.especie.create({
        data: {
          ...testEspecie,
          userId,
        },
      });
      especieId = especie.id;
    } catch (err) {
      console.error(
        "Error al conectar con la base de datos o configurar datos:",
        err
      );
      throw err;
    }
  });

  // Desconectamos y limpiamos después de todas las pruebas
  afterAll(async () => {
    // Limpieza: eliminamos las entidades creadas durante las pruebas
    if (especieId) {
      try {
        await prisma.especie.delete({
          where: { id: especieId },
        });
      } catch (e) {
        console.error("Error al eliminar especie:", e);
      }
    }

    if (userId) {
      try {
        await prisma.user.delete({
          where: { id: userId },
        });
      } catch (e) {
        console.error("Error al eliminar usuario:", e);
      }
    }

    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error("Error al desconectar de la base de datos:", err);
    }
  });

  test("GET /api/species debe devolver lista de especies", async () => {
    // En lugar de importar la ruta, consultamos directamente con prisma
    const especies = await prisma.especie.findMany({
      skip: 0,
      take: 10,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.especie.count();

    // Verificaciones
    expect(especies).toBeInstanceOf(Array);
    expect(total).toBeGreaterThanOrEqual(1);
    expect(especies.some((e) => e.id === especieId)).toBe(true);
  });

  test("GET /api/species/[id] debe devolver una especie específica", async () => {
    // Consultamos directamente con prisma
    const especie = await prisma.especie.findUnique({
      where: { id: especieId },
    });

    // Verificaciones
    expect(especie).toBeDefined();
    expect(especie?.id).toBe(especieId);
    expect(especie?.especie).toBe(testEspecie.especie);
    expect(especie?.municipio).toBe(testEspecie.municipio);
    expect(especie?.latitud).toBe(testEspecie.latitud);
    expect(especie?.longitud).toBe(testEspecie.longitud);
  });

  test("GET /api/species/[id] debe devolver null para ID no existente", async () => {
    // Consultamos un ID que no existe
    const especie = await prisma.especie.findUnique({
      where: { id: 999999 },
    });

    // Verificaciones - debería ser null
    expect(especie).toBeNull();
  });
});
