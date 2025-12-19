import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingSkillCardsProps {
  visible?: boolean;
}

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb', category: 'Frontend' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178c6', category: 'Language' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#68a063', category: 'Backend' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#ffd43b', category: 'Language' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#ffffff', category: 'Framework' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791', category: 'Database' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed', category: 'DevOps' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#dc382d', category: 'Database' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47a248', category: 'Database' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#f05032', category: 'Tool' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#ff9900', category: 'Cloud' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: '#ff6f00', category: 'AI/ML' },
];

const SkillCard = ({ skill, position, index }: { skill: typeof skills[0], position: THREE.Vector3, index: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position.y;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Gentle floating animation with unique phase per card
    meshRef.current.position.y = initialY + Math.sin(time * 0.8 + index * 0.5) * 0.3;
    meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1;
    meshRef.current.rotation.x = Math.cos(time * 0.2 + index) * 0.05;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Glowing backdrop */}
      <mesh>
        <planeGeometry args={[2.8, 3.5]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={0.08}
        />
      </mesh>
      
      {/* Card border glow */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3, 3.7]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* HTML Card Content */}
      <Html
        center
        distanceFactor={12}
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className="w-28 sm:w-32 p-4 rounded-xl backdrop-blur-md flex flex-col items-center gap-3 select-none transition-transform hover:scale-105"
          style={{
            background: `linear-gradient(145deg, ${skill.color}15 0%, rgba(0,0,0,0.6) 100%)`,
            border: `1px solid ${skill.color}40`,
            boxShadow: `0 8px 32px ${skill.color}20, inset 0 1px 0 ${skill.color}30`,
          }}
        >
          {/* Category tag */}
          <span 
            className="text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{ 
              color: skill.color,
              background: `${skill.color}20`,
            }}
          >
            {skill.category}
          </span>
          
          {/* Icon */}
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`,
              boxShadow: `0 0 30px ${skill.color}30`,
            }}
          >
            <img 
              src={skill.icon} 
              alt={skill.name}
              className="w-10 h-10 object-contain drop-shadow-lg"
              draggable={false}
            />
          </div>
          
          {/* Name */}
          <span 
            className="text-sm font-bold"
            style={{ 
              color: '#fff',
              textShadow: `0 0 20px ${skill.color}`,
            }}
          >
            {skill.name}
          </span>
          
          {/* Skill bar */}
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{
                width: `${75 + Math.random() * 25}%`,
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                boxShadow: `0 0 10px ${skill.color}`,
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
  const { viewport, pointer } = useThree();
  
  // Generate scattered 3D positions for cards
  const cardPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const cols = 4;
    const rows = 3;
    
    skills.forEach((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Create a grid with some randomness
      const x = (col - cols / 2 + 0.5) * 5 + (Math.random() - 0.5) * 1.5;
      const y = (1 - row) * 4.5 + (Math.random() - 0.5) * 1;
      const z = (Math.random() - 0.5) * 6; // Depth variation
      
      positions.push(new THREE.Vector3(x, y, z));
    });
    
    return positions;
  }, []);

  useFrame(() => {
    if (!groupRef.current || !visible) return;
    
    // Subtle parallax based on mouse position
    const targetX = pointer.x * 0.5;
    const targetY = pointer.y * 0.3;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {/* Ambient particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
          ]}
        >
          <sphereGeometry args={[0.05 + Math.random() * 0.1, 8, 8]} />
          <meshBasicMaterial
            color={['#ff8c1a', '#00d4d4', '#ffc107'][i % 3]}
            transparent
            opacity={0.4 + Math.random() * 0.4}
          />
        </mesh>
      ))}
      
      {/* Connection lines between nearby cards */}
      {cardPositions.map((pos, i) => {
        const nextPos = cardPositions[(i + 1) % cardPositions.length];
        if (i % 3 === 0) return null; // Skip some connections
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
            <lineBasicMaterial color="#ff8c1a" transparent opacity={0.15} />
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
