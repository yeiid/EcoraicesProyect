import { PrismaClient } from '@prisma/client';

declare global {
  // Evitar múltiples instancias de Prisma Client en desarrollo
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Inicializar Prisma Client
const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Si estamos en desarrollo, guardar la instancia en global para evitar recargas de módulo
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };
