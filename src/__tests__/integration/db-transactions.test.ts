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

// Datos de prueba
const testUser1 = {
  name: "Usuario Transacción",
  email: `transaction-${Date.now()}@example.com`,
  password: "contraseña123",
  userType: UserType.NORMAL,
};

const testUser2 = {
  name: "Usuario Transacción 2",
  email: `transaction2-${Date.now()}@example.com`,
  password: "contraseña456",
  userType: UserType.NORMAL,
};

// Arrays para almacenar IDs creados para limpieza
const userIds: string[] = [];
const especieIds: string[] = [];

describe("Pruebas de transacciones en la base de datos", () => {
  // Aseguramos la limpieza después de todas las pruebas
  afterAll(async () => {
    // Limpiamos especies
    for (const id of especieIds) {
      try {
        await prisma.especie.delete({ where: { id } });
      } catch (e) {
        console.error(`Error al eliminar especie ${id}:`, e);
      }
    }

    // Limpiamos usuarios
    for (const id of userIds) {
      try {
        await prisma.user.delete({ where: { id } });
      } catch (e) {
        console.error(`Error al eliminar usuario ${id}:`, e);
      }
    }

    await prisma.$disconnect();
  });

  test("Debe ejecutar una transacción correctamente", async () => {
    // Aseguramos que estamos en un entorno Node.js
    if (typeof window !== "undefined") {
      throw new Error("Estas pruebas deben ejecutarse en un entorno Node.js");
    }

    const result = await prisma.$transaction(async (tx) => {
      // Creamos un usuario
      const user = await tx.user.create({
        data: testUser1,
      });

      // Creamos una especie asociada a ese usuario
      const especie = await tx.especie.create({
        data: {
          especie: "Especie en Transacción",
          municipio: "Municipio Test",
          latitud: 1.234,
          longitud: -4.567,
          descripcion: "Creada dentro de una transacción",
          estadoConservacion: "En peligro",
          userId: user.id,
        },
      });

      // Guardamos IDs para limpieza
      userIds.push(user.id);
      especieIds.push(especie.id);

      return { user, especie };
    });

    // Verificamos resultados
    expect(result.user).toBeDefined();
    expect(result.especie).toBeDefined();
    expect(result.especie.userId).toBe(result.user.id);

    // Verificamos que los datos se guardaron correctamente
    const userFromDb = await prisma.user.findUnique({
      where: { id: result.user.id },
      include: { especies: true },
    });

    expect(userFromDb).toBeDefined();
    expect(userFromDb?.especies).toHaveLength(1);
    expect(userFromDb?.especies[0].id).toBe(result.especie.id);
  });

  test("Debe hacer rollback si hay un error en la transacción", async () => {
    // Creamos un usuario fuera de la transacción
    const existingUser = await prisma.user.create({
      data: testUser2,
    });
    userIds.push(existingUser.id);

    // Intentamos crear un usuario con el mismo email (error)
    try {
      await prisma.$transaction(async (tx) => {
        // Esto funcionará
        const especie = await tx.especie.create({
          data: {
            especie: "Especie que no debería existir",
            municipio: "Municipio Rollback",
            latitud: 2.345,
            longitud: -5.678,
            descripcion: "Esta especie debería eliminarse en rollback",
            estadoConservacion: "Datos insuficientes",
            userId: existingUser.id,
          },
        });

        // Esto fallará por email duplicado
        await tx.user.create({
          data: {
            ...testUser2,
            name: "Nombre diferente pero mismo email",
          },
        });

        return { especie };
      });
      fail("La transacción debería haber fallado");
    } catch (error) {
      // Esperamos que falle
      expect(error).toBeDefined();
    }

    // Verificamos que no se creó ninguna especie para ese usuario
    const especies = await prisma.especie.findMany({
      where: { userId: existingUser.id },
    });

    expect(especies).toHaveLength(0);
  });

  test("Debe manejar múltiples operaciones en una transacción", async () => {
    const result = await prisma.$transaction(async (tx) => {
      // Creamos un usuario
      const user = await tx.user.create({
        data: {
          name: "Usuario Multi-Operaciones",
          email: `multi-${Date.now()}@example.com`,
          password: "contraseña789",
          userType: UserType.NORMAL,
        },
      });

      // Creamos varias especies
      const especie1 = await tx.especie.create({
        data: {
          especie: "Especie Multiple 1",
          municipio: "Municipio Test",
          latitud: 3.456,
          longitud: -6.789,
          descripcion: "Primera especie en transacción múltiple",
          estadoConservacion: "Casi amenazada",
          userId: user.id,
        },
      });

      const especie2 = await tx.especie.create({
        data: {
          especie: "Especie Multiple 2",
          municipio: "Otro Municipio",
          latitud: 4.567,
          longitud: -7.89,
          descripcion: "Segunda especie en transacción múltiple",
          estadoConservacion: "Vulnerable",
          userId: user.id,
        },
      });

      // Actualizamos el nombre del usuario
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { name: "Usuario Actualizado en Transacción" },
      });

      // Guardamos IDs para limpieza
      userIds.push(user.id);
      especieIds.push(especie1.id, especie2.id);

      return { user: updatedUser, especies: [especie1, especie2] };
    });

    // Verificamos resultados
    expect(result.user).toBeDefined();
    expect(result.user.name).toBe("Usuario Actualizado en Transacción");
    expect(result.especies).toHaveLength(2);

    // Verificamos en la base de datos
    const userFromDb = await prisma.user.findUnique({
      where: { id: result.user.id },
      include: { especies: true },
    });

    expect(userFromDb).toBeDefined();
    expect(userFromDb?.especies).toHaveLength(2);
    expect(userFromDb?.name).toBe("Usuario Actualizado en Transacción");
  });
});
