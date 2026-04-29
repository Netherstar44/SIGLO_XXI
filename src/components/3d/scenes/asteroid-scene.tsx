import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AsteroidScene() {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.y += delta * 0.1;
      asteroidRef.current.rotation.x += delta * 0.05;
    }
    if (beamRef.current) {
      // Flickering laser
      beamRef.current.material.opacity = 0.6 + Math.random() * 0.4;
      beamRef.current.scale.x = 0.8 + Math.random() * 0.4;
      beamRef.current.scale.z = 0.8 + Math.random() * 0.4;
    }
  });

  return (
    <group>
      {/* Asteroid */}
      <mesh ref={asteroidRef} position={[0, -0.2, 0]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#554433" roughness={0.9} metalness={0.4} flatShading />
        
        {/* Precious Metals inside */}
        <mesh position={[0.5, 0.5, 0.5]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[-0.4, 0.6, -0.2]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#aaaaff" metalness={1} roughness={0.1} />
        </mesh>
      </mesh>

      {/* Mining Laser Beam */}
      <mesh ref={beamRef} position={[0.5, 1.5, 0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 3]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Orbital Satellite/Miner */}
      <mesh position={[0.5, 3, 0.5]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>
    </group>
  );
}
