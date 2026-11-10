import CtaSection from "@/components/CtaSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <LoadingScreen />
      <HeroSection />
      <ExperienceSection />
      <CtaSection />
    </main>
  );
}
