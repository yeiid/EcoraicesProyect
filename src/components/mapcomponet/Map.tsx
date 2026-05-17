// src/components/mapcomponet/Map.tsx
"use client";

import React, { useEffect, useState, memo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import {
  MagnifyingGlassIcon,
  MapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useMapStore } from "@/stores/MapStore";
import { EspecieExtended } from "@/app/lib/types";

// Solucionar el problema de los iconos predeterminados de Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

const CustomIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Componente para ajustar el centro del mapa cuando cambian las especies visualizadas
const MapUpdater = memo(({ especies }: { especies: EspecieExtended[] }) => {
  const map = useMap();

  useEffect(() => {
    if (especies && especies.length > 0) {
      try {
        const bounds = L.latLngBounds(
          especies.map((esp) => [esp.latitud, esp.longitud] as [number, number])
        );
        // Asegurarse de que los límites sean válidos
        if (bounds.isValid()) {
          map.fitBounds(bounds, { 
            padding: [50, 50],
            maxZoom: 15
          });
        }
      } catch (error) {
        console.error("Error al ajustar los límites del mapa:", error);
      }
    }
  }, [especies, map]);

  return null;
});

MapUpdater.displayName = 'MapUpdater';

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

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredEspecies, setFilteredEspecies] = useState<EspecieExtended[]>(
    []
  );
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/species/Get?page=${currentPage}&limit=${itemsPerPage}`
        );
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        
        if (!data || !Array.isArray(data.especies)) {
          throw new Error("Formato de datos inválido");
        }
        
        // Asegurarse de que los datos tengan el formato correcto
        const validEspecies: EspecieExtended[] = data.especies
          .filter((especie: any) => 
            especie && 
            typeof especie.latitud === 'number' && 
            typeof especie.longitud === 'number' &&
            !isNaN(especie.latitud) && 
            !isNaN(especie.longitud)
          )
          .map((especie: any) => ({
            ...especie,
            // Asegurarse de que los campos requeridos estén presentes
            createdAt: especie.createdAt ? new Date(especie.createdAt) : new Date(),
            userId: especie.userId || 0,
            user: especie.user || undefined
          }));
        
        setEspecies(validEspecies);
        setTotalItems(data.total || validEspecies.length);
        setFilteredEspecies(validEspecies);
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
    // Reducimos la frecuencia de actualizaciones para mejorar el rendimiento
    const intervalId = setInterval(fetchData, 300000); // Actualizar cada 5 minutos

    return () => clearInterval(intervalId);
  }, [currentPage, itemsPerPage, setEspecies, setError, setIsLoading]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredEspecies(especies);
      setSearchResults([]);
      return;
    }

    const results = especies.filter(
      (especie) =>
        especie.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        especie.municipio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEspecies(results);
    setSearchResults(results);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-800">
        Mapa de Especies
      </h1>

      <div className="mb-6">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Buscar por especie o municipio..."
            className="px-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-emerald-500 text-white rounded-r-lg shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-300"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center p-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-lg text-emerald-700">Cargando datos...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-emerald-700">
              <MagnifyingGlassIcon className="h-6 w-6 mr-2 text-emerald-500" />
              Resultados de Búsqueda
            </h2>
            {searchResults.length > 0 ? (
              <div>
                <ul className="space-y-3">
                  {searchResults.slice(0, 10).map((especie) => (
                    <li
                      key={especie.id}
                      className="border-b pb-2 hover:bg-emerald-50 p-2 rounded transition-colors duration-200"
                    >
                      <span className="font-medium text-emerald-800">
                        {especie.especie}
                      </span>
                      <p className="text-sm text-gray-600">
                        Municipio: {especie.municipio}
                        {especie.user && (
                          <>
                            <br />
                            Registrado por: {especie.user.name || 'Usuario desconocido'}
                          </>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
                {searchResults.length > 10 && (
                  <p className="text-center text-emerald-600 mt-4">
                    Mostrando 10 de {searchResults.length} resultados
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  {searchTerm.trim() !== ""
                    ? "No se encontraron especies que coincidan con tu búsqueda"
                    : "Utiliza el buscador para encontrar especies específicas"}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredEspecies(especies);
                  }}
                  className="mt-4 text-emerald-600 hover:text-emerald-800 underline"
                >
                  Mostrar todas las especies
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-emerald-700">
              <MapIcon className="h-6 w-6 mr-2 text-emerald-500" />
              Mapa General
            </h2>
            <MapContainer
              center={[10.9753248, -72.7924497]}
              zoom={10}
              style={{ width: "100%", height: "400px" }}
              className="rounded-lg z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredEspecies.map((especie) => (
                <Marker
                  key={especie.id}
                  position={[especie.latitud, especie.longitud]}
                  icon={CustomIcon}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-semibold text-emerald-700">
                        {especie.especie}
                      </h3>
                      <p>
                        <strong>Municipio:</strong> {especie.municipio}
                        {especie.user && (
                          <>
                            <br />
                            <strong>Registrado por:</strong> {especie.user.name || 'Usuario desconocido'}
                          </>
                        )}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <MapUpdater especies={filteredEspecies} />
            </MapContainer>
          </div>
        </div>
      )}

      {/* Paginación */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium
                ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-emerald-500 hover:bg-emerald-50"
                }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border border-gray-300 text-sm font-medium
                  ${
                    currentPage === i + 1
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-gray-700 hover:bg-emerald-50"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium
                ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-emerald-500 hover:bg-emerald-50"
                }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Map;
