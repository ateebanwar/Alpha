"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Observer } from "gsap/all";
import "@/app/3Dflow.css";
import "@/app/webflow.css";

gsap.registerPlugin(Observer);

import { getDataForCarousel } from "@/data/dataAdapter";
import { LucideIcon } from "lucide-react"; // Import type

const SLIDES = getDataForCarousel();

const colorMap: Record<string, string> = {
    primary: "from-blue-500 to-cyan-400",
    accent: "from-purple-500 to-pink-500",
    muted: "from-gray-500 to-slate-400",
};

export default function Carousel3D() {
    const componentRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const componentEl = componentRef.current;
        const wrapEl = wrapRef.current;

        if (!componentEl || !wrapEl) return;

        const itemEls = Array.from(wrapEl.querySelectorAll<HTMLElement>(".carousel_item"));
        if (!itemEls.length) return;

        const totalItems = itemEls.length;
        const anglePerItem = 360 / totalItems;

        // Calculate radius to form a perfect closed circle
        // Radius = (Width / 2) / tan(PI / TotalItems)
        const zTranslate = 2 * Math.tan((anglePerItem / 2) * (Math.PI / 180));

        const negTranslate = `calc(var(--3d-carousel-item-width) / -${zTranslate} - var(--3d-carousel-gap))`;
        const posTranslate = `calc(var(--3d-carousel-item-width) / ${zTranslate} + var(--3d-carousel-gap))`;

        wrapEl.style.setProperty("--3d-carousel-z", negTranslate);
        wrapEl.style.perspective = "1000px";

        // Initial setup
        itemEls.forEach((item, index) => {
            item.style.transform = `rotateY(${anglePerItem * index}deg) translateZ(${posTranslate})`;
        });

        // Rotation State
        let targetRotation = 0;
        let currentRotation = 0;
        let isDragging = false;

        const updateActiveState = () => {
            // Normalize rotation to 0-360
            // const normalizedRot = (currentRotation % 360 + 360) % 360;
            // The item at the "front" is the one closest to 0 degrees relative to the viewer
            // Since we rotate the wrapper, the item at -currentRotation is at 0
            // We need to find which index corresponds to this angle.

            // Calculate which item index is currently at the front
            // The effective angle of item i is: i * anglePerItem + currentRotation
            // We want (i * anglePerItem + currentRotation) ≈ 0 (modulo 360)

            let activeIndex = Math.round(-currentRotation / anglePerItem) % totalItems;
            if (activeIndex < 0) activeIndex += totalItems;

            itemEls.forEach((item, idx) => {
                if (idx === activeIndex) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });
        };

        const updateRotation = () => {
            // Smooth damping for scroll-driven movement only
            currentRotation += (targetRotation - currentRotation) * 0.1;

            wrapEl.style.setProperty("--3d-carousel-rotate", `${currentRotation}deg`);

            // --- Mobile Visibility Logic ---
            // On mobile, we purely control opacity here to prevent "pass-through" and focus issues.
            // On desktop, we let CSS handle simple active states, or we could enhance it here too.
            const isMobile = window.innerWidth < 768; // Simple check, or use state if resize listener needed

            if (isMobile) {
                // Mobile depth logic (keep existing)
                itemEls.forEach((item, index) => {
                    const itemAngle = index * anglePerItem;
                    const totalAngle = itemAngle + currentRotation;

                    let normalized = (totalAngle % 360 + 360) % 360;
                    if (normalized > 180) normalized -= 360;
                    const dist = Math.abs(normalized);

                    let opacity = 0;
                    if (dist < 45) {
                        opacity = 1 - (dist / 45);
                        opacity = Math.pow(opacity, 0.5);
                    }
                    if (dist > 90) opacity = 0;

                    item.style.opacity = opacity.toString();
                    item.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
                });
            } else {
                itemEls.forEach((item) => {
                    item.style.opacity = "";
                    item.style.pointerEvents = "";
                });
            }

            updateActiveState();
            // No recursive RAF here
        };

        // Scroll/Touch Interaction
        const observer = Observer.create({
            target: componentEl,
            type: "wheel,touch,pointer",
            preventDefault: true,
            onPress: () => { isDragging = true; },
            onRelease: () => { isDragging = false; },
            onChange: (self) => {
                const delta = self.deltaY * 0.5 || self.deltaX * 0.5;
                targetRotation -= delta;
            }
        });

        // Resize Listener
        const handleResize = () => {
            // No need to re-trigger loops, ticker handles it
        };
        window.addEventListener("resize", handleResize);

        gsap.set(wrapEl, { opacity: 1 });

        // Enable GSAP Ticker for smooth scroll-driven animation
        gsap.ticker.add(updateRotation);

        return () => {
            observer.kill();
            window.removeEventListener("resize", handleResize);
            gsap.ticker.remove(updateRotation);
        };
    }, []);

    return (
        <div ref={componentRef} className="carousel_component" style={{ height: '100vh', overflow: 'hidden', cursor: 'grab', touchAction: 'none' }}>
            <div className="carousel_track">
                <div className="carousel_sticky">
                    <div ref={wrapRef} data-carousel="wrap" className="carousel_wrap w-dyn-list">
                        <div role="list" className="carousel_list w-dyn-items">
                            {SLIDES.map((slide, index) => (
                                <div key={index} role="listitem" className="carousel_item w-dyn-item">
                                    {slide.img ? (
                                        <img alt={slide.title} src={slide.img} className="carousel_img" />
                                    ) : (
                                        <div className={`carousel_img w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${colorMap[slide.color || "primary"] || "from-blue-500 to-cyan-400"}`}>
                                            {slide.icon && <slide.icon size={64} className="text-white mb-4" />}
                                            <h3 className="text-2xl font-bold text-white tracking-wider">{slide.label || slide.title}</h3>
                                        </div>
                                    )}
                                    <div className="carousel_ratio"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
