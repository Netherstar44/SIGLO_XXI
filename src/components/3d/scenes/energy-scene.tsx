import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Energy Scene — Realistic battery cell with charging pulse animation.
 * Represents a cylindrical LFP battery (like CATL Shenxing) with
 * electron flow particles and a pulsing charge level indicator.
 */
export function EnergyScene() {
  const group = useRef<THREE.Group>(null);
  const chargeLevelRef = useRef<THREE.Mesh>(null);
  const electronPointsRef = useRef<THREE.Points>(null);

  // Battery body geometry
  const bodyGeo = useMemo(() => new THREE.CylinderGeometry(1, 1, 3.5, 32, 1, true), []);
  const topCapGeo = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.1, 32), []);
  const terminalGeo = useMemo(() => new THREE.CylinderGeometry(0.25, 0.25, 0.4, 16), []);
  const chargeFillGeo = useMemo(() => new THREE.CylinderGeometry(0.9, 0.9, 3.2, 24), []);

  // Materials
  const bodyMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#1a1a2e",
    wireframe: false,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
  }), []);
  const bodyWireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#00d9ff",
    wireframe: true,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  }), []);
  const capMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#333",
    transparent: true,
    opacity: 0.6,
  }), []);
  const terminalMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff2d2d",
  }), []);
  const chargeMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#00ff88",
    transparent: true,
    opacity: 0.3,
  }), []);

  // Electron particles orbiting the battery
  const electronCount = 80;
  const electronData = useMemo(() => {
    const pos = new Float32Array(electronCount * 3);
    const angles = new Float32Array(electronCount);
    const speeds = new Float32Array(electronCount);
    const heights = new Float32Array(electronCount);
    const radii = new Float32Array(electronCount);
    for (let i = 0; i < electronCount; i++) {
      angles[i] = Math.random() * Math.PI * 2;
      speeds[i] = 1.5 + Math.random() * 2;
      heights[i] = (Math.random() - 0.5) * 4;
      radii[i] = 1.3 + Math.random() * 0.8;
    }
    return { pos, angles, speeds, heights, radii };
  }, []);

  const electronMat = useMemo(() => new THREE.PointsMaterial({
    color: "#00d9ff",
    size: 0.06,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  }), []);

  // Lightning bolt line around battery
  const lightningLine = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // Create a zigzag lightning shape on the battery surface
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = (t - 0.5) * 2.5;
      const angle = t * Math.PI * 1.5;
      const r = 1.02;
      const offset = (i % 2 === 0 ? 0.15 : -0.15);
      points.push(new THREE.Vector3(
        Math.cos(angle) * r + offset,
        y,
        Math.sin(angle) * r
      ));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: "#ffdd00", transparent: true, opacity: 0.8 });
    return new THREE.Line(geo, mat);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.position.y = Math.sin(t * 0.8) * 0.15;
    }

    // Animate charge level fill (oscillates to simulate fast charging)
    if (chargeLevelRef.current) {
      const chargeLevel = 0.3 + (Math.sin(t * 0.8) * 0.5 + 0.5) * 0.65;
      chargeLevelRef.current.scale.y = chargeLevel;
      chargeLevelRef.current.position.y = -1.6 + (chargeLevel * 3.2) / 2;
    }

    // Animate electron particles
    if (electronPointsRef.current) {
      const positions = electronPointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < electronCount; i++) {
        const angle = electronData.angles[i] + t * electronData.speeds[i];
        const r = electronData.radii[i];
        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = electronData.heights[i] + Math.sin(t * 3 + i) * 0.2;
        positions[i * 3 + 2] = Math.sin(angle) * r;
      }
      electronPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Pulse the lightning
    if (lightningLine.material instanceof THREE.LineBasicMaterial) {
      lightningLine.material.opacity = 0.4 + Math.sin(t * 6) * 0.4;
    }
  });

  return (
    <group ref={group}>
      {/* Battery body - solid + wireframe overlay */}
      <mesh geometry={bodyGeo} material={bodyMat} rotation={[0, 0, 0]} />
      <mesh geometry={bodyGeo} material={bodyWireMat} rotation={[0, 0, 0]} />

      {/* Caps */}
      <mesh geometry={topCapGeo} material={capMat} position={[0, 1.8, 0]} />
      <mesh geometry={topCapGeo} material={capMat} position={[0, -1.8, 0]} />

      {/* Terminal + */}
      <mesh geometry={terminalGeo} material={terminalMat} position={[0, 2.05, 0]} />

      {/* Charge level fill */}
      <mesh ref={chargeLevelRef} geometry={chargeFillGeo} material={chargeMat} />

      {/* Electron particles */}
      <points ref={electronPointsRef} material={electronMat}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[electronData.pos, 3]}
          />
        </bufferGeometry>
      </points>

      {/* Lightning bolt */}
      <primitive object={lightningLine} />
    </group>
  );
}
