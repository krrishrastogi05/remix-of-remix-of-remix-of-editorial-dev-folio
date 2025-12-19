import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutOverlay = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
      ref={ref}
    >
      {/* Background Decor (Optional Giant '01') */}
      <div className="absolute top-20 left-4 sm:left-10 text-[20vw] font-bold text-white/[0.02] leading-none select-none pointer-events-none font-display">
        01
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          <div className="w-8 sm:w-12 h-px bg-indigo-500" />
          <span className="font-mono text-xs sm:text-sm text-indigo-400 tracking-widest uppercase">
            01 / The Mission
          </span>
        </motion.div>

        {/* The "Manifesto" Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-display font-bold leading-[1.1] tracking-tight"
        >
          {/* Line 1 */}
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-muted-foreground mb-4">
            I don't just write code.
          </motion.h2>

          {/* Line 2 */}
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            I engineer <span className="text-white inline-block border-b-4 border-indigo-500/50 pb-1">solutions</span>.
          </motion.h2>

          {/* Line 3 - The Core Skills */}
          <motion.div variants={itemVariants} className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-muted-foreground/80 mt-8 leading-snug">
            Fusing{" "}
            <span className="inline-block bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-lg border border-indigo-500/20 mx-1">
              Full-Stack
            </span>{" "}
            architecture with{" "}
            <span className="inline-block bg-purple-500/10 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/20 mx-1">
              AI/ML
            </span>{" "}
            intelligence.
          </motion.div>

          {/* Line 4 - The Description */}
          <motion.p 
            variants={itemVariants} 
            className="mt-12 text-base sm:text-xl md:text-2xl text-muted-foreground font-light max-w-3xl leading-relaxed"
          >
            Passionate about <span className="text-white font-medium">Open Source</span> and building complex backend systems that solve real-world problems. 
            Currently exploring the endless possibilities of <span className="text-white font-medium">Computer Vision</span> and <span className="text-white font-medium">NLP</span>.
          </motion.p>
        </motion.div>

        {/* Bottom Stats / Signature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8"
        >
          {[
            { label: "Experience", value: "3+ Years" },
            { label: "Projects", value: "25+ Built" },
            { label: "Focus", value: "Backend Systems" },
            { label: "Location", value: "Global Remote" },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="text-lg sm:text-xl font-bold text-white">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutOverlay;