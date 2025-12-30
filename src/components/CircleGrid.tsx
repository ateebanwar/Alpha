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

const CircleGrid = ({ layoutMode = "static" }: { layoutMode?: "static" | "olympic" | "spatial" }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cameraZ, setCameraZ] = useState(0);
  const isMobile = useIsMobile();

  const OLYMPIC_COLORS = [
    "#0081C8", // Blue
    "#FCB131", // Yellow
    "#000000", // Black
    "#00A651", // Green
    "#EE334E", // Red
  ];

  /* 
  // Reset camera when entering spatial mode
  useEffect(() => {
    if (layoutMode === "spatial") {
      setCameraZ(0);
    }
  }, [layoutMode]);

  // Spatial Mode: Scroll/Zoom handler
  useEffect(() => {
    if (layoutMode !== "spatial") return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCameraZ(prev => {
        const newZ = prev + e.deltaY;
        // Limit scroll range to cover all circles
        return Math.max(0, Math.min(newZ, 20000));
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [layoutMode]);
  */

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

  /* 
  // Generate random 3D positions for Spatial Mode
  const spatialPositions = useMemo(() => {
    return sortedCircleData.map((_, i) => {
      const pseudoRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      const r1 = pseudoRandom(i * 12.34);
      const r2 = pseudoRandom(i * 56.78);

      const x = (r1 - 0.5) * 80; // -40vw to +40vw
      const y = (r2 - 0.5) * 60; // -30vh to +30vh
      const z = -500 - (i * 800);

      return { x, y, z };
    });
  }, [sortedCircleData]);

  const getSpatialStyle = (index: number) => {
    if (layoutMode !== "spatial") return {};
    const pos = spatialPositions[index];
    const relativeZ = pos.z + cameraZ;

    if (relativeZ > 200) return { opacity: 0, pointerEvents: 'none' as const };

    const dist = Math.abs(relativeZ);
    let opacity = 0;
    let scale = 0;

    if (relativeZ <= 0) {
      const visibleRange = 2500;
      const normalizedDist = Math.min(dist, visibleRange) / visibleRange;
      opacity = 1 - Math.pow(normalizedDist, 1.5);
      const isFocused = relativeZ > -400 && relativeZ < 0;
      scale = isFocused ? 1.0 : 0.8;
    } else {
      opacity = 1 - (relativeZ / 200);
      scale = 1 + (relativeZ / 100);
    }

    return {
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      transform: `translate3d(calc(-50% + ${pos.x}vw), calc(-50% + ${pos.y}vh), ${relativeZ}px) scale(${scale})`,
      opacity,
      zIndex: Math.round(relativeZ + 20000),
      pointerEvents: (opacity > 0.5 ? 'auto' : 'none') as any,
      transition: 'transform 0.1s linear, opacity 0.1s linear',
      willChange: 'transform, opacity'
    };
  };
  */

  // Generate oscillation parameters for each circle
  const oscillationParams = useMemo(() => {
    return sortedCircleData.map((circle, index) => ({
      amplitude: Math.random() * 5,
      frequency: 0.001 + Math.random() * 0.003,
      phase: Math.random() * Math.PI * 2,
      angle: Math.random() * Math.PI * 2,
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
              overflow: isStaggered ? 'hidden' : 'auto',
              height: '100%'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: layoutMode === "spatial" ? 'none' : `repeat(${cols}, ${gridCellSize}px)`,
                gap: layoutMode === "spatial" ? 0 : `${horizontalGap}px`,
                padding: layoutMode === "spatial" ? 0 : `${wrapperPadding}px`,
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                margin: 'auto',
                height: '100%',
                position: 'relative',
                ...(layoutMode === "olympic" ? {
                  display: 'block',
                  overflowY: 'auto',
                  scrollSnapType: 'y mandatory',
                  gridTemplateColumns: 'none',
                  gap: 0,
                } : {})
              }}
            >
              {/* 
              layoutMode === "spatial" ? (
                // Spatial Mode
                sortedCircleData.map((circle, index) => (
                  <div key={circle.id} style={(getSpatialStyle as any)(index)}>
                    <CircleWrapper
                      circle={circle}
                      index={index}
                      cols={1}
                      isStaggered={false}
                      circleSize={180}
                      verticalGap={0}
                      navCircleIds={navCircleIds}
                      expandedId={expandedId}
                      onExpand={() => handleExpand(circle.id)}
                      oscillationParams={{ amplitude: 0, frequency: 0, phase: 0, angle: 0 }}
                      overrideStyle={{ width: '180px', height: '180px' }}
                      variant="olympic"
                      borderColor={OLYMPIC_COLORS[index % 5]}
                    />
                  </div>
                ))
              ) : 
              */}
              {layoutMode === "olympic" ? (
                // Olympic Mode
                olympicChunks.map((chunk, chunkIndex) => (
                  <div
                    key={chunkIndex}
                    style={{
                      height: '100vh',
                      width: '100%',
                      scrollSnapAlign: 'start',
                      display: 'flex',
                      alignItems: 'center',
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
                            oscillationParams={oscillationParams[globalIndex] || oscillationParams[0]}
                            overrideStyle={getOlympicStyle(i, circleSize)}
                            variant="olympic"
                            borderColor={OLYMPIC_COLORS[globalIndex % 5]}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                // Static Mode
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
                    variant="default"
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
              <div className="absolute inset-0 neu-circle opacity-100 pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: isMobile ? -2 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.12 : 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-50 flex items-center p-4 md:p-6 shrink-0 border-b border-white/5 bg-card/50 backdrop-blur-sm"
              >
                <button
                  onClick={handleClose}
                  className="neu-tile flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-150"
                  autoFocus
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <div className="ml-4 font-semibold text-lg text-primary/80">
                  {activeCircle.label}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 4 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.14 : 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative flex-1 overflow-y-auto z-10 custom-scrollbar overscroll-contain p-4 md:p-8"
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
