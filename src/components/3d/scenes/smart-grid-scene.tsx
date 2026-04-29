import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SmartGridScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    return Array.from({ length: 15 }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 3,
      0,
      (Math.random() - 0.5) * 3
    ));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, 0, 0]}>
      {/* Base City Grid */}
      <gridHelper args={[4, 20, "#0044ff", "#002288"]} position={[0, -0.1, 0]} />
      
      {/* Power Nodes */}
      {nodes.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, Math.random() * 0.5 + 0.1, 0]}>
            <boxGeometry args={[0.1, Math.random() * 1 + 0.2, 0.1]} />
            <meshStandardMaterial color="#222" metalness={0.8} />
          </mesh>
          {/* Glowing Top */}
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        </group>
      ))}

      {/* Energy Beams */}
      {[...Array(10)].map((_, i) => {
        const start = nodes[Math.floor(Math.random() * nodes.length)];
        const end = nodes[Math.floor(Math.random() * nodes.length)];
        const points = [
          new THREE.Vector3(start.x, 0.6, start.z),
          new THREE.Vector3((start.x + end.x)/2, 1, (start.z + end.z)/2),
          new THREE.Vector3(end.x, 0.6, end.z)
        ];
        const curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
        const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.01, 8, false);
        
        return (
          <mesh key={`beam-${i}`} geometry={tubeGeo}>
            <meshBasicMaterial color="#ffff00" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
          </mesh>
        );
      })}
    </group>
  );
}
