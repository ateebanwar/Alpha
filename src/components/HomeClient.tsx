"use client";

import { useState } from "react";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { getDataForHoneycomb } from "@/data/dataAdapter";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";
import CirclePopup from "@/layouts/shared/CirclePopup";

export default function HomeClient() {
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker">("static");
    const [displayMode, setDisplayMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker">("static");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const ctx = useRef<gsap.Context | null>(null);

    const circleData = getDataForHoneycomb();
    const activeCircle = expandedId ? circleData.find(c => c.id === expandedId) : null;

    // Determine which layout module to load based on DISPLAY mode (which lags behind layoutMode during transitions)
    const layoutId = (displayMode === "static" || displayMode === "olympic") ? "honeycomb" : displayMode;
    const LayoutComponent = LAYOUT_REGISTRY[layoutId]?.component;

    // Handle Layout Transitions
    useLayoutEffect(() => {
        if (!containerRef.current || !bgRef.current) return;

        ctx.current = gsap.context(() => {
            // If the requested mode is different from what's displayed, animate OUT
            if (layoutMode !== displayMode) {
                // Animate OUT
                gsap.to(containerRef.current, {
                    opacity: 0,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        setDisplayMode(layoutMode);
                        // The effect will run again when displayMode changes
                    }
                });

                // BG Transition is handled by CSS or separate tween, 
                // but we need to wait for content to exit.
                // Actually, let's just animate the BG color purely via state/style and let CSS transition handle it?
                // The original had AnimatePresence for BG.
                // We'll trust the CSS transition on the BG element for color, 
                // but if we need a fade, we can do it.
                // Let's keep it simple: CSS transition for BG color, GSAP for content.
            } else {
                // Animate IN
                // We are now rendering the NEW mode (because setDisplayMode(layoutMode) happened)
                gsap.fromTo(containerRef.current,
                    { opacity: 0, scale: 0.98 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
                );
            }
        });

        return () => ctx.current?.revert();
    }, [layoutMode, displayMode]);

    // Derived styles
    const isDark = displayMode === "olympic" || displayMode === "3d-carousel";

    return (
        <main className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-background">
            {/* Optimized Background Layer */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 transition-colors duration-500 ease-in-out"
                style={{
                    backgroundColor: isDark ? "#000000" : "hsl(var(--background))",
                }}
            />

            <header className={`fixed top-[10px] left-0 right-0 flex flex-col md:flex-row items-center justify-center pointer-events-none px-4 md:px-0 gap-4 md:gap-0 transition-[z-index] duration-300 ${expandedId ? 'z-[99999]' : 'z-30'
                }`}>
                <h1
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center md:text-left md:mr-4 transition-all duration-300 pointer-events-none select-none ${isDark ? "text-white" : "text-foreground"
                        } ${expandedId ? 'opacity-100 scale-100' : ''}`}
                    style={{
                        opacity: 1,
                        textShadow: isDark ? "0 0 20px rgba(255,255,255,0.3)" : "none"
                    }}
                >
                    Alphabet
                    <span className={`block sm:inline ml-0 sm:ml-2 transition-all duration-300 ${isDark ? "text-white bg-none [-webkit-text-fill-color:white]" : "text-gradient"
                        }`}>
                        Consultancy Services
                    </span>
                </h1>

                <div className={`pointer-events-auto flex items-center backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-lg md:ml-4 gap-2 transition-all duration-300 ${isDark ? "bg-white/5 border-white/20" : "bg-background/50 border-white/10"
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
                <div
                    ref={containerRef}
                    className="w-full h-full will-change-transform"
                >
                    {LayoutComponent ? (
                        <LayoutComponent
                            isActive={true}
                            expandedId={expandedId}
                            onExpandedChange={setExpandedId}
                            layoutMode={layoutMode}
                        />
                    ) : null}
                </div>
            </div>

            {/* Popup Container - Using pure CSS/GSAP for transition could be done inside CirclePopup, keeping standard conditional render here */}
            {activeCircle && (
                <div id={layoutMode === "olympic" ? "olympic-layout-container" : (layoutMode === "ticker" ? "ticker-layout-container" : undefined)} style={{ position: 'absolute', zIndex: 99999 }}>
                    <CirclePopup
                        circle={activeCircle}
                        onClose={() => setExpandedId(null)}
                        isOlympic={layoutMode === "olympic"}
                    />
                </div>
            )}
        </main>
    );
}
