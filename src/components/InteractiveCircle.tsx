"use client";

import { motion } from "framer-motion";
import { CircleData } from "@/data/circleData";
import { useIsMobile } from "@/hooks/use-mobile";


interface InteractiveCircleProps {
  circle: CircleData;
  isExpanded: boolean;
  onExpand: () => void;
  size: number;
  variant?: "default" | "olympic";
  borderColor?: string;
}

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
  variant = "default",
  borderColor = "#e5e5e5"
}: InteractiveCircleProps) => {
  const Icon = circle.icon;
  const isMobile = useIsMobile();

  const isOlympic = variant === "olympic";

  return (
    <motion.div
      layoutId={`circle-container-${circle.id}`}
      className={`relative ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <motion.div
        onClick={onExpand}
        className={`
          ${isOlympic
            ? "flex items-center justify-center cursor-pointer rounded-full bg-background/40 backdrop-blur-sm transition-all duration-300"
            : "neu-circle flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out"
          }
        `}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          ...(isOlympic ? {
            border: `3px solid ${borderColor}`,
            boxShadow: `0 0 15px ${borderColor}20`,
          } : {}),
          willChange: 'transform',
          WebkitTransform: 'translate3d(0, 0, 0)'
        }}
        whileHover={isMobile ? {} : {
          scale: 1.05,
          ...(isOlympic ? { boxShadow: `0 0 25px ${borderColor}40` } : {}),
          transition: { duration: 0.1, ease: "easeOut" }
        }}
        whileTap={{
          scale: 0.96,
          transition: { duration: 0.08, ease: "easeOut" }
        }}
      >
        <div className="flex flex-col items-center justify-center gap-1 md:gap-2 p-2 md:p-4 text-center">
          <Icon className={`w-5 h-5 md:w-8 md:h-8 ${colorClasses[circle.color]}`} />
          <span className="text-xs md:text-sm font-semibold text-foreground/90 leading-tight">
            {circle.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCircle;
