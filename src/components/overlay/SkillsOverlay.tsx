import { useEffect, useRef } from "react";
import gsap from "gsap";

// --- 1. DATA: Brand Colors & Gradients ---
const skills = [
  { 
    name: "REACT", 
    icon: "⚛️", 
    color: "#61DAFB", 
    gradient: "linear-gradient(90deg, #61DAFB 0%, #4FA8D1 100%)" 
  },
  { 
    name: "REDIS", 
    icon: "🔴", 
    color: "#DC382D", 
    gradient: "linear-gradient(90deg, #D82C20 0%, #A41F16 100%)" 
  },
  { 
    name: "PYTHON", 
    icon: "🐍", 
    color: "#FFD43B", // Dominant color for glow
    // Dual color gradient for Python
    gradient: "linear-gradient(135deg, #306998 30%, #FFD43B 70%)" 
  },
  { 
    name: "NODE.JS", 
    icon: "🟢", 
    color: "#339933", 
    gradient: "linear-gradient(90deg, #339933 0%, #539E43 100%)" 
  },
  { 
    name: "GRAPHQL", 
    icon: "◈", 
    color: "#E10098", 
    gradient: "linear-gradient(90deg, #E10098 0%, #E535AB 100%)" 
  },
  { 
    name: "DOCKER", 
    icon: "🐳", 
    color: "#2496ED", 
    gradient: "linear-gradient(90deg, #2496ED 0%, #0db7ed 100%)" 
  },
  { 
    name: "AWS", 
    icon: "☁️", 
    color: "#FF9900", 
    gradient: "linear-gradient(90deg, #FF9900 0%, #FFC300 100%)" 
  },
  { 
    name: "TYPESCRIPT", 
    icon: "🔷", 
    color: "#3178C6", 
    gradient: "linear-gradient(90deg, #3178C6 0%, #5FA2F7 100%)" 
  },
];

// --- 2. COMPONENT: Color-Aware Ghost Card ---
const ColorGhostCard = ({ skill }) => {
  return (
    <div
      className="group relative flex items-center justify-center px-8 py-6 mx-2 cursor-pointer transition-all duration-500 hover:scale-110"
    >
      {/* Background Glow Container */}
      <div 
        className="absolute inset-0 rounded-full border border-white/5 bg-transparent transition-all duration-500 group-hover:border-opacity-0"
      >
        {/* The Colored Blur Effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
          style={{
            backgroundColor: skill.color, 
            boxShadow: `0 0 40px 10px ${skill.color}40`
          }}
        />
      </div>

      <div className="relative z-10 flex items-center gap-4">
        {/* Text Layer */}
        <span 
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter transition-all duration-300 group-hover:font-extrabold"
          style={{
            // Base "Ghost" State: Transparent with White Outline
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.15)',
          }}
        >
          {/* This inner span applies the gradient fill on hover */}
          <span 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none pointer-events-none"
            style={{
              backgroundImage: skill.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextStroke: '0px transparent', // Remove stroke when filled
              color: 'transparent'
            }}
          >
            {skill.name}
          </span>
          
          {/* Visible text for the layout (keeps the space) */}
          {skill.name}
        </span>
      </div>
    </div>
  );
};

// --- 3. ANIMATION ENGINE ---
const MarqueeRow = ({ items, speed = 40, direction = "left" }) => {
  const rowRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const distance = direction === "left" ? "-50%" : "50%";
      const start = direction === "left" ? "0%" : "-50%";

      gsap.set(rowRef.current, { x: start });

      tlRef.current = gsap.to(rowRef.current, {
        x: distance,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    }, rowRef);

    return () => ctx.revert();
  }, [direction, speed]);

  return (
    <div 
      className="w-full flex overflow-hidden py-10"
      onMouseEnter={() => tlRef.current?.timeScale(0.1)} // Matrix slow-mo effect
      onMouseLeave={() => tlRef.current?.timeScale(1)}
    >
      <div ref={rowRef} className="flex flex-nowrap w-fit">
        {/* Quadruple items for smooth infinite loop on large screens */}
        {[...items, ...items, ...items, ...items].map((skill, i) => (
          <ColorGhostCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const ColorGhostSkills = () => {
  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-center overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="text-center mb-8">
           <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/50 uppercase tracking-widest backdrop-blur-md">
             Technologies
           </span>
        </div>

        {/* Row 1: Left */}
        <MarqueeRow items={skills.slice(0, 4)} direction="left" speed={50} />
        
        {/* Row 2: Right */}
        <MarqueeRow items={skills.slice(4)} direction="right" speed={45} />
      </div>

      {/* Side Vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default ColorGhostSkills;