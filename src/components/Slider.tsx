"use client";
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const SimpleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, src: '/paisaje.jpg', alt: 'Slider 1' },
    { id: 2, src: '/slaider-paisajefull.jpg', alt: 'Slider 2' },
    { id: 3, src: '/slaider-paisaje.jpg', alt: 'Slider 3' },
    { id: 4, src: '/melocactus.jpg', alt: 'Slider 4' },
  ];

  const handlePrevClick = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl h-80 mx-auto overflow-hidden">
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
            'absolute inset-0 transition-opacity duration-500',
            { 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }
          )}
        >
          <Image src={slide.src} alt={slide.alt} layout="fill" objectFit="cover" />
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
