
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
});
export default function Page() {
  return (
<>
    <div className='flex item-center py-5'>
    <h2>Localizacion actaul</h2>
      <MapComponent />
    </div>

    </>
  );
}
