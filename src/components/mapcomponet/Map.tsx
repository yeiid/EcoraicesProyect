"use client";

import { useEffect, useState } from "react";
import { Especie } from "@/app/lib/types";
import MapContain from "./MapContainer";

const Map = () => {
  const [especies, setEspecies] = useState<Especie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/date");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setEspecies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 120000); // Actualizar los datos cada 10 segundos

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
    };
  }, []);

  return (
    <>
      <div className="flex justify-center mb-4">
        <div>
          <h2>busca las espcies mapeadas </h2>
          <input
            type="text"
            placeholder="Buscar especie..."
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>
      </div>
      <MapContain especies={especies} />
    </>
  );
};

export default Map;
