import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="hidden md:block">
        <Image
        className="w-40"
          src="/Ecoj (1).png"
          alt="Logo"
          width={250}
          height={250}
        />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow  bg-gray-50 rounded-md md:block">
        </div>
      </div>
    </div>
  );
}
