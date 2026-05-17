#!/bin/bash

# Script para ejecutar pruebas antes de entrar en producción
echo "Iniciando pruebas pre-producción para Ecoraices..."

# Asegurar que estamos usando la versión correcta de Node
echo "Verificando versión de Node..."
node -v

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install
else
  echo "Dependencias ya instaladas."
fi

# Generar el cliente de Prisma
echo "Generando cliente Prisma..."
npx prisma generate

# Ejecutar linting
echo "Ejecutando linting..."
npm run lint

# Ejecutar pruebas con cobertura
echo "Ejecutando pruebas con cobertura..."
npm run test:coverage

# Verificar que todas las pruebas pasan
if [ $? -eq 0 ]; then
  echo "✅ Todas las pruebas pasaron exitosamente."
else
  echo "❌ Algunas pruebas fallaron. Por favor, revise los errores antes de continuar."
  exit 1
fi

# Construir la aplicación para verificar errores de compilación
echo "Construyendo la aplicación..."
npm run build

# Verificar que la construcción fue exitosa
if [ $? -eq 0 ]; then
  echo "✅ Construcción exitosa."
else
  echo "❌ La construcción falló. Por favor, revise los errores antes de continuar."
  exit 1
fi

echo "✅ Todas las verificaciones completadas exitosamente. El proyecto está listo para producción."
exit 0 