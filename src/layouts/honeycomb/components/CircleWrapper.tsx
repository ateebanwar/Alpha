import { useRef, useLayoutEffect, useEffect, memo } from "react";
import gsap from "gsap";
import { CircleData } from "@/data/circleData";
import InteractiveCircle from "@/layouts/shared/InteractiveCircle";
import { useOscillation } from "@/hooks/use-oscillation";

interface CircleWrapperProps {
    circle: CircleData;
    index: number;
    x: number;
    y: number;
    circleSize: number;
    navCircleIds: string[];
    expandedId: string | null;
    onExpand: () => void;
    oscillationParams: {
        amplitude: number;
        frequency: number;
        phase: number;
        angle: number;
    };
    variant?: "default" | "olympic";
    borderColor?: string;
    animationKey?: number;
}

const CircleWrapper = ({
    circle,
    index,
    x: targetX,
    y: targetY,
    circleSize,
    navCircleIds,
    expandedId,
    onExpand,
    oscillationParams,
    variant,
    borderColor,
    animationKey = 0,
}: CircleWrapperProps) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    // Apply oscillation to inner ref (currently disabled for performance)
    useOscillation(innerRef, oscillationParams, false);

    // Entrance animation
    useEffect(() => {
        if (!outerRef.current) return;

        const ctx = gsap.context(() => {
            const zIndex = navCircleIds.includes(circle.id) ? 20 : 10;

            if (variant === "default") {
                // Set initial state: off-screen top, invisible
                gsap.set(outerRef.current, {
                    x: targetX,
                    y: -window.innerHeight, // Start from above the screen
                    rotation: 0,
                    scale: 1,
                    opacity: 0,
                    filter: "blur(0px)",
                    width: circleSize,
                    height: circleSize,
                    zIndex
                });

                // Animate entrance
                gsap.to(outerRef.current, {
                    y: targetY,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.1, // Stagger by index
                    ease: "power2.out"
                });
            } else {
                // For non-default variants (e.g., olympic), set to final position immediately
                gsap.set(outerRef.current, {
                    x: targetX,
                    y: targetY,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    width: circleSize,
                    height: circleSize,
                    zIndex
                });
            }
        });

        return () => ctx.revert();
    }, [animationKey, targetX, targetY, circleSize, index, circle.id, navCircleIds, variant]);

    // Optimized GSAP animations with consolidated operations
    useLayoutEffect(() => {
        if (!outerRef.current || !innerRef.current) return;

        const ctx = gsap.context(() => {
            const zIndex = navCircleIds.includes(circle.id) ? 20 : 10;

            // State updates - instant transitions
            if (expandedId) {
                // All circles get same treatment when any is expanded
                gsap.to(outerRef.current, {
                    opacity: 0.5,
                    scale: 0.9,
                    z: -50,
                    y: targetY + 50,
                    x: targetX,
                    zIndex,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                // Normal state - position outer ref, let CSS handle inner oscillation
                gsap.to(outerRef.current, {
                    x: targetX,
                    y: targetY,
                    width: circleSize,
                    height: circleSize,
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    rotation: 0,
                    filter: "blur(0px)",
                    zIndex,
                    duration: 0.3,
                    ease: "power2.out",
                    // Don't override inner element's CSS animations
                    onComplete: () => {
                        if (innerRef.current && variant === 'default') {
                            // Ensure CSS animation can run by clearing any GSAP transforms on inner
                            gsap.set(innerRef.current, { clearProps: "transform" });
                        }
                    }
                });
            }
        });

        return () => ctx.revert();
    }, [targetX, targetY, circleSize, expandedId, circle.id, navCircleIds, variant]);

    return (
        <div
            ref={outerRef}
            className="opacity-0 absolute top-0 left-0 will-change-transform"
            style={{
                width: circleSize,
                height: circleSize,
            }}
        >
            <div
                ref={innerRef}
                className={`w-full h-full ${variant === 'default' && !expandedId
                    ? `circle-oscillate circle-oscillate-${(index % 8) + 1}`
                    : ''
                    }${expandedId ? ' circle-oscillate-disabled' : ''}`}
            >
                <InteractiveCircle
                    circle={circle}
                    isExpanded={expandedId === circle.id}
                    onExpand={onExpand}
                    size={circleSize}
                    variant={variant}
                    borderColor={borderColor}
                />
            </div>
        </div>
    );
};

// Memoize to prevent re-renders when props haven't changed
export default memo(CircleWrapper, (prevProps, nextProps) => {
    return (
        prevProps.circle.id === nextProps.circle.id &&
        prevProps.x === nextProps.x &&
        prevProps.y === nextProps.y &&
        prevProps.circleSize === nextProps.circleSize &&
        prevProps.expandedId === nextProps.expandedId &&
        prevProps.variant === nextProps.variant &&
        prevProps.borderColor === nextProps.borderColor &&
        prevProps.animationKey === nextProps.animationKey
    );
});
