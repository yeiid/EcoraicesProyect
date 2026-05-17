import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { join } from 'path';
import { URL } from 'url';

const prisma = new PrismaClient();

async function main() {
  // 1. Verificar la conexión a la base de datos
  try {
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:');
    console.error(error);
    process.exit(1);
  }

  // 2. Crear una nueva migración
  console.log('\n🔄 Creando migración...');
  try {
    execSync('npx prisma migrate dev --name update_schema', { stdio: 'inherit' });
    console.log('✅ Migración creada exitosamente');
  } catch (error) {
    console.error('❌ Error al crear la migración:');
    console.error(error);
    process.exit(1);
  }

  // 3. Generar el cliente de Prisma
  console.log('\n🔧 Generando cliente de Prisma...');
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Cliente de Prisma generado exitosamente');
  } catch (error) {
    console.error('❌ Error al generar el cliente de Prisma:');
    console.error(error);
    process.exit(1);
  }

  console.log('\n✨ ¡Base de datos actualizada exitosamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
