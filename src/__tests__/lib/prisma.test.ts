import { prisma } from "@/app/lib/prisma";

// Mock de prisma client
jest.mock("@/app/lib/prisma", () => ({
  prisma: {
    especie: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  },
}));

describe("Prisma Client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Especie operations", () => {
    test("findMany debe retornar un array de especies", async () => {
      const mockEspecies = [
        {
          id: 1,
          especie: "Ceiba pentandra",
          municipio: "Riohacha",
          latitud: 11.5444,
          longitud: -72.9072,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          id: 2,
          especie: "Roble",
          municipio: "Maicao",
          latitud: 11.3783,
          longitud: -72.2447,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      ];

      (prisma.especie.findMany as jest.Mock).mockResolvedValue(mockEspecies);

      const result = await prisma.especie.findMany();

      expect(prisma.especie.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockEspecies);
      expect(result).toHaveLength(2);
    });

    test("create debe crear una nueva especie", async () => {
      const mockEspecie = {
        id: 3,
        especie: "Mangle rojo",
        municipio: "Dibulla",
        latitud: 11.2733,
        longitud: -73.3055,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      };

      const mockInput = {
        data: {
          especie: "Mangle rojo",
          municipio: "Dibulla",
          latitud: 11.2733,
          longitud: -73.3055,
          user: {
            connect: { id: 1 },
          },
        },
      };

      (prisma.especie.create as jest.Mock).mockResolvedValue(mockEspecie);

      const result = await prisma.especie.create(mockInput);

      expect(prisma.especie.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockEspecie);
    });

    test("findUnique debe encontrar una especie por id", async () => {
      const mockEspecie = {
        id: 1,
        especie: "Ceiba pentandra",
        municipio: "Riohacha",
        latitud: 11.5444,
        longitud: -72.9072,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      };

      (prisma.especie.findUnique as jest.Mock).mockResolvedValue(mockEspecie);

      const result = await prisma.especie.findUnique({
        where: { id: 1 },
      });

      expect(prisma.especie.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockEspecie);
    });

    test("count debe retornar el número total de especies", async () => {
      (prisma.especie.count as jest.Mock).mockResolvedValue(42);

      const result = await prisma.especie.count();

      expect(prisma.especie.count).toHaveBeenCalled();
      expect(result).toBe(42);
    });
  });

  describe("User operations", () => {
    test("findUnique debe encontrar un usuario por email", async () => {
      const mockUser = {
        id: 1,
        name: "Usuario Test",
        email: "test@example.com",
        password: "hashedpassword",
        userType: "NORMAL",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await prisma.user.findUnique({
        where: { email: "test@example.com" },
      });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(result).toEqual(mockUser);
    });

    test("create debe crear un nuevo usuario", async () => {
      const mockUser = {
        id: 2,
        name: "Nuevo Usuario",
        email: "nuevo@example.com",
        password: "hashedpassword",
        userType: "NORMAL",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockInput = {
        data: {
          name: "Nuevo Usuario",
          email: "nuevo@example.com",
          password: "hashedpassword",
        },
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await prisma.user.create(mockInput);

      expect(prisma.user.create).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockUser);
    });
  });
});
