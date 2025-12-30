"use client";

import { motion } from "framer-motion";
import { CircleData } from "@/data/circleData";
import InteractiveCircle from "./InteractiveCircle";
import { useOscillation } from "@/hooks/use-oscillation";

interface CircleWrapperProps {
  circle: CircleData;
  index: number;
  cols: number;
  isStaggered: boolean;
  circleSize: number;
  verticalGap: number;
  navCircleIds: string[];
  expandedId: string | null;
  onExpand: () => void;
  oscillationParams: {
    amplitude: number;
    frequency: number;
    phase: number;
    angle: number;
  };
  overrideStyle?: React.CSSProperties;
  variant?: "default" | "olympic";
  borderColor?: string;
}

const CircleWrapper = ({
  circle,
  index,
  cols,
  isStaggered,
  circleSize,
  verticalGap,
  navCircleIds,
  expandedId,
  onExpand,
  oscillationParams,
  overrideStyle,
  variant,
  borderColor,
}: CircleWrapperProps) => {
  const row = Math.floor(index / cols);
  const isOddRow = isStaggered && row % 2 === 1;
  const { x, y } = useOscillation(oscillationParams);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.3, delay: index * 0.02 },
        scale: { duration: 0.3, delay: index * 0.02 },
      }}
      style={{
        x,
        y,
        marginLeft: isOddRow ? `${circleSize * 0.5}px` : '0',
        marginRight: isOddRow ? `-${circleSize * 0.5}px` : '0',
        marginBottom: `${verticalGap}px`,
        zIndex: navCircleIds.includes(circle.id) ? 20 : 10,
        position: 'relative',
        ...overrideStyle,
      }}
    >
      <InteractiveCircle
        circle={circle}
        isExpanded={expandedId === circle.id}
        onExpand={onExpand}
        size={circleSize}
        variant={variant}
        borderColor={borderColor}
      />
    </motion.div>
  );
};

export default CircleWrapper;