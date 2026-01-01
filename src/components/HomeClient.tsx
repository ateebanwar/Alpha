"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CircleGrid from "@/components/CircleGrid";
import Carousel3D from "@/components/Carousel3D";
import TickerWall from "@/components/TickerWall";

export default function HomeClient() {
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker">("static");

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

            <header className="fixed top-[10px] left-0 right-0 z-30 flex flex-col md:flex-row items-center justify-center pointer-events-none px-4 md:px-0 gap-4 md:gap-0">
                <h1
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center md:text-left md:mr-4 transition-colors duration-300 ${layoutMode === "olympic" ? "text-white" : "text-foreground"
                        }`}
                >
                    Alphabet
                    <span className={`block sm:inline ml-0 sm:ml-2 transition-all duration-300 ${layoutMode === "olympic" ? "text-white bg-none [-webkit-text-fill-color:white]" : "text-gradient"
                        }`}>
                        Consultancy Services
                    </span>
                </h1>

                <div className={`pointer-events-auto flex items-center backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-lg md:ml-4 gap-2 transition-colors duration-300 ${layoutMode === "olympic" ? "bg-white/5 border-white/20" : "bg-background/50 border-white/10"
                    }`}>
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
                        {layoutMode === "3d-carousel" ? (
                            <Carousel3D />
                        ) : layoutMode === "ticker" ? (
                            <TickerWall />
                        ) : (
                            <CircleGrid layoutMode={layoutMode as "static" | "olympic"} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
