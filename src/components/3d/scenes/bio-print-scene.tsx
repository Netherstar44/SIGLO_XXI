import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function BioPrintScene() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const organRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    
    const time = state.clock.elapsedTime;
    
    if (headRef.current) {
      // Printer head scanning motion
      headRef.current.position.x = Math.sin(time * 2) * 0.5;
      headRef.current.position.z = Math.cos(time * 1.5) * 0.5;
    }
    
    if (organRef.current) {
      // Organ slowly 'growing' or printing
      const scaleY = Math.min(1, (time % 10) / 10);
      organRef.current.scale.y = Math.max(0.01, scaleY);
      organRef.current.position.y = (scaleY * 0.8) / 2 - 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Plate */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#222233" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Grid on Base */}
      <gridHelper args={[2, 10, "#00ffff", "#00ffff"]} position={[0, -0.44, 0]} />

      {/* Printing Organ (e.g., a heart/lung proxy) */}
      <mesh ref={organRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial color="#ff0055" roughness={0.3} transparent opacity={0.9} />
      </mesh>

      {/* Printer Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 0.4]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        {/* Laser/Ink stream */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.8]} />
          <meshBasicMaterial color="#ff0055" transparent opacity={0.5} />
        </mesh>
      </mesh>
      
      {/* Support structures */}
      <mesh position={[-1, 0.5, -1]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[1, 0.5, -1]}>
        <cylinderGeometry args={[0.05, 0.05, 2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}
