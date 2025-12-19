import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';
import Starfield from './Starfield';
import NeuralNetwork from './NeuralNetwork';
import FloatingSkillCards from './FloatingSkillCards';

interface CosmicSceneProps {
  scrollProgress: number;
  currentSection: string;
}

const CosmicScene = ({ scrollProgress, currentSection }: CosmicSceneProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const starCount = isMobile ? 1200 : 2500;
  const showSkills = currentSection === 'skills';
  const showNeural = currentSection === 'hero' || currentSection === 'about';

  // Camera positioning - wider view for floating cards
  const cameraZ = showSkills ? 18 : (isMobile ? 35 : 30);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 65 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        <color attach="background" args={['#070B14']} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          
          {/* Starfield */}
          <Starfield count={starCount} scrollProgress={scrollProgress} />
          
          {/* Neural network - visible in hero/about */}
          {showNeural && <NeuralNetwork scrollProgress={scrollProgress} />}
          
          {/* Floating skill cards - visible in skills section */}
          <FloatingSkillCards visible={showSkills} />
          
          {/* Neural accent lights */}
          <pointLight
            position={[0, 0, -60]}
            intensity={1.5}
            color="#7C7CFF"
            distance={120}
          />
          
          <pointLight
            position={[30, 20, -40]}
            intensity={0.8}
            color="#00E5FF"
            distance={80}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CosmicScene;
