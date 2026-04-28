import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cover Scene — Futuristic engineering portal.
 * A rotating geodesic sphere with orbiting particles and pulsing
 * energy rings — representing the intersection of all engineering fields.
 */
export function CoverScene() {
  const particlesRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // Particle field
  const count = 1500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      [0, 1, 0.53],   // green
      [0, 0.85, 1],   // cyan
      [1, 0.18, 0.18], // red
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return col;
  }, []);

  // Core icosahedron
  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(2, 1), []);
  const icoMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#00d9ff",
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  }), []);

  // Energy rings
  const ringGeo = useMemo(() => new THREE.TorusGeometry(2.8, 0.02, 8, 80), []);
  const ring1Mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#00ff88",
    transparent: true,
    opacity: 0.4,
  }), []);
  const ring2Mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff2d2d",
    transparent: true,
    opacity: 0.3,
  }), []);
  const ring3Mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#00d9ff",
    transparent: true,
    opacity: 0.3,
  }), []);

  const pointsMat = useMemo(() => new THREE.PointsMaterial({
    size: 0.03,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    vertexColors: true,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.03;
      particlesRef.current.rotation.x = t * 0.01;
    }
    if (geoRef.current) {
      geoRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      geoRef.current.rotation.y = t * 0.15;
      geoRef.current.position.y = Math.sin(t * 1.5) * 0.2;
    }

    // Rotate rings on different axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.z = t * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.7;
      ring3Ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <>
      {/* Particle field */}
      <points ref={particlesRef} material={pointsMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
      </points>

      {/* Core geodesic sphere */}
      <mesh ref={geoRef} geometry={icoGeo} material={icoMat} />

      {/* Orbiting energy rings */}
      <mesh ref={ring1Ref} geometry={ringGeo} material={ring1Mat} />
      <mesh ref={ring2Ref} geometry={ringGeo} material={ring2Mat} rotation={[Math.PI / 3, 0, 0]} />
      <mesh ref={ring3Ref} geometry={ringGeo} material={ring3Mat} rotation={[0, 0, Math.PI / 3]} />
    </>
  );
}
