import { motion } from "framer-motion";
import { getIcon } from "@/utils/iconRegistry";

export interface TickerItem {
    id: string;
    title: string;
    category: string;
    icon: string;
    color: string;
    backgroundImage: string;
}

interface TickerCardProps {
    item: TickerItem;
    onClick?: () => void;
}

const TickerCard = ({ item, onClick }: TickerCardProps) => {
    const Icon = getIcon(item.icon);

    // Determine a subtle background gradient or color based on the item's data
    const bgColor = item.color === "primary" ? "bg-primary/10" : item.color === "accent" ? "bg-accent/10" : "bg-muted/10";
    const borderColor = item.color === "primary" ? "border-primary/20" : item.color === "accent" ? "border-accent/20" : "border-muted/20";

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
            {/* Background Image Layer */}
            {item.backgroundImage && (
                <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.backgroundImage}
                        alt=""
                        className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    />
                </div>
            )}

            {/* Future image placeholder overlay if valid image not present, keeping original effect for fallback */}
            {!item.backgroundImage && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white/5 pointer-events-none" />
            )}

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className={`p-4 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                    {item.title}
                </h3>
                <p className="text-xs text-foreground/40 font-medium uppercase tracking-[0.2em]">
                    {item.category}
                </p>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

export default TickerCard;
