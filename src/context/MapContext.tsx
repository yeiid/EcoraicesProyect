'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Especie } from "@/app/lib/types";

interface MapContextType {
  especies: Especie[];
  error: string | null;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
};

export function MapContextProvider({ children }: { children: ReactNode }): JSX.Element {
  const [especies, setEspecies] = useState<Especie[]>([]);
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
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Hubo un problema al obtener los datos. Por favor, intenta de nuevo más tarde.");
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 120000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MapContext.Provider value={{ especies, error }}>
      {children}
    </MapContext.Provider>
  );
}