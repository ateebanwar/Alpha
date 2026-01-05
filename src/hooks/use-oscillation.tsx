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
    if (!ref.current || !isActive) return;

    const tick = (time: number, deltaTime: number, frame: number) => {
      // GSAP ticker sends time in SECONDS usually? No, seconds.
      // But we need consistent time. gsap.ticker.time is seconds.
      // The original hook received `time` from requestAnimationFrame which is ms.
      // Let's use gsap.ticker.time * 1000 to match ms if we want exact parity, 
      // or just adjust frequency. Original frequency was ~0.002.
      // sin(ms * 0.002) -> period ~ 3000ms.

      const t = gsap.ticker.time * 1000;
      const oscillation = Math.sin(t * params.frequency + params.phase) * params.amplitude;

      // Use quickSetter if performance is critical, but standard set is fine for 20 elements.
      // Or better: direct transform manipulation for raw speed?
      // gsap.set is optimized.
      gsap.set(ref.current, {
        x: oscillation * Math.cos(params.angle),
        y: oscillation * Math.sin(params.angle),
        overwrite: "auto" // Prevent conflicts handling? No, this is the only thing animating x/y of inner
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [params.amplitude, params.frequency, params.phase, params.angle, isActive, ref]);
};