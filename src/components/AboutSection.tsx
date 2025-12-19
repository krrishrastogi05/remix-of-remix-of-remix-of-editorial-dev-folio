import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8"
        >
          About
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground font-sans text-lg leading-relaxed"
        >
          Building software solutions that enhance user experiences and drive impact. 
          Specializes in full-stack development with a focus on modern web technologies 
          like React, Next.js, and Python. Experienced in AI/ML applications, leveraging 
          NLP and computer vision to create intelligent systems. Passionate about open source 
          and contributing to projects that make a difference.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
