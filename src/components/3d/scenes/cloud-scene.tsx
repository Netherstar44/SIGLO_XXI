import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cloud/Infrastructure Scene — Server rack network visualization.
 * Represents data centers and cloud computing with server racks,
 * data flow particles, and network connection lines.
 */
export function CloudScene() {
  const groupRef = useRef<THREE.Group>(null);
  const dataFlowRef = useRef<THREE.Points>(null);

  const nodesCount = 20;

  // Server node positions (clustered like data center racks)
  const { nodePositions, nodeColors, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const nodePos = new Float32Array(nodesCount * 3);
    const colors = new Float32Array(nodesCount * 3);

    // Create 3 clusters (data centers)
    const clusters = [
      new THREE.Vector3(-2.5, 0, 0),
      new THREE.Vector3(2, 1, -1),
      new THREE.Vector3(0, -1.5, 2),
    ];

    for (let i = 0; i < nodesCount; i++) {
      const cluster = clusters[i % 3];
      const x = cluster.x + (Math.random() - 0.5) * 2;
      const y = cluster.y + (Math.random() - 0.5) * 2;
      const z = cluster.z + (Math.random() - 0.5) * 2;
      nodes.push(new THREE.Vector3(x, y, z));
      nodePos[i * 3] = x;
      nodePos[i * 3 + 1] = y;
      nodePos[i * 3 + 2] = z;
      // Color based on cluster
      const clusterColor = i % 3 === 0 ? [0, 0.85, 1] : i % 3 === 1 ? [0, 1, 0.53] : [1, 0.18, 0.18];
      colors[i * 3] = clusterColor[0];
      colors[i * 3 + 1] = clusterColor[1];
      colors[i * 3 + 2] = clusterColor[2];
    }

    // Network connections between nearby nodes
    const linePairs: number[] = [];
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 3.5) {
          linePairs.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }

    return {
      nodePositions: nodePos,
      nodeColors: colors,
      linePositions: new Float32Array(linePairs),
    };
  }, []);

  // Data flow particles (traveling along connections)
  const flowCount = 100;
  const flowData = useMemo(() => {
    const pos = new Float32Array(flowCount * 3);
    const velocities = new Float32Array(flowCount * 3);
    for (let i = 0; i < flowCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return { pos, velocities };
  }, []);

  // Materials
  const nodeMat = useMemo(() => new THREE.PointsMaterial({
    color: "#00d9ff",
    size: 0.2,
    sizeAttenuation: true,
    vertexColors: true,
  }), []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: "#00d9ff",
    transparent: true,
    opacity: 0.12,
  }), []);

  const flowMat = useMemo(() => new THREE.PointsMaterial({
    color: "#00ff88",
    size: 0.04,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }

    // Animate data flow particles
    if (dataFlowRef.current) {
      const positions = dataFlowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < flowCount; i++) {
        positions[i * 3] += flowData.velocities[i * 3];
        positions[i * 3 + 1] += flowData.velocities[i * 3 + 1];
        positions[i * 3 + 2] += flowData.velocities[i * 3 + 2];
        // Wrap around
        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[i * 3 + j]) > 5) {
            positions[i * 3 + j] *= -0.9;
          }
        }
      }
      dataFlowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Server nodes (colored by cluster) */}
      <points material={nodeMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
      </points>

      {/* Network connections */}
      {linePositions.length > 0 && (
        <lineSegments material={lineMat}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
        </lineSegments>
      )}

      {/* Data flow particles */}
      <points ref={dataFlowRef} material={flowMat}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flowData.pos, 3]} />
        </bufferGeometry>
      </points>
    </group>
  );
}
