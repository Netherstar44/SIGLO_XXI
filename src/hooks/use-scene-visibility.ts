import { useState, useEffect, useRef, type RefObject } from "react";

/**
 * Hook that uses IntersectionObserver to track whether a scene container
 * is visible in the viewport. Used to conditionally mount/unmount 3D Canvas
 * elements, drastically reducing the number of active WebGL contexts.
 *
 * @param rootMargin - Margin around viewport to start loading early (default: "200px")
 * @returns [ref, isVisible] - Ref to attach to the container, and visibility state
 */
export function useSceneVisibility(
  rootMargin = "200px"
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return [ref, isVisible];
}
