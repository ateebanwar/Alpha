"use client";

import { memo, useMemo } from "react";
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

    // Memoize style calculations to prevent recalculation on every render
    const circleStyle = useMemo((): React.CSSProperties => {
        if (isOlympic) {
            return {
                width: `${size}px`,
                height: `${size}px`,
                border: `4px solid ${borderColor}`,
                background: '#080808',
                boxShadow: `
                    inset 6px 6px 12px #000000, 
                    inset -6px -6px 12px #121212,
                    0 0 15px ${borderColor},
                    0 0 30px ${borderColor}99,
                    0 0 50px ${borderColor}44
                `,
            };
        }

        return {
            width: `${size}px`,
            height: `${size}px`,
            border: 'none',
            background: '',
            boxShadow: '',
            willChange: 'transform',
        };
    }, [isOlympic, size, borderColor]);

    const contentGlowStyle = useMemo((): React.CSSProperties => {
        if (isOlympic) {
            return {
                color: '#ffffff',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))',
            };
        }

        return {
            color: '',
            textShadow: 'none',
            filter: 'none',
        };
    }, [isOlympic]);

    const circleClassName = useMemo(() => {
        return isOlympic
            ? "flex items-center justify-center cursor-pointer rounded-full relative"
            : "neu-circle flex items-center justify-center cursor-pointer";
    }, [isOlympic]);

    const iconClassName = useMemo(() => {
        return `w-5 h-5 md:w-8 md:h-8 ${isOlympic ? "text-white" : colorClasses[circle.color]}`;
    }, [isOlympic, circle.color]);

    const labelClassName = useMemo(() => {
        return `text-xs md:text-sm font-semibold leading-tight ${isOlympic ? "text-white" : "text-foreground/90"}`;
    }, [isOlympic]);

    return (
        <motion.div
            className={`relative ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
            <motion.div
                onClick={(e) => {
                    e.stopPropagation();
                    onExpand();
                }}
                className={circleClassName}
                style={circleStyle}
            >
                <div
                    className="flex flex-col items-center justify-center gap-1 md:gap-2 p-2 md:p-4 text-center"
                    style={contentGlowStyle}
                >
                    <Icon className={iconClassName} />
                    <span className={labelClassName}>
                        {circle.label}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Memoize component to prevent re-renders when props haven't changed
export default memo(InteractiveCircle, (prevProps, nextProps) => {
    return (
        prevProps.circle.id === nextProps.circle.id &&
        prevProps.isExpanded === nextProps.isExpanded &&
        prevProps.size === nextProps.size &&
        prevProps.variant === nextProps.variant &&
        prevProps.borderColor === nextProps.borderColor
    );
});
