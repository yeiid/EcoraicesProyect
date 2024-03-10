// "use client";

import Link from "next/link";
import clsx from "clsx";
import SimpleSlider from "@/components/simley";
import CreatorSection from "@/components/CreatorSection";

export default function Page() {
  const creators = [
    {
      id: 1,
      name: "Creador 1",
      image: "/public/350751.jpg",
      alt: "Imagen del creador 1",
      description: "Breve descripción del creador 1",
    },
    {
      id: 2,
      name: "Creador 2",
      image: "/path/to/creator2-image.jpg",
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
      <section className="flex flex-col items-center w-full max-w-4xl mt-10 text-center">
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
        <div className="slider-section w-full max-w-4xl mt-10">
          <SimpleSlider />
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <CreatorSection creators={creators} />
        </div>
      </section>
    </>
  );
}
