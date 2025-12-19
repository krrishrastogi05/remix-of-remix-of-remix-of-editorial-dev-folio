import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import argusPreview from "@/assets/argus-preview.jpg";

const projects = [
  {
    title: "Argus.AI",
    description:
      "A sophisticated AI-powered command center that processes real-time social media data and emergency calls to provide actionable intelligence for crisis response. Uses multimodal generative AI to analyze text, audio, and images from various sources, generating incident reports with geolocation, severity scoring, and automatic resource dispatch recommendations.",
    image: argusPreview,
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Google Gemini API",
      "Leaflet Maps",
    ],
    sourceUrl: "https://github.com/krrishrastogi05/Argus.AI",
    demoUrl: "https://argus-ai-psi.vercel.app",
  },
  {
    title: "CodeFortress Extension",
    description:
      "A productivity tool for competitive programmers that combines a Chrome extension and VSCode extension. Allows users to scrape Codeforces contest problems directly and view them in their IDE, eliminating context switching and improving workflow efficiency.",
    image: argusPreview,
    technologies: [
      "Chrome Extension",
      "VSCode Extension",
      "TypeScript",
      "Node.js",
      "WebSocket",
      "React",
      "Tailwind CSS",
      "Vite",
    ],
    sourceUrl: "https://github.com/krrishrastogi05/CodeFortress-Extension",
  },
  {
    title: "Traffic Management System",
    description:
      "A backend workflow system that utilizes Google Routes API combined with cron jobs to fetch traffic information between two points at regular intervals. Designed for intelligent traffic monitoring and route optimization.",
    image: argusPreview,
    technologies: [
      "JavaScript",
      "Node.js",
      "Google Cloud Platform",
      "Google Maps Routes API",
      "Cron Jobs",
    ],
    sourceUrl: "https://github.com/krrishrastogi05/traffic-management-system",
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
          I've worked on a variety of projects, from simple websites to complex
          applications. Here are a few of my favorites.
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
