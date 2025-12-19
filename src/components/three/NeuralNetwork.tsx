import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkProps {
  scrollProgress?: number;
}

const NeuralNetwork = ({ scrollProgress = 0 }: NeuralNetworkProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodes, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const nodeCount = 50;

    // Generate node positions in a brain-like shape
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const radius = 6 + Math.random() * 8;

      // Slightly flatten to make it more brain-like
      nodes.push(new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi) * 0.8,
        radius * Math.cos(theta)
      ));
    }

    // Create connections between nearby nodes
    const lines: number[] = [];
    const maxDistance = 8;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < maxDistance && Math.random() > 0.3) {
          lines.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }

    return { nodes, linePositions: new Float32Array(lines) };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle rotation
    groupRef.current.rotation.y = time * 0.08;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    
    // Floating motion
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.5;
    
    // Move based on scroll
    groupRef.current.position.z = 5 - scrollProgress * 25;
    
    // Pulse the lines
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.2 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ff8c1a"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Node points with glow */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? '#ff8c1a' : i % 4 === 1 ? '#00d4d4' : i % 4 === 2 ? '#ffc107' : '#ffffff'}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export default NeuralNetwork;