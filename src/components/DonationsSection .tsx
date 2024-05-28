import Link from "next/link";

const DonationsSection = () => (
    <section className="py-12" style={{ backgroundColor: 'rgba(124, 182, 137, 0.8)' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-8">Ayúdanos a Continuar</h2>
        <p className="text-lg text-gray-700 mb-8">Tu apoyo es crucial para mantener y expandir nuestros proyectos. Puedes ayudarnos donando útiles de limpieza o con apoyo monetario.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/donate" className="bg-blue-500 text-white py-3 px-8 rounded-full uppercase">Donar Útiles de Limpieza</Link>
          <Link href="/donate" className="bg-green-500 text-white py-3 px-8 rounded-full uppercase">Apoyo Monetario</Link>
        </div>
      </div>
    </section>
  );
export default DonationsSection;