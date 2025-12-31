"use client";

import { motion, MotionValue, useTransform, useMotionValue } from "framer-motion";
import { CircleData } from "@/data/circleData";
import InteractiveCircle from "./InteractiveCircle";
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
    // Carousel props
    layoutMode?: string;
    carouselAngle?: number;
    carouselRadius?: number;
    parentRotationY?: MotionValue<number>;
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
    layoutMode,
    carouselAngle = 0,
    carouselRadius = 800,
    parentRotationY,
}: CircleWrapperProps) => {
    const { x: oscX, y: oscY } = useOscillation(oscillationParams);
    const isCarousel = layoutMode === "3d-carousel" || layoutMode === "carousel";

    const fallbackValue = useMotionValue(0);

    // Depth-based Opacity
    const opacity = useTransform(
        parentRotationY || fallbackValue,
        (latestRotation) => {
            if (!isCarousel) return 1;
            const relAngle = (carouselAngle + latestRotation) % 360;
            const normalizedAngle = ((relAngle + 180 + 360) % 360) - 180;
            const absAngle = Math.abs(normalizedAngle);
            return Math.max(0.1, 1 - (absAngle / 180) * 1.5);
        }
    );

    // Depth-based Scale
    const scale = useTransform(
        parentRotationY || fallbackValue,
        (latestRotation) => {
            if (!isCarousel) return 1;
            const relAngle = (carouselAngle + latestRotation) % 360;
            const normalizedAngle = ((relAngle + 180 + 360) % 360) - 180;
            const absAngle = Math.abs(normalizedAngle);
            return 1.4 - (absAngle / 180) * 1.0;
        }
    );

    // Z-Index management
    const zIndexVal = useTransform(
        parentRotationY || fallbackValue,
        (latestRotation) => {
            if (!isCarousel) return navCircleIds.includes(circle.id) ? 20 : 10;
            const relAngle = (carouselAngle + latestRotation) % 360;
            const normalizedAngle = ((relAngle + 180 + 360) % 360) - 180;
            return Math.round(200 - Math.abs(normalizedAngle));
        }
    );

    // Depth-based Filters
    const filter = useTransform(
        parentRotationY || fallbackValue,
        (latestRotation) => {
            if (!isCarousel) return "blur(0px) brightness(1)";
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
            layoutId={`circle-${circle.id}`}
            initial={false}
            animate={{
                x: targetX,
                y: targetY,
                rotateY: isCarousel ? carouselAngle : 0,
                z: isCarousel ? carouselRadius : 0,
            }}
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30, restDelta: 0.001 },
                y: { type: "spring", stiffness: 300, damping: 30, restDelta: 0.001 },
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
                opacity: isCarousel ? opacity : 1,
                scale: isCarousel ? scale : 1,
                willChange: 'transform',
                transformStyle: 'preserve-3d',
            }}
        >
            <motion.div style={{ x: oscX, y: oscY, filter: isCarousel ? filter : "none", transformStyle: 'preserve-3d' }}>
                <InteractiveCircle
                    circle={circle}
                    isExpanded={expandedId === circle.id}
                    onExpand={onExpand}
                    size={circleSize}
                    variant={variant}
                    borderColor={borderColor}
                />
            </motion.div>
        </motion.div>
    );
};

export default CircleWrapper;
