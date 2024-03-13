// InformativeSection.tsx

import React from 'react';

const InformativeSection: React.FC = () => {
  return (
    <section className="bg-green-500 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Título informativo</h2>
        <p className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Botón
        </button>
      </div>
    </section>
  );
};

export default InformativeSection;
