'use client';

import { useEffect, useRef } from 'react';
import { usePointerSignalStore } from '@/stores/usePointerSignalStore';

export function PointerSignalProvider() {
  const setPointer = usePointerSignalStore((state) => state.setPointer);
  const setActive = usePointerSignalStore((state) => state.setActive);
  
  // Use a ref to throttle updates to rAF
  const frameRef = useRef<number | null>(null);
  const pendingUpdate = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Update CSS variables immediately for CSS-based effects (fastest path)
      document.documentElement.style.setProperty('--mouse-x', `${(x * 100).toFixed(2)}%`);
      document.documentElement.style.setProperty('--mouse-y', `${(y * 100).toFixed(2)}%`);

      // Queue store update
      pendingUpdate.current = { x, y };

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          if (pendingUpdate.current) {
            setPointer(pendingUpdate.current.x, pendingUpdate.current.y);
            pendingUpdate.current = null;
          }
          frameRef.current = null;
        });
      }
    };

    const handlePointerDown = () => setActive(true);
    const handlePointerUp = () => setActive(false);
    
    // Use pointer events which cover mouse and touch
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [setPointer, setActive]);

  return null; // Headless provider
}
