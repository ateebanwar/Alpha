import { useEffect, RefObject } from "react";
import gsap from "gsap";

interface OscillationParams {
  amplitude: number;
  frequency: number;
  phase: number;
  angle: number;
}

export const useOscillation = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  params: OscillationParams,
  isActive: boolean = true
) => {
  useEffect(() => {
    // Disabled for instant rendering - no oscillation animations
  }, [params.amplitude, params.frequency, params.phase, params.angle, isActive, ref]);
};