import { useScrollProgress } from "@/hooks/useScrollProgress";
import CosmicScene from "@/components/three/CosmicScene";
import HeroOverlay from "@/components/overlay/HeroOverlay";
import AboutOverlay from "@/components/overlay/AboutOverlay";
import SkillsOverlay from "@/components/overlay/SkillsOverlay";
import ProjectsOverlay from "@/components/overlay/ProjectsOverlay";
import CosmicDock from "@/components/overlay/CosmicDock";
import ScrollProgressLine from "@/components/overlay/ScrollProgressLine";
import AudioController from "@/components/AudioController";

const Index = () => {
  const { scrollProgress, currentSection } = useScrollProgress();

  return (
    <>
      {/* Audio Controller */}
      <AudioController />

      {/* 3D Background */}
      <CosmicScene
        scrollProgress={scrollProgress}
        currentSection={currentSection}
      />

      {/* Scroll Progress Line */}
      <ScrollProgressLine progress={scrollProgress} />

      {/* Content Overlay */}
      <main className="relative z-10">
        <div id="hero">
          <HeroOverlay />
        </div>
        <AboutOverlay />
        <SkillsOverlay />
        <ProjectsOverlay />
      </main>

      {/* Navigation Dock */}
      <CosmicDock />
    </>
  );
};

export default Index;
