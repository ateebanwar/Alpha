"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CircleData } from "@/data/circleData";
import CircleContent from "./CircleContent";
import { useIsMobile } from "@/hooks/use-mobile";

interface CirclePopupProps {
    circle: CircleData;
    onClose: () => void;
}

const CirclePopup = ({ circle, onClose }: CirclePopupProps) => {
    const isMobile = useIsMobile();

    // Ultra-fast animation settings for buttery-smooth performance
    const backdropTransition = {
        duration: isMobile ? 0.08 : 0.12,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] // Custom cubic-bezier for snappy feel
    };

    const cardTransition = isMobile ? {
        type: "spring" as const,
        stiffness: 800,
        damping: 35,
        mass: 0.2,
        velocity: 5
    } : {
        type: "spring" as const,
        stiffness: 600,
        damping: 30,
        mass: 0.3,
        velocity: 4
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* 1. Ultra-fast Backdrop Layer - No blur on mobile for max performance */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={backdropTransition}
                className={`absolute inset-0 bg-background/60 pointer-events-auto ${
                    isMobile ? '' : 'backdrop-blur-sm'
                }`}
                onClick={onClose}
                style={{
                    willChange: 'opacity',
                    WebkitBackdropFilter: isMobile ? 'none' : 'blur(4px)', // Reduced blur intensity
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden'
                }}
            />

            {/* 2. Ultra-fast Expanding Card */}
            <motion.div
                layoutId={`circle-container-${circle.id}`}
                className="relative w-full max-w-4xl h-[85vh] md:h-[90vh] bg-card rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto border border-white/10"
                transition={cardTransition}
                style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    perspective: 1000,
                    contain: 'layout style paint' // CSS containment for better performance
                }}
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 neu-circle opacity-100 pointer-events-none" />

                {/* Header - Instant animation for ultra-smooth feel */}
                <motion.div
                    initial={{ opacity: 0, y: isMobile ? -2 : -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: isMobile ? 0.12 : 0.16,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="relative z-50 flex items-center p-4 md:p-6 shrink-0 border-b border-white/5 bg-card/50 backdrop-blur-sm"
                    style={{
                        willChange: 'opacity, transform',
                        WebkitTransform: 'translate3d(0, 0, 0)',
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <button
                        onClick={onClose}
                        className="neu-tile flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-150 hover:scale-105 active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="ml-4 font-semibold text-lg text-primary/80">
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
                    className="relative flex-1 overflow-y-auto z-10 custom-scrollbar overscroll-contain p-4 md:p-8"
                    style={{
                        willChange: 'opacity, transform',
                        WebkitTransform: 'translate3d(0, 0, 0)',
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <CircleContent circle={circle} isMobile={isMobile} />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CirclePopup;
