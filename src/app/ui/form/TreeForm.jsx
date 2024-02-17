"use client"

import React, { useState } from 'react';
import axios from 'axios';

const Formulario = () => {
  const [formData, setFormData] = useState({
    especie: '',
    municipio: '',
    ciudadano: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/route', formData);

      if (response.status === 200) {
        alert('Formulario enviado correctamente');
      } else {
        alert('Error al enviar el formulario');
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="flex h-full flex-col items-center px-3 py-4 md:px-2" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl font-bold">Formulario</h1>
        <label className="mt-4" htmlFor="especie">
          Especie
        </label>
        <input
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          type="text"
          name="especie"
          value={formData.especie}
          onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
        />

        <label className="mt-4" htmlFor="municipio">
          Municipio
        </label>
        <select
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          name="municipio"
          value={formData.municipio}
          onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
        >
          <option value="">Seleccione</option>
          <option value="Barrancas">Barrancas</option>
          <option value="Hatonuevo">Hatonuevo</option>
          <option value="Albania">Albania</option>
          <option value="Fonseca">Fonseca</option>
        </select>

        <label className="mt-4" htmlFor="ciudadano">
          Ciudadano
        </label>
        <input
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          type="text"
          name="ciudadano"
          value={formData.ciudadano}
          onChange={(e) => setFormData({ ...formData, ciudadano: e.target.value })}
        />

        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Formulario;
