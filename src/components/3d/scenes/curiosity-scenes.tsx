import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial } from "@react-three/drei";

// 1. Olor a Espacio (Molecule)
export function SpaceAromaScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.x += d; ref.current.rotation.y += d * 0.5; } });
  return (
    <group ref={ref} scale={1.5}>
      {[[-0.5, 0, 0], [0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0.5]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#ff8800" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.05, 0.05, 1]} /><meshStandardMaterial color="#aaaaaa" /></mesh>
      <mesh position={[-0.25, 0.25, 0]} rotation={[0, 0, -Math.PI / 4]}><cylinderGeometry args={[0.05, 0.05, 0.7]} /><meshStandardMaterial color="#aaaaaa" /></mesh>
    </group>
  );
}

// 2. Tiempo Relativo (Hourglass)
export function TimeGravityScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s, d) => { if (ref.current) ref.current.rotation.z = Math.sin(s.clock.elapsedTime) * 0.2; });
  return (
    <group ref={ref}>
      <mesh position={[0, 1, 0]}><coneGeometry args={[1, 2, 16]} /><meshStandardMaterial color="#ff00ff" wireframe /></mesh>
      <mesh position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[1, 2, 16]} /><meshStandardMaterial color="#00ffff" wireframe /></mesh>
      <mesh><sphereGeometry args={[0.2]} /><meshBasicMaterial color="#ffffff" /></mesh>
    </group>
  );
}

// 3. Día Eterno (Venus)
export function VenusDayScene() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y -= d * 0.1; /* Retrograde */ });
  return (
    <Float floatIntensity={2}>
      <mesh ref={ref} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#ffaa00" speed={1} distort={0.2} roughness={0.8} />
      </mesh>
    </Float>
  );
}

// 4. Bosques vs Estrellas (Fractal Tree)
export function TreesStarsScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.2; });
  return (
    <group ref={ref} position={[0, -1.5, 0]}>
      <mesh><cylinderGeometry args={[0.1, 0.2, 1]} /><meshStandardMaterial color="#00ff44" /></mesh>
      <group position={[0, 0.5, 0]}>
        {[1, -1].map((dir, i) => (
          <mesh key={i} position={[dir * 0.4, 0.5, 0]} rotation={[0, 0, dir * -Math.PI/4]}>
            <cylinderGeometry args={[0.05, 0.1, 1]} /><meshStandardMaterial color="#00ff44" />
          </mesh>
        ))}
      </group>
      <points position={[0, 2, 0]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <pointsMaterial color="#ffffff" size={0.05} />
      </points>
    </group>
  );
}

// 5. Hongos Ingenieros (Slime Mold)
export function SlimeMoldScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 2) * 0.1); });
  return (
    <group ref={ref}>
      <mesh>
        <torusKnotGeometry args={[1, 0.2, 100, 16]} />
        <meshStandardMaterial color="#aaff00" emissive="#55aa00" roughness={0.2} />
      </mesh>
    </group>
  );
}

// 6. Punto Triple (Triple Point)
export function TriplePointScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime; });
  return (
    <group ref={ref}>
      {/* Solid */}
      <mesh position={[-1, 0, 0]}><boxGeometry args={[0.8, 0.8, 0.8]} /><meshStandardMaterial color="#ffffff" opacity={0.8} transparent /></mesh>
      {/* Liquid */}
      <mesh position={[0, 0, 1]}><sphereGeometry args={[0.5]} /><MeshDistortMaterial color="#0088ff" distort={0.5} speed={3} /></mesh>
      {/* Gas */}
      <points position={[1, 0, 0]}>
        <sphereGeometry args={[0.6, 8, 8]} />
        <pointsMaterial color="#aaaaaa" size={0.1} transparent opacity={0.5} />
      </points>
    </group>
  );
}

// 7. Canto del Abismo (Black Hole Sound)
export function BlackHoleSongScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { 
    if (ref.current) {
      ref.current.children.forEach((c, i) => {
        const scale = 1 + Math.sin(s.clock.elapsedTime * 3 - i) * 0.2;
        c.scale.setScalar(scale);
      });
    }
  });
  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.5]} /><meshBasicMaterial color="#000000" /></mesh>
      {[1, 1.5, 2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI/2, 0, 0]}>
          <ringGeometry args={[r, r + 0.05, 32]} />
          <meshBasicMaterial color="#4400ff" transparent opacity={1 - i*0.3} />
        </mesh>
      ))}
    </group>
  );
}

// 8. Ancianos del Mar (Shark Silhouette)
export function SharksTreesScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { 
    if (ref.current) {
      ref.current.position.y = Math.sin(s.clock.elapsedTime * 2) * 0.5;
      ref.current.rotation.z = Math.cos(s.clock.elapsedTime * 2) * 0.2;
    }
  });
  return (
    <group ref={ref}>
      <mesh rotation={[0, Math.PI/2, 0]}>
        <coneGeometry args={[0.5, 1.5, 4]} />
        <meshStandardMaterial color="#0044ff" />
      </mesh>
    </group>
  );
}

// 9. Luz Milenaria (Photon Bouncing)
export function SunLightScene() {
  const photonRef = useRef<THREE.Mesh>(null);
  useFrame((s) => { 
    if (photonRef.current) {
      photonRef.current.position.x = Math.sin(s.clock.elapsedTime * 10) * 0.8;
      photonRef.current.position.y = Math.cos(s.clock.elapsedTime * 13) * 0.8;
      photonRef.current.position.z = Math.sin(s.clock.elapsedTime * 7) * 0.8;
    }
  });
  return (
    <group>
      <mesh><sphereGeometry args={[1.5, 16, 16]} /><meshStandardMaterial color="#ffaa00" wireframe transparent opacity={0.2} /></mesh>
      <mesh ref={photonRef}><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#ffffff" /></mesh>
    </group>
  );
}

// 10. Concreto Biológico (Bone Lattice)
export function BoneStrengthScene() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.x += d; });
  return (
    <mesh ref={ref} scale={1.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

// 11. Nubes de Plomo (Heavy Cloud)
export function CloudWeightScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.position.y = Math.sin(s.clock.elapsedTime) * 0.2; });
  return (
    <group ref={ref}>
      {[[-0.5,0,0], [0.5,0,0], [0,0.5,0], [0,0,0.5], [0,0,-0.5]].map((p, i) => (
        <mesh key={i} position={p as [number,number,number]} scale={1.5}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color="#cccccc" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

// 12. Ácido Disolvente (Stomach Acid)
export function StomachAcidScene() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => { if (ref.current) ref.current.scale.setScalar(Math.max(0, 1 - (s.clock.elapsedTime % 3) * 0.3)); });
  return (
    <group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI/2, 0, 0]}><planeGeometry args={[4, 4]} /><MeshDistortMaterial color="#00ff00" distort={1} speed={5} /></mesh>
      <mesh ref={ref}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.2} /></mesh>
    </group>
  );
}

// 13. Física Imposible (Superfluid)
export function SuperfluidScene() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => { 
    if (ref.current) {
      ref.current.position.y = (s.clock.elapsedTime % 2) - 1;
    }
  });
  return (
    <group>
      <mesh><cylinderGeometry args={[1, 1, 2, 16]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} /></mesh>
      <mesh ref={ref}><cylinderGeometry args={[1.05, 1.05, 0.2, 16]} /><meshBasicMaterial color="#00ccff" transparent opacity={0.8} /></mesh>
    </group>
  );
}

// 14. Digestión Espacial (Zero-G Bubbles)
export function SpaceBurpScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.5; });
  return (
    <group ref={ref}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.sin(i*2), Math.cos(i*2), 0]}>
          <sphereGeometry args={[0.4]} />
          <MeshDistortMaterial color="#ffaaff" distort={0.6} speed={3} />
        </mesh>
      ))}
    </group>
  );
}

// 15. Cubos Biológicos (Wombat Poop)
export function WombatPoopScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d; });
  return (
    <group ref={ref}>
      <mesh rotation={[0.5, 0.5, 0]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#885522" roughness={0.9} /></mesh>
      <mesh position={[1.5, 0, 0]} rotation={[0.2, 0.8, 0]}><boxGeometry args={[0.8, 0.8, 0.8]} /><meshStandardMaterial color="#885522" roughness={0.9} /></mesh>
    </group>
  );
}

// 16. Planeta Joya (Diamond Planet)
export function DiamondPlanetScene() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) { ref.current.rotation.y += d; ref.current.rotation.x += d*0.5; } });
  return (
    <Float>
      <mesh ref={ref} scale={1.5}>
        <octahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ccffff" metalness={0.9} roughness={0.1} flatShading />
      </mesh>
    </Float>
  );
}

// 17. Crecimiento Orbital (Spine)
export function AstronautHeightScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { 
    if (ref.current) {
      const stretch = Math.sin(s.clock.elapsedTime * 2) * 0.2;
      ref.current.children.forEach((c, i) => { c.position.y = (i - 2) * (0.5 + stretch); });
    }
  });
  return (
    <group ref={ref}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
          <meshStandardMaterial color="#ffaaaa" />
        </mesh>
      ))}
    </group>
  );
}

// 18. Latte Cósmico (Beige Universe)
export function BeigeUniverseScene() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime; });
  return (
    <group ref={ref}>
      <points>
        <torusGeometry args={[1.5, 0.5, 16, 100]} />
        <pointsMaterial color="#fff8e7" size={0.05} />
      </points>
    </group>
  );
}

// 19. Órganos a la Vista (Glass Frog)
export function GlassFrogScene() {
  const heartRef = useRef<THREE.Mesh>(null);
  useFrame((s) => { 
    if (heartRef.current) heartRef.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 8) * 0.1); 
  });
  return (
    <group>
      <mesh><sphereGeometry args={[1.5, 32, 32]} /><meshStandardMaterial color="#aaffaa" transparent opacity={0.3} roughness={0.1} /></mesh>
      <mesh ref={heartRef}><octahedronGeometry args={[0.5, 2]} /><meshStandardMaterial color="#ff0044" /></mesh>
    </group>
  );
}

// 20. Metal Expansivo (Eiffel Summer)
export function EiffelSummerScene() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => { if (ref.current) ref.current.scale.y = 1 + Math.max(0, Math.sin(s.clock.elapsedTime)) * 0.5; });
  return (
    <mesh ref={ref} position={[0, -1.5, 0]}>
      <coneGeometry args={[1, 3, 4]} />
      <meshStandardMaterial color="#ffaa00" wireframe />
    </mesh>
  );
}

// 21. El Golpe Sónico (Mantis Shrimp)
export function MantisShrimpScene() {
  const ref = useRef<THREE.Mesh>(null);
  const flashRef = useRef<THREE.PointLight>(null);
  useFrame((s) => { 
    const strike = Math.pow(Math.sin(s.clock.elapsedTime * 4), 10);
    if (ref.current) ref.current.position.x = strike * 1.5;
    if (flashRef.current) flashRef.current.intensity = strike * 5;
  });
  return (
    <group>
      <mesh ref={ref} position={[0, 0, 0]}><sphereGeometry args={[0.3]} /><meshStandardMaterial color="#ff0088" /></mesh>
      <pointLight ref={flashRef} color="#ffffff" intensity={0} distance={5} />
      <mesh position={[2, 0, 0]}><sphereGeometry args={[0.5]} /><MeshDistortMaterial color="#00ffff" transparent opacity={0.5} distort={1} speed={10} /></mesh>
    </group>
  );
}
