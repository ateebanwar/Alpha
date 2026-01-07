"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { getDataForHoneycomb } from "@/data/dataAdapter";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";
import CirclePopup from "@/layouts/shared/CirclePopup";
import { ServicesSearchLayout } from "@/layouts/servicesSearch";

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
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch">("static");
    const [isTickerReady, setIsTickerReady] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Refs for background
    const bgRef = useRef<HTMLDivElement>(null);

    // Memoize circle data since it's static
    const circleData = useMemo(() => getDataForHoneycomb(), []);
    const activeCircle = useMemo(() =>
        expandedId ? circleData.find(c => c.id === expandedId) : null,
        [expandedId, circleData]
    );

    // Helper to resolve layout component
    const getLayoutConfig = useCallback((mode: string) => {
        if (mode === "ticker" && TickerLayoutComponent) {
            return TickerLayoutComponent;
        }
        const id = (mode === "static" || mode === "olympic") ? "honeycomb" : mode;
        return LAYOUT_REGISTRY[id]?.component;
    }, []);

    // Optimized layout switching with preloading
    const switchLayout = useCallback(async (newMode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => {
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

        // Update layout mode
        setLayoutMode(newMode);
    }, [layoutMode, isTickerReady]);

    const TargetLayout = useMemo(() => getLayoutConfig(layoutMode), [layoutMode, getLayoutConfig]);

    // Memoize dark mode calculation
    const isDark = useMemo(() =>
        layoutMode === "olympic" || layoutMode === "3d-carousel",
        [layoutMode]
    );

    // Memoize button class generator
    const getButtonClassName = useCallback((mode: string) => {
        const isActive = layoutMode === mode;
        const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

        if (isActive) {
            return `${baseClasses} ${isDark ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`;
        }
        return `${baseClasses} ${isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`;
    }, [layoutMode, isDark]);

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
                        className={getButtonClassName("static")}
                    >
                        Default
                    </button>
                    <button
                        onClick={() => switchLayout("olympic")}
                        className={getButtonClassName("olympic")}
                    >
                        Olympic
                    </button>
                    <button
                        onClick={() => switchLayout("3d-carousel")}
                        className={getButtonClassName("3d-carousel")}
                    >
                        3D View
                    </button>
                    <button
                        onClick={() => switchLayout("ticker")}
                        className={getButtonClassName("ticker")}
                    >
                        Ticker
                    </button>
                    <button
                        onClick={() => switchLayout("servicesSearch")}
                        className={getButtonClassName("servicesSearch")}
                    >
                        Search / Services
                    </button>
                </div>
            </header>

            <div className="flex-1 relative mt-[140px] md:mt-[70px] overflow-hidden z-10">
                {/* Isolated Services Search Layout */}
                {layoutMode === "servicesSearch" ? (
                    <div className="absolute inset-0 w-full h-full">
                        <ServicesSearchLayout />
                    </div>
                ) : (
                    /* Other Layouts - Render when not in servicesSearch */
                    TargetLayout && (
                        <div className="absolute inset-0 w-full h-full will-change-transform isolate">
                            <TargetLayout
                                isActive={true}
                                expandedId={expandedId}
                                onExpandedChange={setExpandedId}
                                layoutMode={layoutMode}
                            />
                        </div>
                    )
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
