import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import argusPreview from "@/assets/argus-preview.jpg";

const projects = [
  {
    title: "Argus.AI",
    description:
      "A multimodal generative AI powered application that processes social media data (text, audio, and images) to generate actionable insights for critical and quick response operations. Utilizes NLP and computer vision capabilities of modern AI models like Google Gemini.",
    image: argusPreview,
    technologies: ["React", "Python", "Google Gemini", "NLP", "Computer Vision"],
    sourceUrl: "https://github.com/krrishrastogi05/Argus.AI",
    demoUrl: "https://argus-ai-psi.vercel.app/",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block px-4 py-1.5 rounded-full border border-border text-foreground font-sans text-sm mb-6"
        >
          My Projects
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4"
        >
          Check out my latest work
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground font-sans text-lg max-w-2xl mx-auto"
        >
          I've worked on a variety of projects, from simple websites to complex applications. 
          Here are a few of my favorites.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
