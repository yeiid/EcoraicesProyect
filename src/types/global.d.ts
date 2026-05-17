// Extender el objeto global de Node.js
declare namespace NodeJS {
  interface ProcessEnv {
    // Base de datos
    DATABASE_URL: string;
    
    // Autenticación
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL?: string;
    
    // Entorno
    NODE_ENV: 'development' | 'production' | 'test';
    
    // Configuración de correo (opcional)
    EMAIL_SERVER?: string;
    EMAIL_FROM?: string;
    
    // Configuración de almacenamiento (opcional)
    UPLOADTHING_SECRET?: string;
    UPLOADTHING_APP_ID?: string;
  }
}

// Extender el objeto global del navegador
declare global {
  // Aquí puedes agregar tipos globales para el navegador si es necesario
  interface Window {
    // Ejemplo: gtag para Google Analytics
    // gtag: (...args: any[]) => void;
  }
}
