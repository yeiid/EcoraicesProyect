"use client";

import { useEffect, useState } from "react";
import { Especie } from "@/app/lib/types";
import MapContain from "./MapContainer";
import SearchMapContain from "./SearchMapContainer"; // Nuevo componente para el mapa de búsqueda

const Map = () => {
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Especie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/date");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setEspecies(data);
        setError(null); // Limpiar cualquier error previo
      } catch (error) {
        console.error(error);
        setError(
          "Hubo un problema al obtener los datos. Por favor, intenta de nuevo más tarde."
        );
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 120000); // Actualizar los datos cada 2 minutos

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
    };
  }, []);

  const handleSearch = () => {
    const results = especies.filter((especie) =>
      especie.especie.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <div>
          <h2>Busca las especies mapeadas</h2>
          <input
            type="text"
            placeholder="Buscar especie..."
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Buscar
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex justify-around flex-col">
        <div>
          <h3>Mapa de Búsqueda</h3>
          <SearchMapContain especies={searchResults} />
        </div>
        <div>
          <h3>Mapa General</h3>
          <MapContain especies={especies} />
        </div>
      </div>
    </>
  );
};

export default Map;
