"use client";

import { useState } from "react";
import CircleGrid from "@/components/CircleGrid";

export default function HomeClient() {
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic" /* | "spatial" */>("static");

    return (
        <main className="fixed inset-0 bg-background flex flex-col p-0">
            <header className="fixed top-[10px] left-0 right-0 z-30 flex flex-col md:flex-row items-center justify-center pointer-events-none px-4 md:px-0 gap-4 md:gap-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight text-center md:text-left md:mr-4">
                    Alphabet
                    <span className="text-gradient block sm:inline ml-0 sm:ml-2">Consultancy Services</span>
                </h1>

                <div className="pointer-events-auto flex items-center bg-background/50 backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-lg md:ml-4 gap-2">
                    <button
                        onClick={() => setLayoutMode(prev => prev === "static" ? "olympic" : "static")}
                        className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-sm whitespace-nowrap"
                    >
                        {layoutMode === "static" ? "Olympic" : "Default"}
                    </button>

                    {/* 
                    <button
                        onClick={() => setLayoutMode("spatial")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap ${
                            layoutMode === "spatial" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                    >
                        Spatial Zoom
                    </button>
                    */}
                </div>
            </header>

            <div className="flex-1 relative mt-[140px] md:mt-[70px] overflow-hidden">
                <CircleGrid layoutMode={layoutMode as any} />
            </div>
        </main>
    );
}
