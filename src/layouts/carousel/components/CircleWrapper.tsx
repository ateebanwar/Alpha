"use client";

import { useRef } from "react";
import { motion, MotionValue, useTransform, useMotionValue } from "framer-motion";
import { CircleData } from "@/data/circleData";
import InteractiveCircle from "@/layouts/shared/InteractiveCircle";
import { useOscillation } from "@/hooks/use-oscillation";

interface CarouselCircleWrapperProps {
    circle: CircleData;
    index: number;
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
    carouselAngle: number;
    carouselRadius: number;
    parentRotationY: MotionValue<number>;
}

const CarouselCircleWrapper = ({
    circle,
    index,
    circleSize,
    navCircleIds,
    expandedId,
    onExpand,
    oscillationParams,
    carouselAngle,
    carouselRadius,
    parentRotationY,
}: CarouselCircleWrapperProps) => {
    const oscRef = useRef<HTMLDivElement>(null);
    useOscillation(oscRef, oscillationParams);

    const fallbackValue = useMotionValue(0);
    const rotationValue = parentRotationY || fallbackValue;

    // Depth-based Opacity
    const opacity = useTransform(
        rotationValue,
        (latestRotation) => {
            const relAngle = (carouselAngle + latestRotation) % 360;
            const normalizedAngle = ((relAngle + 180 + 360) % 360) - 180;
            const absAngle = Math.abs(normalizedAngle);
            return Math.max(0.1, 1 - (absAngle / 180) * 1.5);
        }
    );

    // Depth-based Scale
    const scale = useTransform(
        rotationValue,
        (latestRotation) => {
            const relAngle = (carouselAngle + latestRotation) % 360;
            const normalizedAngle = ((relAngle + 180 + 360) % 360) - 180;
            const absAngle = Math.abs(normalizedAngle);
            return 1.4 - (absAngle / 180) * 1.0;
        }
    );

    // Z-Index management
    const zIndexVal = useTransform(
        rotationValue,
        (latestRotation) => {
            if (navCircleIds.includes(circle.id)) return 20;
            const relAngle = (carouselAngle + latestRotation) % 360;
            const normalizedAngle = ((relAngle + 180 + 360) % 360) - 180;
            return Math.round(200 - Math.abs(normalizedAngle));
        }
    );

    // Depth-based Filters
    const filter = useTransform(
        rotationValue,
        (latestRotation) => {
            const relAngle = (carouselAngle + latestRotation) % 360;
            const normalizedAngle = ((relAngle + 180 + 360) % 360) - 180;
            const absAngle = Math.abs(normalizedAngle);

            const blurValue = (absAngle / 180) * 4;
            const brightnessValue = 1 - (absAngle / 180) * 0.7;

            return `blur(${blurValue}px) brightness(${brightnessValue})`;
        }
    );

    return (
        <motion.div
            layoutId={`circle-container-${circle.id}`}
            layout
            initial={false}
            animate={{
                rotateY: carouselAngle,
                z: carouselRadius,
            }}
            transition={{
                rotateY: { type: "spring", stiffness: 300, damping: 30 },
                z: { type: "spring", stiffness: 300, damping: 30 },
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: circleSize,
                height: circleSize,
                zIndex: zIndexVal as any,
                opacity: opacity,
                scale: scale,
                willChange: 'transform',
                transformStyle: 'preserve-3d',
            }}
        >
            <motion.div ref={oscRef} style={{ filter: filter, transformStyle: 'preserve-3d' }}>
                <InteractiveCircle
                    circle={circle}
                    isExpanded={expandedId === circle.id}
                    onExpand={onExpand}
                    size={circleSize}
                    variant="default" // Carousel uses default style
                />
            </motion.div>
        </motion.div>
    );
};

export default CarouselCircleWrapper;
