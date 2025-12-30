"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { circleData } from "@/data/circleData";
import InteractiveCircle from "./InteractiveCircle";
import CirclePopup from "./CirclePopup";
import CircleWrapper from "./CircleWrapper";
import { useOscillation } from "@/hooks/use-oscillation";

const CircleGrid = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const { cols, circleSize, verticalGap, horizontalGap, wrapperPadding, isStaggered } = useMemo(() => {

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
      verticalGap: 15,
      horizontalGap: 15,
      wrapperPadding: 20,
      isStaggered: false
    };
  }, [windowSize.width, windowSize.height]);

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
    <>
      <div
        className={`absolute inset-0 overflow-hidden transition-all duration-200 ease-out ${expandedId ? "blur-sm opacity-30 scale-[0.98] pointer-events-none" : ""
          }`}
      >
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
            alignItems: 'center',
            justifyContent: 'center',
            overflow: isStaggered ? 'hidden' : 'auto', // Allow scroll on mobile grid
            height: '100%'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, ${circleSize}px)`,
              gap: `${horizontalGap}px`,
              padding: `${wrapperPadding}px`,
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center', // Center vertically if logic leaves small gaps
              // Visual centering helper if content is smaller
              margin: 'auto',
            }}
          >
            {sortedCircleData.map((circle, index) => (
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
              />
            ))}
          </div>
        </div>
      </div >

      {/* Full Screen Popup Overlay */}
      <AnimatePresence>
        {
          activeCircle && (
            <CirclePopup
              circle={activeCircle}
              onClose={handleClose}
            />
          )
        }
      </AnimatePresence >
    </>
  );
};

export default CircleGrid;
