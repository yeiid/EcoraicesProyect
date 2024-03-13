
import Image from 'next/image';

interface Creator {
  id: number;
  name: string;
  image: string;
  alt: string;
  description: string;
}

interface CreatorSectionProps {
  creators: Creator[];
}

const CreatorSection: React.FC<CreatorSectionProps> = ({ creators }) => {
  return (
    <div className="creators-section w-full max-w-4xl mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">proyectos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {creators.map((creator) => (
          <div key={creator.id} className="p-4 bg-red-500 shadow rounded">
            <Image
              src={creator.image}
              alt={creator.alt}
              className="mx-auto rounded-full h-24 w-24"
              width={96}
              height={96}
            />
            <h3 className="text-lg font-semibold mt-2">{creator.name}</h3>
            <p className="text-gray-600">{creator.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorSection;
