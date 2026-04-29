import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TorusKnot, Sparkles } from "@react-three/drei";

export function EpilogueScene() {
  const knotRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.2;
      knotRef.current.rotation.y = t * 0.3;
      
      // Pulsating scale
      const scale = 1 + Math.sin(t * 2) * 0.05;
      knotRef.current.scale.set(scale, scale, scale);
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <TorusKnot ref={knotRef} args={[1, 0.3, 256, 64]}>
        <meshPhysicalMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={1}
          roughness={0} 
          metalness={1} 
          clearcoat={1}
          wireframe
        />
      </TorusKnot>
      
      <Sparkles count={200} scale={5} size={2} speed={0.4} opacity={0.8} color="#00ffff" />
      <Sparkles count={200} scale={5} size={2} speed={0.4} opacity={0.8} color="#ff00ff" />
    </group>
  );
}
