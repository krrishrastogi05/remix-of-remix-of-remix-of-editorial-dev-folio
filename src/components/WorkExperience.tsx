import { motion } from "framer-motion";

const experiences = [
  {
    company: "Open Source",
    role: "Contributor",
    date: "2023 - Present",
    logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  },
  {
    company: "Personal Projects",
    role: "Full Stack Developer",
    date: "2022 - Present",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=projects",
  },
];

const WorkExperience = () => {
  return (
    <section id="experience" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-10"
        >
          Work Experience
        </motion.h2>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ x: 8 }}
              className="flex items-center gap-4 p-4 -mx-4 rounded-xl hover:bg-card/50 transition-colors"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-border"
              >
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground font-sans font-semibold">
                  {exp.company}
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  {exp.role}
                </p>
              </div>
              
              <span className="text-muted-foreground font-sans text-sm hidden sm:block">
                {exp.date}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WorkExperience;
