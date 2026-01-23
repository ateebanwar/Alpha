"use client";

import { useState, useRef, useCallback, useMemo, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { getDataForHoneycomb } from "@/data/dataAdapter";
import { LAYOUT_REGISTRY } from "@/layouts/core/LayoutRegistry";
import CirclePopup from "@/layouts/shared/CirclePopup";
import { ServicesSearchLayout } from "@/layouts/servicesSearch";
import DefaultLayout from "@/layouts/default/DefaultLayout";
import OlympicLayout from "@/layouts/olympic/OlympicLayout";
import Carousel3DLayout from "@/layouts/carousel3d/Carousel3DLayout";
import TickerIsolatedLayout from "@/layouts/ticker/TickerIsolatedLayout";
import ServicesSearchIsolatedLayout from "@/layouts/servicesSearch/ServicesSearchIsolatedLayout";

// Preload ticker data and component
let tickerDataPromise: Promise<any> | null = null;
let TickerLayoutComponent: any = null;

const preloadTicker = async () => {
    if (!tickerDataPromise) {
        tickerDataPromise = import("@/data/dataAdapter").then(({ getDataForTicker }) => getDataForTicker());
    }
    if (!TickerLayoutComponent) {
        const { TickerLayout } = await import("@/layouts/ticker/index");
        TickerLayoutComponent = TickerLayout;
    }
    return Promise.all([tickerDataPromise, Promise.resolve(TickerLayoutComponent)]);
};

export default function HomeClient({ initialLayoutMode = "static" }: { initialLayoutMode?: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch" }) {
    const [layoutMode, setLayoutMode] = useState<"static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch">(initialLayoutMode);
    const [isTickerReady, setIsTickerReady] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showButtons, setShowButtons] = useState(true);
    const [isAnimatingText, setIsAnimatingText] = useState(false);
    const [showNavbarText, setShowNavbarText] = useState(true);

    // Refs for background and text animation
    const bgRef = useRef<HTMLDivElement>(null);
    const navbarTextRef = useRef<HTMLHeadingElement>(null);
    const sidebarTextRef = useRef<HTMLDivElement>(null);
    const travelingTextRef = useRef<HTMLDivElement>(null);

    // Track previous layout mode for transition logic
    const prevModeRef = useRef(layoutMode);

    // Continuous Text Synchronization & Animation
    useLayoutEffect(() => {
        const traveling = travelingTextRef.current;
        if (!traveling) return;

        const syncPosition = () => {
            // If we are animating (transitioning), let the animation control position
            if (isAnimatingText) return;

            let target = navbarTextRef.current; // Default anchor
            if (layoutMode === "servicesSearch") {
                target = sidebarTextRef.current;
            }

            if (target) {
                const rect = target.getBoundingClientRect();

                // Snap to target position
                gsap.set(traveling, {
                    position: "fixed",
                    top: rect.top,
                    left: rect.left,
                    width: rect.width || "auto",
                    height: rect.height || "auto",
                    opacity: 1, // Always visible
                    zIndex: 100000,
                    fontSize: getComputedStyle(target).fontSize,
                    whiteSpace: layoutMode === "servicesSearch" ? "normal" : "nowrap",
                    textAlign: "center"
                });
            }
        };

        // Handle 
        const prevMode = prevModeRef.current;
        const currentMode = layoutMode;

        // Detect transitions involving Services Search (Sidebar <-> Navbar)
        if (currentMode === "servicesSearch" && prevMode !== "servicesSearch") {
            setIsAnimatingText(true);

            // Wait forSidebar to render? It should be quick but safe to wait a tick
            setTimeout(() => {
                if (sidebarTextRef.current && navbarTextRef.current) {
                    const navbarRect = navbarTextRef.current.getBoundingClientRect();
                    const sidebarRect = sidebarTextRef.current.getBoundingClientRect();

                    // Start from Navbar
                    gsap.set(traveling, {
                        top: navbarRect.top,
                        left: navbarRect.left,
                        width: navbarRect.width,
                        fontSize: "2rem", // Approx default
                        whiteSpace: "nowrap"
                    });

                    // Animate to Sidebar
                    gsap.to(traveling, {
                        top: 50, // Visual preference or match sidebarRect.top?
                        left: sidebarRect.left,
                        width: sidebarRect.width,
                        fontSize: "1.5rem",
                        duration: 0.8,
                        ease: "power2.inOut",
                        onUpdate: function () {
                            if (this.progress() > 0.5) traveling.style.whiteSpace = "normal";
                        },
                        onComplete: () => {
                            setIsAnimatingText(false);
                            traveling.style.whiteSpace = "normal";
                        }
                    });
                } else {
                    setIsAnimatingText(false); // Fallback
                }
            }, 50);

        } else if (prevMode === "servicesSearch" && currentMode !== "servicesSearch") {
            setIsAnimatingText(true);

            if (sidebarTextRef.current && navbarTextRef.current) {
                const navbarRect = navbarTextRef.current.getBoundingClientRect();
                const sidebarRect = sidebarTextRef.current.getBoundingClientRect();

                // Start from Sidebar position
                gsap.set(traveling, {
                    top: 50,
                    left: sidebarRect.left,
                    width: sidebarRect.width,
                    fontSize: "1.5rem",
                    whiteSpace: "normal"
                });

                // Animate to Navbar
                gsap.to(traveling, {
                    top: navbarRect.top,
                    left: navbarRect.left,
                    width: navbarRect.width,
                    fontSize: "2rem",
                    duration: 0.8,
                    ease: "power2.inOut",
                    onStart: () => {
                        traveling.style.whiteSpace = "nowrap";
                    },
                    onComplete: () => {
                        setIsAnimatingText(false);
                    }
                });
            } else {
                setIsAnimatingText(false);
            }
        }

        // Update Ref
        prevModeRef.current = currentMode;

        // Force immediate sync to prevent FOUC
        if (!isAnimatingText) {
            syncPosition();
        }

        // Start Ticker
        gsap.ticker.add(syncPosition);
        window.addEventListener("resize", syncPosition);

        return () => {
            gsap.ticker.remove(syncPosition);
            window.removeEventListener("resize", syncPosition);
        };
    }, [layoutMode, isAnimatingText]);

    // Memoize circle data since it's static
    const circleData = useMemo(() => getDataForHoneycomb(), []);
    const activeCircle = useMemo(() =>
        expandedId ? circleData.find(c => c.id === expandedId) : null,
        [expandedId, circleData]
    );

    // Helper to resolve layout component
    const getLayoutConfig = useCallback((mode: string) => {
        if (mode === "ticker" && TickerLayoutComponent) {
            return TickerLayoutComponent;
        }
        const id = (mode === "static" || mode === "olympic") ? "honeycomb" : mode;
        return LAYOUT_REGISTRY[id]?.component;
    }, []);

    // Sync layout mode with URL on back/forward and initial load
    useEffect(() => {
        const syncLayoutFromUrl = () => {
            const path = window.location.pathname;
            if (path === "/") {
                setLayoutMode("static");
            } else if (path === "/olympic") {
                setLayoutMode("olympic");
            } else if (path === "/3d-carousel") {
                setLayoutMode("3d-carousel");
            } else if (path === "/ticker") {
                setLayoutMode("ticker");
            } else if (path === "/services") {
                setLayoutMode("servicesSearch");
            }
        };

        window.addEventListener("popstate", syncLayoutFromUrl);
        // Initial sync to handle direct loads if not matching prop
        syncLayoutFromUrl();

        return () => window.removeEventListener("popstate", syncLayoutFromUrl);
    }, []);

    // Optimized layout switching with preloading
    const switchLayout = useCallback(async (newMode: "static" | "olympic" | "3d-carousel" | "ticker" | "servicesSearch") => {
        if (newMode === layoutMode) return;

        // Update URL to match layout mode (shallow routing)
        const path = newMode === "static" ? "/" : `/${newMode === "3d-carousel" ? "3d-carousel" : newMode === "servicesSearch" ? "services" : newMode}`;

        // Use pushState (popstate will not fire for pushState, but our manual update below handles it)
        window.history.pushState(null, "", path);

        // For ticker layout, preload first
        if (newMode === "ticker" && !isTickerReady) {
            try {
                await preloadTicker();
                setIsTickerReady(true);
            } catch (error) {
                console.error("Failed to preload ticker:", error);
                return;
            }
        }

        // Update layout mode
        setLayoutMode(newMode);
    }, [layoutMode, isTickerReady]);

    // Render Layouts and Global Text
    return (
        <main className="fixed inset-0 flex flex-col p-0 overflow-hidden bg-background" data-layout={layoutMode}>
            {layoutMode === "static" && (
                <DefaultLayout
                    navbarTextRef={navbarTextRef as any}
                    onSwitchLayout={switchLayout}
                    expandedId={expandedId}
                    onExpandedChange={setExpandedId}
                />
            )}

            {layoutMode === "olympic" && (
                <OlympicLayout
                    navbarTextRef={navbarTextRef as any}
                    onSwitchLayout={switchLayout}
                />
            )}

            {layoutMode === "3d-carousel" && (
                <Carousel3DLayout
                    navbarTextRef={navbarTextRef as any}
                    onSwitchLayout={switchLayout}
                />
            )}

            {layoutMode === "ticker" && (
                <TickerIsolatedLayout
                    navbarTextRef={navbarTextRef as any}
                    onSwitchLayout={switchLayout}
                />
            )}

            {layoutMode === "servicesSearch" && (
                <ServicesSearchIsolatedLayout
                    showText={!showNavbarText}
                    sidebarTextRef={sidebarTextRef}
                    onSwitchLayout={switchLayout}
                />
            )}

            {activeCircle && layoutMode === "static" && (
                <div style={{ position: 'absolute', zIndex: 99999 }}>
                    <CirclePopup
                        circle={activeCircle}
                        onClose={() => setExpandedId(null)}
                        isOlympic={false}
                    />
                </div>
            )}

            {/* GLOBAL TEXT - Persistent Single Instance */}
            <div
                ref={travelingTextRef}
                className="font-bold tracking-tight pointer-events-none select-none text-center"
                style={{
                    position: "fixed",
                    opacity: 0,
                    zIndex: 100000,
                    display: layoutMode === "servicesSearch" ? "none" : "block",
                }}
            >
                <span
                    className={["ticker", "static"].includes(layoutMode) ? "text-black" : "text-white"}
                >
                    Alphabet
                </span>
                <span
                    className={`inline ml-2 text-gradient`}
                >
                    Consultancy Services
                </span>
            </div>
        </main>
    );
}
