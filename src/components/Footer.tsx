import {
  HomeIcon,
  DocumentDuplicateIcon,
  MapIcon,
  CircleStackIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { ExternalLinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

const links = [
  { name: "Inicio", href: "/", icon: HomeIcon },
  { name: "Formulario", href: "/ui", icon: CircleStackIcon },
  { name: "Acerca de", href: "/ui/about", icon: DocumentDuplicateIcon },
  { name: "Mapa", href: "/ui/map", icon: MapIcon },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección de información */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/eco-logo.svg"
                alt="EcoRaices Logo"
                width={40}
                height={40}
                className="rounded-full bg-white p-1"
              />
              <h3 className="text-2xl font-bold">EcoRaices</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Descubre y contribuye a la biodiversidad urbana de los municipios
              guajiros con EcoRaices. Juntos construimos el mapa de la vida
              silvestre en nuestras comunidades.
            </p>
            <div className="pt-4">
              <a
                href="mailto:contacto@ecoraices.org"
                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <span>contacto@ecoraices.org</span>
              </a>
            </div>
          </div>

          {/* Sección de enlaces */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Enlaces rápidos
            </h3>
            <ul className="space-y-3">
              {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                      <LinkIcon className="h-5 w-5 mr-2 text-emerald-500 group-hover:text-emerald-400" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sección de redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Conéctate con nosotros
            </h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"
                  />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-400 p-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"
                  />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Suscríbete a nuestro boletín para recibir actualizaciones sobre
              nuevas especies y proyectos de conservación.
            </p>
            <div className="mt-3 flex">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-gray-700 border-0 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-md text-sm font-medium transition-colors">
                Suscribir
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} EcoRaices. Todos los derechos
            reservados.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
