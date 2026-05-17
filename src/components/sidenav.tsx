"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/AuthStore";

const links = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Registrar Especie", href: "/ui", icon: PlusCircleIcon },
  { name: "Mapa de Especies", href: "/ui/map", icon: MapIcon },
  { name: "Catálogo", href: "/ui/specie", icon: CircleStackIcon },
  { name: "Acerca de", href: "/ui/about", icon: InformationCircleIcon },
  { name: "Ayuda", href: "/ui/help", icon: QuestionMarkCircleIcon },
];

export default function ResponsiveHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Cerrar el menú al cambiar de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Cerrar el menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // Si no está montado, mostrar un marcador de posición para evitar problemas de hidratación
  if (!mounted) return <div className="h-16"></div>;

  return (
    <>
      {/* Botón de menú para móviles */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          className="bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-emerald-800" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-emerald-800" />
          )}
        </button>
      </div>

      {/* Menú deslizante para móviles */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto",
          {
            "translate-x-0": isMenuOpen,
            "translate-x-full": !isMenuOpen,
          }
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" onClick={closeMenu}>
              <Image
                className="w-32"
                src="/Ecoj (1).png"
                alt="Ecoraices Logo"
                width={128}
                height={48}
                priority
              />
            </Link>
            <button
              onClick={closeMenu}
              className="p-1.5 rounded-full hover:bg-gray-100"
              aria-label="Cerrar menú"
            >
              <XMarkIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Información del usuario */}
          {user ? (
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <UserIcon className="h-6 w-6 text-emerald-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-emerald-800">{user.name}</p>
                  <p className="text-sm text-emerald-600">{user.email}</p>
                </div>
              </div>
            </div>
          ) : null}

          <nav className="flex-grow space-y-1">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex h-12 items-center gap-3 px-4 rounded-md transition-colors duration-200",
                    {
                      "bg-emerald-100 text-emerald-800": pathname === link.href,
                      "hover:bg-gray-100 text-gray-700": pathname !== link.href,
                    }
                  )}
                  onClick={closeMenu}
                >
                  <LinkIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 space-y-2">
            {user ? (
              <>
                <Link
                  href="/ui/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Mi Perfil</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-md text-red-600 hover:bg-red-50"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <Link
                href="/ui/auth/"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <UserCircleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Iniciar Sesión</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay oscuro cuando el menú está abierto */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Navegación lateral para pantallas grandes */}
      <div className="hidden md:flex flex-col h-full px-3 py-4 bg-white shadow-md md:px-2">
        <Link href="/" className="flex items-center justify-center mb-8">
          <Image
            className="w-40"
            src="/Ecoj (1).png"
            alt="Ecoraices Logo"
            width={160}
            height={60}
            priority
          />
        </Link>

        {user && (
          <div className="mb-6 mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-100 mx-auto mb-2 flex items-center justify-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-emerald-600" />
              )}
            </div>
            <p className="font-medium text-emerald-800">{user.name}</p>
            <p className="text-xs text-emerald-600 truncate max-w-[180px] mx-auto">
              {user.email}
            </p>
          </div>
        )}

        <div className="flex flex-col space-y-1 flex-grow">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex h-12 items-center gap-3 rounded-md p-3 text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors",
                  {
                    "bg-emerald-100 text-emerald-800": pathname === link.href,
                    "text-gray-700": pathname !== link.href,
                  }
                )}
              >
                <LinkIcon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto space-y-2 p-2">
          {user ? (
            <>
              <Link
                href="/ui/profile"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-emerald-700 hover:bg-emerald-50 w-full"
              >
                <Cog6ToothIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Mi Perfil</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 w-full"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Cerrar Sesión</span>
              </button>
            </>
          ) : (
            <Link
              href="/ui/auth/"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 w-full"
            >
              <UserCircleIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
