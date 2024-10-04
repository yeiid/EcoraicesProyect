import dynamic from "next/dynamic";
// const MapComponent = dynamic(() => import("@/components/mapcomponet/Map"), {
//   ssr: false,
// });
const MapComponent = dynamic(() => import("@/components/mapcomponet/Map"), {
  loading: () => <p>Loading...</p>,
});
// const MapComponent2 = dynamic(() => import("@/components/Map2"), {
//   ssr: false,
// });
export default function Page() {
  return (
    <>
      <div className=" flex h-full flex-col items-center px-3 py-4 md:px-2">
      <h1 className="text-2xl font-bold text-center mb-4">Georreferenciación de Especies</h1>
        <div className="py20 flex items-center">
          <div className="rounded-md p-4">
          <MapComponent/>
          </div>
        </div>
      </div> 
    </>
  );
}
