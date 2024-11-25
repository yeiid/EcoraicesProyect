import React from 'react';
import { useRouter } from 'next/router';
import CommentSection from './CommentSection';

const projects = [
  { id: 1, title: 'Reforestación Urbana', steps: ['Paso 1', 'Paso 2', 'Paso 3'] },
  // ...otros proyectos
];

const ProjectDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return <p>Proyecto no encontrado</p>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">{project.title}</h2>
        <ul className="list-disc list-inside">
          {project.steps.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ul>
        <CommentSection projectId={Number(id)} />
      </div>
    </section>
  );
};

export default ProjectDetail;
