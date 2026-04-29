import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TorusKnot, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function MetaScene() {
  const knotRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.5;
      knotRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group>
      <TorusKnot ref={knotRef} args={[1, 0.3, 128, 32]}>
        <MeshTransmissionMaterial 
          backside 
          thickness={0.5} 
          roughness={0.1} 
          transmission={1} 
          ior={1.5} 
          chromaticAberration={0.5} 
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#aaffff"
        />
      </TorusKnot>
      
      {/* Hidden object inside that is revealed by the lens */}
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ff0055" emissive="#ff0055" />
      </mesh>
    </group>
  );
}
