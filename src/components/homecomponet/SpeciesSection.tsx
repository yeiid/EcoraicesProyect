import Image from "next/image";
import Link from "next/link";

// Datos de ejemplo para las especies
const species = [
  {
    id: 1,
    name: "Ceiba",
    scientificName: "Ceiba pentandra",
    images: ["/ceiba.jpg", "/ceiba.jpg"],
    description: "Árbol emblemático de la región.",
  },
  {
    id: 2,
    name: "Cocotero",
    scientificName: "Cocos nucifera",
    images: ["/ceiba.jpg", "/ceiba.jpg"],
    description: "Palmera característica de zonas costeras.",
  },
  {
    id: 3,
    name: "Mango",
    scientificName: "Mangifera indica",
    images: ["/ceiba.jpg", "/ceiba.jpg"],
    description: "Frutal muy común en la región.",
  },
  // Añade más especies según sea necesario
];

const SpeciesSection = () => (
  <section
    className="py-12 bg-green-200"
    style={{ backgroundColor: "rgba(124, 182, 137, 0.8)" }}
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">
          Descubre las Especies Arbóreas
        </h2>
        <p className="mt-4 text-lg text-white">
          En nuestra plataforma, puedes explorar una variedad de especies
          arbóreas presentes en los municipios guajiros. Cada tarjeta muestra
          información detallada sobre cada especie, incluyendo su nombre común,
          nombre científico, y una breve descripción.
        </p>
        <Link
          className="mt-6 inline-block bg-white text-green-500 py-3 px-6 text-lg font-medium rounded-full uppercase transition duration-300 hover:bg-gray-100"
          href="/ui/specie"
        >
          Ver todas las especies
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {species.map((species) => (
          <div
            key={species.id}
            className="bg-white p-6 rounded-lg shadow-md text-center relative overflow-hidden"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={species.images[0]}
                alt={species.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition duration-500 ease-in-out transform hover:scale-105"
              />
              <Image
                src={species.images[1]}
                alt={species.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition duration-500 ease-in-out transform hover:scale-105 opacity-0 hover:opacity-100 absolute inset-0"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{species.name}</h3>
            <p className="text-gray-600 italic">{species.scientificName}</p>
            <p className="text-gray-800 mt-2">{species.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SpeciesSection;
