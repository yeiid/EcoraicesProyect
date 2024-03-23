"use client";
import { useState } from "react";
import Button from "./Button";
import { useContextMap } from "@/context/UserContext";
import { schema } from "@/app/lib/schema"; // Importa el esquema de validación
import { simplificarErrores } from "@/app/lib/action";

const Formulario: React.FC = () => {
  const { data, setData, location } = useContextMap();
  const [validationError, setValidationError] = useState<string[] | null>(null);

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const allData = schema.parse({
        data,
        location,
      });
      setValidationError([]);

      const res = await fetch("/api/date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });

      if (res.ok) {
        alert("Datos enviados! Gracias 🎇🎈" );
        window.location.reload();
      } else {
        alert("Error al enviar lo Datos ❌");
      }
    } catch (error: any) {
      if (error.errors) {
        const erroresSimplificados = simplificarErrores(error.errors);
        setValidationError(erroresSimplificados); // Actualizamos los mensajes de error simplificados
      }
    }
  }

  return (
    <div className="flex h-full flex-col items-center px-3 py-4 md:px-2 bg-gray-300">
      <h1 className="text-2xl font-bold">Formulario</h1>
      <Button />
      {location && (
        <div>
          <p>LATITUDE: {location.lat}</p>
          <p>LONGITUDE: {location.lng}</p>
        </div>
      )}
      <form className="flex flex-col items-center" onSubmit={handler}>
        <label className="mt-4" htmlFor="especie">
          Especie
        </label>
        <input
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          type="text"
          id="especie"
          name="especie"
          value={data.especie}
          onChange={(e) => setData({ ...data, especie: e.target.value })}
        />

        <label className="mt-4" htmlFor="municipio">
          Municipio
        </label>
        <select
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          name="municipio"
          id="municipio"
          value={data.municipio}
          onChange={(e) => setData({ ...data, municipio: e.target.value })}
        >
          <option value="">Seleccione</option>
          <option value="Barrancas">Barrancas</option>
          <option value="Hatonuevo">Hatonuevo</option>
          <option value="Albania">Albania</option>
          <option value="Fonseca">Fonseca</option>
          <option value="Distraccion">Distraccion</option>
          <option value="Cuestecita">Cuestecita</option>
          <option value="Papayal">Papayal</option>
          <option value="San Juan">San Juan</option>
        </select>

        <label className="mt-4" htmlFor="ciudadano">
          Ciudadano
        </label>
        <input
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          type="text"
          id="ciudadano"
          value={data.ciudadano}
          name="ciudadano"
          onChange={(e) => setData({ ...data, ciudadano: e.target.value })}
        />

        {validationError && validationError.length > 0 && (
          <div>
            {validationError.map((error, index) => (
              <p key={index} className="text-red-500 ">
                {error}
              </p>
            ))}
          </div>
        )}

        <button
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
