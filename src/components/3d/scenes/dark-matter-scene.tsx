import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DarkMatterScene() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.5;
      ringRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Anomaly (Dark Matter void) */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Accretion disk / energy ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshBasicMaterial color="#aa00ff" transparent opacity={0.8} />
      </mesh>
      
      {/* Floating anomaly particles */}
      {[...Array(50)].map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ]}>
          <boxGeometry args={[0.02, 0.02, 0.02]} />
          <meshBasicMaterial color="#5500aa" transparent opacity={Math.random()} />
        </mesh>
      ))}
    </group>
  );
}
