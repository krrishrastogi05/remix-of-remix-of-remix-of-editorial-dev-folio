import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";

interface FloatingSkillsProps {
  visible?: boolean;
}

const skills = [
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#ffd43b" },
  { name: "Next.js", color: "#ffffff" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ed" },
  { name: "Redis", color: "#dc382d" },
  { name: "DSA", color: "#a855f7" },
  { name: "DBMS", color: "#06b6d4" },
  { name: "OS", color: "#ec4899" },
  { name: "CN", color: "#f59e0b" },
];

const FloatingSkills = ({ visible = true }: FloatingSkillsProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const skillPositions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = (i / skills.length) * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      const yOffset = (Math.random() - 0.5) * 4;
      return {
        x: Math.cos(phi) * radius,
        y: yOffset,
        z: Math.sin(phi) * radius,
        initialPhi: phi,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire group slowly
    groupRef.current.rotation.y = time * 0.1;

    // Update each skill position for floating effect
    groupRef.current.children.forEach((child, i) => {
      const floatY = Math.sin(time * 0.5 + i * 0.5) * 0.3;
      const pos = skillPositions[i];
      if (pos) {
        child.position.y = pos.y + floatY;
      }
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {skills.map((skill, i) => {
        const pos = skillPositions[i];
        return (
          <group key={skill.name} position={[pos.x, pos.y, pos.z]}>
            {/* Glow sphere behind text */}
            <mesh>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshBasicMaterial
                color={skill.color}
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Skill text */}
            <Text
              fontSize={0.4}
              color={skill.color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/SpaceGrotesk-Medium.woff"
            >
              {skill.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

export default FloatingSkills;
