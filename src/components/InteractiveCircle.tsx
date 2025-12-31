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

  // Base circle styles optimized for GPU acceleration and strict state isolation
  const circleStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    ...(isOlympic ? {
      border: `4px solid ${borderColor}`,
      background: '#080808',
      boxShadow: `
        inset 6px 6px 12px #000000, 
        inset -6px -6px 12px #121212,
        0 0 15px ${borderColor},
        0 0 30px ${borderColor}99,
        0 0 50px ${borderColor}44
      `,
    } : {
      // Explicitly reset ALL Olympic styles to ensure 100% clean state
      border: 'none',
      background: '', // Resets to .neu-circle styles
      boxShadow: '',  // Resets to .neu-circle styles
      willChange: 'transform',
    })
  };

  const contentGlowStyle = isOlympic ? {
    color: '#ffffff',
    textShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
    filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))',
  } : {
    // Explicitly reset glow effects
    color: '',
    textShadow: 'none',
    filter: 'none',
  };

  return (
    <motion.div
      className={`relative ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <motion.div
        onClick={onExpand}
        className={`
          ${isOlympic
            ? "flex items-center justify-center cursor-pointer rounded-full relative"
            : "neu-circle flex items-center justify-center cursor-pointer"
          }
        `}
        style={circleStyle}
        whileHover={isMobile ? {} : {
          scale: 1.05,
          ...(isOlympic ? {
            boxShadow: `
              inset 4px 4px 8px #000000, 
              inset -4px -4px 8px #1a1a1a,
              0 0 25px ${borderColor},
              0 0 50px ${borderColor}cc,
              0 0 80px ${borderColor}66
            `
          } : {
            // Ensure no Olympic shadows leak into hover state of default mode
            boxShadow: '',
          }),
          transition: { duration: 0.15, ease: "easeOut" }
        }}
        whileTap={{
          scale: 0.96,
          transition: { duration: 0.1, ease: "easeOut" }
        }}
      >
        <div
          className="flex flex-col items-center justify-center gap-1 md:gap-2 p-2 md:p-4 text-center"
          style={contentGlowStyle}
        >
          <Icon className={`w-5 h-5 md:w-8 md:h-8 ${isOlympic ? "text-white" : colorClasses[circle.color]}`} />
          <span className={`text-xs md:text-sm font-semibold leading-tight ${isOlympic ? "text-white" : "text-foreground/90"}`}>
            {circle.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveCircle;
