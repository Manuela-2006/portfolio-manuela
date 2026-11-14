import Hero from "@/components/sections/primera";
import TextMarquee from "@/components/sections/TextMarquee";
import AboutMe from "@/components/sections/AboutMe";
import SkillsPedestalScene from "@/components/skills/SkillsPedestal";
import ProyectosDestacados from "@/components/sections/ProyectosDestacados";
import EducationContactJourney from "@/components/sections/EducationContactJourney";

export default function Home() {
  return (
    <>
    <main className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <TextMarquee />
      <AboutMe />
      <SkillsPedestalScene />   
      <ProyectosDestacados />
      <EducationContactJourney />
    </main>
    </>
  );
}
