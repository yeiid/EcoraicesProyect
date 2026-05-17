"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/stores/AuthStore";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  HomeIcon,
  MapIcon,
  CircleStackIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

// Tipos para los enlaces de navegación
type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  adminOnly?: boolean;
};

// Enlaces de navegación
const NAV_LINKS: NavLink[] = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Registrar Especie", href: "/ui", icon: PlusCircleIcon, requiresAuth: true },
  { name: "Mapa de Especies", href: "/ui/map", icon: MapIcon },
  { name: "Catálogo", href: "/ui/specie", icon: CircleStackIcon },
  { name: "Comunidades", href: "/communities", icon: UserGroupIcon },
  { name: "Acerca de", href: "/about", icon: InformationCircleIcon },
  { name: "Ayuda", href: "/help", icon: QuestionMarkCircleIcon },
];

// Componente para el logo
const Logo = memo(() => (
  <Link href="/" className="flex items-center justify-center mb-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md p-1">
    <Image
      className="w-40"
      src="/Ecoj (1).png"
      alt="Ecoraices Logo"
      width={160}
      height={60}
      priority
    />
  </Link>
));
Logo.displayName = 'Logo';

// Componente para el perfil del usuario
const UserProfile = memo(({ user }: { user: any }) => (
  <div className="mb-6 mx-auto text-center">
    <div className="h-16 w-16 rounded-full bg-emerald-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || 'Usuario'}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      ) : (
        <UserIcon className="h-8 w-8 text-emerald-600" />
      )}
    </div>
    <p className="font-medium text-emerald-800 truncate max-w-[180px] mx-auto">
      {user.name}
    </p>
    <p className="text-xs text-emerald-600 truncate max-w-[180px] mx-auto">
      {user.email}
    </p>
  </div>
));
UserProfile.displayName = 'UserProfile';

// Componente para los enlaces de navegación
const NavLinks = memo(({ 
  links, 
  currentPath, 
  onLinkClick 
}: { 
  links: NavLink[], 
  currentPath: string, 
  onLinkClick: () => void 
}) => (
  <nav className="flex flex-col space-y-1 flex-grow">
    {links.map(({ name, href, icon: Icon }) => {
      const isActive = currentPath === href;
      return (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={clsx(
            "flex h-12 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white",
            isActive 
              ? "bg-emerald-100 text-emerald-800" 
              : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <span>{name}</span>
        </Link>
      );
    })}
  </nav>
));
NavLinks.displayName = 'NavLinks';

// Componente para los botones de autenticación
const AuthButtons = memo(({ 
  isAuthenticated, 
  onLogout, 
  onLinkClick 
}: { 
  isAuthenticated: boolean, 
  onLogout: () => void, 
  onLinkClick: () => void 
}) => (
  <div className="mt-auto space-y-2 p-2">
    {isAuthenticated ? (
      <>
        <Link
          href="/profile"
          onClick={onLinkClick}
          className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-emerald-700 hover:bg-emerald-50 w-full"
        >
          <div className="flex items-center gap-2">
            <Cog6ToothIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Mi Perfil</span>
          </div>
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50"
        >
          <div className="flex items-center gap-2">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </div>
        </button>
      </>
    ) : (
      <Link
        href="/auth/signin"
        onClick={onLinkClick}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 w-full"
      >
        <UserCircleIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Iniciar Sesión</span>
      </Link>
    )}
  </div>
));
AuthButtons.displayName = 'AuthButtons';

// Componente principal de la barra lateral
const Sidebar = () => {
  const pathname = usePathname();

  const { user, logout: logoutStore } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isAuthenticated = user !== null;

  // Evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  // Manejar el cierre de sesión
  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    logoutStore();
    window.location.href = "/auth/signin";
  }, [logoutStore]);

  // Cerrar menú móvil
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Filtrar enlaces según autenticación y permisos
  const filteredLinks = NAV_LINKS.filter(link => {
    if (link.requiresAuth && !isAuthenticated) return false;
    if (link.adminOnly && user?.userType !== 'admin') return false;
    return true;
  });

  if (!isMounted) {
    return (
      <div className="hidden md:flex w-64 h-screen flex-col bg-white border-r border-gray-200" />
    );
  }

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg md:hidden"
        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6 text-emerald-800" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-emerald-800" />
        )}
      </button>

      {/* Overlay para móviles */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 flex flex-col p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <Logo />
              <button
                onClick={closeMobileMenu}
                className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Cerrar menú"
              >
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            
            {isAuthenticated && user && (
              <UserProfile user={user} />
            )}
            
            <NavLinks 
              links={filteredLinks} 
              currentPath={pathname} 
              onLinkClick={closeMobileMenu} 
            />
            
            <AuthButtons 
              isAuthenticated={isAuthenticated} 
              onLogout={handleLogout} 
              onLinkClick={closeMobileMenu} 
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Barra lateral para escritorio */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="flex flex-col flex-1 p-4">
          <Logo />
          
          {isAuthenticated && user && (
            <UserProfile user={user} />
          )}
          
          <NavLinks 
            links={filteredLinks} 
            currentPath={pathname} 
            onLinkClick={closeMobileMenu} 
          />
          
          <AuthButtons 
            isAuthenticated={isAuthenticated} 
            onLogout={handleLogout} 
            onLinkClick={closeMobileMenu} 
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
