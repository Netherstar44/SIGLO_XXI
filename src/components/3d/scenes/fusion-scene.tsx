import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import * as THREE from "three";

export function FusionScene() {
  const coreRef = useRef<THREE.Mesh>(null);
  const reactorRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 2;
      coreRef.current.rotation.y += delta * 3;
    }
    if (reactorRef.current) {
      reactorRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group>
      {/* Magnetic Confinement Field (Reactor Shell) */}
      <group ref={reactorRef}>
        <Torus args={[1.5, 0.4, 16, 64]}>
          <meshStandardMaterial color="#0088ff" wireframe transparent opacity={0.3} />
        </Torus>
        <Torus args={[1.5, 0.5, 16, 64]} rotation={[Math.PI/2, 0, 0]}>
          <meshStandardMaterial color="#0088ff" wireframe transparent opacity={0.3} />
        </Torus>
      </group>

      {/* Superhot Plasma Core */}
      <mesh ref={coreRef}>
        <torusKnotGeometry args={[0.5, 0.15, 128, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffaa00" emissiveIntensity={2} />
      </mesh>
      
      {/* Plasma glow */}
      <pointLight color="#ff5500" intensity={5} distance={10} />
    </group>
  );
}
