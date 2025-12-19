import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingSkillCardsProps {
  visible?: boolean;
}

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Language' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Language' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'Framework' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'Database' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'DevOps' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'Database' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Tool' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'Cloud' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'AI/ML' },
];

// Neural violet and cyan colors from the theme
const NEURAL_VIOLET = '#7C7CFF';
const NEURAL_CYAN = '#00E5FF';

const SkillCard = ({ skill, position, index }: { skill: typeof skills[0], position: THREE.Vector3, index: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position.y;
  
  // Alternate between violet and cyan for visual variety
  const accentColor = index % 2 === 0 ? NEURAL_VIOLET : NEURAL_CYAN;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Gentle floating animation with unique phase per card
    meshRef.current.position.y = initialY + Math.sin(time * 0.6 + index * 0.5) * 0.4;
    meshRef.current.rotation.y = Math.sin(time * 0.25 + index) * 0.08;
    meshRef.current.rotation.x = Math.cos(time * 0.15 + index) * 0.04;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Glowing backdrop */}
      <mesh>
        <planeGeometry args={[4, 5]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.06}
        />
      </mesh>
      
      {/* Card border glow */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[4.2, 5.2]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.12}
        />
      </mesh>
      
      {/* HTML Card Content */}
      <Html
        center
        distanceFactor={10}
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className="w-40 sm:w-48 p-5 rounded-2xl backdrop-blur-lg flex flex-col items-center gap-4 select-none transition-all duration-300"
          style={{
            background: `linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(7, 11, 20, 0.95) 100%)`,
            border: `1px solid ${accentColor}40`,
            boxShadow: `0 0 32px ${accentColor}25, inset 0 1px 0 ${accentColor}20`,
          }}
        >
          {/* Category tag */}
          <span 
            className="text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest font-medium"
            style={{ 
              color: accentColor,
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
            }}
          >
            {skill.category}
          </span>
          
          {/* Icon */}
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
              boxShadow: `0 0 40px ${accentColor}25`,
            }}
          >
            <img 
              src={skill.icon} 
              alt={skill.name}
              className="w-14 h-14 object-contain drop-shadow-lg"
              draggable={false}
            />
          </div>
          
          {/* Name */}
          <span 
            className="text-lg font-display font-bold tracking-wide"
            style={{ 
              color: '#E5E7EB',
              textShadow: `0 0 25px ${accentColor}60`,
            }}
          >
            {skill.name}
          </span>
          
          {/* Skill bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${75 + (index * 2) % 25}%`,
                background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
                boxShadow: `0 0 12px ${accentColor}`,
              }}
            />
          </div>
        </div>
      </Html>
    </group>
  );
};

const FloatingSkillCards = ({ visible = true }: FloatingSkillCardsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  // Generate scattered 3D positions for cards - larger spread
  const cardPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const cols = 4;
    const rows = 3;
    
    skills.forEach((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Create a grid with more spacing and depth
      const x = (col - cols / 2 + 0.5) * 7 + (Math.random() - 0.5) * 2;
      const y = (1 - row) * 6 + (Math.random() - 0.5) * 1.5;
      const z = (Math.random() - 0.5) * 8;
      
      positions.push(new THREE.Vector3(x, y, z));
    });
    
    return positions;
  }, []);

  useFrame(() => {
    if (!groupRef.current || !visible) return;
    
    // Subtle parallax based on mouse position
    const targetX = pointer.x * 0.4;
    const targetY = pointer.y * 0.25;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.04;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {/* Neural connection particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <sphereGeometry args={[0.04 + Math.random() * 0.08, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? NEURAL_VIOLET : NEURAL_CYAN}
            transparent
            opacity={0.3 + Math.random() * 0.4}
          />
        </mesh>
      ))}
      
      {/* Neural connection lines between cards */}
      {cardPositions.map((pos, i) => {
        const nextPos = cardPositions[(i + 1) % cardPositions.length];
        if (i % 2 === 0) return null;
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([pos.x, pos.y, pos.z, nextPos.x, nextPos.y, nextPos.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={NEURAL_CYAN} transparent opacity={0.12} />
          </line>
        );
      })}
      
      {/* Skill cards */}
      {skills.map((skill, i) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          position={cardPositions[i]}
          index={i}
        />
      ))}
    </group>
  );
};

export default FloatingSkillCards;