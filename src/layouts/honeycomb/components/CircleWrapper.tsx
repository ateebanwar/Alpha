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

    // Apply oscillation to inner ref
    useOscillation(innerRef, oscillationParams, !expandedId); // Disable oscillation when expanded? Maybe not strictly needed but good for focus.

    // Handle Position & State Changes
    useLayoutEffect(() => {
        if (!outerRef.current) return;

        const ctx = gsap.context(() => {
            // Position & Scale & Opacity
            // We want "Spring" feel. 
            // Framer: stiffness 300, damping 30.
            // GSAP: elastic.out(1, 0.75) is roughly similar bubbly feel, or back.out(1.2).
            // Let's go with power3.out for "Extremely Smooth" and fast.
            // Or "back.out(1.2)" for a bit of overshoot/life.

            // Layout Transition
            gsap.to(outerRef.current, {
                x: targetX,
                y: targetY,
                width: circleSize,
                height: circleSize,
                duration: 0.6,
                ease: "power3.out", // Smooth and professional
            });

            // Active/Expanded State
            // If expandedId exists and it is NOT this circle, fade out/shrink?
            // "expanded" variant in original: opacity: 0.5, scale: 0.9, y: 50, z: -50.
            if (expandedId) {
                if (expandedId === circle.id) {
                    // This is the expanded one - handled by CirclePopup probably?
                    // Original code:
                    // expanded: { translateZ: -50, scale: 0.9, y: 50, opacity: 0.5 } ???
                    // Wait, if THIS is the expanded one, why fade it out?
                    // Ah, CirclePopup appears ON TOP. The background grid fades back.
                    // So ALL circles fade back when something is expanded.
                    gsap.to(outerRef.current, {
                        opacity: 0.5,
                        scale: 0.9,
                        z: -50, // Requires perspective on parent
                        y: targetY + 50, // Shift down
                        duration: 0.4,
                        ease: "power2.out"
                    });
                } else {
                    // This is a sibling
                    gsap.to(outerRef.current, {
                        opacity: 0.5,
                        scale: 0.9,
                        z: -50,
                        y: targetY + 50,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            } else {
                // Normal State
                gsap.to(outerRef.current, {
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    y: targetY, // Back to targetY
                    duration: 0.4,
                    ease: "power2.out"
                });
            }

            // Z-Index
            // navCircleIds.includes(circle.id) ? 20 : 10
            gsap.set(outerRef.current, {
                zIndex: navCircleIds.includes(circle.id) ? 20 : 10
            });

        });

        return () => ctx.revert();
    }, [targetX, targetY, circleSize, expandedId, circle.id, navCircleIds]);

    return (
        <div
            ref={outerRef}
            className="absolute top-0 left-0 will-change-transform"
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
