"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { circleData } from "@/data/circleData";
import InteractiveCircle from "@/layouts/shared/InteractiveCircle";
import CircleWrapper from "./CircleWrapper";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDebouncedWindowSize } from "@/hooks/use-debounced-window-size";


const OlympicChunk = ({
    children,
    index,
    scrollY,
    height,
    isVisible
}: {
    children: React.ReactNode;
    index: number;
    scrollY: any;
    height: number;
    isVisible: boolean;
}) => {
    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                height: `${height}px`,
                width: '100%',
                scrollSnapAlign: 'start',
                zIndex: index + 10,
                pointerEvents: isVisible ? 'none' : 'none',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
            }}
        >
            {children}
        </div>
    );
};

const CircleGrid = ({
    layoutMode = "static",
    expandedId,
    onExpandedChange
}: {
    layoutMode?: "static" | "olympic",
    expandedId: string | null,
    onExpandedChange: (id: string | null) => void
}) => {
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({ container: containerRef });

    // Prevent hydration mismatch by only rendering after client mount
    const [isClient, setIsClient] = useState(false);
    // Animation key to trigger entrance animation on layout changes
    const [animationKey, setAnimationKey] = useState(0);
    // Track visible chunks for Olympic layout
    const [visibleChunks, setVisibleChunks] = useState<Set<number>>(new Set([0]));

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Trigger entrance animation when switching to static layout
    useEffect(() => {
        if (layoutMode === "static") {
            setAnimationKey(prev => prev + 1);
        }
    }, [layoutMode]);

    const OLYMPIC_COLORS = [
        "#0081C8", // Blue
        "#414141", // Black
        "#EE334E", // Red
        "#FCB131", // Yellow
        "#00A651", // Green
    ];

    // Optimized: Sorted and filtered data - memoized once since circleData is static
    const sortedCircleData = useMemo(() => {
        const priorityLabels = [
            "About Us", "Contact", "Location", "Consulting", "Experience", "Our Process"
        ];
        return circleData.slice().sort((a, b) => {
            const indexA = priorityLabels.indexOf(a.label);
            const indexB = priorityLabels.indexOf(b.label);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
        });
    }, []); // Empty deps since circleData is static

    const navCircleIds = useMemo(() => ["about", "web-dev", "process", "contact"], []);

    // Memoized callback to prevent re-renders
    const handleExpand = useCallback((circleId: string) => {
        onExpandedChange(circleId);
    }, [onExpandedChange]);

    // Optimized: Use debounced window size to prevent excessive re-renders
    const windowSize = useDebouncedWindowSize(150);

    // Calculate coordinates for all circles
    const circlePositions = useMemo(() => {
        const positions: Array<{ id: string; x: number; y: number; size: number; variant: "default" | "olympic"; color?: string }> = [];

        // --- ENHANCED RESPONSIVE PARAMETERS ---
        const isUltraSmall = windowSize.width < 375;
        const isMobile = windowSize.width < 640;
        const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
        const isLandscape = windowSize.height < windowSize.width && windowSize.height < 600;

        // --- HEADER HEIGHT CONSTANTS (Sync with DefaultLayout) ---
        const HEADER_HEIGHTS = { mobile: 120, tablet: 80, desktop: 80 };
        const currentHeaderHeight = isMobile ? HEADER_HEIGHTS.mobile : (isTablet ? HEADER_HEIGHTS.tablet : HEADER_HEIGHTS.desktop);
        const availableHeight = windowSize.height - currentHeaderHeight;

        // --- OLYMPIC CALCULATIONS ---
        const oPadding = isUltraSmall ? 10 : (isMobile ? 20 : 80);
        const oWidthConstraint = (windowSize.width - oPadding) / 3.2;
        const oHeightConstraint = (availableHeight - (isMobile ? 40 : 100)) / 2.2;
        const oDeterminedSize = Math.min(oWidthConstraint, oHeightConstraint);
        // Better min/max bounds for Olympic circles
        const oSize = isUltraSmall ? Math.max(oDeterminedSize, 90) : (isMobile ? Math.max(oDeterminedSize, 110) : Math.max(oDeterminedSize, 80));
        const oGridCellSize = oSize / 2;
        const oHorizontalGap = isUltraSmall ? 8 : (isMobile ? 10 : 20);

        // --- STATIC CALCULATIONS ---
        let sCols = 6;
        let sPadding = 30;
        let sSafetyBuffer = 80;

        if (isUltraSmall) {
            sCols = 3;
            sPadding = 10;
            sSafetyBuffer = 30;
        } else if (isMobile) {
            sCols = isLandscape ? 5 : 4;
            sPadding = 15;
            sSafetyBuffer = isLandscape ? 20 : 40;
        } else if (isTablet) {
            sCols = 5;
            sPadding = 25;
            sSafetyBuffer = 60;
        }

        const availableWidth = windowSize.width - (sPadding * 2);
        const sizeByWidth = (availableWidth / sCols) - (isUltraSmall ? 8 : 15);
        const numRows = Math.ceil(sortedCircleData.length / sCols);
        const sizeByHeight = (availableHeight - sSafetyBuffer) / (numRows * 0.9);

        // Improved responsive size with better min/max bounds
        let minSize = 60;
        let maxSize = 160;

        if (isUltraSmall) {
            minSize = 70;
            maxSize = 100;
        } else if (isMobile && isLandscape) {
            minSize = 50;
            maxSize = 80;
        } else if (isMobile) {
            minSize = 65;
            maxSize = 120;
        }

        const sSize = Math.min(Math.max(Math.min(sizeByWidth, sizeByHeight), minSize), maxSize);

        // Staggered layout parameters
        const isStaggered = windowSize.width > 640;
        const sHorizontalGap = sSize * 0.05;
        const sVerticalGap = isStaggered ? -(sSize * 0.08) : 10;
        const sWrapperPadding = sPadding;

        // Calculate Vertical Centering
        const sGridTotalHeight = numRows * sSize + (numRows - 1) * sVerticalGap;
        // Centering offset (ensure at least padding)
        const sGridStartY = Math.max(sWrapperPadding, (availableHeight - sGridTotalHeight) / 2);

        // Process each circle
        sortedCircleData.forEach((circle, index) => {
            // 1. Static Position
            const sRow = Math.floor(index / sCols);
            const sCol = index % sCols;
            const isOddRow = isStaggered && sRow % 2 === 1;

            const sGridTotalWidth = sCols * sSize + (sCols - 1) * sHorizontalGap;
            const sGridStartX = (windowSize.width - sGridTotalWidth) / 2;

            let sx = sGridStartX + sCol * (sSize + sHorizontalGap);
            if (isOddRow) sx += sSize * 0.5;

            // Apply calculated vertical centering
            const sy = sGridStartY + sRow * (sSize + sVerticalGap);

            // 2. Olympic Position
            const chunkIndex = Math.floor(index / 5);
            const posInChunk = index % 5;
            const tuckAmount = oSize * 0.25;

            const oGridTotalWidth = (3 * 2 * oGridCellSize) + (2 * oHorizontalGap);
            const oChunkStartX = (windowSize.width - oGridTotalWidth) / 2;

            // Optical centering: shift slightly upward on mobile (availableHeight * 0.45 instead of 0.5)
            const verticalCenterOffset = isMobile ? availableHeight * 0.45 : availableHeight * 0.5;
            const oChunkStartY = verticalCenterOffset - ((2 * oSize - tuckAmount) / 2) + (chunkIndex * availableHeight);

            let ox = 0;
            let oy = 0;

            if (posInChunk === 0) ox = oChunkStartX;
            else if (posInChunk === 1) ox = oChunkStartX + 2 * (oGridCellSize + oHorizontalGap / 2);
            else if (posInChunk === 2) ox = oChunkStartX + 4 * (oGridCellSize + oHorizontalGap / 2);
            else if (posInChunk === 3) ox = oChunkStartX + 1 * (oGridCellSize + oHorizontalGap / 2);
            else if (posInChunk === 4) ox = oChunkStartX + 3 * (oGridCellSize + oHorizontalGap / 2);

            if (posInChunk < 3) oy = oChunkStartY;
            else oy = oChunkStartY + (oSize - tuckAmount);

            positions.push({
                id: circle.id,
                x: layoutMode === "static" ? sx : ox,
                y: layoutMode === "static" ? sy : oy,
                size: layoutMode === "static" ? sSize : oSize,
                variant: layoutMode === "static" ? "default" : "olympic",
                color: OLYMPIC_COLORS[index % 5]
            });
        });

        return positions;
    }, [windowSize, layoutMode, sortedCircleData]);

    // Optimized: Generate oscillation params once since they don't need to change
    const oscillationParams = useMemo(() => {
        return sortedCircleData.map(() => ({
            amplitude: Math.random() * 5,
            frequency: 0.001 + Math.random() * 0.003,
            phase: Math.random() * Math.PI * 2,
            angle: Math.random() * Math.PI * 2,
        }));
    }, []); // Empty deps - generate once

    const olympicChunks = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < sortedCircleData.length; i += 5) {
            chunks.push(circlePositions.slice(i, i + 5));
        }
        return chunks;
    }, [circlePositions, sortedCircleData.length]);

    const isMobileUI = windowSize.width < 640;
    const HEADER_HEIGHTS_UI = { mobile: 120, desktop: 80 };
    const currentHeaderHeight = isMobileUI ? HEADER_HEIGHTS_UI.mobile : HEADER_HEIGHTS_UI.desktop;

    // Track scroll position and update visible chunks for Olympic layout
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (layoutMode === "olympic") {
            const availableHeight = windowSize.height - currentHeaderHeight;
            const totalChunks = Math.ceil(sortedCircleData.length / 5);
            const newVisibleChunks = new Set<number>();

            // Calculate which chunk is currently active based on scroll position
            const currentChunkIndex = Math.floor(latest / availableHeight);

            // Show current chunk and next chunk, hide all previous chunks
            for (let i = 0; i < totalChunks; i++) {
                if (i >= currentChunkIndex) {
                    newVisibleChunks.add(i);
                }
            }

            setVisibleChunks(newVisibleChunks);
        }
    });

    useEffect(() => {
        if (layoutMode === "static" && containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        // Reset visible chunks when entering Olympic mode
        if (layoutMode === "olympic") {
            setVisibleChunks(new Set([0]));
        }
    }, [layoutMode]);

    return (
        <div
            className={`relative w-full h-full ${layoutMode === "olympic" ? "olympic-scrollbar" : "overflow-hidden"}`}
            ref={containerRef}
            style={{
                overflowY: layoutMode === "olympic" ? "scroll" : "hidden",
                WebkitOverflowScrolling: "touch" // Smooth iOS scroll
            }}
        >
            {isClient && (
                layoutMode === "olympic" ? (
                    <div
                        className="relative w-full min-h-full"
                        style={{
                            pointerEvents: expandedId ? 'none' : 'auto',
                        }}
                    >
                        <div
                            className="relative w-full"
                            style={{
                                height: `${Math.ceil(sortedCircleData.length / 5) * (windowSize.height - currentHeaderHeight)}px`,
                                minHeight: "100dvh"
                            }}
                        >
                            {olympicChunks.map((chunk, chunkIndex) => {
                                const availableHeight = windowSize.height - currentHeaderHeight;
                                const isVisible = visibleChunks.has(chunkIndex);

                                return (
                                    <OlympicChunk
                                        key={chunkIndex}
                                        index={chunkIndex}
                                        scrollY={scrollY}
                                        height={availableHeight}
                                        isVisible={isVisible}
                                    >
                                        {chunk.map((pos, idxInChunk) => {
                                            const globalIndex = chunkIndex * 5 + idxInChunk;
                                            return (
                                                <div key={pos.id} style={{ pointerEvents: isVisible ? 'auto' : 'none' }}>
                                                    <CircleWrapper
                                                        circle={sortedCircleData[globalIndex]}
                                                        index={globalIndex}
                                                        x={pos.x}
                                                        y={pos.y - (chunkIndex * availableHeight)}
                                                        circleSize={pos.size}
                                                        navCircleIds={navCircleIds}
                                                        expandedId={expandedId}
                                                        onExpand={() => handleExpand(pos.id)}
                                                        oscillationParams={oscillationParams[globalIndex]}
                                                        variant={pos.variant}
                                                        borderColor={pos.color}
                                                        animationKey={animationKey}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </OlympicChunk>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div
                        className="absolute inset-0"
                        style={{
                            pointerEvents: expandedId ? 'none' : 'auto',
                        }}
                    >
                        <div
                            className="relative w-full"
                            style={{
                                height: "100%",
                                minHeight: "100dvh"
                            }}
                        >
                            {circlePositions.map((pos, index) => (
                                <CircleWrapper
                                    key={pos.id}
                                    circle={sortedCircleData[index]}
                                    index={index}
                                    x={pos.x}
                                    y={pos.y}
                                    circleSize={pos.size}
                                    navCircleIds={navCircleIds}
                                    expandedId={expandedId}
                                    onExpand={() => handleExpand(pos.id)}
                                    oscillationParams={oscillationParams[index]}
                                    variant={pos.variant}
                                    borderColor={undefined}
                                    animationKey={animationKey}
                                />
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default CircleGrid;
