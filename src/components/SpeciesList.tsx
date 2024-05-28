import React from 'react';

interface Species {
  localName: string;
  scientificName: string;
  description: string;
  // Otras propiedades adicionales
}

const SpeciesList: React.FC<{ species: Species[] }> = ({ species }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold my-4">Especies Arborescentes en la Región Caribe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {species.map((specie, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{specie.localName}</h3>
            <p className="text-sm text-gray-600 mt-2">
              Nombre Científico: {specie.scientificName}<br />
              Descripción: {specie.description}
            </p>
            {/* Agrega aquí la imagen utilizando la ruta proporcionada */}
            {/* <img src={specie.image} alt={specie.localName} className="mt-2" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpeciesList;
