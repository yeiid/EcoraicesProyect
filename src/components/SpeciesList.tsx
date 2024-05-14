"use client"

import { useEffect, useState } from 'react';
// import { GET } from '@/app/api/date/apiService';

import {Species} from '@/app/lib/types'


const SpeciesList: React.FC = () => {
  const [species, setSpecies] = useState<Species[]>([]);

  useEffect(() => {
    async function fetchSpecies() {
      try {
        const data = await GET<Species[]>();
        if (data) {
          setSpecies(data);
        }
      } catch (error) {
        console.error('Error al buscar especies en La Guajira:', error);
      }
    }

    fetchSpecies();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold my-4">Especies en La Guajira</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {species.map((specie, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{specie.scientificNameSimple}</h3>
            <p className="text-sm text-gray-600 mt-2">{specie.description}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default SpeciesList;
