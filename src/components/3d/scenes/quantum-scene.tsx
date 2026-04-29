import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Line } from "@react-three/drei";

export function QuantumScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create qubits
  const qubits = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * 1.5, Math.sin(angle * 2) * 0.5, Math.sin(angle) * 1.5);
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Superposition Core */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} wireframe />
      </Sphere>
      
      {/* Qubits */}
      {qubits.map((pos, i) => (
        <group key={i}>
          <Sphere args={[0.15, 16, 16]} position={pos}>
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
          </Sphere>
          {/* Entanglement lines */}
          <Line
            points={[new THREE.Vector3(0,0,0), pos]}
            color="#ff00ff"
            opacity={0.3}
            transparent
            lineWidth={1}
          />
        </group>
      ))}
    </group>
  );
}
