import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. DATA: Greetings (Hello Removed) ---
const greetings = [
  { 
    id: "namaste",
    text: "नमस्ते", 
    type: "text",
    color: "#FF9900", // Saffron
    gradient: "linear-gradient(to bottom right, #FF9900, #FFC300)" 
  },
 
  { 
    id: "french",
    text: "Bonjour", 
    type: "text",
    color: "#E10098", // Pink
    gradient: "linear-gradient(to bottom right, #E10098, #E535AB)" 
  },
  { 
    id: "spanish",
    text: "¡Hola!", 
    type: "text",
    color: "#339933", // Green
    gradient: "linear-gradient(to bottom right, #339933, #539E43)" 
  },
  { 
    id: "welcome",
    text: "Welcome", 
    type: "text",
    color: "#3178C6", // Blue
    gradient: "linear-gradient(to bottom right, #3178C6, #5FA2F7)" 
  },
   { 
    id: "chinese",
    text: "你好", 
    type: "text",
    color: "#DC382D", // Red
    gradient: "linear-gradient(to bottom right, #DC382D, #A41F16)" 
  }
];

interface GreetingPreloaderProps {
  onComplete: () => void;
}

const GreetingPreloader = ({ onComplete }: GreetingPreloaderProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // --- RESTORED TIMING (The "Perfect" Speed) ---
    // Standard read time for intermediate words
    let delay = 600; 
    
    // Namaste: First impression (1200ms) - Restored from 1500ms
    if (index === 0) delay = 1200;
    
    // Welcome: Final word (1200ms) - Restored from 1500ms
    if (index === greetings.length - 1) delay = 1200;

    const timer = setTimeout(() => {
      if (index < greetings.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        setTimeout(onComplete, 500); 
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  const activeGreeting = greetings[index];

  return (
    <motion.div
      // --- GLASS CONTAINER ---
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 backdrop-blur-xl cursor-default overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* Vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/60 to-transparent z-20 pointer-events-none" />

      {/* --- CENTRAL CONTENT --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          // 'py-10' ensures matras/accents aren't clipped
          className="relative z-30 flex flex-col items-center justify-center w-full py-10"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          
          {/* 1. BACKGROUND GLOW */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div 
                className="w-[300px] h-[150px] rounded-full blur-[80px] opacity-50 transition-colors duration-500"
                style={{ backgroundColor: activeGreeting.color }}
             />
          </div>

          {/* 2. TEXT RENDERER */}
          <h1 
            // 'leading-relaxed' + 'py-4' fixes the cutting off issue
            className="text-7xl sm:text-9xl font-black tracking-tighter relative z-10 font-sans text-center leading-relaxed py-4"
            style={{
              // Base: Transparent + Stroke
              color: 'transparent',
              
              // Stroke: 2px is optimal for visibility
              WebkitTextStroke: '2px rgba(255,255,255,0.3)', 
              
              // Gradient Fill
              backgroundImage: activeGreeting.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              
              // Outer Glow
              filter: "drop-shadow(0px 0px 30px rgba(255,255,255,0.15))"
            }}
          >
            {activeGreeting.text}
          </h1>

        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default GreetingPreloader;
