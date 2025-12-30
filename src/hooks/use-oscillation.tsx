"use client";

import { useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface OscillationParams {
  amplitude: number;
  frequency: number;
  phase: number;
  angle: number;
}

export const useOscillation = (params: OscillationParams) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      const oscillation = Math.sin(time * params.frequency + params.phase) * params.amplitude;
      x.set(oscillation * Math.cos(params.angle));
      y.set(oscillation * Math.sin(params.angle));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [params.amplitude, params.frequency, params.phase, params.angle, x, y]);

  return { x, y };
};