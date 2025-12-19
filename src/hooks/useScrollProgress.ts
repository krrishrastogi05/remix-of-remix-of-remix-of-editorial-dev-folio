import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));

      // Determine current section
      const sections = ['hero', 'about', 'skills', 'projects'];
      const viewportMiddle = scrollTop + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i] === 'hero' ? '' : sections[i]) || 
                       (sections[i] === 'hero' ? document.body : null);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = scrollTop + rect.top;
          if (viewportMiddle >= sectionTop) {
            setCurrentSection(sections[i]);
            break;
          }
        }
      }

      // Simple threshold-based detection as fallback
      if (progress < 0.2) setCurrentSection('hero');
      else if (progress < 0.45) setCurrentSection('about');
      else if (progress < 0.7) setCurrentSection('skills');
      else setCurrentSection('projects');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, currentSection };
};