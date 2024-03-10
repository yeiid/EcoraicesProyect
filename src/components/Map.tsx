"use client";
import { useContextMap } from "@/context/UserContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function Map() {
  const { data, location } = useContextMap();

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ width: "400px", height: "400px" }}
    >
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    /> 
      <Marker position={location}>
        <Popup >
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
