import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Box, Cylinder, Sphere } from "@react-three/drei";

export function RoboticsScene() {
  const armRef = useRef<THREE.Group>(null);
  const jointRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(t) * Math.PI / 4;
    }
    if (jointRef.current) {
      jointRef.current.rotation.z = Math.sin(t * 1.5) * Math.PI / 6;
    }
  });

  return (
    <group position={[0, -1.5, 0]}>
      {/* Base */}
      <Cylinder args={[0.8, 1, 0.5, 32]}>
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </Cylinder>
      
      <group ref={armRef} position={[0, 0.25, 0]}>
        {/* Lower Arm */}
        <Box args={[0.4, 2, 0.4]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#f0f0f0" metalness={0.5} roughness={0.5} />
        </Box>
        {/* Joint */}
        <Sphere args={[0.3, 32, 32]} position={[0, 2, 0]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </Sphere>
        
        {/* Upper Arm */}
        <group ref={jointRef} position={[0, 2, 0]}>
          <Box args={[0.3, 1.5, 0.3]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color="#333" metalness={0.8} />
          </Box>
          {/* Tool/Hand */}
          <Cylinder args={[0.1, 0.2, 0.4]} position={[0, 1.6, 0]}>
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} />
          </Cylinder>
        </group>
      </group>
    </group>
  );
}
