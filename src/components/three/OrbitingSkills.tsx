import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
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

// Generate positions on a sphere surface using golden angle
const generateSpherePositions = (count: number, radius: number) => {
  const positions: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    
    positions.push(new THREE.Vector3(
      Math.cos(theta) * radiusAtY * radius,
      y * radius,
      Math.sin(theta) * radiusAtY * radius
    ));
  }
  return positions;
};

const OrbitingSkills = ({ visible = true }: OrbitingSkillsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  const sphereRadius = 12; // Much larger radius
  const skillPositions = useMemo(() => generateSpherePositions(skills.length, sphereRadius), []);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;

    const time = state.clock.getElapsedTime();

    // Slow idle rotation for the core elements only
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.05;
      coreRef.current.rotation.x = Math.sin(time * 0.03) * 0.05;
    }
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -time * 0.04;
      wireframeRef.current.rotation.z = time * 0.025;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central brain core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[5, 2]} />
        <meshBasicMaterial
          color="#ff8c1a"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Outer wireframe */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[7, 1]} />
        <meshBasicMaterial
          color="#00d4d4"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial
          color="#ff8c1a"
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Skills as nodes on sphere - MUCH LARGER */}
      {skills.map((skill, i) => {
        const pos = skillPositions[i];
        return (
          <group key={skill.name} position={[pos.x, pos.y, pos.z]}>
            {/* Connection line to center */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, -pos.x * 0.5, -pos.y * 0.5, -pos.z * 0.5])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={skill.color} transparent opacity={0.4} />
            </line>
            
            {/* Glow sphere - larger */}
            <mesh>
              <sphereGeometry args={[0.8, 16, 16]} />
              <meshBasicMaterial
                color={skill.color}
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            
            {/* HTML Logo - Much larger and clearer */}
            <Html
              center
              distanceFactor={8}
              style={{ pointerEvents: 'none' }}
            >
              <div className="flex flex-col items-center gap-2">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10"
                  style={{ 
                    background: `radial-gradient(circle, ${skill.color}50 0%, ${skill.color}20 50%, transparent 70%)`,
                    boxShadow: `0 0 30px ${skill.color}50, inset 0 0 20px ${skill.color}30`,
                  }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg"
                  />
                </div>
                <span 
                  className="text-sm sm:text-base font-semibold whitespace-nowrap px-3 py-1 rounded-full"
                  style={{ 
                    color: '#fff', 
                    textShadow: `0 0 10px ${skill.color}, 0 0 20px ${skill.color}`,
                    background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
                    border: `1px solid ${skill.color}50`,
                  }}
                >
                  {skill.name}
                </span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Orbital rings - larger */}
      {[10, 11.5, 13].map((radius, i) => (
        <mesh key={radius} rotation={[Math.PI / 2 + i * 0.2, i * 0.3, 0]}>
          <torusGeometry args={[radius, 0.03, 8, 64]} />
          <meshBasicMaterial
            color={i === 0 ? '#ff8c1a' : i === 1 ? '#00d4d4' : '#ffc107'}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
};

export default OrbitingSkills;
