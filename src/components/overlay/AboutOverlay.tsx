import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutOverlay = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-20 sm:py-32 px-4 sm:px-6"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto w-full md:ml-24">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <div className="w-8 sm:w-12 h-px bg-white" />
          <span className="font-mono text-xs sm:text-sm text-white tracking-widest">
            01 / ABOUT
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-6"
        >
          Where <span className="text-white">Creativity</span> meets{" "}
          <span className="text-white">Code</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl"
        >
          Building software solutions that enhance user experiences and drive
          impact. I specialize in full-stack development with React, Next.js,
          and Python, alongside AI/ML applications including NLP and Computer
          Vision.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
        >
          Passionate about open source and the endless possibilities that emerge
          when thinking takes us into the universe and beyond.
        </motion.p>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-wrap gap-8"
        >
          {[
            { value: "Full-Stack", label: "Focus" },
            { value: "AI/ML", label: "Specialty" },
            { value: "Open Source", label: "Passion" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="relative"
            >
              <div className="text-lg sm:text-xl font-display font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-muted-foreground tracking-wider">
                {stat.label}
              </div>
              {/* Decorative line */}
              <div className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-cosmic-orange/50 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutOverlay;
