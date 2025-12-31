"use client";

import { motion } from "framer-motion";
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
  const { x: oscX, y: oscY } = useOscillation(oscillationParams);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: targetX, y: targetY }}
      animate={{
        opacity: 1,
        scale: 1,
        x: targetX,
        y: targetY,
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30, restDelta: 0.001 },
        y: { type: "spring", stiffness: 300, damping: 30, restDelta: 0.001 },
        opacity: { duration: 0.3, delay: index * 0.01 },
        scale: { duration: 0.3, delay: index * 0.01 },
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: circleSize,
        height: circleSize,
        zIndex: navCircleIds.includes(circle.id) ? 20 : 10,
        willChange: 'transform',
      }}
    >
      <motion.div style={{ x: oscX, y: oscY }}>
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