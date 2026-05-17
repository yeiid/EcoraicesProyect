"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HeartIcon,
  CurrencyDollarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const DonationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("donations-section");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="donations-section" className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-white p-2 rounded-full mb-4">
            <HeartIcon className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-4xl font-bold mb-3 text-gray-800">
            Tu Apoyo es Vital
          </h2>
          <div className="w-24 h-1 bg-red-400 mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Con tu contribución podemos mantener y expandir nuestros proyectos
            de conservación y educación ambiental en la región guajira.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
              <div className="flex items-center mb-2">
                <TrashIcon className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-semibold">
                  Donar Útiles de Limpieza
                </h3>
              </div>
              <p className="text-green-50">
                Necesitamos materiales para mantener limpias las áreas de
                conservación
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    ✓
                  </span>
                  <span>Bolsas de basura biodegradables</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    ✓
                  </span>
                  <span>Guantes reutilizables</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    ✓
                  </span>
                  <span>Herramientas de jardinería</span>
                </li>
              </ul>
              <Link
                href="/donate/supplies"
                className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center py-3 px-4 rounded-lg shadow transition-colors duration-300"
              >
                Donar Materiales
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
              <div className="flex items-center mb-2">
                <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                <h3 className="text-xl font-semibold">Apoyo Monetario</h3>
              </div>
              <p className="text-blue-50">
                Tu contribución económica financia nuestros proyectos de forma
                directa
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    ✓
                  </span>
                  <span>Compra de semillas y plantones</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    ✓
                  </span>
                  <span>Equipamiento para voluntarios</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    ✓
                  </span>
                  <span>Desarrollo de programas educativos</span>
                </li>
              </ul>
              <Link
                href="/donate/money"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 px-4 rounded-lg shadow transition-colors duration-300"
              >
                Realizar Donación
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 italic">
            "Cada pequeña acción suma. Juntos podemos hacer la diferencia."
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
            >
              ¿Preguntas sobre donaciones? Contáctanos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationsSection;
