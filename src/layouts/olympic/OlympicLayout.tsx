"use client";

import { useState, RefObject } from "react";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";
import CirclePopup from "@/layouts/shared/CirclePopup";
import { getDataForHoneycomb } from "@/data/dataAdapter";

interface OlympicLayoutProps {
    navbarTextRef: RefObject<HTMLHeadingElement>;
    onSwitchLayout: (mode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => void;
}

export default function OlympicLayout({ navbarTextRef, onSwitchLayout }: OlympicLayoutProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Olympic specific customization
    const isDark = true;

    // Get CircleGrid component
    const CircleGridComponent = LAYOUT_REGISTRY["honeycomb"]?.component;

    // Get Data for Popup
    const circleData = getDataForHoneycomb();
    const activeCircle = expandedId ? circleData.find(c => c.id === expandedId) : null;

    // Helper for button styles (simplified for Olympic Layout context)
    const getButtonClassName = (mode: string) => {
        const isActive = mode === "olympic";
        const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

        if (isActive) {
            return `${baseClasses} bg-white text-black hover:bg-white/90`;
        }
        return `${baseClasses} bg-gray-700 text-white hover:bg-gray-600`;
    };

    return (
        <div className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-black text-white olympic-layout-isolation">
            {/* Background - Strictly Black for Olympic */}
            <div
                className="absolute inset-0 z-0 bg-black"
                style={{ backgroundColor: "#000000" }}
            />

            <header className="fixed left-0 right-0 flex flex-col md:flex-row items-center pointer-events-none px-4 md:px-0 gap-4 md:gap-0 z-30 top-[10px] justify-center">
                <h1
                    ref={navbarTextRef}
                    className="font-bold tracking-tight pointer-events-none select-none text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left md:mr-4 invisible"
                    style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                >
                    <span className="text-white">Alphabet</span>
                    <span className="block sm:inline ml-0 sm:ml-2 text-gradient">
                        Consultancy Services
                    </span>
                </h1>

                <div className="pointer-events-auto flex items-center backdrop-blur-sm p-1 rounded-full border border-white/20 shadow-lg md:ml-4 gap-2 transition-all duration-500 ease-in-out bg-white/5 opacity-100 scale-100">
                    <button onClick={() => onSwitchLayout("static")} className={getButtonClassName("static")}>Default</button>
                    <button onClick={() => onSwitchLayout("olympic")} className={getButtonClassName("olympic")}>Olympic</button>
                    <button onClick={() => onSwitchLayout("3d-carousel")} className={getButtonClassName("3d-carousel")}>3D View</button>
                    <button onClick={() => onSwitchLayout("ticker")} className={getButtonClassName("ticker")}>Ticker</button>
                    <button onClick={() => onSwitchLayout("servicesSearch")} className={getButtonClassName("servicesSearch")}>Our Services</button>
                </div>
            </header>

            <div className="flex-1 relative overflow-hidden z-10 mt-[140px] md:mt-[70px]">
                {CircleGridComponent && (
                    <div className="absolute inset-0 w-full h-full will-change-transform isolate">
                        <CircleGridComponent
                            isActive={true}
                            expandedId={expandedId}
                            onExpandedChange={setExpandedId}
                            layoutMode="olympic"
                        />
                    </div>
                )}
            </div>

            {/* Popup Container - Isolated inside Olympic Layout */}
            {activeCircle && (
                <div id="olympic-layout-container" style={{ position: 'absolute', zIndex: 99999 }}>
                    <CirclePopup
                        circle={activeCircle}
                        onClose={() => setExpandedId(null)}
                        isOlympic={true}
                    />
                </div>
            )}
        </div>
    );
}
