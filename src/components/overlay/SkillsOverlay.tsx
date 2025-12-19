import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsOverlay = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative min-h-[120vh] flex items-start py-20 sm:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-md mx-auto w-full text-center md:text-left md:ml-24 md:mr-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center md:justify-start"
        >
          <div className="w-8 sm:w-12 h-px bg-cosmic-amber" />
          <span className="font-mono text-xs sm:text-sm text-cosmic-amber tracking-widest">02 / SKILLS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4"
        >
          The <span className="text-gradient-cosmic">Neural Core</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-muted-foreground mb-6"
        >
          Technologies orbiting through my neural network. Each skill a synapse in the constellation of code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-cosmic-cyan/30 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cosmic-cyan animate-pulse" />
          <span className="text-xs font-mono text-cosmic-cyan">3D Globe Active</span>
        </motion.div>

        {/* Arrow pointing to globe */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hidden md:block mt-8"
        >
          <svg width="100" height="50" viewBox="0 0 100 50" className="text-cosmic-orange/40">
            <path
              d="M10 25 Q 50 0, 90 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <polygon
              points="85,20 95,25 85,30"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsOverlay;