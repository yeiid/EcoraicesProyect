
import Image from "next/image";


interface Species {
  localName: string;
  scientificName: string;
  images: string[];
  description: string;
}
const SpeciesList: React.FC<{ species: Species[] }> = ({ species }) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          Especies Arborescentes en la Región Caribe
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Explora una variedad de especies arbóreas presentes en los municipios
          guajiros. Cada tarjeta muestra información detallada sobre cada
          especie, incluyendo su nombre común, nombre científico, y una breve
          descripción.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {species.map((specie, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center relative overflow-hidden"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={specie.images[0]}
                alt={specie.localName}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition duration-500 ease-in-out transform hover:scale-105"
              />
              <Image
                src={specie.images[1]}
                alt={specie.localName}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition duration-500 ease-in-out transform hover:scale-105 opacity-0 hover:opacity-100 absolute inset-0"
              />
            </div>
            <h3 className="text-xl font-semibold">{specie.localName}</h3>
            <p className="text-gray-600 italic">{specie.scientificName}</p>
            <p className="text-gray-800 mt-2">{specie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeciesList;
