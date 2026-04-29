import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Edges, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { libraryBooks } from "@/data/library-books";

export function BookModel({ 
  book, 
  position, 
  onClick, 
  isSelected,
  index,
  isMobile
}: { 
  book: typeof libraryBooks[0]; 
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
  index: number;
  isMobile?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Starting rotation varies slightly for realism
  const [initialRotationY] = useState(() => (Math.random() - 0.5) * 0.1);
  const [initialRotationZ] = useState(() => (Math.random() - 0.5) * 0.05);

  const targetPosition = new THREE.Vector3(...position);
  const targetRotation = new THREE.Euler(0, initialRotationY, initialRotationZ);

  if (isSelected) {
    // When selected, fly out towards the camera, rotate to show cover
    targetPosition.set(0, -0.2, 3); 
    targetRotation.set(0, -Math.PI / 12, 0); 
  } else if (hovered) {
    // Hover: pull out slightly
    targetPosition.z += 0.4;
  }

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.lerp(targetPosition, delta * 5);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.x, delta * 5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.y, delta * 5);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotation.z, delta * 5);
    }
  });

  return (
    <group 
      ref={groupRef}
      position={position}
      rotation={[0, initialRotationY, initialRotationZ]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Main Cover */}
      <RoundedBox args={[0.3, 1.6, 1.1]} radius={0.02} smoothness={isMobile ? 1 : 2} castShadow={!isMobile} receiveShadow={!isMobile}>
        <meshStandardMaterial 
          color={hovered || isSelected ? new THREE.Color(book.color).lerp(new THREE.Color("white"), 0.15) : book.color} 
          roughness={0.4}
          metalness={0.2}
          bumpScale={0.01}
        />
        
        {/* Holographic glowing edges on hover/selection */}
        {(hovered || isSelected) && !isMobile && (
          <Edges 
            linewidth={2} 
            threshold={15} 
            color={new THREE.Color("#00ffff").lerp(new THREE.Color(book.color), 0.5)} 
          />
        )}
      </RoundedBox>
      
      {/* Pages block (inset slightly to look like pages inside a hardcover) */}
      <RoundedBox args={[0.24, 1.54, 1.04]} radius={0.01} smoothness={isMobile ? 1 : 2} castShadow={!isMobile} position={[0.025, 0, 0.02]} receiveShadow={!isMobile}>
        <meshStandardMaterial 
          color="#f4ecd8" 
          roughness={1} 
          metalness={0} 
        />
      </RoundedBox>

      {/* Spine Text */}
      <Text
        position={[0, 0, 0.56]}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={0.11}
        color="#e8d8c0"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.4}
        outlineWidth={0.005}
        outlineColor="#000000"
      >
        {book.title.toUpperCase()}
      </Text>
      
      {/* Number on spine */}
      <Text
        position={[0, -0.6, 0.56]}
        rotation={[0, 0, 0]}
        fontSize={0.12}
        color="#e8d8c0"
        anchorX="center"
        anchorY="middle"
      >
        {index < 9 ? `0${index + 1}` : index + 1}
      </Text>
    </group>
  );
}
