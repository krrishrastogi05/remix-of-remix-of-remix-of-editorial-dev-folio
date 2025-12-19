import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  sourceUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    title: 'Argus',
    description: 'AI-powered surveillance and monitoring system with real-time computer vision capabilities.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'React'],
    sourceUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
  },
  {
    title: 'Neural Canvas',
    description: 'Generative art platform using machine learning to create unique visual experiences.',
    technologies: ['Next.js', 'Three.js', 'Python', 'PyTorch'],
    sourceUrl: 'https://github.com',
  },
  {
    title: 'DataFlow',
    description: 'Real-time data pipeline visualization tool for monitoring ETL processes.',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'D3.js'],
    sourceUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative pl-8 border-l border-cosmic-gold/30 hover:border-cosmic-gold transition-colors"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-cosmic-gold shadow-[0_0_10px_rgba(255,193,7,0.5)] group-hover:scale-125 transition-transform" />
      
      {/* Project number */}
      <div className="font-mono text-[10px] sm:text-xs text-cosmic-gold/60 mb-2">
        PROJECT_{String(index + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-cosmic-orange transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-md">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 font-mono text-[10px] sm:text-xs text-cosmic-amber border-b border-cosmic-amber/40"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cosmic-orange transition-colors"
          >
            <Github size={14} />
            <span>Source</span>
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cosmic-cyan transition-colors"
          >
            <ExternalLink size={14} />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.article>
  );
};

const ProjectsOverlay = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative min-h-screen py-20 sm:py-32 px-4 sm:px-6" ref={ref}>
      <div className="max-w-3xl mx-auto md:ml-24">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <div className="w-8 sm:w-12 h-px bg-cosmic-gold" />
          <span className="font-mono text-xs sm:text-sm text-cosmic-gold tracking-widest">03 / PROJECTS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4"
        >
          Featured <span className="text-gradient-cosmic">Work</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-muted-foreground mb-12 sm:mb-16 max-w-xl"
        >
          A timeline of projects that push boundaries and explore new frontiers in technology.
        </motion.p>

        {/* Projects timeline */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsOverlay;