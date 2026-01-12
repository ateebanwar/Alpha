"use client";

import { useState, RefObject } from "react";
import ServicesSearchLayout from "./ServicesSearchLayout";

interface ServicesSearchIsolatedLayoutProps {
    showText: boolean;
    sidebarTextRef: RefObject<HTMLDivElement | null>;
    onSwitchLayout: (mode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => void;
}

export default function ServicesSearchIsolatedLayout({ showText, sidebarTextRef, onSwitchLayout }: ServicesSearchIsolatedLayoutProps) {
    // Local state for the menu button (Isolated from HomeClient)
    // In HomeClient, this was initialized to false upon entry.
    const [showButtons, setShowButtons] = useState(false);

    return (
        <div className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-black text-white services-search-isolation">
            {/* Background - Strictly Black */}
            <div
                className="absolute inset-0 z-0"
                style={{ backgroundColor: "#000000" }}
            />

            <div className="flex-1 relative overflow-hidden z-10 mt-0">
                <div className="absolute inset-0 w-full h-full">
                    <ServicesSearchLayout showText={showText} sidebarTextRef={sidebarTextRef} />
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => {
                    if (showButtons) {
                        setShowButtons(false);
                    } else {
                        // Exit servicesSearch mode
                        onSwitchLayout("static");
                    }
                }}
                className="fixed bottom-4 left-4 z-40 px-3 py-2 rounded-lg text-xs font-medium shadow-lg transition-all duration-300 ease-in-out bg-white/90 text-black hover:bg-white"
                style={{
                    backdropFilter: "blur(10px)",
                }}
            >
                <span className="flex items-center gap-1.5">
                    {showButtons ? "✕" : "☰"} {showButtons ? "Hide" : "Menu"}
                </span>
            </button>
        </div>
    );
}
