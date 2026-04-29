import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DroneScene() {
  const groupRef = useRef<THREE.Group>(null);
  const rotorsRef = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Hovering effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 2.5) * 0.1;
    }
    
    rotorsRef.current.forEach((rotor) => {
      if (rotor) rotor.rotation.y += delta * 20; // Fast spin
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central Body */}
      <mesh>
        <boxGeometry args={[0.6, 0.2, 0.6]} />
        <meshStandardMaterial color="#eeeeee" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Eye/Camera */}
      <mesh position={[0, -0.15, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.15, 0.35]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Arms & Rotors */}
      {[
        [-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh rotation={[Math.PI / 2, 0, Math.atan2(x, z)]} position={[-x/2, 0, -z/2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.6]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05]} />
            <meshStandardMaterial color="#222222" wireframe />
          </mesh>
          <group ref={(el) => { if (el) rotorsRef.current[i] = el; }} position={[0, 0.1, 0]}>
            <mesh>
              <boxGeometry args={[0.3, 0.02, 0.02]} />
              <meshBasicMaterial color="#00ffcc" />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}
