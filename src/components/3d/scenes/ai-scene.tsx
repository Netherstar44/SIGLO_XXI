import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AI Scene — Neural network brain visualization.
 * Represents artificial intelligence with interconnected neuron nodes
 * in a brain-like structure, with firing synaptic signals.
 */
export function AIScene() {
  const groupRef = useRef<THREE.Group>(null);
  const synapsesRef = useRef<THREE.Points>(null);
  const frameCounter = useRef(0);

  // Generate neuron positions in a brain-like spherical distribution
  const neuronCount = 50;
  const { neuronPositions, neuronColors, connectionPositions, synapseData } = useMemo(() => {
    const neurons: THREE.Vector3[] = [];
    const nPos = new Float32Array(neuronCount * 3);
    const nCol = new Float32Array(neuronCount * 3);

    // Place neurons in a brain-like ellipsoid
    for (let i = 0; i < neuronCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 0.5;
      const x = r * Math.sin(phi) * Math.cos(theta) * 1.3; // wider horizontally
      const y = r * Math.cos(phi) * 0.9;
      const z = r * Math.sin(phi) * Math.sin(theta);
      neurons.push(new THREE.Vector3(x, y, z));
      nPos[i * 3] = x;
      nPos[i * 3 + 1] = y;
      nPos[i * 3 + 2] = z;
      // Gradient coloring: blue core, red outer
      const t = r / 2.3;
      nCol[i * 3] = t * 1;       // R
      nCol[i * 3 + 1] = 0.2;     // G
      nCol[i * 3 + 2] = 1 - t;   // B
    }

    // Connections (synapses) between nearby neurons
    const conns: number[] = [];
    for (let i = 0; i < neuronCount; i++) {
      for (let j = i + 1; j < neuronCount; j++) {
        if (neurons[i].distanceTo(neurons[j]) < 1.8) {
          conns.push(
            neurons[i].x, neurons[i].y, neurons[i].z,
            neurons[j].x, neurons[j].y, neurons[j].z
          );
        }
      }
    }

    // Synaptic signal particles
    const sCount = 60;
    const sPos = new Float32Array(sCount * 3);
    const sVel = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      const idx = Math.floor(Math.random() * neurons.length);
      sPos[i * 3] = neurons[idx].x;
      sPos[i * 3 + 1] = neurons[idx].y;
      sPos[i * 3 + 2] = neurons[idx].z;
      sVel[i * 3] = (Math.random() - 0.5) * 0.04;
      sVel[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      sVel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }

    return {
      neuronPositions: nPos,
      neuronColors: nCol,
      connectionPositions: new Float32Array(conns),
      synapseData: { pos: sPos, vel: sVel, count: sCount },
    };
  }, []);

  // Materials
  const neuronMat = useMemo(() => new THREE.PointsMaterial({
    size: 0.12,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  }), []);

  const connMat = useMemo(() => new THREE.LineBasicMaterial({
    color: "#00d9ff",
    transparent: true,
    opacity: 0.08,
  }), []);

  const synapseMat = useMemo(() => new THREE.PointsMaterial({
    color: "#ffdd00",
    size: 0.06,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;

      // Glitch effect
      frameCounter.current++;
      if (frameCounter.current % 25 < 2) {
        const glitch = 1 + Math.abs(Math.sin(t * 17.3)) * 0.15;
        groupRef.current.scale.setScalar(glitch);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }

    // Animate synaptic signals
    if (synapsesRef.current) {
      const positions = synapsesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < synapseData.count; i++) {
        positions[i * 3] += synapseData.vel[i * 3];
        positions[i * 3 + 1] += synapseData.vel[i * 3 + 1];
        positions[i * 3 + 2] += synapseData.vel[i * 3 + 2];
        // Reset when too far from center
        const dist = Math.sqrt(
          positions[i * 3] ** 2 +
          positions[i * 3 + 1] ** 2 +
          positions[i * 3 + 2] ** 2
        );
        if (dist > 3.5) {
          const idx = Math.floor(Math.random() * neuronCount);
          positions[i * 3] = neuronPositions[idx * 3];
          positions[i * 3 + 1] = neuronPositions[idx * 3 + 1];
          positions[i * 3 + 2] = neuronPositions[idx * 3 + 2];
          synapseData.vel[i * 3] = (Math.random() - 0.5) * 0.04;
          synapseData.vel[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
          synapseData.vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
        }
      }
      synapsesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neuron nodes */}
      <points material={neuronMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[neuronPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[neuronColors, 3]} />
        </bufferGeometry>
      </points>

      {/* Neural connections */}
      {connectionPositions.length > 0 && (
        <lineSegments material={connMat}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connectionPositions, 3]} />
          </bufferGeometry>
        </lineSegments>
      )}

      {/* Synaptic fire signals */}
      <points ref={synapsesRef} material={synapseMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[synapseData.pos, 3]} />
        </bufferGeometry>
      </points>
    </group>
  );
}
