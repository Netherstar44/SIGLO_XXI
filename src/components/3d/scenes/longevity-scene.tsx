import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function LongevityScene() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
    const t = state.clock.elapsedTime;
    
    if (outerRef.current) {
      // Breathing effect
      const scale = 1 + Math.sin(t * 2) * 0.05;
      outerRef.current.scale.set(scale, scale, scale);
      outerRef.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta;
      innerRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cellular renewal metaphor */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial color="#ff00aa" transparent opacity={0.3} wireframe />
      </mesh>
      
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff0055" emissiveIntensity={1} />
      </mesh>
      
      {/* Telomere strands */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[0.8, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
      ))}
    </group>
  );
}
