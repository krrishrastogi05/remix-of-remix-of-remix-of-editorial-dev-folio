import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitingSkillsProps {
  visible?: boolean;
}

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178c6' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#68a063' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#ffd43b' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#ffffff' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#dc382d' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47a248' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#f05032' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#ff9900' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: '#ff6f00' },
];

const OrbitingSkills = ({ visible = true }: OrbitingSkillsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { viewport } = useThree();
  
  // Position globe on the right side of the screen
  const globeX = viewport.width > 10 ? 6 : 3;
  const globeRadius = viewport.width > 10 ? 5 : 4;

  // Generate positions on sphere surface
  const skillPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      positions.push(new THREE.Vector3(
        Math.cos(theta) * radiusAtY * (globeRadius + 2),
        y * (globeRadius + 2),
        Math.sin(theta) * radiusAtY * (globeRadius + 2)
      ));
    }
    return positions;
  }, [globeRadius]);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;
    
    // Auto-rotate when not dragging
    if (globeRef.current && !isDragging) {
      globeRef.current.rotation.y += 0.003;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[globeX, 0, 0]}>
      {/* Main globe wireframe - orange */}
      <group ref={globeRef}>
        <Sphere args={[globeRadius, 32, 32]}>
          <meshBasicMaterial
            color="#ff8c1a"
            wireframe
            transparent
            opacity={0.6}
          />
        </Sphere>
        
        {/* Inner sphere - cyan wireframe */}
        <Sphere args={[globeRadius - 0.5, 24, 24]}>
          <meshBasicMaterial
            color="#00d4d4"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>
        
        {/* Core glow */}
        <Sphere args={[globeRadius - 1, 32, 32]}>
          <meshBasicMaterial
            color="#ff8c1a"
            transparent
            opacity={0.08}
          />
        </Sphere>

        {/* Skills orbiting around the globe */}
        {skills.map((skill, i) => {
          const pos = skillPositions[i];
          return (
            <group key={skill.name} position={[pos.x, pos.y, pos.z]}>
              {/* Connection line */}
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([
                      0, 0, 0,
                      -pos.x * 0.7, -pos.y * 0.7, -pos.z * 0.7
                    ])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color={skill.color} transparent opacity={0.5} />
              </line>
              
              {/* Skill node glow */}
              <Sphere args={[0.3, 16, 16]}>
                <meshBasicMaterial
                  color={skill.color}
                  transparent
                  opacity={0.6}
                />
              </Sphere>
              
              {/* HTML skill badge */}
              <Html
                center
                distanceFactor={15}
                style={{ pointerEvents: 'none' }}
                occlude={false}
              >
                <div className="flex flex-col items-center gap-1.5 select-none">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                    style={{ 
                      background: `radial-gradient(circle, ${skill.color}60 0%, ${skill.color}20 60%, transparent 100%)`,
                      boxShadow: `0 0 25px ${skill.color}50`,
                      border: `1px solid ${skill.color}40`,
                    }}
                  >
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                      draggable={false}
                    />
                  </div>
                  <span 
                    className="text-[10px] sm:text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded-full"
                    style={{ 
                      color: skill.color,
                      textShadow: `0 0 10px ${skill.color}`,
                      background: 'rgba(0,0,0,0.7)',
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
              </Html>
            </group>
          );
        })}
      </group>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[globeRadius + 3, 0.02, 8, 100]} />
        <meshBasicMaterial color="#00d4d4" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[globeRadius + 2.5, 0.02, 8, 100]} />
        <meshBasicMaterial color="#ff8c1a" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 3, -0.2, 0.5]}>
        <torusGeometry args={[globeRadius + 3.5, 0.02, 8, 100]} />
        <meshBasicMaterial color="#ffc107" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

export default OrbitingSkills;
