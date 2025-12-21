import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ScrollProgressLineProps {
  // progress prop is deprecated
}

const sections = [
  { id: "hero", label: "00", name: "HOME" },
  { id: "about", label: "01", name: "ABOUT" },
  { id: "skills", label: "02", name: "SKILLS" },
  { id: "projects", label: "03", name: "PROJECTS" },
  { id: "achievements", label: "04", name: "ACHIEVEMENTS" },
];

const ScrollProgressLine = ({}: ScrollProgressLineProps) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScrollProgress();

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    gsap.to(el, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      },
    });
  }, []);

  return (
    <div className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center">
      {/* Progress line container */}
      <div className="relative h-64 w-px">
        {/* Background line */}
        <div className="absolute inset-0 bg-border" />

        {/* Animated progress fill */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-cosmic-orange via-cosmic-amber to-cosmic-gold h-0"
        />

        {/* Section markers */}
        {sections.map((section, i) => {
          const isActive = currentSection === section.id;
          const sectionProgress = i / (sections.length - 1);

          return (
            <a
              key={section.id}
              href={`#${section.id === "hero" ? "" : section.id}`}
              className="absolute left-0 -translate-x-1/2 group"
              style={{ top: `${sectionProgress * 100}%` }}
            >
              {/* Dot */}
              <motion.div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "bg-cosmic-orange border-cosmic-orange shadow-[0_0_10px_rgba(255,140,26,0.6)]"
                    : "bg-background border-muted-foreground"
                }`}
                whileHover={{ scale: 1.3 }}
              />

              {/* Label */}
              <div
                className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    isActive ? "text-cosmic-orange" : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                </span>
                <span
                  className={`ml-2 font-mono text-[10px] tracking-widest ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {section.name}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollProgressLine;
