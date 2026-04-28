import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";

/**
 * Biotech Scene — Realistic DNA double helix with base pairs,
 * floating cell-like particles, and a pulsing CRISPR editing effect.
 * Represents genetic engineering, CRISPR-Cas9, and biotechnology.
 */
export function BiotechScene() {
  const groupRef = useRef<THREE.Group>(null);
  const cutPointRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const helixCount = 50;

  // Pre-compute helix data with proper base pair coloring
  const helixData = useMemo(() => {
    const data: Array<{
      pos1: [number, number, number];
      pos2: [number, number, number];
      linkPos: [number, number, number];
      linkRot: [number, number, number];
      isPair: boolean;
    }> = [];
    for (let i = 0; i < helixCount; i++) {
      const t = i / helixCount;
      const angle = t * Math.PI * 6;
      const y = (t - 0.5) * 8;
      const radius = 1.2;
      data.push({
        pos1: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        pos2: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
        linkPos: [0, y, 0],
        linkRot: [0, -angle, 0],
        isPair: i % 3 !== 0,
      });
    }
    return data;
  }, []);

  // Floating cell-like particles
  const cellCount = 40;
  const cellPositions = useMemo(() => {
    const pos = new Float32Array(cellCount * 3);
    for (let i = 0; i < cellCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const cellMat = useMemo(() => new THREE.PointsMaterial({
    color: "#ff6688",
    size: 0.08,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  }), []);

  // CRISPR cut indicator
  const cutGeo = useMemo(() => new THREE.RingGeometry(0.8, 1.4, 32), []);
  const cutMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ffdd00",
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
    }

    // Pulse the CRISPR cut ring
    if (cutPointRef.current) {
      cutPointRef.current.rotation.x = t * 2;
      cutPointRef.current.rotation.z = t * 1.5;
      const scale = 0.8 + Math.sin(t * 3) * 0.3;
      cutPointRef.current.scale.setScalar(scale);
      (cutPointRef.current.material as THREE.MeshBasicMaterial).opacity = 
        0.3 + Math.sin(t * 4) * 0.25;
    }

    // Drift cell particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < cellCount; i++) {
        positions[i * 3 + 1] += Math.sin(t + i * 0.5) * 0.003;
        positions[i * 3] += Math.cos(t * 0.5 + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0.1]}>
      {/* Backbone strand 1 — red spheres */}
      <Instances limit={helixCount} range={helixCount}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshBasicMaterial color="#ff2d2d" transparent opacity={0.9} />
        {helixData.map((d, i) => (
          <Instance key={`s1-${i}`} position={d.pos1} />
        ))}
      </Instances>

      {/* Backbone strand 2 — blue spheres */}
      <Instances limit={helixCount} range={helixCount}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.9} />
        {helixData.map((d, i) => (
          <Instance key={`s2-${i}`} position={d.pos2} />
        ))}
      </Instances>

      {/* Base pair links — green cylinders */}
      <Instances limit={helixCount} range={helixCount}>
        <cylinderGeometry args={[0.02, 0.02, 2.4]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.35} />
        {helixData
          .filter((d) => d.isPair)
          .map((d, i) => (
            <Instance
              key={`link-${i}`}
              position={d.linkPos}
              rotation={d.linkRot}
            />
          ))}
      </Instances>

      {/* CRISPR cut ring — pulsing at a cut point */}
      <mesh ref={cutPointRef} geometry={cutGeo} material={cutMat} position={[0, 0.5, 0]} />

      {/* Floating cell particles */}
      <points ref={particlesRef} material={cellMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cellPositions, 3]} />
        </bufferGeometry>
      </points>
    </group>
  );
}
