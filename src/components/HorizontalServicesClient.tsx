"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HorizontalServicesClient({ slug }: { slug: string }) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    // Initial data simulating the high-quality cards from the reference
    const originalSections = [
        {
            title: "Connect",
            subtitle: "Seamless Integration",
            description: "Designing intuitive mobile applications for iOS and Android.",
            color: "bg-[#0a0a0a]",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Build",
            subtitle: "Robust Architecture",
            description: "Scalable web solutions built on modern tech stacks.",
            color: "bg-[#0f0f0f]",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Scale",
            subtitle: "Global Reach",
            description: "Unified design languages that scale across your entire product.",
            color: "bg-[#141414]",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Secure",
            subtitle: "Enterprise Grade",
            description: "Secure and performant cloud architecture for your business.",
            color: "bg-[#0a0a0a]",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Innovate",
            subtitle: "Future Ready",
            description: "AI and Machine Learning integration for smarter apps.",
            color: "bg-[#0f0f0f]",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    // Double the data for seamless loop
    const sections = [...originalSections, ...originalSections];

    useLayoutEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const ctx = gsap.context(() => {
            // Move -50% (half width) continuously since list is doubled
            animationRef.current = gsap.to(slider, {
                xPercent: -50,
                duration: 25, // Slow, smooth speed
                ease: "none",
                repeat: -1
            });
        });

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => animationRef.current?.pause();
    const handleMouseLeave = () => animationRef.current?.play();

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center font-sans">
            {/* Header */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                <h1 className="text-white text-3xl font-light tracking-wider uppercase">{slug.replace(/-/g, ' ')}</h1>
                <p className="text-white/50 text-sm mt-1">Explore our portfolio</p>
            </div>

            {/* Marquee Container */}
            <div className="w-full overflow-hidden py-10">
                <div
                    ref={sliderRef}
                    className="flex gap-8 w-max px-8"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={`
                                relative shrink-0 
                                w-[85vw] md:w-[600px] aspect-square md:aspect-[4/3] 
                                rounded-[2rem] overflow-hidden 
                                border border-white/10 
                                group transition-transform duration-500 hover:scale-[1.02]
                                ${section.color}
                            `}
                        >
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                                <span className="text-orange-500 font-mono text-xs tracking-widest uppercase mb-2 block">
                                    {section.subtitle}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {section.title}
                                </h2>
                                <p className="text-white/70 text-sm md:text-base max-w-sm line-clamp-2">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroller Hint */}
            <div className="absolute bottom-8 right-8 text-white/30 text-xs font-mono border border-white/10 px-3 py-1 rounded-full pointer-events-none">
                AUTO SCROLLING
            </div>
        </div>
    );
}
