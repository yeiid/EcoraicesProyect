"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const developers = [
  {
    id: 1,
    name: "Yeifran Hernandez",
    role: "Frontend Developer",
    description:
      "Apasionado por el desarrollo web y las interfaces de usuario.",
    imageUrl: "/perfil.png",
    socialLinks: {
      github: "https://github.com/yeifrandev",
      linkedin: "https://linkedin.com/in/yeifrandev",
      twitter: "https://twitter.com/yeifrandev",
    },
    skills: ["React", "Next.js", "TailwindCSS"],
  },
  {
    id: 2,
    name: "Ana Gómez",
    role: "Backend Developer",
    description: "Experta en la creación de APIs y bases de datos.",
    imageUrl: "/images/ana.jpg",
    socialLinks: {
      github: "https://github.com/anagomez",
      linkedin: "https://linkedin.com/in/anagomez",
      twitter: "https://twitter.com/anagomez",
    },
    skills: ["Node.js", "Express", "PostgreSQL"],
  },
  {
    id: 3,
    name: "Carlos Ramírez",
    role: "Full Stack Developer",
    description: "Disfruta trabajando tanto en frontend como en backend.",
    imageUrl: "/images/carlos.jpg",
    socialLinks: {
      github: "https://github.com/carlosramirez",
      linkedin: "https://linkedin.com/in/carlosramirez",
      twitter: "https://twitter.com/carlosramirez",
    },
    skills: ["TypeScript", "React", "Python"],
  },
];

const DevelopersSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("team-section");
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
    <section id="team-section" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-blue-100 p-2 rounded-full mb-4">
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold mb-3 text-white">Nuestro Equipo</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Conoce a los desarrolladores apasionados que han hecho posible esta
            plataforma para la conservación de especies en La Guajira.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {developers.map((developer) => (
            <motion.div
              key={developer.id}
              variants={item}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 w-full bg-gradient-to-b from-blue-400 to-emerald-400 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="w-36 h-36 relative rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={developer.imageUrl}
                    alt={developer.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {developer.name}
                </h3>
                <p className="text-blue-300 mb-2">{developer.role}</p>
                <p className="text-gray-400 mb-4">{developer.description}</p>

                <div className="flex justify-center gap-4 mb-6">
                  {developer.socialLinks && (
                    <>
                      <a
                        href={developer.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      </a>
                      <a
                        href={developer.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                      </a>
                      <a
                        href={developer.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                      </a>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {developer.skills &&
                    developer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/yeifrandev/ecoraices"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <CodeBracketIcon className="h-5 w-5 mr-2" />
            Ver proyecto en GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DevelopersSection;
