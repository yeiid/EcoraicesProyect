import { useContext } from 'react';
import { ContextMap,  } from '@/context/UserContext';

const Button: React.FC = () => {
  const { setLocation } = useContext(ContextMap);

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        alert(' geolocalización obtenidad')
      } catch (error) {
        console.error('Error getting location:', error);
        alert('Error al obtener la ubicación. Inténtalo de nuevo.');
      }
    } else {
      alert('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <>
      <button
        onClick={handleGetLocation}
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md"
      >
        ¿Dónde estoy?
      </button>
    </>
  );
};

export default Button;
