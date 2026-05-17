"use client";

import { useEffect, useState } from "react";
import Slider from "@/components/homecomponet/Slider";
import InicioSection from "@/components/homecomponet/InicioSection";
import DevelopersSection from "@/components/homecomponet/DevelopersSection";
import SpeciesSection from "@/components/homecomponet/SpeciesSection";
import ProjectsSection from "@/components/homecomponet/ProjectsSection";
import DonationsSection from "@/components/homecomponet/DonationsSection ";
import Footer from "@/components/Footer";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón cuando se ha scrolleado más de 500px
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white pointer-events-none -z-10" />

        <InicioSection />

        <div className="w-full max-w-5xl mx-auto my-16 px-4">
          <Slider />
        </div>

        <SpeciesSection />

        <div className="bg-gray-50 py-16">
          <ProjectsSection />
        </div>

        <div className="bg-emerald-50 py-16">
          <DonationsSection />
        </div>

        <div className="bg-gray-900 text-white py-16">
          <DevelopersSection />
        </div>

        <Footer />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 z-50"
              aria-label="Volver arriba"
            >
              <ArrowUpIcon className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
