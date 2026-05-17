"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Slide {
  id: number;
  type: "image" | "video";
  src: string;
  alt: string;
  title: string;
  description: string;
}

const ModernSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      type: "image",
      src: "/paisaje.jpg",
      alt: "Paisaje Natural",
      title: "Biodiversidad Local",
      description: "Explorando la riqueza natural de los ecosistemas guajiros",
    },
    {
      id: 2,
      type: "image",
      src: "/slaider-paisajefull.jpg",
      alt: "Vista Panorámica",
      title: "Conservación de Especies",
      description:
        "Protegiendo nuestra flora autóctona para futuras generaciones",
    },
    {
      id: 4,
      type: "image",
      src: "/melocactus.jpg",
      alt: "Melocactus",
      title: "Especies Endémicas",
      description:
        "Descubriendo las características únicas de nuestra flora local",
    },
  ];

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Avance automático del slider
  useEffect(() => {
    const interval = setInterval(handleNextClick, 7000);
    return () => clearInterval(interval);
  }, []);

  // Teclas de navegación
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevClick();
      } else if (e.key === "ArrowRight") {
        handleNextClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-xl bg-gray-100">
      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-gray-100">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label="Anterior"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white drop-shadow-md" />
      </button>

      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label="Siguiente"
      >
        <ChevronRightIcon className="h-6 w-6 text-white drop-shadow-md" />
      </button>

      {/* Slides Container */}
      <div className="relative h-[450px] w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {slides[currentSlide].type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={slides[currentSlide].src}
                  alt={slides[currentSlide].alt}
                  fill
                  sizes="100vw"
                  quality={90}
                  priority
                  className="object-cover"
                  onLoadingComplete={() => setLoading(false)}
                />
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white"
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-sm md:text-base max-w-xl">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={slides[currentSlide].src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  onLoadedData={() => setLoading(false)}
                />
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white"
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-sm md:text-base max-w-xl">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-emerald-500 w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernSlider;
