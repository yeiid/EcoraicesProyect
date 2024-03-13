// "use client";

import Link from "next/link";
import clsx from "clsx";
import SimpleSlider from "@/components/Slider";
import InformativeSection from "@/components/IfonComponent";
import Image from "next/image";

export default function Page() {
  const creators = [
    {
      id: 1,
      name: "Creador 1",
      image: "/350751.jpg",
      alt: "Imagen del creador 1",
      description: "Breve descripción del creador 1",
    },
    {
      id: 2,
      name: "Creador 2",
      image: "/paisaje.jpg",
      alt: "Imagen del creador 2",
      description: "Breve descripción del creador 2",
    },
    {
      id: 3,
      name: "Creador 3",
      image: "/path/to/creator3-image.jpg",
      alt: "Imagen del creador 3",
      description: "Breve descripción del creador 3",
    },
  ];
  return (
    <>
      <section className=" flex flex-col items-center w-full  text-center">
        {/* <div className="flex items-center flex-col w-full max-w-4xl mt-10">
          <Image src="/Ecoj (1).png" alt="" width={250} height={250}/>
        <button>
          <Link
            href={"/ui"}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            )}
          >
            Empecemos
          </Link>
        </button>

        </div> */}
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
        <div className=" w-full max-w-4xl mt-10">
          <SimpleSlider />
        </div>
        <div className=" flex flex-col items-center justify-center ">
          {/* <CreatorSection creators={creators} /> */}
          <InformativeSection />
        </div>
      </section>
    </>
  );
}
