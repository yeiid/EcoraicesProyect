import React, { useContext } from 'react';
import { ContextMap } from '@/context/UserContext';

interface ButtonContextProps {
  setLocation: (location: { lat: number; lng: number }) => void;
}

const Button: React.FC = () => {
  const { setLocation } = useContext<ButtonContextProps>(ContextMap);

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
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
