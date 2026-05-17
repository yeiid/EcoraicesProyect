import { PrismaClient, UserType } from '@prisma/client';

// Creamos una instancia dedicada para testing
// Usamos una función para evitar problemas de instanciación en entornos de navegador
function getPrismaClient() {
  const prisma = new PrismaClient({
    log: ['error'],
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
  name: 'Usuario de Prueba',
  email: `test-${Date.now()}@example.com`,
  password: 'contraseña123',
  userType: UserType.NORMAL,
};

const testEspecie = {
  especie: 'Especie de Prueba',
  municipio: 'Municipio de Prueba',
  latitud: 1.234,
  longitud: -4.567,
  descripcion: 'Descripción de prueba',
  estadoConservacion: 'Preocupación menor',
};

// Variables para almacenar los IDs creados para limpieza
let userId: string;
let especieId: string;
let prisma: PrismaClient;

// Configuración para que los tests sean seriales
// Solo para tests de integración con base de datos

describe('Pruebas de integración con la base de datos', () => {
  // Conectamos a la base de datos antes de todas las pruebas
  beforeAll(async () => {
    // Inicializamos la instancia de Prisma
    prisma = getPrismaClient();
    try {
      await prisma.$connect();
    } catch (err) {
      console.error('Error al conectar con la base de datos:', err);
      throw err;
    }
  });

  // Desconectamos después de todas las pruebas
  afterAll(async () => {
    // Limpieza: eliminamos las entidades creadas durante las pruebas
    if (especieId) {
      try {
        await prisma.especie.delete({
          where: { id: especieId }
        });
      } catch (e) {
        console.error('Error al eliminar especie:', e);
      }
    }

    if (userId) {
      try {
        await prisma.user.delete({
          where: { id: userId }
        });
      } catch (e) {
        console.error('Error al eliminar usuario:', e);
      }
    }

    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error('Error al desconectar de la base de datos:', err);
    }
  });

  test('Debe crear un usuario', async () => {
    const user = await prisma.user.create({
      data: testUser
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toBe(testUser.email);
    
    // Guardamos el ID para limpieza posterior
    userId = user.id;
  });

  test('Debe encontrar el usuario creado', async () => {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    expect(user).toBeDefined();
    expect(user?.email).toBe(testUser.email);
  });

  test('Debe crear una especie relacionada con el usuario', async () => {
    const especie = await prisma.especie.create({
      data: {
        ...testEspecie,
        userId
      }
    });

    expect(especie).toBeDefined();
    expect(especie.id).toBeDefined();
    expect(especie.userId).toBe(userId);
    
    // Guardamos el ID para limpieza posterior
    especieId = especie.id;
  });

  test('Debe encontrar la especie con el usuario relacionado', async () => {
    const especie = await prisma.especie.findUnique({
      where: { id: especieId },
      include: { user: true }
    });

    expect(especie).toBeDefined();
    expect(especie?.id).toBe(especieId);
    expect(especie?.user).toBeDefined();
    expect(especie?.user.id).toBe(userId);
  });

  test('Debe actualizar los datos de la especie', async () => {
    const nuevaDescripcion = 'Descripción actualizada en prueba';
    
    const especieActualizada = await prisma.especie.update({
      where: { id: especieId },
      data: {
        descripcion: nuevaDescripcion
      }
    });

    expect(especieActualizada).toBeDefined();
    expect(especieActualizada.descripcion).toBe(nuevaDescripcion);
  });

  test('Debe obtener todas las especies de un usuario', async () => {
    const especies = await prisma.especie.findMany({
      where: { userId }
    });

    expect(especies).toBeInstanceOf(Array);
    expect(especies.length).toBeGreaterThanOrEqual(1);
    expect(especies.some(e => e.id === especieId)).toBe(true);
  });

  test('Debe buscar especies por municipio', async () => {
    const especies = await prisma.especie.findMany({
      where: {
        municipio: testEspecie.municipio
      }
    });

    expect(especies).toBeInstanceOf(Array);
    expect(especies.length).toBeGreaterThanOrEqual(1);
    expect(especies.some(e => e.id === especieId)).toBe(true);
  });

  test('Debe obtener el conteo de especies', async () => {
    const count = await prisma.especie.count();
    expect(typeof count).toBe('number');
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
