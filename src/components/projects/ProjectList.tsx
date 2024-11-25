import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";

const projects = [
  { id: 1, title: 'Reforestación Urbana', imageUrl: '/reforestacion.jpg', description: 'Proyecto de reforestación en zonas urbanas.' },
  { id: 2, title: 'Conservación de Manglares', imageUrl: '/manglares.jpg', description: 'Iniciativa para proteger los manglares costeros.' },
  // ...otros proyectos
];

const ProjectList: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Proyectos Ambientales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <Image src={project.imageUrl} alt={project.title} width={300} height={200} className="rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <Link href={`/projects/${project.id}`}>
                <a className="mt-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 text-center">
                  Ver más detalles
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
