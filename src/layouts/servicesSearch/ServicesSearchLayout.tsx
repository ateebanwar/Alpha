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
                {/* Logo - Visible */}
                <div className="logo">
                    <h2 className="logo-title">Alphabet Consultancy Services</h2>
                </div>

                {/* Navigation Cards */}
                <nav className="nav-cards">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={`/services/${slugify(item)}`}
                            className="nav-card-link"
                            onMouseEnter={() => {
                                setHoveredNav(index);
                                setSelectedNav(index);
                                setImageKey(prev => prev + 1);
                            }}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            <div className={`nav-card ${selectedNav === index ? 'active' : ''}`}>
                                <span className="nav-card-text">{item}</span>
                                <svg
                                    className="nav-card-chevron"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M7.5 15L12.5 10L7.5 5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </nav>



                {/* Hidden ref for parent component */}
                <div ref={sidebarTextRef} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                {/* Neumorphic Image Card */}
                <div className="image-card">
                    <div className="image-frame">
                        <img
                            key={imageKey}
                            src={navImages[hoveredNav !== null ? hoveredNav : selectedNav]}
                            alt={navItems[hoveredNav !== null ? hoveredNav : selectedNav]}
                            className="gallery-image"
                        />
                    </div>

                    {/* Description Area */}
                    <div className="description-area">
                        <p className="description-text">
                            {serviceDescriptions[selectedNav]}
                        </p>
                    </div>
                </div>
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
                    background: #e0e5ec;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }

                /* Sidebar Styles - Neumorphic Design */
                .sidebar {
                    width: 25vw;
                    min-width: 340px;
                    max-width: 520px;
                    height: calc(100% - 20px);
                    margin: 10px;
                    background: #e8ecf0;
                    display: flex;
                    flex-direction: column;
                    padding: 2rem;
                    position: relative;
                    z-index: 10;
                    border-radius: 24px;
                    box-shadow: 
                        -12px -12px 24px rgba(255, 255, 255, 0.9),
                        12px 12px 24px rgba(163, 177, 198, 0.6);
                }

                /* Logo Styles */
                .logo {
                    margin-bottom: 2.5rem;
                }

                .logo-title {
                    font-size: 1.65rem;
                    font-weight: 600;
                    background: linear-gradient(135deg, #9ca3af 0%, #38bdf8 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.3;
                    letter-spacing: -0.02em;
                    margin: 0;
                }

                /* Navigation Cards */
                .nav-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    flex: 1;
                    margin-bottom: 1rem;
                    overflow: visible;
                }

                .nav-card-link {
                    text-decoration: none;
                    display: block;
                }

                .nav-card {
                    background: #e8ecf0;
                    padding: 0.75rem 1.25rem;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 
                        -5px -5px 12px rgba(255, 255, 255, 0.8),
                        5px 5px 12px rgba(163, 177, 198, 0.4);
                }

                .nav-card:hover {
                    box-shadow: 
                        -6px -6px 14px rgba(255, 255, 255, 0.9),
                        6px 6px 14px rgba(163, 177, 198, 0.5);
                    transform: translateY(-1px);
                }

                .nav-card.active {
                    box-shadow: 
                        inset -3px -3px 8px rgba(255, 255, 255, 0.6),
                        inset 3px 3px 8px rgba(163, 177, 198, 0.35);
                }

                .nav-card-text {
                    font-size: 0.9rem;
                    font-weight: 400;
                    color: #38bdf8;
                    line-height: 1.3;
                    letter-spacing: -0.01em;
                }

                .nav-card:hover .nav-card-text {
                    color: #0ea5e9;
                }

                .nav-card-chevron {
                    color: #38bdf8;
                    flex-shrink: 0;
                    transition: all 0.25s ease;
                    opacity: 0.7;
                }

                .nav-card:hover .nav-card-chevron {
                    opacity: 1;
                    transform: translateX(3px);
                }



                /* Main Content Styles */
                .main-content {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                    background: #e0e5ec;
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


                /* Neumorphic Image Card */
                .image-card {
                    width: 100%;
                    height: 100%;
                    background: #e8ecf0;
                    border-radius: 24px;
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 
                        -12px -12px 24px rgba(255, 255, 255, 0.9),
                        12px 12px 24px rgba(163, 177, 198, 0.6);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .image-frame {
                    width: 100%;
                    flex: 1;
                    background: #f5f5f0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 
                        inset -3px -3px 8px rgba(255, 255, 255, 0.5),
                        inset 3px 3px 8px rgba(163, 177, 198, 0.3);
                }

                .gallery-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: scale(1);
                    animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                /* Description Area */
                .description-area {
                    margin-top: 1rem;
                    background: #e8ecf0;
                    padding: 1rem 1.5rem;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
                    box-shadow: 
                        inset -2px -2px 6px rgba(255, 255, 255, 0.6),
                        inset 2px 2px 6px rgba(163, 177, 198, 0.25);
                }

                .description-text {
                    flex: 1;
                    margin: 0;
                    font-size: 0.95rem;
                    font-weight: 700;
                    font-style: italic;
                    color: #38bdf8;
                    line-height: 1.5;
                    letter-spacing: 0.01em;
                }

                .chevron-button {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: #e8ecf0;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: #9ca3af;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 
                        -4px -4px 10px rgba(255, 255, 255, 0.8),
                        4px 4px 10px rgba(163, 177, 198, 0.4);
                }

                .chevron-button:hover {
                    box-shadow: 
                        -5px -5px 12px rgba(255, 255, 255, 0.9),
                        5px 5px 12px rgba(163, 177, 198, 0.5);
                    transform: translateY(1px);
                }

                .chevron-button:active {
                    box-shadow: 
                        inset -2px -2px 6px rgba(255, 255, 255, 0.6),
                        inset 2px 2px 6px rgba(163, 177, 198, 0.3);
                }


                /* Responsive Design - Breakpoints */
                @media (min-width: 1440px) {
                     .sidebar {
                        padding: 3rem 2.5rem;
                     }
                     .nav-cards {
                        gap: 1.25rem;
                     }
                }

                @media (min-width: 1920px) {
                    .sidebar {
                        max-width: 580px;
                        padding: 3.5rem 3rem;
                    }
                    .nav-cards {
                        gap: 1.5rem;
                    }
                }

                @media (max-width: 1024px) {
                    .sidebar {
                        min-width: 300px;
                        padding: 2rem 1.5rem;
                    }

                    .logo-title {
                        font-size: 1.5rem;
                    }

                    .nav-card {
                        padding: 1rem 1.25rem;
                    }

                    .nav-card-text {
                        font-size: 0.95rem;
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
                        max-height: 60vh;
                        overflow-y: auto;
                        padding: 1.5rem;
                        min-width: 0;
                        max-width: none;
                    }

                    .logo {
                        margin-bottom: 1.5rem;
                    }

                    .logo-title {
                        font-size: 1.3rem;
                    }

                    .nav-cards {
                        gap: 0.75rem;
                        margin-bottom: 1.5rem;
                    }

                    .nav-card {
                        padding: 0.9rem 1.2rem;
                    }

                    .menu-section {
                        padding-top: 1rem;
                    }

                    .main-content {
                        flex: 1;
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
                        max-height: 55vh;
                    }

                    .logo-title {
                        font-size: 1.1rem;
                    }

                    .nav-cards {
                        gap: 0.6rem;
                    }

                    .nav-card {
                        padding: 0.8rem 1rem;
                        border-radius: 16px;
                    }

                    .nav-card-text {
                        font-size: 0.85rem;
                    }

                    .menu-icon {
                        width: 48px;
                        height: 48px;
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
