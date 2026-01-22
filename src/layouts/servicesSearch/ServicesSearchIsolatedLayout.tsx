"use client";

import { useState, RefObject } from "react";
import ServicesSearchLayout from "./ServicesSearchLayout";

interface ServicesSearchIsolatedLayoutProps {
    showText: boolean;
    sidebarTextRef: RefObject<HTMLDivElement | null>;
    onSwitchLayout: (mode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => void;
}

export default function ServicesSearchIsolatedLayout({ showText, sidebarTextRef, onSwitchLayout }: ServicesSearchIsolatedLayoutProps) {
    return (
        <div className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-black text-white services-search-isolation">
            {/* Background - Strictly Black */}
            <div
                className="absolute inset-0 z-0"
                style={{ backgroundColor: "#000000" }}
            />

            <div className="flex-1 relative overflow-hidden z-10 mt-0">
                <div className="absolute inset-0 w-full h-full">
                    <ServicesSearchLayout showText={showText} sidebarTextRef={sidebarTextRef as RefObject<HTMLDivElement>} />
                </div>
            </div>
        </div>
    );
}
