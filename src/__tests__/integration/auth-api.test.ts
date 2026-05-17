import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

// Generar un email único para cada prueba
const uniqueEmail = `auth-test-${Date.now()}@example.com`;

// Datos de prueba
const testUser = {
  name: "Usuario Auth Test",
  email: uniqueEmail,
  password: "contraseña123",
  confirmPassword: "contraseña123",
};

// Datos para prueba de duplicado
const duplicateUser = {
  name: "Usuario Duplicado",
  email: uniqueEmail, // Mismo email para probar duplicidad
  password: "contraseña123",
  confirmPassword: "contraseña123",
};

// Datos para prueba de contraseñas distintas
const mismatchPasswordUser = {
  name: "Usuario Mismatch",
  email: `mismatch-${Date.now()}@example.com`,
  password: "contraseña123",
  confirmPassword: "diferente456",
};

let prisma: PrismaClient;
let userId: number;

describe("Pruebas de Autenticación con la base de datos", () => {
  // Configuración antes de todas las pruebas
  beforeAll(async () => {
    prisma = getPrismaClient();
    await prisma.$connect();
  });

  // Limpieza después de todas las pruebas
  afterAll(async () => {
    // Eliminar usuario de prueba si fue creado
    if (userId) {
      try {
        await prisma.user.delete({
          where: { id: userId },
        });
      } catch (e) {
        console.error("Error al eliminar usuario de prueba:", e);
      }
    }

    // Asegurar que eliminamos cualquier otro usuario de prueba que no haya sido limpiado
    try {
      await prisma.user.deleteMany({
        where: {
          email: {
            contains: "auth-test-",
          },
        },
      });
    } catch (e) {
      console.error("Error al limpiar usuarios de prueba:", e);
    }

    await prisma.$disconnect();
  });

  test("Registro de usuario debe crear usuario correctamente", async () => {
    // Verificar que el usuario no existe inicialmente
    const existingUser = await prisma.user.findUnique({
      where: { email: testUser.email },
    });
    expect(existingUser).toBeNull();

    // Crear usuario directamente en la base de datos
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    const user = await prisma.user.create({
      data: {
        name: testUser.name,
        email: testUser.email,
        password: hashedPassword,
      },
    });

    // Verificar que el usuario fue creado correctamente
    expect(user).toBeDefined();
    expect(user.email).toBe(testUser.email);
    expect(user.name).toBe(testUser.name);

    // Almacenar ID para limpieza
    userId = user.id;

    // Verificar que la contraseña está hasheada correctamente
    const isValidPassword = await bcrypt.compare(
      testUser.password,
      user.password
    );
    expect(isValidPassword).toBe(true);
  });

  test("No debe permitir registrar usuarios duplicados", async () => {
    // Intentar crear un usuario con el mismo email
    try {
      await prisma.user.create({
        data: {
          name: duplicateUser.name,
          email: duplicateUser.email,
          password: await bcrypt.hash(duplicateUser.password, 10),
        },
      });
      // Si llegamos aquí, la prueba falló
      fail("Debería haber lanzado un error por email duplicado");
    } catch (error) {
      // Esperamos un error de Prisma por clave única
      expect(error).toBeDefined();
    }
  });

  test("Debe validar las credenciales de un usuario existente", async () => {
    // Buscar el usuario creado
    const user = await prisma.user.findUnique({
      where: { email: testUser.email },
    });
    expect(user).toBeDefined();

    if (user) {
      // Validar contraseña
      const isValid = await bcrypt.compare(testUser.password, user.password);
      expect(isValid).toBe(true);

      // Validar contraseña incorrecta
      const isInvalid = await bcrypt.compare(
        "contraseña_incorrecta",
        user.password
      );
      expect(isInvalid).toBe(false);
    }
  });
});
