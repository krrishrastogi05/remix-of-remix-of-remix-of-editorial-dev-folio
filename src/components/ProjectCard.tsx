import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  sourceUrl?: string;
  demoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group bg-card/50 rounded-xl overflow-hidden border border-border hover:border-muted-foreground/40 transition-all duration-300 hover:shadow-xl hover:shadow-background/50"
    >
      <div className="aspect-video overflow-hidden bg-secondary">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + techIndex * 0.05 }}
              className="px-3 py-1 bg-badge text-muted-foreground font-sans text-xs rounded-full"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {project.sourceUrl && (
            <motion.a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground font-sans text-sm hover:bg-secondary transition-colors"
            >
              <Github size={16} />
              Source
            </motion.a>
          )}
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-sans text-sm hover:bg-foreground/90 transition-colors"
            >
              <Globe size={16} />
              Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
