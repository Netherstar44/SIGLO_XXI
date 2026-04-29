import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SwarmScene() {
  const count = 150;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Initial random positions and velocities
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ),
      phase: Math.random() * Math.PI * 2
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      particles.forEach((particle, i) => {
        // Swarm logic: move towards center (0,0,0) with some noise
        const dirToCenter = new THREE.Vector3(0, 0, 0).sub(particle.pos).normalize().multiplyScalar(0.5);
        particle.velocity.add(dirToCenter.multiplyScalar(delta));
        
        // Add swirling motion
        particle.velocity.x += Math.sin(time + particle.phase) * delta;
        particle.velocity.y += Math.cos(time + particle.phase) * delta;
        
        // Limit speed
        particle.velocity.clampLength(0, 2);
        
        // Apply velocity
        particle.pos.add(particle.velocity.clone().multiplyScalar(delta));
        
        dummy.position.copy(particle.pos);
        
        // Look in direction of travel
        const target = particle.pos.clone().add(particle.velocity);
        dummy.lookAt(target);
        
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <coneGeometry args={[0.05, 0.15, 3]} />
        <meshStandardMaterial color="#00ffaa" emissive="#004422" metalness={0.8} roughness={0.2} />
      </instancedMesh>
    </group>
  );
}
