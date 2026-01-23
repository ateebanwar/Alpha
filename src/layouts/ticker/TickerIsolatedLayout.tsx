"use client";

import { useState, RefObject, useMemo } from "react";
import { TickerLayout as TickerContent } from "./index";
import CirclePopup from "@/layouts/shared/CirclePopup";
import { getDataForHoneycomb } from "@/data/dataAdapter";

interface TickerIsolatedLayoutProps {
    navbarTextRef: RefObject<HTMLHeadingElement>;
    onSwitchLayout: (mode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => void;
}

export default function TickerIsolatedLayout({ navbarTextRef, onSwitchLayout }: TickerIsolatedLayoutProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Ticker might use Honeycomb data for popups? Matches HomeClient logic.
    const circleData = useMemo(() => getDataForHoneycomb(), []);
    const activeCircle = useMemo(() =>
        expandedId ? circleData.find(c => c.id === expandedId) : null,
        [expandedId, circleData]
    );

    // Helper for button styles (simplified for Ticker Layout context)
    const getButtonClassName = (mode: string) => {
        const isActive = mode === "ticker";
        const baseClasses = "inline-flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap rounded-md text-[10px] xs:text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 sm:h-10 px-2 sm:px-4 py-2";

        if (isActive) {
            return `${baseClasses} bg-secondary text-secondary-foreground hover:bg-secondary/80`; // Ticker usually light/default theme?
            // Checking HomeClient: isDark includes 'servicesSearch', 'olympic', '3d-carousel'.
            // So Ticker is NOT dark?
            // Line 198: layoutMode === "olympic" || layoutMode === "3d-carousel" || layoutMode === "servicesSearch"
            // Ticker is NOT in that list. So isDark = false.
            // Hence using Light mode styles.
        }
        return `${baseClasses} bg-secondary text-secondary-foreground hover:bg-secondary/80`;
    };

    return (
        <div className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-background text-foreground ticker-layout-isolation">
            {/* Background - Default/Light for Ticker */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: "hsl(var(--background))",
                }}
            />

            <header className="fixed left-0 right-0 flex flex-col sm:flex-row items-center pointer-events-none px-4 md:px-8 gap-3 sm:gap-6 z-30 top-[10px] sm:top-[20px] justify-center">
                <h1
                    ref={navbarTextRef}
                    className="font-bold tracking-tight pointer-events-none select-none text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center invisible"
                    style={{ textShadow: "none" }}
                >
                    <span className="">Alphabet</span>
                    <span className="inline ml-2 text-gradient">
                        Consultancy Services
                    </span>
                </h1>

                <div className="pointer-events-auto flex items-center backdrop-blur-sm p-1 sm:p-1.5 rounded-full border border-white/10 shadow-lg sm:ml-4 gap-0.5 sm:gap-2 transition-all duration-500 ease-in-out bg-background/50 max-w-full">
                    <button onClick={() => onSwitchLayout("static")} className={getButtonClassName("static")}>Default</button>
                    <button onClick={() => onSwitchLayout("olympic")} className={getButtonClassName("olympic")}>Olympic</button>
                    <button onClick={() => onSwitchLayout("3d-carousel")} className={getButtonClassName("3d-carousel")}>3D View</button>
                    <button onClick={() => onSwitchLayout("ticker")} className={getButtonClassName("ticker")}>Ticker</button>
                    <button onClick={() => onSwitchLayout("servicesSearch")} className={getButtonClassName("servicesSearch")}>Services</button>
                </div>
            </header>

            <div className="flex-1 relative overflow-hidden z-10 mt-[120px] sm:mt-[80px]">
                <div className="absolute inset-0 w-full h-full will-change-transform isolate">
                    <TickerContent
                        isActive={true}
                        expandedId={expandedId}
                        onExpandedChange={setExpandedId}
                        layoutMode="ticker"
                    />
                </div>
            </div>

            {/* Popup Container - Isolated inside Ticker Layout */}
            {activeCircle && (
                <div id="ticker-layout-container" style={{ position: 'absolute', zIndex: 99999 }}>
                    <CirclePopup
                        circle={activeCircle}
                        onClose={() => setExpandedId(null)}
                        isOlympic={false}
                    />
                </div>
            )}
        </div>
    );
}
