"use client";

import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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

    useEffect(() => {
        // Optimized scroll lock
        const originalOverflow = document.body.style.overflow;
        const originalTouchAction = document.body.style.touchAction;

        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.touchAction = originalTouchAction;
        };
    }, []);

    // Instant rendering - no animations
    const backdropTransition = { duration: 0 };
    const cardTransition = { duration: 0 };

    return (
        <div className="fixed inset-0 z-[99990] flex items-start justify-center pointer-events-none" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            {/* Instant Backdrop */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={backdropTransition}
                className={`absolute inset-0 pointer-events-auto ${isOlympic ? 'bg-black/90' : 'bg-background/95 md:bg-background/80'} ${isMobile ? 'backdrop-blur-none' : 'backdrop-blur-md'
                    }`}
                onClick={onClose}
                style={{
                    willChange: 'opacity',
                    WebkitBackdropFilter: isMobile ? 'none' : 'blur(8px)',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden'
                }}
            />

            {/* Instant Card */}
            <motion.div
                layoutId={undefined}
                className={`relative w-full md:max-w-4xl h-full rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto border-x-0 md:border border-white/10`}
                transition={cardTransition}
                style={{
                    backgroundColor: isOlympic ? '#000000' : 'hsl(var(--card))',
                    marginTop: isMobile ? '145px' : '75px',
                    height: isMobile ? 'calc(100dvh - 175px)' : 'calc(100vh - 105px)',
                    willChange: 'transform, height',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    perspective: 1000,
                    contain: 'layout style paint'
                }}
            >
                {/* Background decorative elements */}
                {!isOlympic && <div className="absolute inset-0 neu-circle opacity-100 pointer-events-none" />}

                {/* Instant Header */}
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0 }}
                    className={`relative z-50 flex items-center py-2 px-4 md:py-3 md:px-6 shrink-0 border-b ${isOlympic ? 'border-white/10 bg-[#000000]' : 'border-white/5 bg-card/50 backdrop-blur-sm'
                        }`}
                    style={{
                        willChange: 'opacity, transform',
                        WebkitTransform: 'translate3d(0, 0, 0)',
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <button
                        onClick={onClose}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 ${isOlympic
                            ? "bg-white text-black hover:bg-white/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                            }`}
                        style={isOlympic ? { textShadow: '0 0 8px rgba(255, 255, 255, 0.4)' } : {}}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className={`ml-4 font-semibold text-base ${isOlympic ? 'text-white' : 'text-primary/80'}`}
                        style={isOlympic ? { textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' } : {}}>
                        {circle.label}
                    </div>
                </motion.div>

                {/* Scrollable Content - Ultra-fast animation */}
                <motion.div
                    initial={{ opacity: 0, y: isMobile ? 4 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: isMobile ? 0.14 : 0.18,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className={`relative flex-1 overflow-y-auto z-10 overscroll-contain p-4 md:p-8 pb-10 ${isOlympic ? 'olympic-scrollbar' : 'custom-scrollbar'
                        }`}
                    style={{
                        willChange: 'opacity, transform',
                        WebkitTransform: 'translate3d(0, 0, 0)',
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <MemoizedCircleContent circle={circle} isMobile={isMobile} isOlympic={isOlympic} />
                </motion.div>
            </motion.div>
        </div >
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
