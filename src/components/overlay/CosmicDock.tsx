import { motion } from 'framer-motion';
import { Github, FileText, Newspaper, Home, User, Code, Briefcase } from 'lucide-react';

const dockItems = [
  { icon: Home, label: 'Home', href: '#' },
  { icon: User, label: 'About', href: '#about' },
  { icon: Code, label: 'Skills', href: '#skills' },
  { icon: Briefcase, label: 'Projects', href: '#projects' },
];

const externalLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: FileText, label: 'Resume', href: '/resume.pdf' },
  { icon: Newspaper, label: 'Blog', href: 'https://blog.com' },
];

const CosmicDock = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="inline-flex items-center gap-1 px-4 py-2.5 bg-card/95 backdrop-blur-sm border border-border rounded-full shadow-lg shadow-black/20">
        {/* Internal navigation */}
        {dockItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group relative p-2.5 sm:p-3 text-muted-foreground hover:text-cosmic-orange transition-colors rounded-full hover:bg-cosmic-orange/10"
          >
            <item.icon size={18} />
            
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-cosmic-orange/30 text-xs font-mono text-cosmic-orange opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded-sm pointer-events-none">
              {item.label}
            </span>
          </a>
        ))}

        {/* Separator */}
        <div className="w-px h-5 bg-border mx-1.5" />

        {/* External links */}
        {externalLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2.5 sm:p-3 text-muted-foreground hover:text-cosmic-cyan transition-colors rounded-full hover:bg-cosmic-cyan/10"
          >
            <item.icon size={18} />
            
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-cosmic-cyan/30 text-xs font-mono text-cosmic-cyan opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded-sm pointer-events-none">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default CosmicDock;