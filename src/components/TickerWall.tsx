"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { circleData } from "@/data/circleData";
import TickerCard from "./TickerCard";
import CirclePopup from "./CirclePopup";

const TickerWall = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

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

    const activeCircle = useMemo(() =>
        circleData.find(c => c.id === expandedId),
        [expandedId]);

    return (
        <div className={`w-full h-full overflow-hidden bg-background px-4 md:px-8 ${expandedId ? 'pointer-events-none' : ''}`}>
            <div className="flex gap-4 md:gap-8 h-full max-w-[1600px] mx-auto">
                {columns.map((col, colIndex) => {
                    const isEven = colIndex % 2 === 0;
                    return (
                        <div
                            key={`ticker-col-${colIndex}`}
                            className={`flex-1 flex flex-col gap-4 md:gap-8 h-full`}
                        >
                            <div
                                className={`
                                    flex flex-col gap-4 md:gap-8
                                    ticker-animation
                                    ${isEven ? 'ticker-scroll-down' : 'ticker-scroll-up'}
                                `}
                            >
                                {col.map((circle, itemIndex) => (
                                    <TickerCard
                                        key={`${colIndex}-${circle.id}-${itemIndex}`}
                                        circle={circle}
                                        onClick={() => setExpandedId(circle.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {activeCircle && (
                    <CirclePopup
                        circle={activeCircle}
                        onClose={() => setExpandedId(null)}
                    />
                )}
            </AnimatePresence>

            <style jsx global>{`
                .ticker-animation {
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                }

                @keyframes scroll-up {
                    from { transform: translateY(0); }
                    to { transform: translateY(-33.33%); }
                }

                @keyframes scroll-down {
                    from { transform: translateY(-33.33%); }
                    to { transform: translateY(0); }
                }

                .ticker-scroll-up {
                    animation-name: scroll-up;
                    animation-duration: 40s;
                }

                .ticker-scroll-down {
                    animation-name: scroll-down;
                    animation-duration: 45s;
                }

                /* Responsive slowing down */
                @media (max-width: 768px) {
                    .ticker-scroll-up, .ticker-scroll-down {
                        animation-duration: 60s;
                    }
                    /* Hide outer columns on mobile for better density */
                    .flex-1:nth-child(1), .flex-1:nth-child(4) {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default TickerWall;
