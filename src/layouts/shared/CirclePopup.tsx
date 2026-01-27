"use client";

import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CircleData } from "@/data/circleData";
import CircleContent from "./CircleContent";
import { useIsMobile } from "@/hooks/use-mobile";

interface CirclePopupProps {
    circle: CircleData;
    onClose: () => void;
    isOlympic?: boolean;
}

const CirclePopup = ({ circle, onClose, isOlympic = false }: CirclePopupProps) => {
    const isMobile = useIsMobile();
    const [topOffset, setTopOffset] = useState(0);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalTouchAction = document.body.style.touchAction;

        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.touchAction = originalTouchAction;
        };
    }, []);

    // Calculate top offset to avoid overlapping header text
    useEffect(() => {
        const calculateTopOffset = () => {
            // Try to find the header/navbar text element
            const header = document.querySelector('header h1');
            if (header) {
                const rect = header.getBoundingClientRect();
                // Set top to be 6px below the header text
                setTopOffset(rect.bottom + 6);
            }
        };

        calculateTopOffset();
        // Recalculate on resize in case header position changes
        window.addEventListener('resize', calculateTopOffset);
        return () => window.removeEventListener('resize', calculateTopOffset);
    }, []);

    return (
        <div
            className="fixed z-[99990] flex items-center justify-center p-0 md:p-4"
            style={{
                top: `${topOffset}px`,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`absolute inset-0 ${isOlympic ? 'bg-black/90' : 'bg-black/60 md:bg-background/80'} ${isMobile ? '' : 'backdrop-blur-md'}`}
                onClick={onClose}
                style={{
                    WebkitBackdropFilter: isMobile ? 'none' : 'blur(8px)',
                }}
            />

            {/* Card Popup - Mobile optimized */}
            <motion.div
                initial={{ opacity: 0, y: isMobile ? 50 : 0, scale: isMobile ? 1 : 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: isMobile ? 50 : 0, scale: isMobile ? 1 : 0.95 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }}
                className={`relative flex flex-col overflow-hidden pointer-events-auto ${isMobile
                    ? 'w-[calc(100%-2rem)] mx-4 h-[calc(100%-2rem)] rounded-3xl shadow-2xl border border-white/10'
                    : 'w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl border border-white/10'
                    }`}
                style={{
                    backgroundColor: isOlympic ? '#000000' : 'hsl(var(--card))',
                    maxHeight: isMobile ? 'calc(100dvh - 2rem)' : '85vh',
                }}
            >
                {/* Header */}
                <div className={`flex items-center justify-between px-4 py-3 md:px-6 md:py-4 shrink-0 border-b ${isOlympic ? 'border-white/10 bg-[#000000]' : 'border-border/50 bg-card'
                    }`}>
                    <h2 className={`text-lg md:text-xl font-semibold ${isOlympic ? 'text-white' : 'text-foreground'
                        }`} style={isOlympic ? { textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' } : {}}>
                        {circle.label}
                    </h2>
                    <button
                        onClick={onClose}
                        className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${isOlympic
                            ? 'bg-white/10 hover:bg-white/20 text-white'
                            : 'bg-muted hover:bg-muted/80 text-foreground'
                            }`}
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className={`flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-8 md:py-6 ${isOlympic ? 'olympic-scrollbar' : 'custom-scrollbar'
                    }`}>
                    <MemoizedCircleContent circle={circle} isMobile={isMobile} isOlympic={isOlympic} />
                </div>
            </motion.div>
        </div>
    );
};

// Memoize CircleContent to prevent re-renders
const MemoizedCircleContent = memo(CircleContent, (prevProps, nextProps) => {
    return (
        prevProps.circle.id === nextProps.circle.id &&
        prevProps.isMobile === nextProps.isMobile &&
        prevProps.isOlympic === nextProps.isOlympic
    );
});

export default CirclePopup;
