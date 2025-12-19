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

  const sphereRadius = 8; // Larger radius for more prominent globe
  const skillPositions = useMemo(() => generateSpherePositions(skills.length, sphereRadius), []);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;

    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.1;
      coreRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -time * 0.08;
      wireframeRef.current.rotation.z = time * 0.05;
    }

    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    groupRef.current.scale.setScalar(scale);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central brain core - larger */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[4, 2]} />
        <meshBasicMaterial
          color="#ff8c1a"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Outer wireframe - larger */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[5.5, 1]} />
        <meshBasicMaterial
          color="#00d4d4"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Inner glow - larger */}
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#ff8c1a"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Skills as nodes on sphere */}
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
                  array={new Float32Array([0, 0, 0, -pos.x * 0.6, -pos.y * 0.6, -pos.z * 0.6])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={skill.color} transparent opacity={0.3} />
            </line>
            
            {/* Glow sphere */}
            <mesh>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshBasicMaterial
                color={skill.color}
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            
            {/* HTML Logo */}
            <Html
              center
              distanceFactor={12}
              style={{ pointerEvents: 'none' }}
            >
              <div className="flex flex-col items-center gap-1">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                  style={{ 
                    background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`,
                    boxShadow: `0 0 20px ${skill.color}40`,
                  }}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-lg"
                  />
                </div>
                <span 
                  className="text-[9px] sm:text-[10px] font-mono font-semibold whitespace-nowrap px-1 rounded"
                  style={{ 
                    color: skill.color, 
                    textShadow: `0 0 8px ${skill.color}`,
                    background: 'rgba(0,0,0,0.5)',
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
      {[7.5, 8.5, 9.5].map((radius, i) => (
        <mesh key={radius} rotation={[Math.PI / 2 + i * 0.2, i * 0.3, 0]}>
          <torusGeometry args={[radius, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={i === 0 ? '#ff8c1a' : i === 1 ? '#00d4d4' : '#ffc107'}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export default OrbitingSkills;