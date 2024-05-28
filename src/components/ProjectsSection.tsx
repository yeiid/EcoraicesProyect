import Image from "next/image";


const projects = [
    { id: 1, title: 'Reforestación Urbana', imageUrl: '/reforestacion.jpg', description: 'Proyecto de reforestación en zonas urbanas.' },
    { id: 2, title: 'Conservación de Manglares', imageUrl: '/manglares.jpg', description: 'Iniciativa para proteger los manglares costeros.' },
    { id: 3, title: 'Educación Ambiental', imageUrl: '/educacion.jpg', description: 'Programas educativos sobre la importancia de la biodiversidad.' },
    // Añade más proyectos según sea necesario
  ];
  
  const ProjectsSection = () => (
    <section className="py-12" style={{ backgroundColor: 'rgba(124, 182, 137, 0.8)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Proyectos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-100 p-6 rounded shadow-md flex flex-col items-center text-center">
              <Image src={project.imageUrl} alt={project.title} width={300} height={200} className="rounded-md" />
              <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
export default ProjectsSection;