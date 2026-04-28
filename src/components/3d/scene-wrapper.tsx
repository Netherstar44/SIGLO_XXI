import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise, Glitch, Bloom } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { Vector2 } from "three";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSceneVisibility } from "@/hooks/use-scene-visibility";
import { Suspense, memo, useMemo } from "react";

interface SceneWrapperProps {
  children: React.ReactNode;
  className?: string;
  withGlitch?: boolean;
}

/**
 * Optimized SceneWrapper that:
 * 1. Only mounts the Canvas when the section is near the viewport (±300px margin)
 * 2. Completely unmounts when scrolled away, freeing the WebGL context
 * 3. Uses lower DPR and reduced post-processing settings
 * 4. Disables all post-processing on mobile
 * 5. Uses frameloop="demand" to only render when useFrame calls invalidate()
 * 6. Single EffectComposer branch with conditional Glitch effect
 */
export const SceneWrapper = memo(function SceneWrapper({ 
  children, 
  className, 
  withGlitch = false 
}: SceneWrapperProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [containerRef, isVisible] = useSceneVisibility("300px");
  const dpr: number = isMobile ? 1 : Math.min(1.25, window.devicePixelRatio);

  // Pre-create Vector2 instances for Glitch props — stable across renders
  const glitchDelay = useMemo(() => new Vector2(1.5, 3.5), []);
  const glitchDuration = useMemo(() => new Vector2(0.1, 0.3), []);
  const glitchStrength = useMemo(() => new Vector2(0.01, 0.05), []);

  // Memoize GL config to prevent Canvas re-init
  const glConfig = useMemo(() => ({
    antialias: false,
    powerPreference: "high-performance" as const,
    alpha: true,
    stencil: false,
    depth: true,
    failIfMajorPerformanceCaveat: true,
  }), []);

  return (
    <div ref={containerRef} className={className}>
      {isVisible && (
        <Canvas
          frameloop="always"
          dpr={dpr}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={glConfig}
          flat
        >
          <Suspense fallback={null}>
            {children}
            
            {!isMobile && withGlitch && (
              // @ts-expect-error - EffectComposer types incompatible with React 19
              <EffectComposer disableNormalPass multisampling={0}>
                <Noise opacity={0.02} />
                <Bloom luminanceThreshold={0.4} mipmapBlur intensity={0.8} levels={2} />
                <Glitch
                  delay={glitchDelay}
                  duration={glitchDuration}
                  strength={glitchStrength}
                  mode={GlitchMode.SPORADIC}
                  active
                  ratio={0.1}
                />
              </EffectComposer>
            )}
            {!isMobile && !withGlitch && (
              // @ts-expect-error - EffectComposer types incompatible with React 19
              <EffectComposer disableNormalPass multisampling={0}>
                <Noise opacity={0.02} />
                <Bloom luminanceThreshold={0.4} mipmapBlur intensity={0.8} levels={2} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
});
