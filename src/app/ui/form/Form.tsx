// src/components/ui/form/Formulario.tsx
"use client";

import React, { useState } from "react";
import { useFormStore } from "@/stores/FormStore";
import { useAuthStore } from "@/stores/AuthStore";
import { schema } from "@/app/lib/schema";
import {
  MapPinIcon,
  TrophyIcon,
  IdentificationIcon,
  BuildingLibraryIcon,
  PhotoIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";

const Formulario: React.FC = () => {
  const {
    formData,
    setFormData,
    location,
    validationError,
    isSubmitting,
    setValidationError,
    setIsSubmitting,
  } = useFormStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);

  const updateFormData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationError(null);

    if (!user) {
      setValidationError(["Usuario no autenticado. Por favor, inicie sesión."]);
      toast.error("Usuario no autenticado. Por favor, inicie sesión.");
      setIsSubmitting(false);
      return;
    }

    if (!location) {
      setValidationError([
        "Por favor, obtenga la ubicación antes de enviar el formulario.",
      ]);
      toast.error(
        "Por favor, obtenga la ubicación antes de enviar el formulario."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const allData = {
        ...formData,
        latitud: location.lat,
        longitud: location.lng,
        userId: user.id,
      };

      const res = await fetch("/api/species/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });

      if (res.ok) {
        toast.success("¡Especie registrada correctamente! 🌿");
        // Resetear el formulario
        setFormData({
          especie: "",
          municipio: "",
          descripcion: "",
          estadoConservacion: "",
        });
        router.refresh();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar los datos");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const erroresSimplificados = error.errors.map((e) => {
          switch (e.code) {
            case "too_small":
              return `${e.path.join(".")} debe contener al menos ${
                e.minimum
              } caracter(es) ❌`;
            case "custom":
              return e.message || "Error de validación personalizado";
            default:
              return `Error en ${e.path.join(".")}: ${e.message} ❌`;
          }
        });
        setValidationError(erroresSimplificados);
        erroresSimplificados.forEach((msg) => toast.error(msg));
      } else {
        setValidationError([
          error.message ||
            "Ocurrió un error al procesar su solicitud. Por favor, inténtelo de nuevo.",
        ]);
        toast.error(
          error.message || "Ocurrió un error al procesar su solicitud."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const estadosConservacion = [
    { value: "", label: "Seleccione un estado" },
    { value: "LC", label: "Preocupación menor (LC)" },
    { value: "NT", label: "Casi amenazada (NT)" },
    { value: "VU", label: "Vulnerable (VU)" },
    { value: "EN", label: "En peligro (EN)" },
    { value: "CR", label: "En peligro crítico (CR)" },
    { value: "EW", label: "Extinta en estado silvestre (EW)" },
    { value: "EX", label: "Extinta (EX)" },
    { value: "DD", label: "Datos insuficientes (DD)" },
    { value: "NE", label: "No evaluada (NE)" },
  ];

  return (
    <div className="flex h-full flex-col items-center px-3 py-2 md:px-2">
      <h1 className="text-3xl font-bold mb-6 text-emerald-800">
        Registro de Especies
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold flex items-center text-emerald-700">
            <MapPinIcon className="w-6 h-6 mr-2 text-emerald-500" />
            Ubicación Actual
          </h2>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-emerald-500 hover:text-emerald-700"
            aria-label="Mostrar información"
          >
            <InformationCircleIcon className="w-5 h-5" />
          </button>
        </div>

        {showHint && (
          <div className="bg-emerald-50 p-3 rounded-md mb-3 text-sm text-emerald-800">
            <p>
              Haga clic en "Obtener Ubicación" para detectar automáticamente su
              posición actual o ajuste manualmente las coordenadas en el mapa.
            </p>
          </div>
        )}

        {location && (
          <div className="bg-emerald-50 p-3 rounded-md mb-3">
            <p className="text-emerald-800">
              Latitud:{" "}
              <span className="font-semibold">{location.lat.toFixed(6)}</span>
            </p>
            <p className="text-emerald-800">
              Longitud:{" "}
              <span className="font-semibold">{location.lng.toFixed(6)}</span>
            </p>
          </div>
        )}
        <Button />
      </div>

      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handler}
      >
        <div className="mb-4">
          <label
            className="block text-emerald-700 text-sm font-bold mb-2"
            htmlFor="especie"
          >
            <TrophyIcon className="w-5 h-5 inline-block mr-2 text-emerald-500" />
            Nombre de la Especie
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="especie"
            name="especie"
            value={formData.especie || ""}
            onChange={updateFormData}
            placeholder="Ej. Ceiba pentandra"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-emerald-700 text-sm font-bold mb-2"
            htmlFor="municipio"
          >
            <BuildingLibraryIcon className="w-5 h-5 inline-block mr-2 text-emerald-500" />
            Municipio
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="municipio"
            name="municipio"
            value={formData.municipio || ""}
            onChange={updateFormData}
            placeholder="Ej. Riohacha"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-emerald-700 text-sm font-bold mb-2"
            htmlFor="estadoConservacion"
          >
            <IdentificationIcon className="w-5 h-5 inline-block mr-2 text-emerald-500" />
            Estado de Conservación
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
            id="estadoConservacion"
            name="estadoConservacion"
            value={formData.estadoConservacion || ""}
            onChange={updateFormData}
          >
            {estadosConservacion.map((estado) => (
              <option key={estado.value} value={estado.value}>
                {estado.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-emerald-700 text-sm font-bold mb-2"
            htmlFor="descripcion"
          >
            <PhotoIcon className="w-5 h-5 inline-block mr-2 text-emerald-500" />
            Descripción
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion || ""}
            onChange={updateFormData}
            placeholder="Describa brevemente la especie y su entorno..."
            rows={4}
          />
        </div>

        {validationError && validationError.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            <ul className="list-disc pl-5">
              {validationError.map((error, index) => (
                <li key={index} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className={`w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            "Registrar Especie"
          )}
        </button>
      </form>
    </div>
  );
};

export default Formulario;
