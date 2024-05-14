import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Especie } from '@/app/lib/types'; // Importar la interfaz Especie

interface MapContainProps {
  especies: Especie[];
}

const MapContain: React.FC<MapContainProps> = ({ especies }) => {
  const CustomIcon = new L.Icon({
    iconUrl: '/marker-icon.png',
    iconSize: [1, 130],
    iconAnchor: [10, 10],
    popupAnchor: [0, -20],
  });

  return (
    <div>
      <MapContainer
        center={[10.9753248, -72.7924497]}
        zoom={10}
        style={{ width: '450px', height: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {especies && especies.map((especie) => (
          <Marker key={especie.id} position={[especie.latitud, especie.longitud]} icon={CustomIcon}>
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
    </div>
  );
};

export default MapContain;
