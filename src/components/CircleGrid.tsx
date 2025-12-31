"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { circleData } from "@/data/circleData";
import InteractiveCircle from "./InteractiveCircle";
import CircleWrapper from "./CircleWrapper";
import CircleContent from "./CircleContent";
import { useIsMobile } from "@/hooks/use-mobile";

const CircleGrid = ({ layoutMode = "static" }: { layoutMode?: "static" | "olympic" }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const OLYMPIC_COLORS = [
    "#0081C8", // Blue
    "#414141", // Black
    "#EE334E", // Red
    "#FCB131", // Yellow
    "#00A651", // Green
  ];

  // Sorted and filtered data
  const sortedCircleData = useMemo(() => {
    const priorityLabels = [
      "About Us", "Contact", "Location", "Consulting", "Experience", "Our Process"
    ];
    return [...circleData].sort((a, b) => {
      const indexA = priorityLabels.indexOf(a.label);
      const indexB = priorityLabels.indexOf(b.label);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, []);

  const navCircleIds = ["about", "web-dev", "process", "contact"];

  const handleExpand = (circleId: string) => {
    setExpandedId(circleId);
  };

  const handleClose = () => {
    setExpandedId(null);
  };

  // Responsive Grid Layout
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate coordinates for all circles
  const circlePositions = useMemo(() => {
    const positions: Array<{ id: string; x: number; y: number; size: number; variant: "default" | "olympic"; color?: string }> = [];

    // --- SHARED PARAMETERS ---
    const isSmall = windowSize.width < 640;

    // --- OLYMPIC CALCULATIONS ---
    const mobileHeaderHeight = 140;
    const desktopHeaderHeight = 70;
    const currentHeaderHeight = isSmall ? mobileHeaderHeight : desktopHeaderHeight;
    const availableHeight = windowSize.height - currentHeaderHeight;

    const oWidthConstraint = (windowSize.width - (isSmall ? 20 : 80)) / 3.2;
    const oHeightConstraint = (availableHeight - (isSmall ? 40 : 100)) / 2.2;
    const oDeterminedSize = Math.min(oWidthConstraint, oHeightConstraint);
    const oSize = isSmall ? Math.max(oDeterminedSize, 110) : Math.max(oDeterminedSize, 80);
    const oGridCellSize = oSize / 2;
    const oHorizontalGap = isSmall ? 10 : 20;

    // --- STATIC CALCULATIONS ---
    let sCols = 4;
    let sSize = 80;
    let sVerticalGap = 15;
    let sHorizontalGap = 15;
    let sWrapperPadding = 20;
    let sIsStaggered = false;

    if (windowSize.width >= 1024 || (windowSize.width > 768 && windowSize.width < 1024)) {
      sCols = 6;
      const sPadding = 20;
      const sSafetyBuffer = 60;
      const availableWidth = Math.min(windowSize.width, 1400) - (sPadding * 2);
      const sizeByWidth = (availableWidth / sCols) - 15;
      const availableHeight = windowSize.height - (sPadding * 2) - sSafetyBuffer;
      sSize = Math.min(Math.max(Math.min(sizeByWidth, availableHeight / 3.5), 50), 130);
      sVerticalGap = -(sSize * 0.25);
      sHorizontalGap = sSize * 0.2;
      sWrapperPadding = 20;
      sIsStaggered = true;
    } else if (windowSize.width <= 768) {
      sCols = 4;
      const sPadding = 20;
      const availableWidth = windowSize.width - sPadding * 2;
      sSize = (availableWidth - 10 * 3) / 4;
      sVerticalGap = 10;
      sHorizontalGap = 10;
      sWrapperPadding = sPadding;
      sIsStaggered = false;
    }

    // Process each circle
    sortedCircleData.forEach((circle, index) => {
      // 1. Static Position
      const sRow = Math.floor(index / sCols);
      const sCol = index % sCols;
      const isOddRow = sIsStaggered && sRow % 2 === 1;

      const sGridTotalWidth = sCols * sSize + (sCols - 1) * sHorizontalGap;
      const sGridStartX = (windowSize.width - sGridTotalWidth) / 2;

      let sx = sGridStartX + sCol * (sSize + sHorizontalGap);
      if (isOddRow) sx += sSize * 0.5;

      const sy = sRow * (sSize + sVerticalGap) + sWrapperPadding;

      // 2. Olympic Position
      const chunkIndex = Math.floor(index / 5);
      const posInChunk = index % 5;
      const tuckAmount = oSize * 0.25;

      const oGridTotalWidth = (3 * 2 * oGridCellSize) + (2 * oHorizontalGap);
      const oChunkStartX = (windowSize.width - oGridTotalWidth) / 2;

      // Optical centering: shift slightly upward on mobile (availableHeight * 0.45 instead of 0.5)
      const verticalCenterOffset = isSmall ? availableHeight * 0.45 : availableHeight * 0.5;
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

  const oscillationParams = useMemo(() => {
    return sortedCircleData.map(() => ({
      amplitude: Math.random() * 5,
      frequency: 0.001 + Math.random() * 0.003,
      phase: Math.random() * Math.PI * 2,
      angle: Math.random() * Math.PI * 2,
    }));
  }, [sortedCircleData]);

  const activeCircle = useMemo(() =>
    expandedId ? sortedCircleData.find(c => c.id === expandedId) : null,
    [expandedId, sortedCircleData]);

  const olympicChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < sortedCircleData.length; i += 5) {
      chunks.push(circlePositions.slice(i, i + 5));
    }
    return chunks;
  }, [circlePositions, sortedCircleData.length]);

  const isSmall = windowSize.width < 640;
  const HEADER_HEIGHTS = { mobile: 140, desktop: 70 };
  const currentHeaderHeight = isSmall ? HEADER_HEIGHTS.mobile : HEADER_HEIGHTS.desktop;

  useEffect(() => {
    if (layoutMode === "static" && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [layoutMode]);

  if (!isMounted) return <div className="w-full h-full" />;

  return (
    <div className="relative w-full h-full overflow-hidden" ref={containerRef}>
      <motion.div
        animate={expandedId ? "expanded" : "normal"}
        variants={{
          normal: { translateZ: 0, scale: 1, y: 0, opacity: 1 },
          expanded: { translateZ: -50, scale: 0.9, y: 50, opacity: 0.5 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute inset-0 ${layoutMode === "olympic" ? "olympic-scrollbar" : ""}`}
        style={{
          overflowY: layoutMode === "olympic" ? "auto" : "visible",
          scrollSnapType: layoutMode === "olympic" ? "y proximity" : "none",
          pointerEvents: expandedId ? 'none' : 'auto'
        }}
      >
        <div
          className="relative w-full"
          style={{
            height: layoutMode === "olympic" ? `${Math.ceil(sortedCircleData.length / 5) * (windowSize.height - currentHeaderHeight)}px` : "100%",
            minHeight: "100vh"
          }}
        >
          {layoutMode === "static" && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                  top: "10%",
                  left: "5%",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.2, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          )}

          {layoutMode === "olympic" ? (
            olympicChunks.map((chunk, chunkIndex) => {
              const availableHeight = windowSize.height - currentHeaderHeight;

              return (
                <div
                  key={chunkIndex}
                  style={{
                    position: 'sticky',
                    top: 0,
                    height: `${availableHeight}px`,
                    width: '100%',
                    scrollSnapAlign: 'start',
                    zIndex: chunkIndex + 10,
                    pointerEvents: 'none',
                    willChange: 'transform',
                  }}
                >
                  {chunk.map((pos, idxInChunk) => {
                    const globalIndex = chunkIndex * 5 + idxInChunk;
                    return (
                      <div key={pos.id} style={{ pointerEvents: 'auto' }}>
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
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            circlePositions.map((pos, index) => (
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
              />
            ))
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeCircle && (
          <motion.div
            initial={{ translateZ: -100, scale: 0.8, y: -100, opacity: 0, zIndex: 0 }}
            animate={{ translateZ: 0, scale: 1, y: 0, opacity: 1, zIndex: 2 }}
            exit={{ translateZ: -100, scale: 0.8, y: -100, opacity: 0, zIndex: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-2 md:p-4 z-50 pointer-events-none"
          >
            <div
              className={`relative w-full max-w-4xl h-[88dvh] md:h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto border ${layoutMode === "olympic" ? "bg-[#080808] border-white/10" : "bg-card border-white/10"
                }`}
            >
              {!(layoutMode === "olympic") && <div className="absolute inset-0 neu-circle opacity-100 pointer-events-none" />}
              <div
                className={`relative z-50 flex items-center p-4 md:p-6 shrink-0 border-b ${layoutMode === "olympic"
                  ? "border-white/10 bg-black/50 backdrop-blur-md"
                  : "border-white/5 bg-card/50 backdrop-blur-sm"
                  }`}
              >
                <button
                  onClick={handleClose}
                  className={`${layoutMode === "olympic"
                    ? "flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-150 border border-white/20 rounded-xl hover:bg-white/5"
                    : "neu-tile flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-150"
                    }`}
                  style={layoutMode === "olympic" ? {
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
                  } : {}}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <div
                  className={`ml-4 font-semibold text-lg ${layoutMode === "olympic" ? "text-white" : "text-primary/80"
                    }`}
                  style={layoutMode === "olympic" ? {
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                  } : {}}
                >
                  {activeCircle.label}
                </div>
              </div>
              <div
                className={`relative flex-1 overflow-y-auto z-10 overscroll-contain p-4 md:p-8 ${layoutMode === "olympic" ? "olympic-scrollbar" : "custom-scrollbar"
                  }`}
              >
                <CircleContent circle={activeCircle} isMobile={isMobile} isOlympic={layoutMode === "olympic"} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircleGrid;
