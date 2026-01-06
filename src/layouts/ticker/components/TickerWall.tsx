"use client";

import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { getDataForHoneycomb, CircleData } from "@/data/dataAdapter";
import TickerCard from "./TickerCard";

const TickerWall = ({
    expandedId,
    onExpandedChange
}: {
    expandedId: string | null,
    onExpandedChange: (id: string | null) => void
}) => {
    // 1. Setup Scroll State - Restore original Framer Motion scrolling
    const scrollY = useMotionValue(0);
    const [circleData, setCircleData] = useState<CircleData[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [columnHeight, setColumnHeight] = useState(0);
    const colRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load data on mount to avoid blocking initial render
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = getDataForHoneycomb();
                setCircleData(data);
                setIsDataLoaded(true);
            } catch (error) {
                console.error("Failed to load circle data:", error);
            }
        };
        loadData();
    }, []);

    // 2. Optimized height measurement - only when data is loaded and DOM is ready
    const measureHeight = useCallback(() => {
        if (colRef.current && isDataLoaded) {
            // Use requestAnimationFrame to avoid blocking
            requestAnimationFrame(() => {
                const totalHeight = colRef.current!.offsetHeight;
                setColumnHeight(totalHeight / 3);
            });
        }
    }, [isDataLoaded]);

    useEffect(() => {
        if (isDataLoaded) {
            // Measure immediately, then again after a short delay for stability
            measureHeight();
            const timer = setTimeout(measureHeight, 50);
            return () => clearTimeout(timer);
        }
    }, [isDataLoaded, measureHeight]);

    // Resize handler - throttled
    useEffect(() => {
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(measureHeight, 100);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [measureHeight]);

    // 3. Handle Wheel Event - Restore original wheel scrolling
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (expandedId) return; // Disable scroll when expanded
            e.preventDefault();
            // Standardize scroll speed
            const delta = e.deltaY;
            const current = scrollY.get();
            scrollY.set(current - delta);
        };

        // Attach to window for better scroll capture
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [scrollY, expandedId]);

    // 4. Optimized columns computation - only when data is ready
    const columns = useMemo(() => {
        if (!isDataLoaded || circleData.length === 0) return [];

        const count = 4;
        const result = Array.from({ length: count }, () => [...circleData]);

        // Shuffle each column a bit so they aren't identical - but do it efficiently
        return result.map((col) => {
            // Simple shuffle - more efficient than sort
            for (let i = col.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [col[i], col[j]] = [col[j], col[i]];
            }
            // Triple the data for seamless infinite scroll
            return [...col, ...col, ...col];
        });
    }, [circleData, isDataLoaded]);

    // 5. Transform Logic - Restore original infinite scrolling transforms
    const yEven = useTransform(scrollY, (value) => {
        if (!columnHeight) return 0;
        const directionValue = value;
        return (directionValue % columnHeight + columnHeight) % columnHeight - columnHeight;
    });

    const yOdd = useTransform(scrollY, (value) => {
        if (!columnHeight) return 0;
        const directionValue = value * -1;
        return (directionValue % columnHeight + columnHeight) % columnHeight - columnHeight;
    });

    // Don't render until data is loaded to prevent layout shifts
    if (!isDataLoaded || columns.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Loading ticker...</div>
            </div>
        );
    }

    return (
        <div
            id="ticker-container"
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-background px-4 md:px-8 ${expandedId ? 'pointer-events-none' : ''}`}
        >
            <div className="flex gap-4 md:gap-8 h-full max-w-[1600px] mx-auto">
                {columns.map((col, colIndex) => {
                    const isEven = colIndex % 2 === 0;
                    const y = isEven ? yEven : yOdd;

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
