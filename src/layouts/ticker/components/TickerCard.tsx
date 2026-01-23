import { memo } from "react";
import { CircleData } from "@/data/dataAdapter";

interface TickerCardProps {
    circle: CircleData;
    onClick?: () => void;
}

const TickerCard = ({ circle, onClick }: TickerCardProps) => {
    // Determine a subtle background gradient or color based on the circle's data
    const bgColor = circle.color === "primary" ? "bg-primary/10" : circle.color === "accent" ? "bg-accent/10" : "bg-muted/10";
    const borderColor = circle.color === "primary" ? "border-primary/20" : circle.color === "accent" ? "border-accent/20" : "border-muted/20";
    const Icon = circle.icon;

    return (
        <div
            onClick={onClick}
            className={`
                relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-[2rem] 
                ${bgColor} border ${borderColor} 
                backdrop-blur-sm shadow-sm hover:shadow-md
                flex flex-col items-center justify-center text-center 
                cursor-pointer transition-transform duration-200 active:scale-95
            `}
        >
            <div className="flex flex-col items-center gap-3 p-4">
                <div className={`p-3 rounded-2xl bg-white/10 border border-white/10`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
                </div>
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground/90 line-clamp-2">
                    {circle.label}
                </h3>
                <p className="text-[10px] sm:text-xs text-foreground/50 font-medium uppercase tracking-wider">
                    {circle.category}
                </p>
            </div>
        </div>
    );
};

// Memoize to prevent re-renders during high-speed scrolling
export default memo(TickerCard);
