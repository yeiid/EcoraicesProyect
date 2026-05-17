"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const InicioSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evitar problemas de hidratación
  if (!mounted) {
    return (
      <section className="py-16 flex items-center flex-col w-full max-w-4xl">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="max-w-2xl text-center flex items-center flex-col">
            <div className="w-[250px] h-[250px] bg-gray-200 rounded-full animate-pulse" />
            <div className="h-8 w-3/4 bg-gray-200 rounded mt-6 animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded mt-4 animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded mt-2 animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 flex items-center flex-col w-full max-w-5xl">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-center flex items-center flex-col"
        >
          <div className="relative w-[250px] h-[250px]">
            <Image
              src="/Ecoj (1).png"
              alt="Logo EcoRaices"
              width={250}
              height={250}
              className="drop-shadow-xl"
              priority
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-emerald-500 opacity-70"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.5, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-emerald-800 mt-8 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            ¡Bienvenidos a <span className="text-emerald-600">EcoRaices</span>!
          </motion.h1>

          <motion.div
            className="w-24 h-1 bg-emerald-500 mx-auto my-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          <motion.p
            className="text-lg text-gray-700 mt-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            Descubre la biodiversidad urbana de los municipios guajiros con
            <strong className="text-emerald-700"> EcoRaices</strong>. Nuestra
            plataforma te permite geolocalizar y documentar las especies
            arbóreas que embellecen nuestras calles y plazas. Únete a nuestra
            comunidad y juntos, protejamos y conservemos nuestro entorno
            natural.
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link
              href="/ui"
              className="flex items-center gap-2 bg-emerald-600 text-white py-3 px-8 text-lg font-medium rounded-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg transform hover:translate-y-[-2px] group"
            >
              Empecemos
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-2xl mt-16 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <div className="flex items-center gap-2 bg-emerald-50 p-3 rounded-lg text-emerald-800 border border-emerald-100">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <span className="font-medium">Geolocalización</span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 p-3 rounded-lg text-emerald-800 border border-emerald-100">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            <span className="font-medium">Catalogación</span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 p-3 rounded-lg text-emerald-800 border border-emerald-100">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.479m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </div>
            <span className="font-medium">Comunidad</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InicioSection;
