"use client"


import { useContext } from "react";
import { ContextMap } from "@/context/UserContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'


import { MyIcon } from '@/app/ui/map/Icon'
export default function Geo  () {
  
  const Context = useContext(ContextMap);
  const {  location, data } = Context;
  
  const [lat, lng] = Object.values(location) 

  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{width: '250px', height: '250px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} icon={MyIcon}>
        <Popup>
          <div>
            <h2>{data.especie}</h2>
            <p>
              Municipio: {data.municipio}
              <br />
              Ciudadano: {data.ciudadano}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

