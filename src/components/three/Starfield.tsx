import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";

interface StarfieldProps {
  count?: number;
}

const Starfield = ({ count = 2500 }: StarfieldProps) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, instanceColors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const instanceColors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    // Rich warm color palette
    const colorPalette = [
      [1.0, 0.55, 0.15], // Lamborghini Orange
      [1.0, 0.7, 0.2], // Amber
      [1.0, 0.85, 0.4], // Gold
      [0.0, 0.85, 0.85], // Cyan
      [0.95, 0.95, 1.0], // White
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread stars more evenly in space
      const radius = 30 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const depth = (Math.random() - 0.5) * 250;

      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(theta) * radius;
      positions[i3 + 2] = depth;

      // Random color from palette - more whites and golds
      const colorIndex =
        Math.random() < 0.6
          ? Math.floor(Math.random() * 3) + 2 // Mostly gold/cyan/white
          : Math.floor(Math.random() * 2); // Some orange/amber
      const color = colorPalette[colorIndex];
      instanceColors[i3] = color[0];
      instanceColors[i3 + 1] = color[1];
      instanceColors[i3 + 2] = color[2];

      // Smaller, more subtle stars
      scales[i] = 0.03 + Math.random() * 0.08;
    }

    return { positions, instanceColors, scales };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];

      // Gentle parallax based on scroll
      z = z - scrollStore.progress * 80;

      // Wrap stars
      if (z < -125) z += 250;
      if (z > 125) z -= 250;

      // Very subtle twinkle
      const twinkle = 0.8 + Math.sin(time * 2 + i * 0.5) * 0.2;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scales[i] * twinkle);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 6, 6);
    geo.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(instanceColors, 3)
    );
    return geo;
  }, [instanceColors]);

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]}>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
};

export default Starfield;
