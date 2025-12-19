import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "ARGUS.AI",
    category: "Disaster Management System",
    description:
      "A sophisticated AI-powered command center that processes real-time social media data and emergency calls to provide actionable intelligence for crisis response.",
    technologies: ["React", "Node.js", "Gemini Pro", "Socket.io"],
    sourceUrl: "https://github.com/krrishrastogi05/Argus.AI",
    demoUrl: "https://argus-ai-psi.vercel.app",
    color: "#ef4444", // Red for emergency
    gradient: "from-red-500/20 via-orange-500/20 to-transparent",
  },
  {
    title: "CODEFORTRESS",
    category: "Developer Productivity",
    description:
      "A complete ecosystem for competitive programmers combining a Chrome extension and VSCode extension to scrape and solve Codeforces problems instantly.",
    technologies: ["TypeScript", "Chrome API", "WebSocket", "Node.js"],
    sourceUrl: "https://github.com/krrishrastogi05/CodeFortress-Extension",
    color: "#3b82f6", // Blue for tech
    gradient: "from-blue-500/20 via-cyan-500/20 to-transparent",
  },
  {
    title: "TRAFFIC.SYS",
    category: "Backend Architecture",
    description:
      "High-performance backend workflow utilizing Google Routes API and Cron Jobs to analyze traffic density and predict congestion patterns between coordinates.",
    technologies: ["Node.js", "GCP", "Redis", "Cron Architecture"],
    sourceUrl: "https://github.com/krrishrastogi05/traffic-management-system",
    color: "#10b981", // Green for traffic
    gradient: "from-emerald-500/20 via-green-500/20 to-transparent",
  },
];

const ProjectCard = ({ project, index }) => {
  // Mouse tracking for Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      className="group relative w-full rounded-3xl border border-white/10 bg-gray-900/50 hover:border-white/20 overflow-hidden transition-colors duration-500"
    >
      {/* 1. Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${project.color}15,
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. Inner Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12">
        
        {/* LEFT COLUMN: Info */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full">
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono rounded-full border bg-white/5"
                style={{ borderColor: `${project.color}30`, color: project.color }}
              >
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono text-white/60 bg-white/5 rounded-md border border-white/5 hover:border-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/5">
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors group/link"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-white transition-colors group/link"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: The Giant Number Visual */}
        <div className="lg:col-span-4 relative min-h-[200px] lg:min-h-full flex items-center justify-center lg:justify-end overflow-hidden">
          {/* Abstract Gradient Blob */}
          <div 
            className={`absolute w-64 h-64 rounded-full blur-[100px] opacity-20 bg-gradient-to-br ${project.gradient}`} 
          />
          
          {/* Giant Number */}
          <span 
            className="font-display font-black text-[120px] sm:text-[180px] leading-none text-white/[0.03] select-none group-hover:text-white/[0.06] transition-colors duration-500"
            style={{ 
              WebkitTextStroke: `1px ${project.color}20` 
            }}
          >
            0{index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsOverlay = () => {
  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-mono text-xs tracking-widest uppercase">
              03 / Portfolio
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Selected <span className="text-white/40">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A showcase of complex systems, full-stack applications, and developer tools built to solve real problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8 md:space-y-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <a
            href="https://github.com/krrishrastogi05"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all hover:scale-105"
          >
            <Github className="w-5 h-5" />
            View Full Github Archive
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsOverlay;