"use client";

import { useState, RefObject } from "react";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";

interface Carousel3DLayoutProps {
    navbarTextRef: RefObject<HTMLHeadingElement>;
    onSwitchLayout: (mode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => void;
}

export default function Carousel3DLayout({ navbarTextRef, onSwitchLayout }: Carousel3DLayoutProps) {
    // 3D Layout state
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // 3D Layout is Dark
    const isDark = true;

    // Get Carousel component
    const CarouselComponent = LAYOUT_REGISTRY["3d-carousel"]?.component;

    // Helper for button styles (simplified for 3D Layout context)
    const getButtonClassName = (mode: string) => {
        const isActive = mode === "3d-carousel";
        const baseClasses = "inline-flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap rounded-md text-[10px] xs:text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 sm:h-10 px-2 sm:px-4 py-2";

        if (isActive) {
            return `${baseClasses} bg-white text-black hover:bg-white/90`;
        }
        return `${baseClasses} bg-gray-700 text-white hover:bg-gray-600`;
    };

    return (
        <div className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-black text-white carousel-3d-layout-isolation">
            {/* Background - Strictly Black/Dark for 3D */}
            <div
                className="absolute inset-0 z-0"
                style={{ backgroundColor: "#000000" }}
            />

            <header className="fixed left-0 right-0 flex flex-col sm:flex-row items-center pointer-events-none px-4 md:px-8 gap-3 sm:gap-6 z-30 top-[10px] sm:top-[20px] justify-center">
                <h1
                    ref={navbarTextRef}
                    className="font-bold tracking-tight pointer-events-none select-none text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center invisible"
                    style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                >
                    <span className="text-white">Alphabet</span>
                    <span className="inline ml-2 text-gradient">
                        Consultancy Services
                    </span>
                </h1>

                <div className="pointer-events-auto flex items-center backdrop-blur-sm p-1 sm:p-1.5 rounded-full border border-white/20 shadow-lg sm:ml-4 gap-0.5 sm:gap-2 transition-all duration-500 ease-in-out bg-white/5 max-w-full">
                    <button onClick={() => onSwitchLayout("static")} className={getButtonClassName("static")}>Default</button>
                    <button onClick={() => onSwitchLayout("olympic")} className={getButtonClassName("olympic")}>Olympic</button>
                    <button onClick={() => onSwitchLayout("3d-carousel")} className={getButtonClassName("3d-carousel")}>3D View</button>
                    <button onClick={() => onSwitchLayout("ticker")} className={getButtonClassName("ticker")}>Ticker</button>
                    <button onClick={() => onSwitchLayout("servicesSearch")} className={getButtonClassName("servicesSearch")}>Our Services</button>
                </div>
            </header>

            <div className="flex-1 relative overflow-hidden z-10 mt-[120px] sm:mt-[80px]">
                {CarouselComponent && (
                    <div className="absolute inset-0 w-full h-full will-change-transform isolate">
                        <CarouselComponent
                            isActive={true}
                            expandedId={expandedId}
                            onExpandedChange={setExpandedId}
                            layoutMode="3d-carousel"
                        />
                    </div>
                )}
            </div>

            {/* 3D Layout might need popups? 
                The original code didn't render CirclePopup for 3d-carousel explicitly in the bottom block, 
                so relying on inner component logic or no popup.
                Original 'TargetLayout' (CarouselLayout) prop 'expandedId' suggests it might handle expansion internally.
            */}
        </div>
    );
}
