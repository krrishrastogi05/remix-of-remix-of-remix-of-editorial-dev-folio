import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillsOverlay = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative min-h-screen flex items-center py-20 sm:py-32 px-4 sm:px-6" ref={ref}>
      {/* Minimal overlay text - cards do the talking */}
      <div className="absolute top-20 left-4 sm:left-12 lg:left-24 z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-4"
        >
          <div className="w-8 sm:w-12 h-px bg-cosmic-amber" />
          <span className="font-mono text-xs sm:text-sm text-cosmic-amber tracking-widest">02 / SKILLS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3"
        >
          Tech <span className="text-gradient-cosmic">Arsenal</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-muted-foreground max-w-xs"
        >
          Move your cursor to explore the tech stack
        </motion.p>
      </div>
    </section>
  );
};

export default SkillsOverlay;
