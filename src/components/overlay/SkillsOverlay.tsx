import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsOverlay = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative min-h-screen flex items-center py-20 sm:py-32 px-4 sm:px-6" ref={ref}>
      {/* Content positioned on the left to not overlap with globe */}
      <div className="max-w-lg w-full ml-4 sm:ml-12 lg:ml-24">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="w-8 sm:w-12 h-px bg-cosmic-amber" />
          <span className="font-mono text-xs sm:text-sm text-cosmic-amber tracking-widest">02 / SKILLS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6"
        >
          The <span className="text-gradient-cosmic">Neural Core</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md"
        >
          Technologies orbiting through my neural network. Each skill a synapse in the constellation of code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-cosmic-cyan animate-pulse" />
            <span className="text-sm font-mono text-cosmic-cyan">Interactive Globe</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-orange/10 border border-cosmic-orange/30 rounded-full">
            <span className="text-sm font-mono text-cosmic-orange">Drag to Rotate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsOverlay;
