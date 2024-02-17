import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Tilelayer() {
  return (
    <>
      <div>
        {data &&
          data.map((dato) => (
            <Marker key={dato.id}>
              <Popup>
                <div>
                  <h2>{dato.especie}</h2>
                  <p>
                    Municipio: {dato.municipio}
                    <br />
                    Ciudadano: {dato.ciudadano}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
      </div>
    </>
  );
}
