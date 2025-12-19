import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroOverlay = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // --- 1. INITIAL SETUP ---
      gsap.set(".hero-element", { opacity: 0, y: 20 });
      gsap.set(".char-container", { opacity: 0, y: 80, filter: "blur(12px)" });
      gsap.set(".mobile-word", { opacity: 0, y: 100, scale: 0.9 });
      gsap.set(".scroll-indicator", { opacity: 0 });

      // --- 2. STATUS BADGE ---
      tl.to(".status-badge", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // --- 3. DESKTOP ANIMATION (Cinematic Entry) ---
      tl.to(
        ".char-container",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.2"
      );

      // --- 4. MOBILE ANIMATION ---
      tl.to(
        ".mobile-word",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // --- 5. REST OF ELEMENTS ---
      tl.to(".sub-headline", { opacity: 1, y: 0, duration: 0.6 }, "-=0.6");
      tl.to(".description", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
      tl.to(".cta-buttons", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
      tl.to(".scroll-indicator", { opacity: 1, duration: 0.6 }, "-=0.2");

      // Scroll Loop
      gsap.to(".scroll-line", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });

      // --- 6. PARALLAX ---
      gsap.to(".mobile-titan-container", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const name = "KRRISH RASTOGI";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pb-20 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-screen" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10 px-4">
        
        {/* Status indicator */}
        <div className="hero-element status-badge mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-emerald-500/30 rounded-full bg-emerald-500/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase">
              Available for work
            </span>
          </div>
        </div>

        {/* =========================================
            DESKTOP VIEW (GHOST STYLE - SOLID ONLY)
           ========================================= */}
        <div className="hidden md:block text-center mb-10 group cursor-default">
          <h1 className="text-7xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter leading-[0.9]">
             <span className="inline-block relative">
                {name.split("").map((char, i) => (
                  <span
                    key={i}
                    className="char-container inline-block relative transition-transform duration-500 group-hover:scale-105"
                    style={{ 
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity, filter" 
                    }}
                  >
                    {/* LAYER 1: The Outline (Always Visible) */}
                    <span 
                        className="relative z-10 block"
                        style={{
                            color: "transparent",
                            WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)", // The Ghost Stroke
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>

                    {/* LAYER 2: The Solid Fill (Visible on Hover) 
                        REMOVED: backgroundImage / linear-gradient
                        ADDED: color: #ffffff (Solid White)
                    */}
                    <span 
                        className="absolute inset-0 z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        style={{
                            color: "#ffffff", // Pure Solid White
                            filter: "drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5))", // Solid Glow
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
             </span>
          </h1>
        </div>

        {/* =========================================
            MOBILE VIEW
           ========================================= */}
        <div className="block md:hidden w-full mb-8 mobile-titan-container">
          <h1 className="flex flex-col items-center justify-center leading-[0.8] tracking-tighter">
            <span 
              className="mobile-word text-[22vw] font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              KRRISH
            </span>
            <span 
              className="mobile-word text-[22vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
            >
              RASTOGI
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div className="hero-element sub-headline text-center mb-8 sm:mb-14 w-full max-w-2xl relative z-10">
          <span className="block text-xl sm:text-3xl md:text-4xl text-muted-foreground font-light leading-snug">
            building stuff that{" "}
            <span className="relative inline-flex items-center justify-center align-middle mx-1 mt-1 sm:mt-0">
              <span className="absolute inset-0 bg-indigo-500 blur-lg opacity-30 animate-pulse"></span>
              <span className="relative px-3 py-1 rounded-lg bg-indigo-600/10 border border-indigo-500/30 text-indigo-200 font-medium whitespace-nowrap backdrop-blur-sm">
                matters.
              </span>
            </span>
          </span>
        </div>

        {/* Description */}
        <p className="hero-element description text-sm sm:text-lg text-muted-foreground/70 max-w-lg text-center mb-10 px-6 font-light leading-relaxed hidden sm:block">
          Passionate about creating scalable backend systems and solving complex software problems.
        </p>

        {/* Buttons */}
        <div className="hero-element cta-buttons flex flex-col w-full px-8 sm:w-auto sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto group relative px-8 py-4 bg-white text-black font-bold rounded-xl sm:rounded-full overflow-hidden text-center transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Work
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>

          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl sm:rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm text-center"
          >
            About Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 sm:opacity-100">
        <div className="flex flex-col items-center gap-2">
          <span className="hidden sm:block text-[10px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="scroll-line w-px h-10 sm:h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroOverlay;