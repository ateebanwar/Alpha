"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CircleData } from "@/data/circleData";
import CircleContent from "./CircleContent"; // Same directory
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CirclePopupProps {
    circle: CircleData;
    onClose: () => void;
    isOlympic?: boolean;
}

const CirclePopup = ({ circle, onClose, isOlympic = false }: CirclePopupProps) => {
    const isMobile = useIsMobile();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // High-performance scroll lock
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none'; // Prevent palm/touch gestures

        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.touchAction = '';
        };
    }, []);

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
    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[99990] flex items-end md:items-start justify-center pointer-events-none">
            {/* 1. Ultra-fast Backdrop Layer - Almost opaque on mobile but ensures header title above it is clear */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={backdropTransition}
                className={`absolute inset-0 bg-background/95 md:bg-background/80 pointer-events-auto ${isMobile ? 'backdrop-blur-none' : 'backdrop-blur-md'
                    }`}
                onClick={onClose}
                style={{
                    willChange: 'opacity',
                    WebkitBackdropFilter: isMobile ? 'none' : 'blur(8px)',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden'
                }}
            />

            {/* 2. Ultra-fast Expanding Card - Fullscreen behavior on mobile (60px offset), Panel behavior on desktop (100px offset) */}
            <motion.div
                layoutId={`circle-container-${circle.id}`}
                className={`relative w-full md:max-w-4xl h-full rounded-none md:rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto border-x-0 md:border border-white/10 ${isOlympic ? 'bg-[#080808]' : 'bg-card'
                    }`}
                transition={cardTransition}
                style={{
                    marginTop: '30px',
                    height: isMobile ? 'calc(100dvh - 60px)' : 'calc(100vh - 60px)',
                    willChange: 'transform, height',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    perspective: 1000,
                    contain: 'layout style paint'
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
                    className={`relative z-50 flex items-center p-4 md:p-6 shrink-0 border-b ${isOlympic ? 'border-white/10 bg-black/50 backdrop-blur-md' : 'border-white/5 bg-card/50 backdrop-blur-sm'
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
                        className={isOlympic
                            ? "flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-150 border border-white/20 rounded-xl hover:bg-white/5"
                            : "neu-tile flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-150 hover:scale-105 active:scale-95"}
                        style={isOlympic ? { textShadow: '0 0 8px rgba(255, 255, 255, 0.4)' } : {}}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className={`ml-4 font-semibold text-lg ${isOlympic ? 'text-white' : 'text-primary/80'}`}
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
                    <CircleContent circle={circle} isMobile={isMobile} isOlympic={isOlympic} />
                </motion.div>
            </motion.div>
        </div>,
        document.body
    );
};

export default CirclePopup;
