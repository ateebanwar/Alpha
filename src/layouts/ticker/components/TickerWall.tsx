"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { getDataForHoneycomb, CircleData } from "@/data/dataAdapter";
import TickerCard from "./TickerCard";

const TickerWall = ({
    expandedId,
    onExpandedChange
}: {
    expandedId: string | null,
    onExpandedChange: (id: string | null) => void
}) => {
    // Load Data
    const [circleData, setCircleData] = useState<CircleData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [singleSetHeight, setSingleSetHeight] = useState(0);

    useEffect(() => {
        const data = getDataForHoneycomb();
        setCircleData(data);
        setIsLoaded(true);
    }, []);

    // Refs
    const scrollRef = useRef<HTMLDivElement>(null);
    const colRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Initial Scroll Position
    const INITIAL_SCROLL_OFFSET = 500000;
    const SCROLL_BUFFER_SIZE = 1000000;

    // Robust Measurement Logic (ResizeObserver)
    useEffect(() => {
        if (!isLoaded || !colRefs.current[1]) return;

        // Measure Column 1 (Present on mobile & desktop)
        const targetCol = colRefs.current[1];

        const updateHeight = () => {
            // We need the height of ONE loop iteration.
            // Our columns contain 4 copies. So loop height = totalHeight / 4.
            // We subtract a bit of gap if padding is internal, but flex-gap is external.
            // Flex gap is handled by the container. The column is just a div of cards.
            // If cards have gaps inside the column-div (flex-col gap-6), then totalHeight includes them.
            // Total Height = (Card + Gap) * Count
            // Loop Height = Total Height / 4
            if (targetCol) {
                const totalHeight = targetCol.scrollHeight;
                setSingleSetHeight(totalHeight / 4);
            }
        };

        const observer = new ResizeObserver(() => {
            // Debounce slightly or just run
            requestAnimationFrame(updateHeight);
        });

        observer.observe(targetCol);
        updateHeight(); // Initial check

        return () => observer.disconnect();
    }, [isLoaded, circleData]); // Re-bind on load

    // Scroll Logic
    useEffect(() => {
        const container = scrollRef.current;
        if (!container || !singleSetHeight) return;

        // Initialize Center
        if (container.scrollTop < 1000) {
            container.scrollTop = INITIAL_SCROLL_OFFSET;
        }

        let frameId: number;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;

            frameId = requestAnimationFrame(() => {
                const loopHeight = singleSetHeight;
                // Relative scroll from center
                const relativeScroll = scrollTop - INITIAL_SCROLL_OFFSET;

                // Modulo
                const loopOffset = relativeScroll % loopHeight;

                colRefs.current.forEach((col, index) => {
                    if (!col) return;
                    const isEven = index % 2 === 0;

                    if (isEven) {
                        // Even Cols: Scroll UP
                        col.style.transform = `translate3d(0, ${-loopOffset}px, 0)`;
                    } else {
                        // Odd Cols: Scroll DOWN
                        // We check math:
                        // If scrolling down (pos relativeScroll), loopOffset positive.
                        // We want content moving down.
                        // translate: -loopHeight + loopOffset
                        // e.g. loopHeight=1000. offset=100. result = -900 (moved down 100 from -1000)
                        col.style.transform = `translate3d(0, ${loopOffset - loopHeight}px, 0)`;
                    }
                });
            });
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            container.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(frameId);
        };
    }, [isLoaded, singleSetHeight]);

    // Data Prep
    const columns = useMemo(() => {
        if (!isLoaded || circleData.length === 0) return [];

        const cols: CircleData[][] = [[], [], [], []];
        // Consistent Shuffle
        const shuffled = [...circleData].sort((a, b) => a.id.localeCompare(b.id)); // Deterministic sort or use seed
        // To keep it random-looking but stable across re-renders without seed:
        // We can just dist raw. 
        // Or strictly shuffling inside useEffect to state. 
        // For now, let's just distribute sequentially for stability or use the initial load state if needed.
        // Re-using the random sort from prev step might cause jitter if re-memoized.
        // Let's stick to stable distribution of the input array which is already random-ish or constant.

        circleData.forEach((item, i) => { cols[i % 4].push(item); });

        return cols.map(col => {
            // 4 copies for buffer
            return [...col, ...col, ...col, ...col];
        });
    }, [circleData, isLoaded]);

    if (!isLoaded) return null;

    // Opacity fade-in to hide initial jump
    return (
        <div
            className="relative w-full h-full overflow-hidden bg-background transition-opacity duration-300"
            style={{ opacity: singleSetHeight ? 1 : 0 }}
        >
            {/* Native Scroll Proxy */}
            <div ref={scrollRef} className="scroll-proxy">
                <div className="virtual-track" style={{ height: `${SCROLL_BUFFER_SIZE}px` }} />
            </div>

            {/* Top/Bottom Fade Masks */}
            <div className="absolute top-0 left-0 right-0 h-24 z-20 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 z-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            {/* Visual Columns */}
            <div className="flex w-full h-full gap-4 md:gap-6 px-4 md:px-8 justify-center pointer-events-none">
                {columns.map((colItems, colIndex) => {
                    // Mobile Visibility: Col 1 & 2 only (Index 1 & 2) to ensure density?
                    // Previous CSS was hiding 0 and 3. That leaves 1 and 2. Correct.
                    // We measure Index 1, which is visible.
                    const mobileClass = (colIndex === 0 || colIndex === 3) ? "ticker-column-hidden-mobile" : "";

                    return (
                        <div
                            key={`col-${colIndex}`}
                            className={`flex-1 relative h-full overflow-visible ticker-column ${mobileClass} flex justify-center`}
                        >
                            <div
                                ref={el => { colRefs.current[colIndex] = el }}
                                className={`flex flex-col gap-6 w-full`}
                                style={{
                                    willChange: 'transform',
                                    // Initial offset for down-scrolling (odd) cols is handled by transform logic
                                    // But we need to ensure content exists "above"
                                    // Our transform for odd is `loopOffset - loopHeight`.
                                    // Max negative is `-loopHeight`.
                                    // So we need clear space above? No, negative transform moves it UP.
                                    // Wait. `translateY(-1000px)` moves the element UP.
                                    // If we conform to `loopOffset - loopHeight` (e.g. 0 - 1000 = -1000), 
                                    // The element is shifted UP by 1000px.
                                    // So we are seeing the "bottom" part of the column?
                                    // Yes. As we scroll down (offset increases), the value becomes less negative (-900), moving DOWN.
                                    // So we simply need to ensure the column is rendered normally in flow.
                                    // Since we have 4 copies, shifting up by 1/4th height is safe.
                                }}
                            >
                                {/* Render Items */}
                                {colItems.map((item, i) => (
                                    <div key={`${item.id}-${colIndex}-${i}`} className="pointer-events-auto">
                                        <TickerCard
                                            circle={item}
                                            onClick={() => onExpandedChange(item.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TickerWall;
