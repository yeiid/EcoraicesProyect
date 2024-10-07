// src/components/mapcomponet/Map.tsx
"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MagnifyingGlassIcon, MapIcon } from "@heroicons/react/24/outline";
import { useMapStore } from "@/stores/MapStore";
import { useAuthStore } from "@/stores/AuthStore";
import { EspecieExtended } from "@/app/lib/types";

const CustomIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map: React.FC = () => {
  const {
    especies,
    searchTerm,
    searchResults,
    error,
    isLoading,
    setEspecies,
    setSearchTerm,
    setSearchResults,
    setError,
    setIsLoading,
  } = useMapStore();

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/species/Get"); // Asegúrate de que la ruta es correcta
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data: EspecieExtended[] = await response.json();
        setEspecies(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(
          "Hubo un problema al obtener los datos. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 120000); // Actualizar cada 2 minutos

    return () => clearInterval(intervalId);
  }, [setEspecies, setError, setIsLoading]);

  const handleSearch = () => {
    const results = especies.filter((especie) =>
      especie.especie.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mapa de Especies</h1>

      <div className="mb-6">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Buscar especie..."
            className="px-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Cargando datos...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MagnifyingGlassIcon className="h-6 w-6 mr-2 text-blue-500" />
              Resultados de Búsqueda
            </h2>
            {searchResults.length > 0 ? (
              <ul className="space-y-2">
                {searchResults.map((especie) => (
                  <li key={especie.id} className="border-b pb-2">
                    <span className="font-medium">{especie.especie}</span>
                    <p className="text-sm text-gray-600">
                      Municipio: {especie.municipio}
                      <br />
                      {/* Usuario: {especie.user?.name || "Desconocido"} */}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No se encontraron especies
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapIcon className="h-6 w-6 mr-2 text-blue-500" />
              Mapa General
            </h2>
            <MapContainer
              center={[10.9753248, -72.7924497]}
              zoom={10}
              style={{ width: "100%", height: "400px" }}
              className="rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {especies.map((especie) => (
                <Marker
                  key={especie.id}
                  position={[especie.latitud, especie.longitud]}
                  icon={CustomIcon}
                >
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{especie.especie}</h3>
                      <p>
                        Municipio: {especie.municipio}
                        <br />
                        {/* Usuario: {especie.user?.name || "Desconocido"} */}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
