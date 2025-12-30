"use client";

import { useState } from "react";
import CircleGrid from "@/components/CircleGrid";

export default function HomeClient() {
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic">("static");

    return (
        <main className="fixed inset-0 bg-background flex flex-col p-0">
            <header className="fixed top-[10px] left-0 right-0 z-30 flex items-center justify-center pointer-events-none">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mr-4">
                    Alphabet
                    <span className="text-gradient ml-2">Consultancy Services</span>
                </h1>

                <div className="pointer-events-auto flex items-center bg-background/50 backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-lg ml-4">
                    <button
                        onClick={() => setLayoutMode(prev => prev === "static" ? "olympic" : "static")}
                        className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
                    >
                        {layoutMode === "static" ? "Olympic" : "Default"}
                    </button>
                </div>
            </header>

            <div className="flex-1 relative mt-[70px] overflow-hidden">
                <CircleGrid layoutMode={layoutMode} />
            </div>
        </main>
    );
}
