import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Icosahedron } from "@react-three/drei";

export function ClimateScene() {
  const groupRef = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    if (shieldRef.current) {
      shieldRef.current.rotation.x = t * 0.15;
      shieldRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth / Biosphere */}
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial color="#00aa55" roughness={0.6} metalness={0.1} />
      </Sphere>
      
      {/* Atmosphere */}
      <Sphere args={[1.6, 32, 32]}>
        <meshStandardMaterial color="#0088ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </Sphere>

      {/* Geoengineering Shield (Hexagonal / Icosahedron grid) */}
      <Icosahedron ref={shieldRef} args={[1.8, 2]}>
        <meshStandardMaterial color="#00ffff" wireframe transparent opacity={0.5} />
      </Icosahedron>
    </group>
  );
}
