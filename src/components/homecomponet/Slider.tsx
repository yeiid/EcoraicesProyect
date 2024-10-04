"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const SimpleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, type: 'image', src: '/paisaje.jpg', alt: 'Slider 1' },
    { id: 2, type: 'image', src: '/slaider-paisajefull.jpg', alt: 'Slider 2' },
    { id: 3, type: 'video', src: '/video.mp4', alt: 'Slider 3' },
    { id: 4, type: 'image', src: '/melocactus.jpg', alt: 'Slider 4' },
  ];

  const handlePrevClick = useCallback(() => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length]);

  const handleNextClick = useCallback(() => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    const interval = setInterval(handleNextClick, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [handleNextClick]);

  return (
    <div className="relative w-full max-w-4xl h-80 mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={handleNextClick}
      >
        &gt;
      </button>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={clsx(
            'absolute inset-0 transition-opacity duration-1000',
            { 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }
          )}
        >
          {slide.type === 'image' ? (
            <Image src={slide.src} alt={slide.alt} layout="fill" objectFit="cover" />
          ) : (
            <video src={slide.src} autoPlay loop muted className="w-full h-full object-cover" />
          )}
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={clsx(
              'w-3 h-3 rounded-full transition-colors duration-300',
              { 'bg-blue-600': currentSlide === index, 'bg-gray-300': currentSlide !== index }
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
