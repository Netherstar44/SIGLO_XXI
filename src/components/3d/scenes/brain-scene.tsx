import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function BrainScene() {
  const groupRef = useRef<THREE.Group>(null);

  const { points, lines } = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 2 + 0.5,
          (Math.random() - 0.5) * 2
        )
      );
    }
    
    // Create random connections
    const lns = [];
    for (let i = 0; i < 40; i++) {
      const target = Math.floor(Math.random() * 40);
      lns.push([pts[i], pts[target]]);
    }
    return { points: pts, lines: lns };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Nodes */}
      {points.map((p, i) => (
        <mesh key={`node-${i}`} position={p}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
        </mesh>
      ))}

      {/* Synaptic Connections */}
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(line);
        return (
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#ff0055" transparent opacity={0.4} />
          </line>
        );
      })}
    </group>
  );
}
