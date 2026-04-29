import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SmartDustScene() {
  const count = 1000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      ),
      speed: Math.random() * 0.5 + 0.1,
      offset: Math.random() * Math.PI * 2
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      particles.forEach((particle, i) => {
        // Floating dusty motion
        particle.pos.y += Math.sin(time * particle.speed + particle.offset) * 0.01;
        particle.pos.x += Math.cos(time * particle.speed * 0.5 + particle.offset) * 0.01;
        
        dummy.position.copy(particle.pos);
        dummy.rotation.x += delta * particle.speed;
        dummy.rotation.y += delta * particle.speed;
        
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.03, 0.03, 0.03]} />
        <meshBasicMaterial color="#00ffaa" transparent opacity={0.6} />
      </instancedMesh>
    </group>
  );
}
