"use client";

import { RefObject, useMemo } from "react";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";

interface DefaultLayoutProps {
    navbarTextRef: RefObject<HTMLHeadingElement>;
    onSwitchLayout: (mode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => void;
    expandedId: string | null;
    onExpandedChange: (id: string | null) => void;
}

export default function DefaultLayout({ navbarTextRef, onSwitchLayout, expandedId, onExpandedChange }: DefaultLayoutProps) {

    // Hardcoded for Default Layout (static)
    const isDark = false;

    // Helper for button styles (simplified for Default Layout context)
    const getButtonClassName = (mode: string) => {
        const isActive = mode === "static";
        const baseClasses = "inline-flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap rounded-md text-[10px] xs:text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 sm:h-10 px-2 sm:px-4 py-2";

        if (isActive) {
            return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`;
        }
        return `${baseClasses} bg-secondary text-secondary-foreground hover:bg-secondary/80`;
    };

    const CircleGridComponent = LAYOUT_REGISTRY["honeycomb"]?.component;

    return (
        <div className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-background">
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: "hsl(var(--background))",
                }}
            />

            <header className="fixed left-0 right-0 flex flex-col sm:flex-row items-center pointer-events-none px-4 md:px-8 gap-3 sm:gap-6 z-30 top-[10px] sm:top-[20px] justify-center">
                <h1
                    ref={navbarTextRef}
                    className="font-bold tracking-tight pointer-events-none select-none text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center invisible"
                    style={{ textShadow: "none" }}
                >
                    <span>Alphabet</span>
                    <span className="block sm:inline ml-0 sm:ml-2 text-gradient">
                        Consultancy Services
                    </span>
                </h1>

                <div className="pointer-events-auto flex items-center backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-white/10 shadow-lg sm:ml-4 gap-0.5 sm:gap-2 transition-all duration-500 ease-in-out bg-background/50 max-w-full">
                    <button onClick={() => onSwitchLayout("static")} className={getButtonClassName("static")}>Default</button>
                    <button onClick={() => onSwitchLayout("olympic")} className={getButtonClassName("olympic")}>Olympic</button>
                    <button onClick={() => onSwitchLayout("3d-carousel")} className={getButtonClassName("3d-carousel")}>3D View</button>
                    <button onClick={() => onSwitchLayout("ticker")} className={getButtonClassName("ticker")}>Ticker</button>
                    <button onClick={() => onSwitchLayout("servicesSearch")} className={getButtonClassName("servicesSearch")}>Our Services</button>
                </div>
            </header>

            <div className="flex-1 relative overflow-hidden z-10 mt-[120px] sm:mt-[80px]">
                {CircleGridComponent && (
                    <div className="absolute inset-0 w-full h-full will-change-transform isolate">
                        <CircleGridComponent
                            isActive={true}
                            expandedId={expandedId}
                            onExpandedChange={onExpandedChange}
                            layoutMode="static"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
