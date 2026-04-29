import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function CellScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <Sphere args={[0.8, 64, 64]}>
        <MeshDistortMaterial color="#ff00ff" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0} metalness={0.1} distort={0.4} speed={2} />
      </Sphere>
      
      {/* Outer Membrane */}
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial color="#00ffff" transparent opacity={0.2} wireframe />
      </Sphere>
      
      {/* Organelles */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * 1.5) * 1.1, Math.sin(i * 1.5) * 1.1, Math.sin(i) * 1.1]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}
