"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  BookOpenIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { projects, lawsAndRegulations } from "@/mook/developer";

const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [showLaws, setShowLaws] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("projects-section");
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects-section" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3 text-gray-800">
            Proyectos Ambientales
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre nuestras iniciativas para la conservación y protección de
            las especies arbóreas nativas de La Guajira y aprende cómo puedes
            contribuir.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-emerald-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button
                  onClick={() =>
                    setActiveProject(
                      activeProject === project.id ? null : project.id
                    )
                  }
                  className="mt-2 inline-flex items-center justify-center text-emerald-600 hover:text-emerald-800 font-medium transition duration-300"
                >
                  {activeProject === project.id ? "Ocultar pasos" : "Ver pasos"}
                  <ChevronDownIcon
                    className={`w-5 h-5 ml-1 transform transition-transform duration-300 ${
                      activeProject === project.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeProject === project.id ? "auto" : 0,
                    opacity: activeProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2 text-gray-700">
                    {project.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-800">
            Recursos Adicionales
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowLaws(!showLaws)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition duration-300 flex items-center"
            >
              <ScaleIcon className="w-5 h-5 mr-2" />
              Leyes y Regulaciones Ambientales
            </button>
            <a
              href="/guia-interactiva"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition duration-300 flex items-center"
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Guía Interactiva
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showLaws ? "auto" : 0,
            opacity: showLaws ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden mt-8"
        >
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h4 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
              Leyes y Regulaciones Ambientales
            </h4>
            <div className="grid gap-6 md:grid-cols-2">
              {lawsAndRegulations.map((law) => (
                <div
                  key={law.id}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h5 className="font-semibold text-lg text-emerald-700">
                    {law.title}
                  </h5>
                  <p className="text-gray-600 mt-2">{law.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
