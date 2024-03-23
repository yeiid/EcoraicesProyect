import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

// const MapComponent2 = dynamic(() => import("@/components/Map2"), {
//   ssr: false,
// });
export default function Page() {
  return (
    <>
      <div className="flex h-full flex-col items-center px-3 py-4 md:px-2">

        <div className="py20 flex items-center">
        <h2>Localizacion actaul</h2>
          <MapComponent/>
        </div>
      </div>
    </>
  );
}
