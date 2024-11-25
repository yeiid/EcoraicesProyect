// src/app/ui/map/page.tsx (o la ruta correspondiente)
import dynamic from "next/dynamic";
import SkeletonLoader from "./SkeletonLoader";

const MapComponent = dynamic(() => import("@/components/mapcomponet/Map"), {
  loading: () => <SkeletonLoader />,
  ssr: false, // Asegura que el componente solo se renderice en el cliente
});

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center px-3 py-4 md:px-2">
      <h1 className="text-2xl font-bold text-center mb-4">Georreferenciación de Especies</h1>
      <div className="py-20 flex items-center w-full">
        <div className="rounded-md p-4 w-full">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}
