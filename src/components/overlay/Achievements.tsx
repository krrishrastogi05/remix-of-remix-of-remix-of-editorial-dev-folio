import { motion } from "framer-motion";

const achievements = [
  {
    id: "sih",
    title: "WINNER",
    subtitle: "Smart India Hackathon 2025",
    role: "Team Lead",
    stat: "National Winner", // Focusing on the Rank #1 Status
    description: "Led team 'Winter Is Ours' to victory in the Grand Finale. Recognized by the Govt of India in the world's largest open innovation model.",
    // Official Govt of India Emblem
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
    // Indian Flag Gradient
    gradientBorder: "from-[#FF9933] via-[#FFFFFF] to-[#138808]",
    shadowColor: "rgba(255, 153, 51, 0.5)", 
    imgStyle: "h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
  },
  {
    id: "amazon",
    title: "TOP 75",
    subtitle: "Amazon HackOn 2025",
    role: "Individual",
    stat: "Top 0.15% (1 of 50k)", // Specific stat for Amazon
    description: "Selected as one of the Top 75 coders nationwide out of a pool of over 50,000 participants.",
    // Amazon Logo
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", 
    // Amazon Orange Gradient
    gradientBorder: "from-[#FF9900] to-[#232F3E]", 
    shadowColor: "rgba(255, 153, 0, 0.5)", 
    // Invert the black logo to make it white
    imgStyle: "h-16 w-auto object-contain invert brightness-200 contrast-200 drop-shadow-[0_0_15px_rgba(255,153,0,0.6)]"
  }
];

const Achievements = () => {
  return (
    <section className="relative w-full py-32 px-4 md:px-10 overflow-hidden bg-black">
      
      {/* Section Header */}
      <div className="relative z-10 mb-20 max-w-7xl mx-auto">
        <span className="block text-sm font-mono text-indigo-400 tracking-widest mb-2">
          03 / HALL OF FAME
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          ACHIEVEMENTS
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {achievements.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group relative"
          >
            {/* 1. ANIMATED BORDER GLOW */}
            <div 
              className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${item.gradientBorder} opacity-30 blur-sm transition duration-500 group-hover:opacity-100 group-hover:blur-md`} 
            />
            
            {/* 2. CARD BODY */}
            <div className="relative h-full bg-black rounded-[23px] p-8 sm:p-12 overflow-hidden border border-white/10 flex flex-col justify-between transition-transform duration-500 group-hover:-translate-y-1">
              
              {/* Background 'Watermark' Image */}
              <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 grayscale">
                 <img 
                    src={item.logo} 
                    alt={item.title} 
                    className={`w-[300px] h-[300px] object-contain ${item.id === 'amazon' ? 'invert' : ''}`} 
                 />
              </div>

              {/* Top Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  {/* LOGO BOX */}
                  <div 
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-shadow duration-500 flex items-center justify-center w-24 h-24"
                    style={{ boxShadow: `0 0 20px 0 ${item.shadowColor}` }}
                  >
                    <img 
                        src={item.logo} 
                        alt={item.subtitle} 
                        className={item.imgStyle}
                    />
                  </div>
                  
                  {/* Tag (Govt / Corporate) */}
                  <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md self-start mt-2">
                    <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
                      {item.id === 'sih' ? 'National Level' : 'National Level'}
                    </span>
                  </div>
                </div>

                {/* THE GHOST TITLE */}
                <h3 className="relative text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
                  {/* Ghost Outline */}
                  <span 
                    className="block text-transparent transition-all duration-500 group-hover:opacity-0"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
                  >
                    {item.title}
                  </span>
                  
                  {/* Solid Fill */}
                  <span 
                    className="absolute inset-0 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  >
                    {item.title}
                  </span>
                </h3>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 mt-auto pt-8 border-t border-white/5">
                
                {/* Statistics Row */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                     {item.role}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider">
                     {item.stat}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                  {item.subtitle}
                </h4>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;