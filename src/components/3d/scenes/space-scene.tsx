import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Space Scene — Artemis II mission visualization.
 * Earth, Moon, and Orion capsule following a figure-8 free-return
 * trajectory, with star field and trajectory path.
 */
export function SpaceScene() {
  const groupRef = useRef<THREE.Group>(null);
  const capsuleRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Points>(null);

  // Star field
  const starCount = 500;
  const starPositions = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  const starMat = useMemo(() => new THREE.PointsMaterial({
    color: "#ffffff",
    size: 0.04,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  }), []);

  // Free-return trajectory (figure-8 around Earth and Moon)
  const trajectoryLine = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 200;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2;
      // Figure-8 shape: goes from Earth, loops around Moon, returns
      const x = Math.sin(angle) * 3.5;
      const z = Math.sin(angle * 2) * 1.8;
      const y = Math.cos(angle * 2) * 0.3;
      points.push(new THREE.Vector3(x, y, z));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineDashedMaterial({
      color: "#00ff88",
      dashSize: 0.15,
      gapSize: 0.1,
      transparent: true,
      opacity: 0.4,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    return line;
  }, []);

  // Earth geometry (blue/green)
  const earthGeo = useMemo(() => new THREE.SphereGeometry(0.8, 32, 32), []);
  const earthMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#1155cc",
    wireframe: false,
    transparent: true,
    opacity: 0.6,
  }), []);
  const earthWireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#00d9ff",
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  }), []);

  // Moon geometry (gray/white)
  const moonGeo = useMemo(() => new THREE.SphereGeometry(0.25, 20, 20), []);
  const moonMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#aaaaaa",
    transparent: true,
    opacity: 0.7,
  }), []);
  const moonWireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ffffff",
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  // Orion capsule (simplified cone shape)
  const capsuleGeo = useMemo(() => new THREE.ConeGeometry(0.08, 0.2, 8), []);
  const capsuleMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff8800",
  }), []);

  // Moon position (fixed further out on the trajectory)
  const moonPos = useMemo((): [number, number, number] => [3.5, 0.15, 0], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }

    // Move the capsule along the trajectory
    if (capsuleRef.current) {
      const angle = t * 0.3;
      const x = Math.sin(angle) * 3.5;
      const z = Math.sin(angle * 2) * 1.8;
      const y = Math.cos(angle * 2) * 0.3;
      capsuleRef.current.position.set(x, y, z);

      // Orient capsule in direction of travel
      const nextAngle = angle + 0.05;
      const nx = Math.sin(nextAngle) * 3.5;
      const nz = Math.sin(nextAngle * 2) * 1.8;
      const ny = Math.cos(nextAngle * 2) * 0.3;
      capsuleRef.current.lookAt(nx, ny, nz);
    }

    // Slow star rotation
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Star field */}
      <points ref={starsRef} material={starMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
      </points>

      {/* Earth */}
      <mesh geometry={earthGeo} material={earthMat} />
      <mesh geometry={earthGeo} material={earthWireMat} />

      {/* Moon */}
      <group position={moonPos}>
        <mesh geometry={moonGeo} material={moonMat} />
        <mesh geometry={moonGeo} material={moonWireMat} />
      </group>

      {/* Trajectory path */}
      <primitive object={trajectoryLine} />

      {/* Orion capsule */}
      <mesh ref={capsuleRef} geometry={capsuleGeo} material={capsuleMat} />
    </group>
  );
}
