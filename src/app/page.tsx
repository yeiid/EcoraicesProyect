// "use client";

import Link from "next/link";
import clsx from "clsx";
import Slider from "@/components/Slider";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Page() {

  return (
    <>
      <section className=" flex flex-col items-center w-full  text-center">
        <section className=" py-10 flex items-center flex-col w-full max-w-4xl ">
          <div className="container mx-auto flex flex-col items-center justify-center">
            <div className="max-w-lg text-center  flex items-center flex-col">
              <Image src="/Ecoj (1).png" alt="Logo" width={250} height={250} />
              <h2 className="text-3xl font-bold text-white mt-6">
              ¡Bienvenidos a EcoRaices!
              </h2>
              <p className="text-lg text-white mt-4">
                 Descubre la biodiversidad urbana de
                los municipios guajiros con EcoRaices. Nuestra plataforma te
                permite geolocalizar y documentar las especies arbóreas que
                embellecen nuestras calles y plazas. Únete a nuestra comunidad y
                juntos, protejamos y conservemos nuestro entorno.
              </p>
            </div>
            <Link
              href="/ui"
              className={clsx(
                "mt-8 bg-gray-50 text-green-500 py-3 px-8 text-lg font-medium rounded-full uppercase transition duration-300 hover:bg-sky-100 hover:text-blue-600"
              )}
            >
              Empecemos
            </Link>
          </div>
        </section>
        <div className=" w-full max-w-4xl m-10">
          <Slider />
        </div>
        <Footer/>
      </section>
    </>
  );
}
