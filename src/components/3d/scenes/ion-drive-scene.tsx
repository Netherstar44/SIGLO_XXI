import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function IonDriveScene() {
  const groupRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
    if (exhaustRef.current) {
      // Pulse exhaust
      const scale = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.1;
      exhaustRef.current.scale.set(scale, scale, scale);
      exhaustRef.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      {/* Engine Body */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 2, 32]} />
        <meshStandardMaterial color="#444455" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Magnetic Rings */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.85, 0.05, 16, 32]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 32]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
      </mesh>

      {/* Ion Exhaust Plume */}
      <mesh ref={exhaustRef} position={[0, -1, 0]}>
        <coneGeometry args={[0.8, 4, 32]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
