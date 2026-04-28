import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";

/**
 * Agriculture Scene — Realistic vertical farm tower with growing plants,
 * LED grow lights, and water droplet particles. Represents the stacked
 * indoor farming concept from the article.
 */
export function AgricultureScene() {
  const groupRef = useRef<THREE.Group>(null);
  const dropletsRef = useRef<THREE.Points>(null);

  const shelves = 8;
  const plantsPerShelf = 12;
  const totalPlants = shelves * plantsPerShelf;

  // Pre-compute plant positions (on shelves)
  const plantData = useMemo(() => {
    const data: Array<{ pos: [number, number, number]; scaleY: number; color: string }> = [];
    const greens = ["#00ff88", "#22cc66", "#44ee77", "#11dd55", "#33ff99"];
    for (let i = 0; i < shelves; i++) {
      const shelfY = i * 0.7 - 2.5;
      for (let j = 0; j < plantsPerShelf; j++) {
        data.push({
          pos: [
            (Math.random() - 0.5) * 3,
            shelfY + 0.2 + Math.random() * 0.15,
            (Math.random() - 0.5) * 1.2,
          ],
          scaleY: 0.5 + Math.random() * 1.0,
          color: greens[Math.floor(Math.random() * greens.length)],
        });
      }
    }
    return data;
  }, []);

  // Shelf positions
  const shelfPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < shelves; i++) {
      positions.push([0, i * 0.7 - 2.5, 0]);
    }
    return positions;
  }, []);

  // Water droplet particles (dripping down the system)
  const dropletCount = 60;
  const dropletSpeeds = useMemo(() => {
    const speeds = new Float32Array(dropletCount);
    for (let i = 0; i < dropletCount; i++) {
      speeds[i] = 0.5 + Math.random() * 1.5;
    }
    return speeds;
  }, []);
  const dropletInitial = useMemo(() => {
    const pos = new Float32Array(dropletCount * 3);
    for (let i = 0; i < dropletCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 1] = Math.random() * 6 - 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  const dropletMat = useMemo(() => new THREE.PointsMaterial({
    color: "#66ccff",
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  }), []);

  // Vertical structural columns
  const columnPositions = useMemo((): [number, number, number][] => [
    [-1.7, 0, -0.7],
    [1.7, 0, -0.7],
    [-1.7, 0, 0.7],
    [1.7, 0, 0.7],
  ], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.3 + Math.PI / 5;
    }

    // Animate water droplets falling
    if (dropletsRef.current) {
      const positions = dropletsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < dropletCount; i++) {
        positions[i * 3 + 1] -= dropletSpeeds[i] * 0.02;
        if (positions[i * 3 + 1] < -3) {
          positions[i * 3 + 1] = 3.5;
        }
      }
      dropletsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Structural columns */}
      {columnPositions.map((pos, i) => (
        <mesh key={`col-${i}`} position={pos}>
          <boxGeometry args={[0.06, 6, 0.06]} />
          <meshBasicMaterial color="#444" />
        </mesh>
      ))}

      {/* Shelf bases — horizontal platforms */}
      <Instances limit={shelves} range={shelves}>
        <boxGeometry args={[3.8, 0.04, 1.6]} />
        <meshBasicMaterial color="#333" transparent opacity={0.7} />
        {shelfPositions.map((pos, i) => (
          <Instance key={`shelf-${i}`} position={pos} />
        ))}
      </Instances>

      {/* Plants — instanced green boxes simulating leafy crops */}
      <Instances limit={totalPlants} range={totalPlants}>
        <boxGeometry args={[0.12, 0.25, 0.12]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.85} />
        {plantData.map((p, i) => (
          <Instance
            key={`plant-${i}`}
            position={p.pos}
            scale={[1, p.scaleY, 1]}
          />
        ))}
      </Instances>

      {/* LED grow lights — purple/pink strips above every other shelf */}
      {shelfPositions
        .filter((_, i) => i % 2 === 0)
        .map((pos, i) => (
          <group key={`led-${i}`}>
            <mesh position={[0, pos[1] + 0.65, 0]}>
              <boxGeometry args={[3.2, 0.03, 0.03]} />
              <meshBasicMaterial color="#ff00ff" transparent opacity={0.9} />
            </mesh>
            <pointLight
              position={[0, pos[1] + 0.55, 0]}
              color="#cc44ff"
              intensity={0.6}
              distance={1.2}
            />
          </group>
        ))}

      {/* Water droplets */}
      <points ref={dropletsRef} material={dropletMat}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dropletInitial, 3]}
          />
        </bufferGeometry>
      </points>
    </group>
  );
}
