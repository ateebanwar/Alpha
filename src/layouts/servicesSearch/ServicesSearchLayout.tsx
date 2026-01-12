/**
 * ServicesSearchLayout - Sophisticated Dark Theme Design
 * 
 * Matching reference design with:
 * - Dark sidebar with logo, navigation, and pagination
 * - Large image/gallery area
 * - Interactive elements and social sharing
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
    const [currentSlide, setCurrentSlide] = useState(1);
    const [selectedNav, setSelectedNav] = useState(0);
    const [hoveredNav, setHoveredNav] = useState<number | null>(null);
    const [imageKey, setImageKey] = useState(0);
    const totalSlides = 6;

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
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop", // Application Development - coding
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop", // Backend & System Architecture - server/architecture
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop", // Database & Performance - data/analytics
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop", // Cloud & DevOps - cloud technology
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop", // AI, Data & Analytics - AI/ML
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", // Business & Automation - business analytics
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"  // Consulting, Support & Training - team collaboration
    ];

    // Service descriptions for each category
    const serviceDescriptions = [
        "Web & Mobile Apps using React, Next.js, Flutter, iOS (Swift), Android (Kotlin), .NET, Django",
        "Scalable backend & APIs with Node.js, Express, FastAPI, Django, REST, GraphQL, Microservices",
        "Data storage & speed optimization using PostgreSQL, MongoDB, Redis, SQL Server, CDN, Nginx",
        "Cloud hosting & automation with AWS, Azure, Docker, Kubernetes, Terraform, CI/CD pipelines",
        "AI models & data insights using Python, TensorFlow, GPT/LLMs, Power BI, Spark, Computer Vision",
        "E-commerce & workflow automation with Shopify, WooCommerce, Zapier, Power Automate, RPA",
        "Tech strategy, system design, 24/7 support, maintenance & developer training"
    ];

    return (
        <div className="services-search-layout">
            {/* Left Sidebar */}
            <aside className="sidebar">
                {/* Logo - Hidden, used only for position reference */}
                <div ref={sidebarTextRef} className="logo opacity-0">
                    <span className="block font-bold">Alphabet</span>
                    <span className="block font-light">Consultancy Services</span>
                </div>

                {/* Navigation */}
                <nav className="nav-menu">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className={`nav-item-wrapper ${selectedNav === index ? 'active' : ''}`}
                            onMouseEnter={() => {
                                setHoveredNav(index);
                                setSelectedNav(index);
                                setImageKey(prev => prev + 1);
                            }}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            <div className="nav-item">{item}</div>
                            <div className="explore-wrapper">
                                <Link
                                    href={`/services/${slugify(item)}`}
                                    style={{ color: '#ffffff', textDecoration: 'none' }}
                                >
                                    explore →
                                </Link>
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Large Faded Number */}
                <div className="big-number">
                    {String(selectedNav + 1).padStart(2, '0')}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                {/* Hamburger Menu */}
                <button className="hamburger-menu" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Image Area */}
                <div className="image-container">
                    <div className="image-wrapper">
                        <img
                            key={imageKey}
                            src={navImages[hoveredNav !== null ? hoveredNav : selectedNav]}
                            alt={navItems[hoveredNav !== null ? hoveredNav : selectedNav]}
                            className="gallery-image"
                        />
                    </div>

                    {/* Play Button */}
                    <button className="play-button" aria-label="Play">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                            <path d="M10 8L16 12L10 16V8Z" fill="white" />
                        </svg>
                    </button>

                    {/* Tags */}
                    <div className="tags">
                        {serviceDescriptions[selectedNav]}
                    </div>
                </div>

                {/* Follow Us */}
                <button className="follow-us">
                    follow us
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13 5L8 10L3 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </button>
            </main>

            {/* Isolated Styles */}
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

                .services-search-layout {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    background: #1a1a1a;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }

                /* Sidebar Styles - Fluid Responsiveness */
                .sidebar {
                    width: 25vw;
                    min-width: 300px;
                    max-width: 500px;
                    height: 100%;
                    background: #0a0a0a;
                    display: flex;
                    flex-direction: column;
                    padding: 3vh 2.5vw;
                    position: relative;
                    z-index: 10;
                    transition: width 0.3s ease, padding 0.3s ease;
                }

                .logo {
                    font-size: clamp(1.5rem, 1.8vw, 2.5rem);
                    font-weight: 300;
                    color: #ffffff;
                    margin-bottom: 7vh;
                    letter-spacing: 0.05em;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    min-height: 60px;
                }

                .logo-alphabet {
                    color: #ffffff;
                    font-weight: 400;
                }

                .logo-consultancy {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 300;
                }

                .logo-hidden {
                    opacity: 0;
                }

                .logo-visible {
                    opacity: 1;
                }

                .nav-menu {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5vh;
                    margin-bottom: auto;
                }

                .nav-item-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .nav-item {
                    color: #888888;
                    font-size: clamp(1rem, 1.1vw, 1.4rem);
                    font-weight: 300;
                    transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    letter-spacing: 0.02em;
                }

                .nav-item-wrapper:hover .nav-item {
                    color: #ffffff;
                }

                .nav-item-wrapper.active .nav-item {
                    color: #ffffff;
                }

                .explore-wrapper {
                    color: #ffffff;
                    font-size: 0.85rem;
                    font-weight: 300;
                    letter-spacing: 0.02em;
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    pointer-events: none;
                    white-space: nowrap;
                }

                .nav-item-wrapper:hover .explore-wrapper {
                    opacity: 1;
                    transform: translateX(0);
                    pointer-events: auto;
                }

                .big-number {
                    font-size: clamp(5rem, 8vw, 10rem);
                    font-weight: 200;
                    color: rgba(255, 255, 255, 0.15);
                    line-height: 1;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    user-select: none;
                }

                /* Main Content Styles */
                .main-content {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                }

                .hamburger-menu {
                    position: absolute;
                    top: 3vh;
                    right: 2vw;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    z-index: 20;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .hamburger-menu span {
                    width: 28px;
                    height: 2px;
                    background: #ffffff;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .hamburger-menu:hover span {
                    background: #888888;
                }

                .image-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .image-wrapper {
                    width: 100%;
                    height: 100%;
                    background: #1a1a1a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .gallery-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: scale(1);
                    animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .play-button {
                    position: absolute;
                    bottom: 5vh;
                    left: 50%;
                    transform: translateX(-50%);
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
                    opacity: 0.9;
                }

                .play-button:hover {
                    transform: translateX(-50%) scale(1.15);
                    opacity: 1;
                }

                .tags {
                    position: absolute;
                    bottom: 3vh;
                    left: 2vw;
                    background: rgba(0, 0, 0, 0.8);
                    color: #ffffff;
                    padding: 0.75rem 1.5rem;
                    border-radius: 4px;
                    font-size: clamp(0.85rem, 0.9vw, 1.1rem);
                    font-weight: 300;
                    letter-spacing: 0.02em;
                    backdrop-filter: blur(10px);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .follow-us {
                    position: absolute;
                    bottom: 3vh;
                    right: 2vw;
                    background: transparent;
                    border: none;
                    color: #ffffff;
                    font-size: clamp(0.9rem, 1vw, 1.2rem);
                    font-weight: 300;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    letter-spacing: 0.02em;
                }

                .follow-us:hover {
                    opacity: 0.7;
                    transform: translateY(-2px);
                }

                /* Responsive Design - Breakpoints */
                @media (min-width: 1440px) {
                     .sidebar {
                        width: 25vw;
                        padding: 4vh 3vw;
                     }
                     .nav-menu {
                        gap: 3vh;
                     }
                }

                @media (min-width: 1920px) {
                    .sidebar {
                        width: 28vw;
                        max-width: 600px;
                        padding: 5vh 4vw;
                    }
                    .nav-menu {
                        gap: 4vh;
                    }
                }

                @media (max-width: 1024px) {
                    .sidebar {
                        width: 280px;
                        min-width: 280px;
                        padding: 2rem 1.5rem;
                    }

                    .main-content {
                        padding: 2rem;
                    }
                }

                @media (max-width: 768px) {
                    .services-search-layout {
                        flex-direction: column;
                    }

                    .sidebar {
                        width: 100%;
                        height: auto;
                        padding: 1.5rem;
                        flex-direction: row;
                        align-items: center;
                        gap: 2rem;
                        min-width: 0;
                        max-width: none;
                    }

                    .logo {
                        margin-bottom: 0;
                        margin-right: auto;
                    }

                    .nav-menu {
                        display: none;
                    }

                    .big-number {
                        font-size: 4rem;
                    }

                    .main-content {
                        padding: 1.5rem;
                    }

                    .hamburger-menu {
                        top: 1.5rem;
                        right: 1.5rem;
                    }

                    .tags {
                        font-size: 0.75rem;
                        padding: 0.5rem 1rem;
                        left: 1rem;
                        bottom: 1rem;
                    }

                    .follow-us {
                        bottom: 1.5rem;
                        right: 1.5rem;
                        font-size: 0.8rem;
                    }

                    .play-button {
                        bottom: 2rem;
                    }
                }

                @media (max-width: 480px) {
                    .sidebar {
                        padding: 1rem;
                    }

                    .logo {
                        font-size: 1.2rem;
                    }

                    .big-number {
                        font-size: 3rem;
                    }

                    .main-content {
                        padding: 1rem;
                    }

                    .placeholder-text {
                        font-size: 1.5rem;
                    }

                    .tags {
                        font-size: 0.7rem;
                        padding: 0.4rem 0.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
