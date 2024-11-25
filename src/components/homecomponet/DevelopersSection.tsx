import Image from "next/image";

const developers = [
  {
    id: 1,
    name: "Yeifran Hernandez",
    role: "Frontend Developer",
    description: "Apasionado por el desarrollo web y las interfaces de usuario.",
    imageUrl: "/perfil.png"
  },
  {
    id: 2,
    name: "Ana Gómez",
    role: "Backend Developer",
    description: "Experta en la creación de APIs y bases de datos.",
    imageUrl: "/images/ana.jpg"
  },
  {
    id: 3,
    name: "Carlos Ramírez",
    role: "Full Stack Developer",
    description: "Disfruta trabajando tanto en frontend como en backend.",
    imageUrl: "/images/carlos.jpg"
  },
];

const DevelopersSection = () => (
  <section className="py-12" style={{ backgroundColor: 'rgba(124, 182, 137, 0.8)' }}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Nuestro Equipo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {developers.map((developer) => (
          <div
            key={developer.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 mb-4 relative rounded-full overflow-hidden">
              <Image
                src={developer.imageUrl}
                alt={developer.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold">{developer.name}</h3>
            <p className="text-gray-600">{developer.role}</p>
            <p className="text-gray-500 mt-2">{developer.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DevelopersSection;
