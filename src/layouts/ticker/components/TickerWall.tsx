"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { circleData } from "@/data/circleData";
import TickerCard from "./TickerCard";

const TickerWall = ({
    expandedId,
    onExpandedChange
}: {
    expandedId: string | null,
    onExpandedChange: (id: string | null) => void
}) => {
    // 1. Setup Scroll State
    const scrollY = useMotionValue(0);
    const [columnHeight, setColumnHeight] = useState(0);
    const colRef = useRef<HTMLDivElement>(null);

    // 2. Measure Height for Infinite Loop
    useEffect(() => {
        if (colRef.current) {
            // The column contains 3 sets of data. We need the height of ONE set for the loop.
            // box-border model: offsetHeight includes padding/border
            const totalHeight = colRef.current.offsetHeight;
            setColumnHeight(totalHeight / 3);
        }

        const handleResize = () => {
            if (colRef.current) {
                setColumnHeight(colRef.current.offsetHeight / 3);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 3. Handle Wheel Event
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (expandedId) return; // Disable scroll when expanded
            e.preventDefault();
            // Standardize scroll speed
            const delta = e.deltaY;
            const current = scrollY.get();
            scrollY.set(current - delta);
        };

        // Attach to window or a specific container?
        // The user wants "The main viewport (screen) must remain fully locked".
        // Attaching to window ensures no escape, but component level is cleaner if full screen.
        // Given HomeClient has fixed inset-0, we can attach to the document or the container ref if it covers screen.
        // Let's attach to the container ref for better isolation, but ensure it captures everything.
        const container = document.getElementById("ticker-container");
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel);
            }
        };
    }, [scrollY, expandedId]);

    // Distribute circleData into 4 columns (or 2 on mobile)
    const columns = useMemo(() => {
        const count = 4;
        const result = Array.from({ length: count }, () => [...circleData]);

        // Shuffle each column a bit so they aren't identical
        return result.map((col, i) => {
            const shuffled = [...col].sort(() => Math.random() - 0.5);
            // Triple the data for seamless infinite scroll
            return [...shuffled, ...shuffled, ...shuffled];
        });
    }, []);

    // 4. Transform Logic (Moved outside map)
    const yEven = useTransform(scrollY, (value) => {
        if (!columnHeight) return 0;
        const directionValue = value;
        return ((directionValue % columnHeight) - columnHeight) % columnHeight;
    });

    const yOdd = useTransform(scrollY, (value) => {
        if (!columnHeight) return 0;
        const directionValue = value * -1;
        return ((directionValue % columnHeight) - columnHeight) % columnHeight;
    });

    return (
        <div
            id="ticker-container"
            className={`w-full h-full overflow-hidden bg-background px-4 md:px-8 ${expandedId ? 'pointer-events-none' : ''}`}
        >
            <div className="flex gap-4 md:gap-8 h-full max-w-[1600px] mx-auto">
                {columns.map((col, colIndex) => {
                    const isEven = colIndex % 2 === 0;

                    const y = isEven ? yEven : yOdd;

                    return (
                        <div
                            key={`ticker-col-${colIndex}`}
                            className={`flex-1 flex flex-col gap-4 md:gap-8 h-full relative`} // Added relative
                            style={{
                                // Hide columns on mobile via CSS as before
                                display: (colIndex === 0 || colIndex === 3) ? 'var(--mobile-display, flex)' : 'flex'
                            }}
                        >
                            {/* Masking gradients for top/bottom smoothness */}
                            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

                            <motion.div
                                ref={colIndex === 0 ? colRef : null} // Measure first column
                                style={{ y }}
                                className="flex flex-col gap-4 md:gap-8"
                            >
                                {col.map((circle, itemIndex) => (
                                    <TickerCard
                                        key={`${colIndex}-${circle.id}-${itemIndex}`}
                                        circle={circle}
                                        onClick={() => onExpandedChange(circle.id)}
                                    />
                                ))}
                            </motion.div>
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
