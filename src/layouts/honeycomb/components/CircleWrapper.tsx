import { useRef, useLayoutEffect } from "react";
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
}: CircleWrapperProps) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const hasEntered = useRef(false);
    const prevVariantRef = useRef(variant);

    // Apply oscillation to inner ref
    useOscillation(innerRef, oscillationParams, !expandedId); // Disable oscillation when expanded? Maybe not strictly needed but good for focus.

    // Handle Position & State Changes
    useLayoutEffect(() => {
        if (!outerRef.current) return;

        const ctx = gsap.context(() => {
            // Entrance Animation
            if (!hasEntered.current) {
                hasEntered.current = true; // Mark as entered so it doesn't repeat

                // Calculate Uniform Speed
                // Start just off-screen (above viewport) relative to container top?
                // If container is at top, -circleSize is just above.
                // Distance = targetY - (-circleSize).

                const startY = -circleSize - 50; // Just above view
                const distance = targetY - startY;
                const speed = 1500; // px per second
                const animDuration = Math.max(0.5, distance / speed);

                // Initial State
                gsap.set(outerRef.current, {
                    x: targetX,
                    y: startY,
                    rotation: 0,
                    scale: 1,
                    opacity: 0,
                    filter: "blur(0px)",
                    width: circleSize,
                    height: circleSize
                });

                // Animate In
                gsap.to(outerRef.current, {
                    x: targetX,
                    y: targetY,
                    opacity: 1,
                    duration: animDuration,
                    delay: index * 0.08, // 80-120ms stagger (using 80ms)
                    ease: "power2.inOut",
                    overwrite: "auto"
                });

                // Set z-index immediately
                gsap.set(outerRef.current, {
                    zIndex: navCircleIds.includes(circle.id) ? 20 : 10
                });

            } else {
                // Standard Transition (Layout changes, Resize, Expand)

                // Active/Expanded State
                if (expandedId) {
                    if (expandedId === circle.id) {
                        // Expanded circle logic
                        gsap.to(outerRef.current, {
                            opacity: 0.5,
                            scale: 0.9,
                            z: -50,
                            y: targetY + 50,
                            x: targetX, // Ensure X is updated
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    } else {
                        // Sibling circles logic
                        gsap.to(outerRef.current, {
                            opacity: 0.5,
                            scale: 0.9,
                            z: -50,
                            y: targetY + 50,
                            x: targetX,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                } else {
                    // Normal State (Layout Update)

                    // Track if variant (layout mode) changed to force instant switch
                    const isLayoutSwitch = variant !== prevVariantRef.current;

                    // If switching layouts, we want INSTANT snap (no animation glich)
                    // If just resizing or data update, we want smooth
                    const transitionDuration = isLayoutSwitch ? 0 : 0.6;

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
                        duration: transitionDuration,
                        ease: isLayoutSwitch ? "none" : "power3.out",
                        overwrite: "auto"
                    });

                    // Update refs after render effect
                    prevVariantRef.current = variant;
                }

                // Z-Index Update
                gsap.set(outerRef.current, {
                    zIndex: navCircleIds.includes(circle.id) ? 20 : 10
                });
            }
        });

        return () => ctx.revert();
    }, [targetX, targetY, circleSize, expandedId, circle.id, navCircleIds, index]);

    return (
        <div
            ref={outerRef}
            className="opacity-0 absolute top-0 left-0 will-change-transform"
            style={{
                // Styles that don't animate or are set by GSAP
                // width/height set by GSAP
                width: circleSize,
                height: circleSize,
            }}
        >
            <div ref={innerRef} className="w-full h-full">
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

export default CircleWrapper;
