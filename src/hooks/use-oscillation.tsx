import { RefObject } from "react";

interface OscillationParams {
  amplitude: number;
  frequency: number;
  phase: number;
  angle: number;
}

/**
 * Oscillation hook - Currently disabled for performance optimization
 * This hook is kept for future use if oscillation animations are re-enabled
 * 
 * @param ref - Reference to the element to animate
 * @param params - Oscillation parameters
 * @param isActive - Whether oscillation should be active
 */
export const useOscillation = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  params: OscillationParams,
  isActive: boolean = true
) => {
  // No-op: Oscillation disabled for instant rendering and performance
  // This eliminates unnecessary effect overhead
};