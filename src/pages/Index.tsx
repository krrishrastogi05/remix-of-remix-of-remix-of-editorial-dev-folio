import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// Components
import CosmicScene from "@/components/three/CosmicScene";
import HeroOverlay from "@/components/overlay/HeroOverlay";
import AboutOverlay from "@/components/overlay/AboutOverlay";
import SkillsOverlay from "@/components/overlay/SkillsOverlay";
import ProjectsOverlay from "@/components/overlay/ProjectsOverlay";
import CosmicDock from "@/components/overlay/CosmicDock";
import ScrollProgressLine from "@/components/overlay/ScrollProgressLine";
import Achievements from "@/components/overlay/Achievements";
import AudioController from "@/components/AudioController";

// Import the Preloader
import GreetingPreloader from "@/components/overlay/GreetingPreloader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentSection } = useScrollProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 1. THE PRELOADER */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <GreetingPreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT */}
      <div className="relative bg-black min-h-screen">
        <AudioController />
        <CosmicScene currentSection={currentSection} />
        <ScrollProgressLine />

        <main className="relative z-10">
          <div id="hero">
            <HeroOverlay />
          </div>
          <AboutOverlay />
          <SkillsOverlay />
          <Achievements />
          <ProjectsOverlay />
        </main>

        <CosmicDock />
      </div>
    </>
  );
};

export default Index;
