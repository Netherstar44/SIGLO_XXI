import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HoloScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe hand/structure approximation */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.2} />
      </mesh>
      {/* Core emitter */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
