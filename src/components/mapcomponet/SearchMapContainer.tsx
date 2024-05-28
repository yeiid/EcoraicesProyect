import { FC } from "react";
import { Especie } from "@/app/lib/types";

const SearchMapContain: FC<{ especies: Especie[] }> = ({ especies }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Mapa de Búsqueda</h3>
      <div className="w-full h-64 bg-gray-200 rounded-lg mb-4">
        {/* Aquí va la lógica para renderizar el mapa */}
        <p className="text-center text-gray-500 pt-24">Mapa en construcción</p>
      </div>
      {especies.length > 0 ? (
        <ul className="list-disc pl-5">
          {especies.map((especie) => (
            <li key={especie.id} className="mb-2">
              <span className="font-medium">{especie.especie}</span> - {especie.ciudadano}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No se encontraron especies</p>
      )}
    </div>
  );
};

export default SearchMapContain;
