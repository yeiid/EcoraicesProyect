import SideNav from "@/components/header/sidenav";
// import Footer from "@/components/Footer";
import { FormContext } from "@/context/UserContext";
import "leaflet/dist/leaflet.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <FormContext>
            {children}
          </FormContext>
          <div className="m-auto">
          {/* <Footer/> */}
          </div>
        </div>
      </div>
    </>
  );
}
