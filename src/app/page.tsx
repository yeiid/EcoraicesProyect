import Slider from "@/components/homecomponet/Slider";
import InicioSection from "@/components/homecomponet/InicioSection";
import DevelopersSection from "@/components/homecomponet/DevelopersSection";
import SpeciesSection from "@/components/homecomponet/SpeciesSection";
import ProjectsSection from "@/components/homecomponet/ProjectsSection";
// import MarketingSection from "@/components/homecomponet/MarketingSection ";
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
        {/* <MarketingSection /> */}
        <DonationsSection />
        <DevelopersSection />
      </section>

      {/* Background animation */}
      {/* <style jsx>{`
        section {
          position: relative;
          overflow: hidden;
        }
        section::before {
          content: "";
          position: absolute;
          top: -50px;
          left: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 123, 255, 0.3), transparent 70%);
          animation: move 10s infinite alternate;
        }
        section::after {
          content: "";
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 123, 255, 0.3), transparent 70%);
          animation: move 8s infinite alternate-reverse;
        }
        @keyframes move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style> */}
    </>
  );
}
