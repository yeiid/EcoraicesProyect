"use client";
import React, { useState } from "react";
import { useFormContext } from "@/context/LocationContext";
import { useUser } from "@/context/UserContext";
import { schema } from "@/app/lib/schema";
import { simplificarErrores } from "@/app/lib/action";
import { MapPinIcon, UserIcon, TrophyIcon } from '@heroicons/react/24/outline';
import Button from "./Button";

const Formulario: React.FC = () => {
  const { formData, setFormData, location } = useFormContext();
  const { user } = useUser();
  const [validationError, setValidationError] = useState<string[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError(null);

    if (!user) {
      setValidationError(["Usuario no autenticado. Por favor, inicie sesión."]);
      setIsSubmitting(false);
      return;
    }

    try {
      const allData = schema.parse({
        data: formData,
        location,
        userId: user.id
      });

      const res = await fetch("/api/date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });

      if (res.ok) {
        alert("¡Datos enviados! Gracias 🎇🎈");
        window.location.reload();
      } else {
        throw new Error("Error al enviar los datos");
      }
    } catch (error: any) {
      if (error.errors) {
        const erroresSimplificados = simplificarErrores(error.errors);
        setValidationError(erroresSimplificados);
      } else {
        setValidationError(["Ocurrió un error al procesar su solicitud. Por favor, inténtelo de nuevo."]);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-full flex-col items-center px-3 py-2 md:px-2 ">
      <h1 className="text-3xl font-bold mb-6">Formulario de Registro de Especies</h1>
      
      {location && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <MapPinIcon className="w-6 h-6 mr-2 text-red-500" />
            Ubicación Actual
          </h2>
          <p className="text-gray-700">Latitud: {location.lat.toFixed(6)}</p>
          <p className="text-gray-700">Longitud: {location.lng.toFixed(6)}</p>
          <Button/>
        </div>
      )}

      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={handler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="especie">
            <TrophyIcon className="w-5 h-5 inline-block mr-2" />
            Especie
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="especie"
            name="especie"
            value={formData.especie}
            onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
            placeholder="Ingrese el nombre de la especie"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="municipio">
            <MapPinIcon className="w-5 h-5 inline-block mr-2" />
            Municipio
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="municipio"
            id="municipio"
            value={formData.municipio}
            onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
          >
            <option value="">Seleccione un municipio</option>
            {["Barrancas", "Hatonuevo", "Albania", "Fonseca", "Distraccion", "Cuestecita", "Papayal", "San Juan"].map((municipio) => (
              <option key={municipio} value={municipio}>{municipio}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciudadano">
            <UserIcon className="w-5 h-5 inline-block mr-2" />
            Ciudadano
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="ciudadano"
            value={formData.ciudadano}
            name="ciudadano"
            onChange={(e) => setFormData({ ...formData, ciudadano: e.target.value })}
            placeholder="Ingrese su nombre"
          />
        </div>

        {validationError && validationError.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {validationError.map((error, index) => (
              <p key={index} className="text-sm">
                {error}
              </p>
            ))}
          </div>
        )}

        <button
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Formulario;