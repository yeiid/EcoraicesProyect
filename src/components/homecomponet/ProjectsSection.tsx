"use client"
import React, { useState } from 'react';
import Image from "next/image";
import { ChevronDownIcon, BookOpenIcon, ScaleIcon } from '@heroicons/react/24/outline';

const projects = [
  { id: 1, title: 'Reforestación Urbana', imageUrl: '/reforestacion.jpg', description: 'Proyecto de reforestación en zonas urbanas.', steps: ['Identificar áreas apropiadas', 'Seleccionar especies nativas', 'Organizar eventos de plantación comunitaria', 'Implementar un plan de cuidado y mantenimiento'] },
  { id: 2, title: 'Conservación de Manglares', imageUrl: '/manglares.jpg', description: 'Iniciativa para proteger los manglares costeros.', steps: ['Mapear áreas de manglares', 'Educar sobre la importancia de los manglares', 'Implementar medidas de protección', 'Monitorear la salud de los manglares'] },
  { id: 3, title: 'Educación Ambiental', imageUrl: '/educacion.jpg', description: 'Programas educativos sobre la importancia de la biodiversidad.', steps: ['Desarrollar currículum educativo', 'Formar alianzas con escuelas locales', 'Organizar talleres y excursiones', 'Crear materiales educativos interactivos'] },
  { id: 4, title: 'Gestión de Residuos', imageUrl: '/residuos.jpg', description: 'Programa integral de manejo y reducción de residuos.', steps: ['Implementar sistema de separación de residuos', 'Fomentar el compostaje comunitario', 'Organizar campañas de limpieza', 'Promover la reducción y reutilización'] },
  { id: 5, title: 'Monitoreo de Calidad del Agua', imageUrl: '/agua.jpg', description: 'Seguimiento y mejora de la calidad del agua en ríos y lagos locales.', steps: ['Establecer puntos de muestreo', 'Realizar análisis periódicos', 'Identificar fuentes de contaminación', 'Implementar medidas correctivas'] },
];

const lawsAndRegulations = [
  { id: 1, title: 'Ley General del Ambiente', description: 'Marco legal para la gestión ambiental en Colombia.' },
  { id: 2, title: 'Decreto 1076 de 2015', description: 'Decreto Único Reglamentario del Sector Ambiente y Desarrollo Sostenible.' },
  { id: 3, title: 'Ley 99 de 1993', description: 'Crea el Ministerio del Medio Ambiente y organiza el SINA.' },
  // Añade más leyes según sea necesario
];

const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [showLaws, setShowLaws] = useState(false);

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
              <button
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                className="mt-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
              >
                {activeProject === project.id ? 'Ocultar pasos' : 'Ver pasos'}
                <ChevronDownIcon className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${activeProject === project.id ? 'rotate-180' : ''}`} />
              </button>
              {activeProject === project.id && (
                <ul className="mt-4 list-disc list-inside text-gray-700">
                  {project.steps.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-bold text-center mb-6 text-white">Recursos Adicionales</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowLaws(!showLaws)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <ScaleIcon className="w-5 h-5 mr-2" />
              Leyes y Regulaciones Ambientales
            </button>
            <a
              href="/guia-interactiva"
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300 flex items-center"
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Guía Interactiva
            </a>
          </div>
        </div>

        {showLaws && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold mb-4">Leyes y Regulaciones Ambientales</h4>
            <ul className="space-y-4">
              {lawsAndRegulations.map((law) => (
                <li key={law.id} className="border-b pb-2">
                  <h5 className="font-semibold">{law.title}</h5>
                  <p className="text-gray-600">{law.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;