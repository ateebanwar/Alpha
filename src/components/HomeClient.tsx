"use client";

import { useState, useRef, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { getDataForHoneycomb } from "@/data/dataAdapter";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";
import CirclePopup from "@/layouts/shared/CirclePopup";

// Preload ticker data and component
let tickerDataPromise: Promise<any> | null = null;
let TickerLayoutComponent: any = null;

const preloadTicker = async () => {
    if (!tickerDataPromise) {
        tickerDataPromise = import("@/data/dataAdapter").then(({ getDataForTicker }) => getDataForTicker());
    }
    if (!TickerLayoutComponent) {
        const { TickerLayout } = await import("@/layouts/ticker/index");
        TickerLayoutComponent = TickerLayout;
    }
    return Promise.all([tickerDataPromise, Promise.resolve(TickerLayoutComponent)]);
};

export default function HomeClient() {
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker">("static");
    const [displayMode, setDisplayMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker">("static");
    const [isTickerReady, setIsTickerReady] = useState(false);
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
        if (mode === "ticker" && TickerLayoutComponent) {
            return TickerLayoutComponent;
        }
        const id = (mode === "static" || mode === "olympic") ? "honeycomb" : mode;
        return LAYOUT_REGISTRY[id]?.component;
    };

    // Optimized layout switching with preloading
    const switchLayout = useCallback(async (newMode: "static" | "olympic" | "3d-carousel" | "ticker") => {
        if (newMode === layoutMode) return;

        // For ticker layout, preload first
        if (newMode === "ticker" && !isTickerReady) {
            try {
                await preloadTicker();
                setIsTickerReady(true);
            } catch (error) {
                console.error("Failed to preload ticker:", error);
                return;
            }
        }

        // Atomic switch - update both states simultaneously
        setLayoutMode(newMode);
        setDisplayMode(newMode);
    }, [layoutMode, isTickerReady]);

    const TargetLayout = getLayoutConfig(layoutMode);
    const ExitingLayout = getLayoutConfig(displayMode);

    // If the component implementation is the same (e.g. Honeycomb used for both Static and Olympic),
    // we do NOT want to trigger a full mount/unmount transition. We want to update props in place.
    const isSameLayoutModule = TargetLayout === ExitingLayout;

    // Transition only if modules differ AND we aren't already aligned
    const isTransitioning = !isSameLayoutModule && layoutMode !== displayMode;

    // Handle Layout Transitions
    useLayoutEffect(() => {
        // Skip all animations for instant rendering
        if (targetLayerRef.current) {
            gsap.set(targetLayerRef.current, { opacity: 1, scale: 1 });
        }
        setDisplayMode(layoutMode);
        return;
    }, [layoutMode]); // Only re-run when layout mode changes

    // Derived styles
    const isDark = (isTransitioning ? layoutMode : displayMode) === "olympic" || (isTransitioning ? layoutMode : displayMode) === "3d-carousel";

    return (
        <main className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-background">
            {/* Optimized Background Layer */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: isDark ? "#000000" : "hsl(var(--background))",
                }}
            />

            <header className="fixed top-[10px] left-0 right-0 flex flex-col md:flex-row items-center justify-center pointer-events-none px-4 md:px-0 gap-4 md:gap-0 z-30">
                <h1
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center md:text-left md:mr-4 pointer-events-none select-none"
                    style={{
                        opacity: 1,
                        textShadow: isDark ? "0 0 20px rgba(255,255,255,0.3)" : "none"
                    }}
                >
                    <span className={`${isDark ? "text-white" : ""}`}>
                        Alphabet
                    </span>
                    <span className={`block sm:inline ml-0 sm:ml-2 text-gradient`}>
                        Consultancy Services
                    </span>
                </h1>

                <div className={`pointer-events-auto flex items-center backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-lg md:ml-4 gap-2 ${isDark ? "bg-white/5 border-white/20" : "bg-background/50 border-white/10"
                    } ${expandedId ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                    <button
                        onClick={() => switchLayout("static")}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                            layoutMode === "static" 
                                ? (isDark ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90")
                                : (isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")
                        }`}
                    >
                        Default
                    </button>
                    <button
                        onClick={() => switchLayout("olympic")}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                            layoutMode === "olympic" 
                                ? (isDark ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90")
                                : (isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")
                        }`}
                    >
                        Olympic
                    </button>
                    <button
                        onClick={() => switchLayout("3d-carousel")}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                            layoutMode === "3d-carousel" 
                                ? (isDark ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90")
                                : (isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")
                        }`}
                    >
                        3D View
                    </button>
                    <button
                        onClick={() => switchLayout("ticker")}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                            layoutMode === "ticker" 
                                ? (isDark ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90")
                                : (isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")
                        }`}
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
