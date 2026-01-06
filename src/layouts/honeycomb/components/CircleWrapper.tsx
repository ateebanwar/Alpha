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

    // Apply oscillation to inner ref - Disabled for instant rendering
    useOscillation(innerRef, oscillationParams, false);

    // Handle Position & State Changes
    useLayoutEffect(() => {
        if (!outerRef.current) return;

        const ctx = gsap.context(() => {
            // Instant rendering - no entrance animations
            if (!hasEntered.current) {
                hasEntered.current = true;
                gsap.set(outerRef.current, {
                    x: targetX,
                    y: targetY,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    width: circleSize,
                    height: circleSize,
                    zIndex: navCircleIds.includes(circle.id) ? 20 : 10
                });
            } else {
                // Instant state changes
                if (expandedId) {
                    if (expandedId === circle.id) {
                        gsap.set(outerRef.current, {
                            opacity: 0.5,
                            scale: 0.9,
                            z: -50,
                            y: targetY + 50,
                            x: targetX,
                            zIndex: navCircleIds.includes(circle.id) ? 20 : 10
                        });
                    } else {
                        gsap.set(outerRef.current, {
                            opacity: 0.5,
                            scale: 0.9,
                            z: -50,
                            y: targetY + 50,
                            x: targetX,
                            zIndex: navCircleIds.includes(circle.id) ? 20 : 10
                        });
                    }
                } else {
                    gsap.set(outerRef.current, {
                        x: targetX,
                        y: targetY,
                        width: circleSize,
                        height: circleSize,
                        opacity: 1,
                        scale: 1,
                        z: 0,
                        rotation: 0,
                        filter: "blur(0px)",
                        zIndex: navCircleIds.includes(circle.id) ? 20 : 10
                    });
                }
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
