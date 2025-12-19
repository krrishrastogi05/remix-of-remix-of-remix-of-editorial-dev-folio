import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollStore } from "@/lib/scroll-store";

export const useScrollProgress = () => {
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    // Use ScrollTrigger to determine current section
    const sections = ["hero", "about", "skills", "projects"];

    // Create triggers for sections
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      // For hero, we might want to target the top of the page
      const target = section === "hero" ? "#hero" : `#${section}`;
      const element = document.querySelector(target);

      if (element) {
        triggers.push(
          ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentSection(section),
            onEnterBack: () => setCurrentSection(section),
          })
        );
      }
    });

    // Global scroll progress tracker
    const progressTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollStore.progress = self.progress;
      },
    });

    return () => {
      progressTrigger.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return { scrollProgress: 0, currentSection };
};
