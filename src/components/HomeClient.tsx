"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { circleData } from "@/data/circleData";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";
import CirclePopup from "@/layouts/shared/CirclePopup";

export default function HomeClient() {
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker">("static");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const activeCircle = expandedId ? circleData.find(c => c.id === expandedId) : null;

    // Determine which layout module to load
    const layoutId = (layoutMode === "static" || layoutMode === "olympic") ? "honeycomb" : layoutMode;
    const LayoutComponent = LAYOUT_REGISTRY[layoutId]?.component;

    return (
        <main className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-background">
            {/* Optimized Background Layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={layoutMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundColor: layoutMode === "olympic" ? "#000000" : "hsl(var(--background))",
                    }}
                />
            </AnimatePresence>

            <header className={`fixed top-[10px] left-0 right-0 flex flex-col md:flex-row items-center justify-center pointer-events-none px-4 md:px-0 gap-4 md:gap-0 transition-[z-index] duration-300 ${expandedId ? 'z-[99999]' : 'z-30'
                }`}>
                <h1
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center md:text-left md:mr-4 transition-all duration-300 pointer-events-none select-none ${layoutMode === "olympic" ? "text-white" : "text-foreground"
                        } ${expandedId ? 'opacity-100 scale-100' : ''}`}
                    style={{
                        opacity: 1,
                        textShadow: layoutMode === "olympic" ? "0 0 20px rgba(255,255,255,0.3)" : "none"
                    }}
                >
                    Alphabet
                    <span className={`block sm:inline ml-0 sm:ml-2 transition-all duration-300 ${layoutMode === "olympic" ? "text-white bg-none [-webkit-text-fill-color:white]" : "text-gradient"
                        }`}>
                        Consultancy Services
                    </span>
                </h1>

                <div className={`pointer-events-auto flex items-center backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-lg md:ml-4 gap-2 transition-all duration-300 ${layoutMode === "olympic" ? "bg-white/5 border-white/20" : "bg-background/50 border-white/10"
                    } ${expandedId ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                    <button
                        onClick={() => setLayoutMode("static")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap ${layoutMode === "static" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-primary/10"}`}
                    >
                        Default
                    </button>
                    <button
                        onClick={() => setLayoutMode("olympic")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap ${layoutMode === "olympic" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-primary/10"}`}
                    >
                        Olympic
                    </button>
                    <button
                        onClick={() => setLayoutMode("3d-carousel")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap ${layoutMode === "3d-carousel" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-primary/10"}`}
                    >
                        3D View
                    </button>
                    <button
                        onClick={() => setLayoutMode("ticker")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap ${layoutMode === "ticker" ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-primary/10"}`}
                    >
                        Ticker
                    </button>
                </div>
            </header>

            <div className="flex-1 relative mt-[140px] md:mt-[70px] overflow-hidden z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={layoutMode}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                    >
                        {LayoutComponent ? (
                            <LayoutComponent
                                isActive={true}
                                expandedId={expandedId}
                                onExpandedChange={setExpandedId}
                                layoutMode={layoutMode}
                            />
                        ) : null}
                    </motion.div>
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {activeCircle && (
                    <CirclePopup
                        circle={activeCircle}
                        onClose={() => setExpandedId(null)}
                        isOlympic={layoutMode === "olympic"}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
