"use client"
import {useRouter} from 'next/navigation'
import Button from './Button';
import  {useContextMap}  from "@/context/UserContext";


const Formulario: React.FC = () => {
  const { data, setData, location } = useContextMap();

  const router = useRouter()

async function  handler (e: React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  const allData = {
    data,
    location
  }
  const res =await fetch('/api/date',{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allData)
  })
  const date = await res.json()
  console.log(date)
  console.log(allData)
  router.refresh()
}


  return (
    <div className="flex h-full flex-col items-center px-3 py-4 md:px-2">
      <h1 className="text-2xl font-bold">Formulario</h1>
      <Button />
      {location && (
        <div>
          <p>LATITUDE: {location.lat}</p>
          <p>LONGITUDE: {location.lng}</p>
        </div>
      )}
      <form className="flex flex-col items-center" onSubmit={handler}>
        <label className="mt-4" htmlFor="especie"  >
          Especie
        </label>
        <input
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          type="text"
          name="especie"
          value={data.especie}
          onChange={(e) => setData({ ...data, especie: e.target.value })}        />
        <label className="mt-4" htmlFor="municipio">
          Municipio
        </label>
        <select
          className="mb-4 py-2 px-4 border border-gray-300 rounded-md"
          name="municipio"
          value={data.municipio}
          onChange={(e) => setData({ ...data, municipio: e.target.value })} 
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
          value={data.ciudadano}
          name="ciudadano"
          onChange={(e) => setData({ ...data, ciudadano: e.target.value })}
        />

        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;