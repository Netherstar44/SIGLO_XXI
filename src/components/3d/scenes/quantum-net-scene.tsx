import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function QuantumNetScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = [
    [-1, 1, 0], [1, 1, 0], [0, 0, 1],
    [-1, -1, 0], [1, -1, 0], [0, 0, -1]
  ];

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Quantum Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={`qnode-${i}`} position={pos as [number, number, number]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#00ffff" metalness={0.8} roughness={0.1} />
        </mesh>
      ))}

      {/* Entanglement Links */}
      {[
        [0, 1], [0, 2], [1, 2], 
        [3, 4], [3, 5], [4, 5],
        [0, 3], [1, 4], [2, 5]
      ].map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end = new THREE.Vector3(...nodes[b]);
        const distance = start.distanceTo(end);
        const center = start.clone().lerp(end, 0.5);
        
        return (
          <group key={`link-${i}`} position={center}>
            <mesh rotation={[0, 0, Math.atan2(end.y - start.y, end.x - start.x)]}>
              <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
              <meshBasicMaterial color="#ff00ff" transparent opacity={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
