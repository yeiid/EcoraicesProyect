"use client"
import  { useState } from 'react';
import Image from 'next/image';

const SimpleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, src: '/350751.jpg', alt: 'Slider 1' },
    { id: 2, src: '/350751.jpg', alt: 'Slider 2' },
    { id: 3, src: '/paisaje.jpg', alt: 'Slider 3' },
  ];

  const handlePrevClick = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-4xl h-80">
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
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentSlide === slide.id - 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={slide.src} alt={slide.alt} layout="fill" objectFit="cover" />
        </div>
      ))}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2">
        {slides.map((slide) => (
          <button
            key={slide.id}
            className={`w-3 h-3 rounded-full ${currentSlide === slide.id - 1 ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => setCurrentSlide(slide.id - 1)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
