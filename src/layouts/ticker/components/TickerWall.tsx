"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { getDataForTicker, TickerItem } from "@/data/dataAdapter";
import TickerCard from "./TickerCard";

const tickerData = getDataForTicker();

const TickerWall = ({
    expandedId,
    onExpandedChange
}: {
    expandedId: string | null,
    onExpandedChange: (id: string | null) => void
}) => {
    // 1. Setup State & Refs
    const [columnHeight, setColumnHeight] = useState(0);
    const colRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll State (Refs for performance to avoid re-renders)
    const state = useRef({
        currentY: 0,
        targetY: 0,
        isDragging: false
    });

    // 2. Measure Height for Infinite Loop
    useEffect(() => {
        const measure = () => {
            if (colRef.current) {
                // The column contains 3 sets of data. We need the height of ONE set for the loop.
                const totalHeight = colRef.current.offsetHeight;
                setColumnHeight(totalHeight / 3);
            }
        };

        measure();
        // Delay measurement slightly to ensure DOM is ready? 
        // Or depend on images loading? Images are setup to maintain aspect ratio, hopefully stable.
        const timer = setTimeout(measure, 100);

        const handleResize = () => {
            measure();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    // 3. Animation Loop (GSAP Ticker)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const update = () => {
                if (!columnHeight) return;

                // Lerp smoothing
                state.current.currentY += (state.current.targetY - state.current.currentY) * 0.08;

                const y = state.current.currentY;

                // Apply to columns
                const cols = containerRef.current?.querySelectorAll(".ticker-col-inner");
                if (cols) {
                    cols.forEach((col, i) => {
                        const isEven = i % 2 === 0;
                        const direction = isEven ? 1 : -1;
                        const val = y * direction;

                        // Use GSAP's utility for perfect wrapping
                        // Range [-columnHeight, 0]
                        gsap.set(col, { y: gsap.utils.wrap(-columnHeight, 0, val) });
                    });
                }
            };

            gsap.ticker.add(update);

            // Return cleanup function which GSAP context will call on revert()
            return () => gsap.ticker.remove(update);
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [columnHeight]);

    // 4. Handle Wheel Event
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (expandedId) return;
            e.preventDefault();

            // Adjust sensitivity
            const delta = e.deltaY * 0.8;
            state.current.targetY -= delta;
        };

        const container = document.getElementById("ticker-container");
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel);
            }
        };
    }, [expandedId]);

    // Distribute tickerData into 4 columns (or 2 on mobile)
    const columns = useMemo(() => {
        const count = 4;
        const result = Array.from({ length: count }, () => [...tickerData]);

        // Shuffle each column a bit so they aren't identical
        return result.map((col, i) => {
            const shuffled = [...col].sort(() => Math.random() - 0.5);
            // Triple the data for seamless infinite scroll
            return [...shuffled, ...shuffled, ...shuffled];
        });
    }, []);

    return (
        <div
            id="ticker-container"
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-background px-4 md:px-8 ${expandedId ? 'pointer-events-none' : ''}`}
        >
            <div className="flex gap-4 md:gap-8 h-full max-w-[1600px] mx-auto">
                {columns.map((col, colIndex) => {
                    return (
                        <div
                            key={`ticker-col-${colIndex}`}
                            className={`flex-1 flex flex-col gap-4 md:gap-8 h-full relative`}
                            style={{
                                display: (colIndex === 0 || colIndex === 3) ? 'var(--mobile-display, flex)' : 'flex'
                            }}
                        >
                            {/* Masking gradients for top/bottom smoothness */}
                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

                            <div
                                ref={colIndex === 0 ? colRef : null} // Measure first column
                                className="flex flex-col gap-4 md:gap-8 ticker-col-inner will-change-transform"
                            >
                                {col.map((item, itemIndex) => (
                                    <TickerCard
                                        key={`${colIndex}-${item.id}-${itemIndex}`}
                                        item={item}
                                        onClick={() => onExpandedChange(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx global>{`
                @media (max-width: 768px) {
                    /* Hide outer columns on mobile for better density */
                    .flex-1:nth-child(1), .flex-1:nth-child(4) {
                        --mobile-display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default TickerWall;
