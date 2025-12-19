import { motion } from "framer-motion";
import { Home, Github, Globe, Twitter, FileDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const dockItems = [
  { icon: Home, href: "#", label: "Home" },
  { icon: Github, href: "https://github.com/krrishrastogi05", label: "GitHub" },
  { icon: Globe, href: "#projects", label: "Projects" },
  // { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FileDown, href: "https://google.com", label: "Resume", isResume: true },
  // TODO: Add blog link when ready
  // { icon: BookOpen, href: "https://yourblog.com", label: "Blog" },
];

const FloatingDock = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 px-4 py-3 rounded-full bg-card/90 backdrop-blur-lg border border-border shadow-2xl">
        {dockItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            download={item.isResume ? true : undefined}
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            title={item.label}
          >
            <item.icon size={20} />
          </motion.a>
        ))}
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <motion.button
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 relative"
          title="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FloatingDock;
