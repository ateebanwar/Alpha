import { useRef, useState, useCallback, useMemo } from "react";
import { CircleData } from "@/data/dataAdapter";

interface TickerCardProps {
    circle: CircleData;
    onClick?: () => void;
}

const TickerCard = ({ circle, onClick }: TickerCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Determine a subtle background gradient or color based on the circle's data
    const bgColor = circle.color === "primary" ? "bg-primary/10" : circle.color === "accent" ? "bg-accent/10" : "bg-muted/10";
    const borderColor = circle.color === "primary" ? "border-primary/20" : circle.color === "accent" ? "border-accent/20" : "border-muted/20";

    // Disabled hover handlers for instant rendering
    const handleMouseEnter = useCallback(() => {}, []);
    const handleMouseLeave = useCallback(() => {}, []);
    const handleMouseDown = useCallback(() => {}, []);
    const handleMouseUp = useCallback(() => {}, []);

    // Fix for stuck hover state if mouse leaves while down
    // Actually handleMouseLeave covers it, so we are good.

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
            className={`
                relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-[2.5rem] 
                ${bgColor} border ${borderColor} 
                backdrop-blur-sm shadow-xl p-8 
                flex flex-col items-center justify-center text-center 
                cursor-pointer group overflow-hidden
                will-change-transform
            `}
        >
            {/* Background Image Layer - Optimized loading */}
            {circle.content?.items?.[0]?.icon && !imageError && (
                <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
                    {/* For now, just show a placeholder since we don't have actual images */}
                    <div className="w-full h-full bg-muted/10 rounded-2xl" />
                </div>
            )}

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className={`p-4 rounded-3xl bg-white/5 border border-white/10`}>
                    <circle.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground/90">
                    {circle.label}
                </h3>
                <p className="text-xs text-foreground/40 font-medium uppercase tracking-[0.2em]">
                    {circle.category}
                </p>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-[80px] rounded-full opacity-0" />
        </div>
    );
};

export default TickerCard;
