"use client"

import { useFormContext } from "@/context/LocationContext";

const Button: React.FC = () => {
  const { setLocation } = useFormContext();

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        const options: PositionOptions = {
          enableHighAccuracy: true, // Habilitar alta precisión
          timeout: 10000,           // Tiempo máximo de espera (en milisegundos)
          maximumAge: 0             // Descartar caché de ubicación anterior
        };

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        
        alert('¡Ubicación obtenida con éxito!');
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        alert('Error al obtener la ubicación. Inténtalo de nuevo.');
      }
    } else {
      alert('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <button
      onClick={handleGetLocation}
      className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md"
    >
      ¿Dónde estoy?
    </button>
  );
};

export default Button;
