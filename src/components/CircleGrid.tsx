"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { circleData } from "@/data/circleData";
import InteractiveCircle from "./InteractiveCircle";
import CircleWrapper from "./CircleWrapper";
import CircleContent from "./CircleContent";
import { useOscillation } from "@/hooks/use-oscillation";
import { useIsMobile } from "@/hooks/use-mobile";

const CircleGrid = ({ layoutMode = "static" }: { layoutMode?: "static" | "olympic" }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Navbar circle IDs
  // Priority Order for Top Row
  const sortedCircleData = useMemo(() => {
    const priorityLabels = [
      "About Us",
      "Contact",
      "Location",
      "Consulting",
      "Experience",
      "Our Process"
    ];

    return [...circleData].sort((a, b) => {
      const indexA = priorityLabels.indexOf(a.label);
      const indexB = priorityLabels.indexOf(b.label);

      // If both are priority, sort by priority index
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      // If only A is priority, it comes first
      if (indexA !== -1) return -1;
      // If only B is priority, it comes first
      if (indexB !== -1) return 1;
      // Otherwise keep original order
      return 0;
    });
  }, []);

  // Navbar circle IDs
  const navCircleIds = ["about", "web-dev", "process", "contact"];

  const handleExpand = (circleId: string) => {
    setExpandedId(circleId);
  };

  const handleClose = () => {
    setExpandedId(null);
  };

  // Responsive Grid Layout
  // Responsive Grid Layout
  const [windowSize, setWindowSize] = useState({
    width: 1200,
    height: 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial set
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { cols, circleSize, gridCellSize, verticalGap, horizontalGap, wrapperPadding, isStaggered } = useMemo(() => {
    // --- Olympic Layout (Scrollable 3-2 pattern) ---
    if (layoutMode === "olympic") {
      const isSmall = windowSize.width < 640;
      const widthConstraint = (windowSize.width - 80) / 3.2; // Fit 3 across
      const heightConstraint = (windowSize.height - 100) / 2.2; // Fit 2 rows high
      const determinedSize = Math.min(widthConstraint, heightConstraint);
      const size = Math.max(determinedSize, 80); // Min size constraint

      return {
        cols: 6, // 6 columns to allow 2-span items centered
        circleSize: size,
        gridCellSize: size / 2, // Columns are half-width
        verticalGap: 0,
        horizontalGap: isSmall ? 10 : 20,
        wrapperPadding: 40,
        isStaggered: false
      };
    }

    // --- Desktop and Tablet Layout (Fixed constraints) ---
    if (windowSize.width >= 1024 || (windowSize.width > 768 && windowSize.width < 1024)) {
      const targetCols = 6;
      const rows = 4;
      const gap = 15;
      const padding = 20;
      const safetyBuffer = 60;

      const availableWidth = Math.min(windowSize.width, 1400) - (padding * 2);
      const sizeByWidth = (availableWidth / targetCols) - gap;

      const heightFactor = 0.85;
      const availableHeight = windowSize.height - (padding * 2) - safetyBuffer;
      const sizeByHeight = availableHeight / (1 + (rows - 1) * heightFactor);

      let size = Math.min(sizeByWidth, sizeByHeight);
      size = Math.min(Math.max(size, 50), 130);

      return {
        cols: targetCols,
        circleSize: size,
        gridCellSize: size,
        verticalGap: -(size * 0.25), // Standard overlap for desktop
        horizontalGap: size * 0.2, // Standard gap
        wrapperPadding: 20,
        isStaggered: true
      };
    }

    // --- Mobile Layout (4-column grid) ---
    if (windowSize.width <= 768) {
      const cols = 4;
      const padding = 20;
      const horizontalGap = 10;
      const availableWidth = windowSize.width - padding * 2;
      const size = (availableWidth - horizontalGap * 3) / 4;
      const verticalGap = 10;

      return {
        cols,
        circleSize: size,
        gridCellSize: size,
        verticalGap,
        horizontalGap,
        wrapperPadding: padding,
        isStaggered: false
      };
    }

    // Fallback (should not reach)
    return {
      cols: 4,
      circleSize: 80,
      gridCellSize: 80,
      verticalGap: 15,
      horizontalGap: 15,
      wrapperPadding: 20,
      isStaggered: false
    };
  }, [windowSize.width, windowSize.height, layoutMode]);

  // Chunking logic for Olympic mode
  const olympicChunks = useMemo(() => {
    if (layoutMode !== "olympic") return [];
    const chunkSize = 5;
    const chunks = [];
    for (let i = 0; i < sortedCircleData.length; i += chunkSize) {
      chunks.push(sortedCircleData.slice(i, i + chunkSize));
    }
    return chunks;
  }, [sortedCircleData, layoutMode]);

  const getOlympicStyle = (index: number, size: number) => {
    if (layoutMode !== "olympic") return {};

    const pos = index % 5;
    // First row (0-2) doesn't need negative margin.
    // Subsequent rows need to tuck up. 
    // In our logic: 
    // Row 1: 0,1,2
    // Row 2: 3,4
    // Row 3: 5,6,7
    // etc.
    // The "isFirstRow" check effectively is index < 3. 
    // But conceptually, every row after the first should tuck.

    // Calculate row number implicitly or just apply to all > 2?
    const tuckAmount = size * 0.25;
    const marginTop = index < 3 ? 0 : -tuckAmount;

    let col = "auto";
    if (pos === 0) col = "1 / span 2";
    else if (pos === 1) col = "3 / span 2";
    else if (pos === 2) col = "5 / span 2";
    else if (pos === 3) col = "2 / span 2";
    else if (pos === 4) col = "4 / span 2";

    return { gridColumn: col, marginTop: `${marginTop}px` };
  };

  // Generate oscillation parameters for each circle
  const oscillationParams = useMemo(() => {
    return sortedCircleData.map((circle, index) => ({
      amplitude: Math.random() * 5, // 0-5px
      frequency: 0.001 + Math.random() * 0.003, // Slow, smooth frequency for gentle movement
      phase: Math.random() * Math.PI * 2, // Random phase
      angle: Math.random() * Math.PI * 2, // Random direction
    }));
  }, [sortedCircleData]);

  const activeCircle = useMemo(() =>
    expandedId ? sortedCircleData.find(c => c.id === expandedId) : null,
    [expandedId, sortedCircleData]);

  return (
    <div style={{ perspective: 1000, position: 'relative', width: '100%', height: '100%' }}>
      <motion.div
        animate={expandedId ? "expanded" : "normal"}
        variants={{
          normal: { translateZ: 0, scale: 1, y: 0, opacity: 1, zIndex: 1 },
          expanded: { translateZ: -50, scale: 0.9, y: 50, opacity: 0.5, zIndex: 1 }
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{ pointerEvents: expandedId ? 'none' : 'auto' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                top: "10%",
                left: "5%",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.2, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)",
                bottom: "15%",
                right: "10%",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          {/* Circles Container */}
          <div
            className="absolute inset-0"
            style={{
              display: 'flex',
              alignItems: isStaggered ? 'center' : 'flex-start',
              justifyContent: 'center',
              overflow: isStaggered ? 'hidden' : 'auto', // Allow scroll on mobile grid
              height: '100%'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, ${gridCellSize}px)`,
                gap: `${horizontalGap}px`,
                padding: `${wrapperPadding}px`,
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center', // Center vertically if logic leaves small gaps
                // Visual centering helper if content is smaller
                margin: 'auto',
                // Overrides for Olympic mode container
                ...(layoutMode === "olympic" ? {
                  display: 'block', // Reset grid for the outer container so chunks stack
                  height: '100%',
                  padding: 0,
                  overflowY: 'auto',
                  scrollSnapType: 'y mandatory',
                  gridTemplateColumns: 'none', // Remove grid def from container
                  gap: 0,
                } : {})
              }}
            >
              {layoutMode === "olympic" ? (
                // Olympic Mode: Render chunks in viewports
                olympicChunks.map((chunk, chunkIndex) => (
                  <div
                    key={chunkIndex}
                    style={{
                      height: '100vh',
                      width: '100%',
                      scrollSnapAlign: 'start',
                      display: 'flex',
                      alignItems: 'center', // Vertically center the grid in the viewport
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, ${gridCellSize}px)`,
                        gap: `${horizontalGap}px`,
                        padding: `${wrapperPadding}px`,
                        width: '100%',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                    >
                      {chunk.map((circle, i) => {
                        const globalIndex = chunkIndex * 5 + i;
                        return (
                          <CircleWrapper
                            key={circle.id}
                            circle={circle}
                            index={globalIndex}
                            cols={cols}
                            isStaggered={false}
                            circleSize={circleSize}
                            verticalGap={verticalGap}
                            navCircleIds={navCircleIds}
                            expandedId={expandedId}
                            onExpand={() => handleExpand(circle.id)}
                            oscillationParams={oscillationParams[globalIndex] || oscillationParams[0]} // Fallback safety
                            overrideStyle={getOlympicStyle(i, circleSize)} // Pass local index (0-4)
                          />
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                // Static Mode: Render all in one grid
                sortedCircleData.map((circle, index) => (
                  <CircleWrapper
                    key={circle.id}
                    circle={circle}
                    index={index}
                    cols={cols}
                    isStaggered={isStaggered}
                    circleSize={circleSize}
                    verticalGap={verticalGap}
                    navCircleIds={navCircleIds}
                    expandedId={expandedId}
                    onExpand={() => handleExpand(circle.id)}
                    oscillationParams={oscillationParams[index]}
                    overrideStyle={{}}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeCircle && (
          <motion.div
            initial={{ translateZ: -100, scale: 0.8, y: -100, opacity: 0, zIndex: 0 }}
            animate={{ translateZ: 0, scale: 1, y: 0, opacity: 1, zIndex: 2 }}
            exit={{ translateZ: -100, scale: 0.8, y: -100, opacity: 0, zIndex: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-full max-w-4xl h-[85vh] md:h-[90vh] bg-card rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto border border-white/10">
              {/* Background decorative elements */}
              <div className="absolute inset-0 neu-circle opacity-100 pointer-events-none" />

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: isMobile ? -2 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: isMobile ? 0.12 : 0.16,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative z-50 flex items-center p-4 md:p-6 shrink-0 border-b border-white/5 bg-card/50 backdrop-blur-sm"
                style={{
                  willChange: 'opacity, transform',
                  WebkitTransform: 'translate3d(0, 0, 0)',
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <button
                  onClick={handleClose}
                  className="neu-tile flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-150 hover:scale-105 active:scale-95"
                  autoFocus
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <div className="ml-4 font-semibold text-lg text-primary/80">
                  {activeCircle.label}
                </div>
              </motion.div>

              {/* Scrollable Content */}
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 4 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: isMobile ? 0.14 : 0.18,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative flex-1 overflow-y-auto z-10 custom-scrollbar overscroll-contain p-4 md:p-8"
                style={{
                  willChange: 'opacity, transform',
                  WebkitTransform: 'translate3d(0, 0, 0)',
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <CircleContent circle={activeCircle} isMobile={isMobile} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircleGrid;
