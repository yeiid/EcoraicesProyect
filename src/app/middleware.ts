import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Personalizar comportamiento si es necesario
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/ui/login', // Ruta a la página de login
    },
  }
);

export const config = {
  matcher: ['/ui/form/:path*', '/ui/specie/:path*', '/ui/map/:path*'], // Rutas protegidas
};
