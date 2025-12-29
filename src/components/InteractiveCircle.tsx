"use client";

import { motion } from "framer-motion";
import { CircleData } from "@/data/circleData";
import { useIsMobile } from "@/hooks/use-mobile";


interface InteractiveCircleProps {
  circle: CircleData;
  isExpanded: boolean;
  onExpand: () => void;
  size: number;
}

// Uniform sizes for perfect honeycomb alignment
const colorClasses = {
  primary: "text-primary",
  accent: "text-accent",
  muted: "text-muted-foreground",
};

const InteractiveCircle = ({
  circle,
  isExpanded,
  onExpand,
  size,
}: InteractiveCircleProps) => {
  const Icon = circle.icon;
  const isMobile = useIsMobile();

  return (
    <motion.div
      layoutId={`circle-container-${circle.id}`}
      className={`relative ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    // animate={oscillationParams} // Removed oscillation for strict stable layout
    >
      <motion.div
        onClick={onExpand}
        className={`
          neu-circle flex items-center justify-center
          cursor-pointer
          transition-transform duration-200 ease-out
        `}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          willChange: 'transform',
          WebkitTransform: 'translate3d(0, 0, 0)'
        }}
        whileHover={isMobile ? {} : {
          scale: 1.03,
          transition: { duration: 0.1, ease: "easeOut" }
        }}
        whileTap={{
          scale: isMobile ? 0.97 : 0.96,
          transition: { duration: 0.08, ease: "easeOut" }
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <Icon className={`w-6 h-6 md:w-8 md:h-8 ${colorClasses[circle.color]}`} />
          <span className="text-[10px] md:text-sm font-semibold text-foreground/90 leading-tight">
            {circle.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCircle;
