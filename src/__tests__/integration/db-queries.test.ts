import { PrismaClient, UserType } from "@prisma/client";

// Creamos una instancia dedicada para testing
const prisma = new PrismaClient({
  log: ["error"],
  datasources: {
    db: {
      url: process.env.POSTGRES_URL,
    },
  },
});

// Arrays para almacenar IDs para limpieza
let userId: string;
const especieIds: string[] = [];

describe("Pruebas de consultas avanzadas a la base de datos", () => {
  // Creamos datos de prueba antes de todas las pruebas
  beforeAll(async () => {
    // Aseguramos que estamos en un entorno Node.js
    if (typeof window !== "undefined") {
      throw new Error("Estas pruebas deben ejecutarse en un entorno Node.js");
    }

    // Creamos un usuario para las pruebas
    const user = await prisma.user.create({
      data: {
        name: "Usuario Consultas Avanzadas",
        email: `queries-${Date.now()}@example.com`,
        password: "contraseña123",
        userType: UserType.NORMAL,
      },
    });
    userId = user.id;

    // Creamos varias especies con diferentes atributos para probar las consultas
    const especiesToCreate = [
      {
        especie: "Especie Municipio A",
        municipio: "Municipio A",
        latitud: 1.234,
        longitud: -4.567,
        descripcion: "Descripción que contiene palabras clave importantes",
        estadoConservacion: "En peligro",
        userId: user.id,
      },
      {
        especie: "Especie Municipio A 2",
        municipio: "Municipio A",
        latitud: 1.334,
        longitud: -4.667,
        descripcion: "Otra descripción sin palabras relevantes",
        estadoConservacion: "Vulnerable",
        userId: user.id,
      },
      {
        especie: "Especie Municipio B",
        municipio: "Municipio B",
        latitud: 2.345,
        longitud: -5.678,
        descripcion: "Descripción con palabras clave importantes y relevantes",
        estadoConservacion: "Preocupación menor",
        userId: user.id,
      },
      {
        especie: "Especie Municipio B 2",
        municipio: "Municipio B",
        latitud: 2.445,
        longitud: -5.778,
        descripcion: "Descripción básica",
        estadoConservacion: "En peligro crítico",
        userId: user.id,
      },
      {
        especie: "Especie Municipio C",
        municipio: "Municipio C",
        latitud: 3.456,
        longitud: -6.789,
        descripcion: "Descripción que menciona relevantes hallazgos",
        estadoConservacion: "Datos insuficientes",
        userId: user.id,
      },
    ];

    for (const especieData of especiesToCreate) {
      const especie = await prisma.especie.create({ data: especieData });
      especieIds.push(especie.id);
    }
  });

  // Limpiamos después de todas las pruebas
  afterAll(async () => {
    // Eliminamos las especies creadas
    for (const id of especieIds) {
      try {
        await prisma.especie.delete({ where: { id } });
      } catch (e) {
        console.error(`Error al eliminar especie ${id}:`, e);
      }
    }

    // Eliminamos el usuario creado
    if (userId) {
      try {
        await prisma.user.delete({ where: { id: userId } });
      } catch (e) {
        console.error(`Error al eliminar usuario ${userId}:`, e);
      }
    }

    await prisma.$disconnect();
  });

  test("Debe agrupar especies por municipio", async () => {
    const result = await prisma.especie.groupBy({
      by: ["municipio"],
      _count: {
        id: true,
      },
      orderBy: {
        municipio: "asc",
      },
    });

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(3);

    // Verificamos que los municipios A y B tienen al menos 2 especies cada uno
    const municipioA = result.find((r) => r.municipio === "Municipio A");
    const municipioB = result.find((r) => r.municipio === "Municipio B");

    expect(municipioA).toBeDefined();
    expect(municipioB).toBeDefined();
    expect(municipioA?._count.id).toBeGreaterThanOrEqual(2);
    expect(municipioB?._count.id).toBeGreaterThanOrEqual(2);
  });

  test("Debe filtrar especies por contenido de la descripción", async () => {
    const especies = await prisma.especie.findMany({
      where: {
        descripcion: {
          contains: "palabras clave",
          mode: "insensitive",
        },
      },
    });

    expect(especies).toBeInstanceOf(Array);
    expect(especies.length).toBeGreaterThanOrEqual(2);

    // Verificamos que todas las especies en el resultado tienen la frase en su descripción
    especies.forEach((especie) => {
      expect(especie.descripcion.toLowerCase()).toContain("palabras clave");
    });
  });

  test("Debe filtrar especies por estado de conservación", async () => {
    const especies = await prisma.especie.findMany({
      where: {
        estadoConservacion: {
          contains: "En peligro",
        },
      },
      orderBy: {
        especie: "asc",
      },
    });

    expect(especies).toBeInstanceOf(Array);
    expect(especies.length).toBeGreaterThanOrEqual(1);

    // Verificamos que todas contienen "En peligro" en su estado
    especies.forEach((especie) => {
      expect(especie.estadoConservacion).toContain("En peligro");
    });
  });

  test("Debe paginar los resultados", async () => {
    // Primera página
    const page1 = await prisma.especie.findMany({
      where: { userId },
      take: 2,
      orderBy: { especie: "asc" },
    });

    // Segunda página
    const page2 = await prisma.especie.findMany({
      where: { userId },
      skip: 2,
      take: 2,
      orderBy: { especie: "asc" },
    });

    expect(page1).toHaveLength(2);
    expect(page2).toHaveLength(2);

    // Verificamos que son diferentes conjuntos de resultados
    const page1Ids = page1.map((e) => e.id);
    const page2Ids = page2.map((e) => e.id);

    page2Ids.forEach((id) => {
      expect(page1Ids).not.toContain(id);
    });
  });

  test("Debe seleccionar campos específicos", async () => {
    const especies = await prisma.especie.findMany({
      where: { userId },
      select: {
        id: true,
        especie: true,
        municipio: true,
      },
    });

    expect(especies).toBeInstanceOf(Array);
    expect(especies.length).toBeGreaterThanOrEqual(5);

    // Verificamos que solo contienen los campos seleccionados
    especies.forEach((especie) => {
      expect(Object.keys(especie).sort()).toEqual(
        ["especie", "id", "municipio"].sort()
      );
      expect(especie).not.toHaveProperty("descripcion");
      expect(especie).not.toHaveProperty("latitud");
      expect(especie).not.toHaveProperty("longitud");
    });
  });

  test("Debe consultar con condiciones OR", async () => {
    const especies = await prisma.especie.findMany({
      where: {
        OR: [
          { municipio: "Municipio A" },
          { estadoConservacion: "En peligro crítico" },
        ],
      },
      orderBy: {
        especie: "asc",
      },
    });

    expect(especies).toBeInstanceOf(Array);
    expect(especies.length).toBeGreaterThanOrEqual(3); // 2 de Municipio A + 1 en peligro crítico

    // Verificamos que cumplen al menos una de las condiciones
    especies.forEach((especie) => {
      const condicion1 = especie.municipio === "Municipio A";
      const condicion2 = especie.estadoConservacion === "En peligro crítico";
      expect(condicion1 || condicion2).toBe(true);
    });
  });

  test("Debe consultar especies por rango de coordenadas", async () => {
    // Buscamos especies en un rango de coordenadas
    const especies = await prisma.especie.findMany({
      where: {
        latitud: {
          gte: 1.0,
          lte: 2.5,
        },
        longitud: {
          gte: -5.8,
          lte: -4.5,
        },
      },
    });

    expect(especies).toBeInstanceOf(Array);

    // Verificamos que todas están dentro del rango especificado
    especies.forEach((especie) => {
      expect(especie.latitud).toBeGreaterThanOrEqual(1.0);
      expect(especie.latitud).toBeLessThanOrEqual(2.5);
      expect(especie.longitud).toBeGreaterThanOrEqual(-5.8);
      expect(especie.longitud).toBeLessThanOrEqual(-4.5);
    });
  });
});
