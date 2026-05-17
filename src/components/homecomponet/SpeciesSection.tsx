"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { species } from "@/mook/developer";
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

const SpeciesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("species-section");
      if (element) {
        const position = element.getBoundingClientRect();
        // Si el elemento está visible en el viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Comprobar también al cargar la página
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="species-section"
      className="py-16 bg-gradient-to-b from-emerald-50 to-emerald-100"
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold text-emerald-800">
            Descubre las Especies Arbóreas
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Explora una variedad de especies arbóreas nativas presentes en los
            municipios guajiros. Cada especie juega un papel crucial en nuestro
            ecosistema y necesita ser preservada.
          </p>
          <Link
            className="mt-8 inline-flex items-center gap-2 bg-emerald-600 text-white py-3 px-6 text-lg font-medium rounded-lg transition duration-300 hover:bg-emerald-700 hover:shadow-lg"
            href="/ui/specie"
          >
            Ver todas las especies
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {species.map((species, index) => (
            <div
              key={species.id}
              className={`bg-white p-6 rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden group">
                <Image
                  src={species.images[0]}
                  alt={species.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg transition-all duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{species.scientificName}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-emerald-800">
                  {species.name}
                </h3>
                <Link href={`/ui/specie/${species.id}`}>
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 text-emerald-600 hover:text-emerald-800" />
                </Link>
              </div>

              <p className="text-gray-600 italic text-sm mb-3">
                {species.scientificName}
              </p>
              <p className="text-gray-700">{species.description}</p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/ui/specie/${species.id}`}
                  className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center text-sm"
                >
                  Más información
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/ui/map"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-medium"
          >
            Ver mapa de distribución de especies
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpeciesSection;
