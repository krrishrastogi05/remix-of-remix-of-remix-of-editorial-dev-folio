import { motion } from 'framer-motion';

const HeroOverlay = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pb-32">
      <div className="max-w-4xl mx-auto text-center">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-2 border border-primary/40 rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs sm:text-sm font-mono text-primary">Available for opportunities</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4 sm:mb-6"
        >
          <span className="text-foreground">Software Developer,</span>
          <br />
          <span className="text-gradient-neural">building stuff that matters.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
        >
          Passionate about creating innovative solutions with AI, modern web technologies, 
          and enhancing user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 bg-primary text-background font-semibold rounded-md overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(124,124,255,0.5)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a
            href="#about"
            className="px-8 py-3.5 border-2 border-secondary/60 text-secondary font-semibold rounded-md transition-all hover:bg-secondary/10 hover:border-secondary hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:scale-105"
          >
            About Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground/60 tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroOverlay;