"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useAuthStore } from '@/stores/AuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  MapIcon,
  CircleStackIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// Tipos para los enlaces de navegación
type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  adminOnly?: boolean;
};

// Enlaces de navegación principales
const mainNavLinks: NavLink[] = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  { name: 'Mapa', href: '/ui/map', icon: MapIcon },
  { name: 'Catálogo', href: '/ui/specie', icon: CircleStackIcon },
  { name: 'Comunidades', href: '/communities', icon: UserGroupIcon },
  { name: 'Nuevo', href: '/ui', icon: PlusCircleIcon, requiresAuth: true },
];

// Enlaces del menú de usuario
const userMenuLinks = [
  { name: 'Mi perfil', href: '/profile' },
  { name: 'Configuración', href: '/settings' },
  { name: 'Cerrar sesión', href: '#', action: 'signout' },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Manejar cierre de menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.header-menu') && !target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar acciones del menú de usuario
  const handleUserAction = (action?: string) => {
    if (action === 'signout') {
      signOut({ redirect: false }).then(() => {
        logout();
        router.push('/auth/signin');
      });
    }
  };

  // Verificar si un enlace está activo
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Filtrar enlaces basados en autenticación y permisos
  const filteredNavLinks = mainNavLinks.filter(link => {
    if (link.requiresAuth && status !== 'authenticated') return false;
    if (link.adminOnly && user?.userType !== 'admin') return false;
    return true;
  });

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y menú móvil */}
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="EcoRaíces"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
                <span className="ml-2 text-xl font-bold text-green-700">EcoRaíces</span>
              </Link>
            </div>

            {/* Navegación desktop */}
            <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
              {filteredNavLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      active
                        ? 'border-green-500 text-gray-900'
                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800'
                    }`}
                  >
                    <Icon className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="sr-only">Buscar</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {status === 'authenticated' && (
              <>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Notificaciones</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  </button>
                </div>

                {/* Menú de usuario */}
                <div className="ml-4 relative flex-shrink-0">
                  <div>
                    <button
                      type="button"
                      className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      id="user-menu-button"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <span className="sr-only">Abrir menú de usuario</span>
                      {user?.image ? (
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={user.image}
                          alt={user.name || 'Usuario'}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                      )}
                      <ChevronDownIcon 
                        className={`ml-1 h-5 w-5 text-gray-500 transition-transform ${
                          isUserMenuOpen ? 'transform rotate-180' : ''
                        }`} 
                        aria-hidden="true" 
                      />
                    </button>
                  </div>

                  {/* Menú desplegable del usuario */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.name || 'Usuario'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                        {userMenuLinks.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                              if (item.action) {
                                e.preventDefault();
                                handleUserAction(item.action);
                              }
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {status !== 'authenticated' && (
              <div className="ml-4 flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {filteredNavLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center px-4 py-2 text-base font-medium ${
                      active
                        ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                    {link.name}
                  </Link>
                );
              })}
              
              {status !== 'authenticated' && (
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex flex-col space-y-2 px-4">
                    <Link
                      href="/auth/signin"
                      className="w-full flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="w-full flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Registrarse
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
