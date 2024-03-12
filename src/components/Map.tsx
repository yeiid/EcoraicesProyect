"use client"

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Especie} from '@/app/lib/types'


const MapComponent = () => {
  const [especies, setEspecies] = useState<Especie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/date');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setEspecies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 80000); // Actualizar los datos cada 10 segundos

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
    };
  }, []);

  return (
    <MapContainer
      center={[10.9753248, -72.7924497]} 
      zoom={13}
      style={{ width: '400px', height: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {especies.map((especie) => (
        <Marker key={especie.id} position={[especie.latitud, especie.longitud]}>
          <Popup>
            <div>
              <h2>{especie.especie}</h2>
              <p>
                Municipio: {especie.municipio}
                <br />
                Ciudadano: {especie.ciudadano}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
