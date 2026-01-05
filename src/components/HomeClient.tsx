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

    // Refs for the two layers
    const targetLayerRef = useRef<HTMLDivElement>(null);
    const exitingLayerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    const ctx = useRef<gsap.Context | null>(null);

    const circleData = getDataForHoneycomb();
    const activeCircle = expandedId ? circleData.find(c => c.id === expandedId) : null;

    // Helper to resolve layout component
    const getLayoutConfig = (mode: string) => {
        const id = (mode === "static" || mode === "olympic") ? "honeycomb" : mode;
        return LAYOUT_REGISTRY[id]?.component;
    };

    const TargetLayout = getLayoutConfig(layoutMode);
    const ExitingLayout = getLayoutConfig(displayMode);

    // If the component implementation is the same (e.g. Honeycomb used for both Static and Olympic),
    // we do NOT want to trigger a full mount/unmount transition. We want to update props in place.
    const isSameLayoutModule = TargetLayout === ExitingLayout;

    // Transition only if modules differ AND we aren't already aligned
    const isTransitioning = !isSameLayoutModule && layoutMode !== displayMode;

    // Handle Layout Transitions
    useLayoutEffect(() => {
        // Immediate update for same-module transitions (Static <-> Olympic)
        if (isSameLayoutModule && layoutMode !== displayMode) {
            setDisplayMode(layoutMode);
            return;
        }

        // If we are not transitioning, reset styles just in case
        if (!isTransitioning) {
            if (targetLayerRef.current) {
                gsap.set(targetLayerRef.current, { opacity: 1, scale: 1 });
            }
            return;
        }

        if (!targetLayerRef.current || !exitingLayerRef.current) return;

        ctx.current = gsap.context(() => {
            // Initial state for entering layer
            gsap.set(targetLayerRef.current, {
                opacity: 0,
                scale: 0.95,
                zIndex: 20
            });

            // Initial state for exiting layer
            gsap.set(exitingLayerRef.current, {
                opacity: 1,
                scale: 1,
                zIndex: 10
            });

            // Cross-fade Animation
            const tl = gsap.timeline({
                onComplete: () => {
                    setDisplayMode(layoutMode); // Commit the transition
                }
            });

            tl.to(exitingLayerRef.current, {
                opacity: 0,
                scale: 1.05,
                duration: 0.4,
                ease: "power2.inOut"
            }, 0);

            tl.to(targetLayerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.inOut"
            }, 0); // Start at same time
        });

        return () => ctx.current?.revert();
    }, [layoutMode, isTransitioning]); // Only re-run when transition state changes

    // Derived styles
    const isDark = (isTransitioning ? layoutMode : displayMode) === "olympic" || (isTransitioning ? layoutMode : displayMode) === "3d-carousel";

    return (
        <main className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-background">
            {/* Optimized Background Layer */}
            <div
                ref={bgRef}
                className={`absolute inset-0 z-0 transition-colors ease-in-out ${isSameLayoutModule && layoutMode !== displayMode ? 'duration-0' : 'duration-500'}`}
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
                {/* Exiting Layer - Render only during transition */}
                {isTransitioning && ExitingLayout && (
                    <div
                        ref={exitingLayerRef}
                        className="absolute inset-0 w-full h-full will-change-transform isolate"
                    >
                        <ExitingLayout
                            isActive={false} // Maybe false? or true? It's exiting. Keep it active visually.
                            expandedId={expandedId}
                            onExpandedChange={setExpandedId}
                            layoutMode={displayMode} // Pass its own mode
                        />
                    </div>
                )}

                {/* Target/Current Layout - Always Render */}
                {TargetLayout && (
                    <div
                        ref={targetLayerRef}
                        className="absolute inset-0 w-full h-full will-change-transform isolate"
                    >
                        <TargetLayout
                            isActive={true}
                            expandedId={expandedId}
                            onExpandedChange={setExpandedId}
                            layoutMode={layoutMode} // Pass target mode
                        />
                    </div>
                )}
            </div>

            {/* Popup Container */}
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
