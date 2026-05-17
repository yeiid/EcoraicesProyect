"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/AuthStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import { Toaster } from "react-hot-toast";
import { User, UserRole } from "@/app/lib/types";

// Componente para sincronizar la sesión con el store de autenticación
const SessionSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const { setUser } = useAuthStore();

  // Sincronizar la sesión con el store
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const userData = session.user as any;
      const user: Partial<User> = {
        id: userData.id || 0,
        name: userData.name || '',
        email: userData.email || '',
        image: userData.image || undefined,
        userType: (userData.userType as UserRole) || 'user',
        groupName: userData.groupName,
        groupAdmin: userData.groupAdmin,
      };
      setUser(user as User);
    } else if (status === 'unauthenticated') {
      setUser(null);
    }
  }, [session, status, setUser]);

  return <>{children}</>;
};

// Componente de layout principal
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  // Si es una página de autenticación, no mostrar el sidebar
  if (isAuthPage) {
    return (
      <SessionProvider>
        <SessionSync>
          <div className="min-h-screen bg-gray-50">
            <main>{children}</main>
          </div>
          <Toaster position="top-right" />
        </SessionSync>
      </SessionProvider>
    );
  }

  // Para el resto de páginas, mostrar el layout con sidebar
  return (
    <SessionProvider>
      <SessionSync>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Contenido principal */}
          <main className="flex-1 md:pl-64">
            <div className="p-4 md:p-8">
              {children}
            </div>
          </main>
          
          {/* Notificaciones */}
          <Toaster position="top-right" />
        </div>
      </SessionSync>
    </SessionProvider>
  );
};

export default Layout;