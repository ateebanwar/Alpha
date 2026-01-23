/**
 * ServicesSearchLayout - Minimalist Black Design
 * Inspired by modern architecture portfolio layouts
 * 
 * Pure black sidebar with white text
 * Large image showcase area
 * Clean, minimal typography
 */

"use client";

import { useState, RefObject } from "react";
import Link from "next/link";
import { SERVICES_DATA } from "@/data/servicesData";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

interface ServicesSearchLayoutProps {
    showText?: boolean;
    sidebarTextRef?: RefObject<HTMLDivElement>;
}

export default function ServicesSearchLayout({ showText = true, sidebarTextRef }: ServicesSearchLayoutProps) {
    const [selectedNav, setSelectedNav] = useState(0);
    const [hoveredNav, setHoveredNav] = useState<number | null>(null);
    const [imageKey, setImageKey] = useState(0);

    // Navigation items
    const navItems = [
        "Application Development",
        "Backend & System Architecture",
        "Database & Performance Engineering",
        "Cloud & DevOps Solutions",
        "AI, Data & Analytics",
        "Business & Automation Solutions",
        "Consulting, Support & Training"
    ];

    // Images for each navigation item
    const navImages = [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop"
    ];

    return (
        <div className="services-layout">
            {/* Black Sidebar */}
            <aside className="sidebar">
                {/* Logo */}
                <div className="logo">
                    <h1>
                        <div>Alphabet</div>
                        <div>Consultancy</div>
                        <div>Services</div>
                    </h1>
                </div>

                {/* Navigation List */}
                <nav className="nav-list">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={`/services/${slugify(item)}`}
                            className={`nav-item ${selectedNav === index ? 'active' : ''}`}
                            onMouseEnter={() => {
                                setHoveredNav(index);
                                setSelectedNav(index);
                                setImageKey(prev => prev + 1);
                            }}
                            onClick={(e) => {
                                // Check if the click target or its parent is the explore button
                                const isExploreButton = (e.target as HTMLElement).closest('.explore-button');

                                if (!isExploreButton) {
                                    // If NOT clicking explore, change image but prevent navigation
                                    e.preventDefault();
                                    setSelectedNav(index);
                                    setHoveredNav(index);
                                    setImageKey(prev => prev + 1);
                                }
                                // If IS explore button, allow standard Link navigation
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                flexWrap: 'nowrap',
                                overflow: 'hidden'
                            }}
                        >
                            <span
                                className="nav-text"
                                style={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    minWidth: 0,
                                    pointerEvents: 'none' // Ensures click logic targets the explore button correctly
                                }}
                            >
                                {item}
                            </span>
                            {(hoveredNav === index || selectedNav === index) && (
                                <span
                                    className="explore-button"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#ffffff',
                                        fontSize: '0.85rem',
                                        fontWeight: 400,
                                        fontStyle: 'italic',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0
                                    }}
                                >
                                    <span style={{ pointerEvents: 'none' }}>explore</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ pointerEvents: 'none' }}>
                                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Large Background Number */}
                <div className="background-number">
                    {selectedNav + 1}
                </div>

                {/* Hidden ref */}
                <div ref={sidebarTextRef} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            </aside>

            {/* Main Image Area */}
            <main className="main-area">
                <div className="image-container">
                    <img
                        key={imageKey}
                        src={navImages[hoveredNav !== null ? hoveredNav : selectedNav]}
                        alt={navItems[hoveredNav !== null ? hoveredNav : selectedNav]}
                        className="main-image"
                    />

                    {/* Image Label */}
                    <div className="image-label">
                        <span>{navItems[selectedNav]}</span>
                    </div>

                    {/* Follow Us */}
                    <div className="follow-us">
                        <span>follow us</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 3L3 13M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </main>

            {/* Minimalist Black Theme Styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(1.02);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .services-layout {
                    position: fixed;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    background: #000000;
                    overflow: hidden;
                    font-family: 'Poppins', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
                }

                /* Black Sidebar */
                .sidebar {
                    width: clamp(380px, 28vw, 550px);
                    height: 100%;
                    background: #000000;
                    display: flex;
                    flex-direction: column;
                    padding: clamp(2.5rem, 4vw, 5rem) clamp(2rem, 3.5vw, 4.5rem);
                    position: relative;
                    z-index: 10;
                    overflow: hidden;
                }

                /* Logo */
                .logo {
                    margin-top: 18px;
                    margin-bottom: clamp(3rem, 5vh, 6rem);
                }

                .logo h1 {
                    font-size: clamp(0.9rem, 1.2vw, 1.4rem);
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0;
                    letter-spacing: 0.05em;
                    line-height: 1.3;
                    text-align: left;
                }

                .logo h1 div {
                    margin: 0;
                }

                /* Navigation List */
                .nav-list {
                    display: flex;
                    flex-direction: column;
                    gap: clamp(0.8rem, 1.5vh, 1.5rem);
                    flex: 1;
                    margin-top: 18px;
                    margin-bottom: clamp(2rem, 3vh, 3.5rem);
                    overflow-y: auto;
                    overflow-x: hidden;
                }

                .nav-list::-webkit-scrollbar {
                    width: 4px;
                }

                .nav-list::-webkit-scrollbar-track {
                    background: transparent;
                }

                .nav-list::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 2px;
                }

                .nav-list::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .nav-item {
                    font-size: clamp(0.95rem, 1.1vw, 1.25rem);
                    font-weight: 700 !important;
                    color: #8E8B96 !important;
                    text-decoration: none;
                    padding: clamp(0.5rem, 0.8vh, 0.9rem) 0;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    line-height: 1.5;
                    letter-spacing: 0;
                }

                .nav-item:hover,
                .nav-item.active {
                    color: #ffffff !important;
                }

                /* Large Background Number */
                .background-number {
                    position: absolute;
                    bottom: calc(2rem - 18px);
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: clamp(8rem, 15vw, 18rem);
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.1);
                    line-height: 1;
                    pointer-events: none;
                    z-index: 0;
                }

                /* Main Image Area */
                .main-area {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .image-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .main-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                /* Image Label */
                .image-label {
                    position: absolute;
                    bottom: 3rem;
                    left: 3rem;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(10px);
                    padding: 0.65rem 1.25rem;
                    border-radius: 2px;
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: #ffffff;
                    letter-spacing: 0.05em;
                    text-transform: lowercase;
                }

                /* Follow Us */
                .follow-us {
                    position: absolute;
                    bottom: 3rem;
                    right: 3rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: #ffffff;
                    letter-spacing: 0.05em;
                    cursor: pointer;
                    transition: gap 0.3s ease;
                }

                .follow-us:hover {
                    gap: 1rem;
                }

                .follow-us svg {
                    color: #ffffff;
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .sidebar {
                        width: 260px;
                        padding: 2.5rem 2rem;
                    }
                }

                /* Responsive Design - 100vh Viewport for All Screens */
                
                /* Ultra Large Desktop - 27" and above (2560px+) */
                @media (min-width: 2560px) {
                    .sidebar {
                        width: clamp(550px, 30vw, 700px);
                        padding: clamp(4rem, 5vw, 6rem) clamp(3rem, 4vw, 5rem);
                    }

                    .logo {
                        margin-bottom: clamp(5rem, 6vh, 8rem);
                    }

                    .logo h1 {
                        font-size: clamp(1.3rem, 1.5vw, 1.8rem);
                        letter-spacing: 0.08em;
                    }

                    .nav-list {
                        gap: clamp(1.2rem, 2vh, 2rem);
                        margin-bottom: clamp(3rem, 4vh, 5rem);
                    }

                    .nav-item {
                        font-size: clamp(1.2rem, 1.3vw, 1.5rem);
                        padding: clamp(0.8rem, 1vh, 1.2rem) 0;
                    }

                    .background-number {
                        font-size: clamp(16rem, 18vw, 22rem);
                    }

                    .image-label,
                    .follow-us {
                        font-size: clamp(0.9rem, 1vw, 1.1rem);
                        padding: clamp(0.8rem, 1vh, 1rem) clamp(1.2rem, 1.5vw, 1.5rem);
                    }
                }

                /* Large Desktop (1920px - 27" at 1440p) */
                @media (min-width: 1920px) and (max-width: 2559px) {
                    .sidebar {
                        width: clamp(480px, 29vw, 600px);
                        padding: clamp(3.5rem, 4.5vw, 5.5rem) clamp(2.5rem, 3.5vw, 4.5rem);
                    }

                    .logo h1 {
                        font-size: clamp(1.1rem, 1.3vw, 1.6rem);
                    }

                    .nav-list {
                        gap: clamp(1rem, 1.8vh, 1.8rem);
                    }

                    .nav-item {
                        font-size: clamp(1.1rem, 1.2vw, 1.35rem);
                        padding: clamp(0.7rem, 0.9vh, 1rem) 0;
                    }

                    .background-number {
                        font-size: clamp(14rem, 16vw, 20rem);
                    }
                }

                /* Large Desktop (1440px and above) */
                @media (min-width: 1440px) and (max-width: 1919px) {
                    .sidebar {
                        width: clamp(420px, 28vw, 550px);
                        padding: clamp(3rem, 4vw, 5rem) clamp(2.5rem, 3.5vw, 4rem);
                    }

                    .logo h1 {
                        font-size: clamp(1rem, 1.2vw, 1.4rem);
                    }

                    .nav-item {
                        font-size: clamp(1.05rem, 1.15vw, 1.3rem);
                    }

                    .background-number {
                        font-size: clamp(12rem, 15vw, 18rem);
                    }
                }

                /* Tablet (1024px and below) */
                @media (max-width: 1024px) {
                    .sidebar {
                        width: 300px;
                        padding: 2.5rem 2rem;
                    }

                    .logo h1 {
                        font-size: 0.9rem;
                    }

                    .nav-item {
                        font-size: 0.95rem;
                    }

                    .background-number {
                        font-size: 10rem;
                    }
                }

                /* Tablet Portrait (768px and below) - Still 100vh */
                @media (max-width: 768px) {
                    .services-layout {
                        flex-direction: row;
                        height: 100vh;
                    }
                    
                    .sidebar {
                        width: 280px;
                        height: 100vh;
                        padding: 2rem 1.5rem;
                        overflow-y: auto;
                    }

                    .logo {
                        margin-top: 0;
                        margin-bottom: 2rem;
                    }

                    .logo h1 {
                        font-size: 0.85rem;
                    }

                    .nav-list {
                        margin-top: 0;
                        gap: 0.8rem;
                    }

                    .nav-item {
                        font-size: 0.9rem;
                        padding: 0.5rem 0;
                    }

                    .background-number {
                        font-size: 7rem;
                        bottom: 1rem;
                    }

                    .main-area {
                        flex: 1;
                        height: 100vh;
                    }

                    .image-label {
                        font-size: 0.75rem;
                        padding: 0.5rem 1rem;
                    }

                    .follow-us {
                        font-size: 0.75rem;
                        padding: 0.5rem 0.85rem;
                    }
                }

                /* Mobile (480px and below) - Stylish Background Image with Overlay */
                @media (max-width: 480px) {
                    .services-layout {
                        flex-direction: column;
                        height: 100vh;
                        overflow: hidden;
                        position: relative;
                    }

                    /* Image as Full Background */
                    .main-area {
                        position: absolute;
                        inset: 0;
                        width: 100vw;
                        height: 100vh;
                        z-index: 1;
                    }

                    .image-container {
                        width: 100%;
                        height: 100%;
                    }

                    .main-image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    /* Dark Gradient Overlay */
                    .main-area::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(
                            180deg,
                            rgba(0, 0, 0, 0.85) 0%,
                            rgba(0, 0, 0, 0.7) 40%,
                            rgba(0, 0, 0, 0.5) 70%,
                            rgba(0, 0, 0, 0.8) 100%
                        );
                        pointer-events: none;
                        z-index: 2;
                    }

                    /* Sidebar as Glassy Overlay Card */
                    .sidebar {
                        position: relative;
                        z-index: 10;
                        width: calc(100% - 2rem);
                        height: auto;
                        max-height: 100vh;
                        margin: 1rem;
                        padding: 1.5rem 1.25rem;
                        background: rgba(0, 0, 0, 0.15);
                        backdrop-filter: blur(80px) saturate(180%);
                        -webkit-backdrop-filter: blur(80px) saturate(180%);
                        border-radius: 24px;
                        border: 1px solid rgba(255, 255, 255, 0.25);
                        box-shadow: 
                            0 8px 32px rgba(0, 0, 0, 0.5),
                            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                            0 1px 0 rgba(255, 255, 255, 0.2) inset;
                        overflow: visible;
                        display: flex;
                        flex-direction: column;
                    }

                    .logo {
                        margin-top: 0;
                        margin-bottom: 1.5rem;
                        text-align: center;
                    }

                    .logo h1 {
                        font-size: 0.8rem;
                        letter-spacing: 0.1em;
                        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
                    }

                    .logo h1 div {
                        margin: 0.05rem 0;
                    }

                    .nav-list {
                        gap: 0.5rem;
                        margin-top: 0;
                        margin-bottom: 1rem;
                        overflow: visible;
                        flex: none;
                    }

                    .nav-item {
                        font-size: 0.8rem;
                        padding: 0.4rem 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
                    }
                    .nav-item:hover,
                    .nav-item.active {
                        color: #ffffff !important;
                        border-bottom-color: rgba(142, 139, 150, 0.4);
                        padding-left: 0.5rem;
                    }

                    .background-number {
                        font-size: 4.5rem;
                        bottom: 0.5rem;
                        opacity: 0.15;
                        color: rgba(255, 255, 255, 0.15);
                    }

                    /* Hide image labels on mobile overlay */
                    .image-label {
                        display: none;
                    }

                    .follow-us {
                        position: fixed;
                        bottom: 1rem;
                        right: 1rem;
                        z-index: 100;
                        font-size: 0.7rem;
                        padding: 0.5rem 0.8rem;
                        background: rgba(0, 0, 0, 0.85);
                        backdrop-filter: blur(15px);
                        border-radius: 12px;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.8);
                    }
                }

                /* Extra Small Mobile (360px and below) */
                @media (max-width: 360px) {
                    .sidebar {
                        margin: 0.75rem;
                        padding: 1.25rem 1rem;
                        border-radius: 16px;
                    }

                    .logo h1 {
                        font-size: 0.7rem;
                    }

                    .nav-item {
                        font-size: 0.75rem;
                        padding: 0.35rem 0;
                    }

                    .background-number {
                        font-size: 4rem;
                    }
                }
            `}</style>
        </div>
    );
}
