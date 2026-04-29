import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TardigradeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const legsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    
    // Animate legs swimming
    legsRef.current.forEach((leg, i) => {
      if (leg) {
        leg.rotation.x = Math.sin(state.clock.elapsedTime * 5 + i) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Main Body (Capsule) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 16, 32]} />
        <meshStandardMaterial color="#88aa88" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0, 0.4]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#88aa88" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, 0, 0.6]}>
        <torusGeometry args={[0.08, 0.03, 16, 16]} />
        <meshStandardMaterial color="#334433" />
      </mesh>

      {/* 8 Legs */}
      {[
        [-0.3, -0.2, 0.2], [0.3, -0.2, 0.2],
        [-0.3, -0.2, 0], [0.3, -0.2, 0],
        [-0.3, -0.2, -0.2], [0.3, -0.2, -0.2],
        [-0.2, -0.2, -0.4], [0.2, -0.2, -0.4] // Back legs pointing backwards slightly
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh 
            ref={(el) => { if (el) legsRef.current[i] = el; }}
            rotation={[Math.PI / 4 * (i % 2 === 0 ? 1 : -1), 0, Math.PI / 4 * (i % 2 === 0 ? 1 : -1)]}
          >
            <cylinderGeometry args={[0.05, 0.02, 0.3]} />
            <meshStandardMaterial color="#668866" />
            
            {/* Claws */}
            <mesh position={[0, -0.15, 0]}>
              <coneGeometry args={[0.02, 0.05]} />
              <meshStandardMaterial color="#aaaaaa" />
            </mesh>
          </mesh>
        </group>
      ))}
      
      {/* Floating particles (Vacuum of space) */}
      {[...Array(20)].map((_, i) => (
        <mesh key={`p-${i}`} position={[
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}
