import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';
import Starfield from './Starfield';
import NeuralNetwork from './NeuralNetwork';
import OrbitingSkills from './OrbitingSkills';

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

  // Camera positioning - closer for skills to show the big globe
  const cameraZ = showSkills ? 25 : (isMobile ? 35 : 30);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        <color attach="background" args={['#080c14']} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.05} />
          
          {/* Starfield */}
          <Starfield count={starCount} scrollProgress={scrollProgress} />
          
          {/* Neural network - visible in hero/about */}
          {showNeural && <NeuralNetwork scrollProgress={scrollProgress} />}
          
          {/* Large orbiting skills globe - visible in skills section */}
          <OrbitingSkills visible={showSkills} />
          
          {/* User can rotate the skills globe */}
          {showSkills && (
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={10}
              maxDistance={25}
              autoRotate={false}
              rotateSpeed={0.6}
            />
          )}
          
          {/* Accent lights */}
          <pointLight
            position={[0, 0, -60]}
            intensity={1.5}
            color="#ff8c1a"
            distance={120}
          />
          
          <pointLight
            position={[30, 20, -40]}
            intensity={0.8}
            color="#00d4d4"
            distance={80}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CosmicScene;