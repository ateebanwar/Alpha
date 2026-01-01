"use client";

import { motion } from "framer-motion";
import { CircleData } from "@/data/circleData";

interface TickerCardProps {
    circle: CircleData;
    onClick?: () => void;
}

const TickerCard = ({ circle, onClick }: TickerCardProps) => {
    // Determine a subtle background gradient or color based on the circle's data
    const bgColor = circle.color === "primary" ? "bg-primary/10" : circle.color === "accent" ? "bg-accent/10" : "bg-muted/10";
    const borderColor = circle.color === "primary" ? "border-primary/20" : circle.color === "accent" ? "border-accent/20" : "border-muted/20";

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-[2.5rem] 
                ${bgColor} border ${borderColor} 
                backdrop-blur-sm shadow-xl p-8 
                flex flex-col items-center justify-center text-center 
                cursor-pointer group overflow-hidden
            `}
        >
            {/* Future image placeholder */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className={`p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <circle.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                    {circle.label}
                </h3>
                <p className="text-xs text-foreground/40 font-medium uppercase tracking-[0.2em]">
                    {circle.category}
                </p>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

export default TickerCard;
