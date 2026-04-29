import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BookModel } from "./BookModel";
import { libraryBooks } from "@/data/library-books";
import { Environment, Float, PresentationControls, Text } from "@react-three/drei";

export function BookshelfScene({ 
  selectedBookId, 
  onSelectBook,
  mobilePan = 0,
  isMobile
}: { 
  selectedBookId: string | null;
  onSelectBook: (id: string | null) => void;
  mobilePan?: number;
  isMobile?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Split books into two shelves
  const shelf1Books = libraryBooks.slice(0, 27);
  const shelf2Books = libraryBooks.slice(27);

  // Helper to calculate startX to center a given array of books
  const getStartX = (books: any[]) => {
    const totalWidth = (books.length - 1) * 0.35;
    return -totalWidth / 2;
  };

  const startX1 = getStartX(shelf1Books);
  const startX2 = getStartX(shelf2Books);

  // We want the camera to focus on the selected book
  const selectedIndex1 = shelf1Books.findIndex((b) => b.id === selectedBookId);
  const selectedIndex2 = shelf2Books.findIndex((b) => b.id === selectedBookId);
  
  const targetX = selectedIndex1 !== -1 
    ? -(startX1 + selectedIndex1 * 0.35) 
    : selectedIndex2 !== -1 
      ? -(startX2 + selectedIndex2 * 0.35) 
      : 0;
      
  const targetY = selectedIndex1 !== -1 ? -1 : selectedIndex2 !== -1 ? 1 : 0;

  useFrame((state) => {
    // Smooth camera movement (Parallax + centering on selected book)
    
    // Base camera position
    const baseZ = selectedBookId ? 3.5 : 9;
    
    // Combine mouse parallax (desktop) with slider panning (mobile)
    const panForce = selectedBookId ? 0 : (mobilePan * 4.5) + (state.pointer.x * 2.5);
    
    const x = THREE.MathUtils.lerp(state.camera.position.x, targetX + panForce, 0.05);
    const y = THREE.MathUtils.lerp(state.camera.position.y, targetY + (state.pointer.y * 1.5), 0.05);
    const z = THREE.MathUtils.lerp(state.camera.position.z, baseZ, 0.05);
    
    state.camera.position.set(x, y, z);
    
    if (groupRef.current && !selectedBookId) {
      const targetX = (state.pointer.x * 0.3);
      const targetY = (state.pointer.y * 0.15);
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    } else if (groupRef.current && selectedBookId) {
      // Return shelf to center when a book is selected
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.05);
    }
  });

  // Dust particles positions
  const dustParticles = useMemo(() => {
    const positions = new Float32Array(300);
    for (let i = 0; i < 300; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  return (
    <>
      <color attach="background" args={["#080a0c"]} />
      <fog attach="fog" args={["#080a0c", 4, 12]} />
      
      {/* Warm library lighting mixed with cool tech accents */}
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[0, 8, 5]} 
        intensity={2.5} 
        penumbra={0.8} 
        angle={1.2} 
        castShadow={!isMobile} 
        shadow-mapSize={[isMobile ? 512 : 1024, isMobile ? 512 : 1024]}
        shadow-bias={-0.0001}
        color="#ffebd6" 
      />
      <pointLight position={[-4, 2, 3]} intensity={1.5} color="#ffaa55" distance={15} />
      <pointLight position={[4, -2, 3]} intensity={1.2} color="#ffaa55" distance={10} />
      
      {/* Subtle futuristic cyan backlighting */}
      <pointLight position={[4, 2, -2]} intensity={2.5} color="#00ffff" distance={10} />
      <pointLight position={[-4, -2, -2]} intensity={2} color="#00ffff" distance={10} />
      
      <Environment preset="apartment" />

      <PresentationControls 
        enabled={!selectedBookId}
        global 
        rotation={[0, 0, 0]} 
        polar={[-0.05, 0.05]} 
        azimuth={[-0.1, 0.1]}
      >
        <group ref={groupRef} position={[0, 0, 0]}>
          {/* Top Wooden Shelf Base */}
          <mesh receiveShadow castShadow position={[0, 0.6, 0]}>
            <boxGeometry args={[10, 0.2, 1.8]} />
            <meshStandardMaterial color="#2d1c11" roughness={0.7} metalness={0.1} />
          </mesh>
          {/* Top Shelf Title */}
          <Text 
            position={[0, 0.6, 0.91]} 
            fontSize={0.08} 
            color="#00ffff" 
            anchorX="center" 
            anchorY="middle"
            letterSpacing={0.2}
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            SIGLO XXI
          </Text>

          {/* Bottom Wooden Shelf Base */}
          <mesh receiveShadow castShadow position={[0, -1.4, 0]}>
            <boxGeometry args={[10, 0.2, 1.8]} />
            <meshStandardMaterial color="#2d1c11" roughness={0.7} metalness={0.1} />
          </mesh>
          {/* Bottom Shelf Title */}
          <Text 
            position={[0, -1.4, 0.91]} 
            fontSize={0.08} 
            color="#00ffff" 
            anchorX="center" 
            anchorY="middle"
            letterSpacing={0.2}
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            DATOS CURIOSOS
          </Text>

          {/* Wooden Shelf Back Panel */}
          <mesh receiveShadow position={[0, -0.4, -0.8]}>
            <boxGeometry args={[10, 4.4, 0.2]} />
            <meshStandardMaterial color="#1f130c" roughness={0.9} metalness={0.1} />
          </mesh>

          {/* Left Side Panel */}
          <mesh receiveShadow castShadow position={[-4.9, -0.4, 0]}>
            <boxGeometry args={[0.2, 4.4, 1.8]} />
            <meshStandardMaterial color="#2d1c11" roughness={0.7} metalness={0.1} />
          </mesh>

          {/* Right Side Panel */}
          <mesh receiveShadow castShadow position={[4.9, -0.4, 0]}>
            <boxGeometry args={[0.2, 4.4, 1.8]} />
            <meshStandardMaterial color="#2d1c11" roughness={0.7} metalness={0.1} />
          </mesh>

          {/* Shelf 1 Books */}
          {shelf1Books.map((book, i) => {
            const isSelected = selectedBookId === book.id;
            return (
              <BookModel
                key={book.id}
                book={book}
                index={i}
                position={[startX1 + i * 0.35, 1.45, 0]}
                isSelected={isSelected}
                onClick={() => onSelectBook(isSelected ? null : book.id)}
                isMobile={isMobile}
              />
            );
          })}

          {/* Shelf 2 Books */}
          {shelf2Books.map((book, i) => {
            const isSelected = selectedBookId === book.id;
            return (
              <BookModel
                key={book.id}
                book={book}
                index={i + 27}
                position={[startX2 + i * 0.35, -0.55, 0]}
                isSelected={isSelected}
                onClick={() => onSelectBook(isSelected ? null : book.id)}
                isMobile={isMobile}
              />
            );
          })}
          
          {/* Data fragments / Holographic Dust particles */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
             <points>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    args={[dustParticles, 3]}
                  />
                </bufferGeometry>
                <pointsMaterial 
                  size={0.04} 
                  color="#00ffff" 
                  transparent 
                  opacity={0.4} 
                  sizeAttenuation 
                  blending={THREE.AdditiveBlending}
                />
             </points>
          </Float>
        </group>
      </PresentationControls>
    </>
  );
}
