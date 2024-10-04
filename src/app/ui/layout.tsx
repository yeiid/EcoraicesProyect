import SideNav from "@/components/sidenav";
import { FormContextProvider } from "@/context/LocationContext";
import "leaflet/dist/leaflet.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex md:h-screen flex-col md:flex-row md:overflow-hidden animated-background">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-15">
        <FormContextProvider>{children}</FormContextProvider>
      </div>
    </div>
  );
}