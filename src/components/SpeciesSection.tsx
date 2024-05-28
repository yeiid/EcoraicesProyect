import Image from "next/image";

// Datos de ejemplo para las especies y los proyectos
const species = [
  {
    id: 1,
    name: "Ceiba",
    scientificName: "Ceiba pentandra",
    imageUrl: "/ceiba.jpg",
    description: "Árbol emblemático de la región.",
  },
  {
    id: 2,
    name: "Cocotero",
    scientificName: "Cocos nucifera",
    imageUrl: "/cocotero.jpg",
    description: "Palmera característica de zonas costeras.",
  },
  {
    id: 3,
    name: "Mango",
    scientificName: "Mangifera indica",
    imageUrl: "/mango.jpg",
    description: "Frutal muy común en la región.",
  },
  // Añade más especies según sea necesario
];

const SpeciesSection = () => (
  <section className="py-12" style={{ backgroundColor: 'rgba(124, 182, 137, 0.8)' }}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Especies Arbóreas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {species.map((species) => (
          <div key={species.id} className="bg-white p-4 rounded shadow-md text-center">
            <Image src={species.imageUrl} alt={species.name} width={200} height={200} className="rounded-full mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">{species.name}</h3>
            <p className="text-gray-600">{species.scientificName}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SpeciesSection;
