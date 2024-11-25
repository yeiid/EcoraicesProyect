import Slider from "@/components/homecomponet/Slider";
import InicioSection from "@/components/homecomponet/InicioSection";
import DevelopersSection from "@/components/homecomponet/DevelopersSection";
import SpeciesSection from "@/components/homecomponet/SpeciesSection";
import ProjectsSection from "@/components/homecomponet/ProjectsSection";
import DonationsSection from "@/components/homecomponet/DonationsSection ";

export default function Page() {
  return (
    <>
      <section className="flex flex-col items-center w-full text-center  animated-background py-10">
        <InicioSection />
        <div className="w-full max-w-4xl my-10">
          <Slider />
        </div>
        <SpeciesSection />
        <ProjectsSection />
        <DonationsSection />
        <DevelopersSection />
      </section>
    </>
  );
}
