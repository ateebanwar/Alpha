"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { circleData } from "@/data/circleData";
import { useIsMobile } from "@/hooks/use-mobile";
import CircleWrapper from "./CircleWrapper";

const Carousel3D = () => {
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 35,
        mass: 0.5,
        restDelta: 0.001
    });

    const rotationY = useTransform(smoothProgress, [0, 1], [0, -360 * 3]);

    const cRadius = isMobile ? 400 : 800;
    const cSize = isMobile ? 180 : 250;
    const cAngleStep = 360 / circleData.length;

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const oscillationParams = useMemo(() => {
        return circleData.map(() => ({
            amplitude: Math.random() * 5,
            frequency: 0.001 + Math.random() * 0.003,
            phase: Math.random() * Math.PI * 2,
            angle: Math.random() * Math.PI * 2,
        }));
    }, []);

    return (
        <div ref={containerRef} className="relative w-full overflow-x-hidden overflow-y-visible">
            <div style={{ height: '500vh' }} className="pointer-events-none" />
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
                style={{ perspective: '1500px' }}>
                <motion.div
                    style={{
                        rotateY: rotationY,
                        transformStyle: 'preserve-3d',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {circleData.map((circle, index) => {
                        const angle = index * cAngleStep;
                        return (
                            <CircleWrapper
                                key={circle.id}
                                circle={circle}
                                index={index}
                                x={0}
                                y={0}
                                circleSize={cSize}
                                navCircleIds={["about", "web-dev", "process", "contact"]}
                                expandedId={expandedId}
                                onExpand={() => setExpandedId(circle.id)}
                                oscillationParams={oscillationParams[index]}
                                layoutMode="3d-carousel"
                                carouselAngle={angle}
                                carouselRadius={cRadius}
                                parentRotationY={rotationY}
                            />
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default Carousel3D;
