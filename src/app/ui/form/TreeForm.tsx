import { useState } from "react";

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    especie: "",
    municipio: "",
    ciudadano: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Implement logic to handle form submission here:
    // - Validate form data (optional)
    // - Send data to your backend API endpoint using a suitable method like fetch or axios
    // - Display success or error messages based on the response

    console.log("Form submitted with data:", formData); // Example usage for logging or testing
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-full flex-col items-center px-3 py-4 md:px-2">
      <h1 className="text-2xl font-bold">Formulario</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="mt-4" htmlFor="especie">
          Especie
        </label>
        <input
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          type="text"
          name="especie"
          value={formData.especie}
          onChange={handleInputChange}
        />

        <label className="mt-4" htmlFor="municipio">
          Municipio
        </label>
        <select
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          name="municipio"
          value={formData.municipio}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
        />

        <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
