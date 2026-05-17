# 🌱 EcoRaíces

EcoRaíces es una plataforma colaborativa para el registro, seguimiento y conservación de especies de árboles nativos. La aplicación permite a los usuarios registrar avistamientos de árboles, unirse a comunidades de conservación y contribuir a la protección de la biodiversidad local.

## 🚀 Características

- 🌍 Registro georreferenciado de especies de árboles
- 👥 Sistema de autenticación de usuarios
- 👥 Gestión de comunidades de conservación
- 📸 Carga de imágenes y documentación
- 📊 Seguimiento de avances y contribuciones
- 🔍 Búsqueda avanzada de especies

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: PostgreSQL con PostGIS
- **Autenticación**: NextAuth.js
- **ORM**: Prisma
- **Despliegue**: Vercel

## 🚀 Empezando

### Requisitos previos

- Node.js 18+
- PostgreSQL 13+
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ecoraices.git
   cd ecoraices
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

3. Configura las variables de entorno:
   ```bash
   cp .env.example .env.local
   ```
   Luego, edita el archivo `.env.local` con tus credenciales.

4. Ejecuta las migraciones de la base de datos:
   ```bash
   npx prisma migrate dev
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, lee nuestras [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## 📬 Contacto

¿Tienes preguntas o sugerencias? ¡Nos encantaría saber de ti!