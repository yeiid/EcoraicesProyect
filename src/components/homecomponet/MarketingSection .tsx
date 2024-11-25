import Link from "next/link";


const MarketingSection = () => (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Mis Otros Proyectos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded shadow-md text-center">
            <h3 className="text-xl font-semibold">Proyecto 1</h3>
            <p className="text-gray-600 mt-2">Descripción breve del proyecto 1.</p>
            <Link href="/portfolio#proyecto1" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">Ver más</Link>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow-md text-center">
            <h3 className="text-xl font-semibold">Proyecto 2</h3>
            <p className="text-gray-600 mt-2">Descripción breve del proyecto 2.</p>
            <Link href="/portfolio#proyecto2" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">Ver más</Link>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow-md text-center">
            <h3 className="text-xl font-semibold">Proyecto 3</h3>
            <p className="text-gray-600 mt-2">Descripción breve del proyecto 3.</p>
            <Link href="/portfolio#proyecto3" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">Ver más</Link>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/portfolio" className="inline-block bg-green-500 text-white py-3 px-8 rounded-full uppercase">Ver todos mis proyectos</Link>
        </div>
      </div>
    </section>
  );

  export default MarketingSection;