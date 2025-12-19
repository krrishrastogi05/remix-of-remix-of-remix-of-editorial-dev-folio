import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', level: 95 },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Language', level: 90 },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', level: 88 },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Language', level: 85 },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'Framework', level: 92 },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'Database', level: 80 },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'DevOps', level: 75 },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'Database', level: 70 },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database', level: 82 },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Tool', level: 90 },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Cloud', level: 72 },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'AI/ML', level: 68 },
];

const SkillCard = ({ skill, index, isInView }: { skill: typeof skills[0]; index: number; isInView: boolean }) => {
  const isViolet = index % 2 === 0;
  const accentColor = isViolet ? 'hsl(var(--neural-violet))' : 'hsl(var(--neural-cyan))';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        transition: { duration: 0.2 } 
      }}
      className="group relative p-5 sm:p-6 rounded-xl backdrop-blur-lg cursor-pointer"
      style={{
        background: 'linear-gradient(145deg, hsl(var(--cosmic-surface) / 0.9) 0%, hsl(var(--cosmic-deep) / 0.95) 100%)',
        border: `1px solid ${accentColor}30`,
        boxShadow: `0 4px 24px ${accentColor}10`,
      }}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 32px ${accentColor}35, inset 0 0 20px ${accentColor}10`,
        }}
      />
      
      {/* Category tag */}
      <span 
        className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider"
        style={{ 
          color: accentColor,
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}25`,
        }}
      >
        {skill.category}
      </span>
      
      {/* Icon */}
      <div 
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110"
        style={{
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
        }}
      >
        <img 
          src={skill.icon} 
          alt={skill.name}
          className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-lg"
          draggable={false}
        />
      </div>
      
      {/* Name */}
      <h3 
        className="text-center text-base sm:text-lg font-display font-semibold mb-3 text-foreground group-hover:text-glow-violet transition-all"
        style={{ 
          textShadow: `0 0 20px ${accentColor}40`,
        }}
      >
        {skill.name}
      </h3>
      
      {/* Skill bar */}
      <div className="w-full h-1.5 rounded-full overflow-hidden bg-muted/30">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />
      </div>
      
      {/* Level indicator */}
      <span className="absolute bottom-3 right-3 text-xs font-mono text-muted-foreground">
        {skill.level}%
      </span>
    </motion.div>
  );
};

const SkillsOverlay = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="skills" className="relative min-h-screen py-20 sm:py-32 px-4 sm:px-6 lg:px-12" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 sm:gap-4 mb-4"
          >
            <div className="w-8 sm:w-12 h-px bg-primary" />
            <span className="font-mono text-xs sm:text-sm text-primary tracking-widest">02 / SKILLS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Tech <span className="text-gradient-neural">Arsenal</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl"
          >
            Technologies I work with to build scalable and innovative solutions
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {skills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
        
        {/* Neural connection decoration */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-px w-full max-w-2xl mx-auto neural-line"
        />
      </div>
    </section>
  );
};

export default SkillsOverlay;