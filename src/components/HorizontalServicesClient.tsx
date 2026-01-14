"use client";

import { useState } from "react";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// Service categories mapping
const serviceCategories = [
    "Application Development",
    "Backend & System Architecture",
    "Database & Performance Engineering",
    "Cloud & DevOps Solutions",
    "AI, Data & Analytics",
    "Business & Automation Solutions",
    "Consulting, Support & Training"
];

// Service detail cards for each category
const serviceDetailCards: Record<string, Array<{ image: string, tag: string, title: string, description: string }>> = {
    "application-development": [
        {
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
            tag: "EXPLORE OUR PORTFOLIO",
            title: "Explore our portfolio",
            description: "Lead architecture for your app."
        },
        {
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tag: "FUTURE READY",
            title: "Innovate",
            description: "AI and Machine Learning integration for smarter apps."
        },
        {
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
            tag: "SEAMLESS INTEGRATION",
            title: "Connect",
            description: "Designing intuitive mobile solutions for Android."
        },
        {
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
            tag: "USER EXPERIENCE",
            title: "Design",
            description: "Crafting beautiful and functional user interfaces."
        },
        {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            tag: "PERFORMANCE",
            title: "Scale",
            description: "Scaling your application to handle millions of users."
        },
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
            tag: "SECURITY FIRST",
            title: "Secure",
            description: "Implementing enterprise-grade security protocols."
        },
        {
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
            tag: "EFFICIENCY",
            title: "Automate",
            description: "Streamlining workflows with intelligent automation."
        },
        {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tag: "DATA INSIGHTS",
            title: "Analyze",
            description: "Transforming raw data into actionable business insights."
        },
        {
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
            tag: "RELIABILITY",
            title: "Support",
            description: "Dedicated 24/7 maintenance and technical support."
        },
        {
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
            tag: "READY TO GO",
            title: "Launch",
            description: "Expert deployment strategies for global reach."
        }
    ],
    "backend-system-architecture": [
        {
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
            tag: "SCALABLE SYSTEMS",
            title: "Build Robust",
            description: "Enterprise-grade backend architecture."
        },
        {
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
            tag: "API EXCELLENCE",
            title: "Connect Systems",
            description: "RESTful and GraphQL API development."
        },
        {
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
            tag: "MICROSERVICES",
            title: "Scale Smart",
            description: "Distributed systems for modern apps."
        },
        {
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
            tag: "INFRASTRUCTURE",
            title: "Cloud Scale",
            description: "Manage high-traffic applications with ease."
        },
        {
            image: "https://images.unsplash.com/photo-1518433278981-2a2df7aa4e9b?w=600&h=400&fit=crop",
            tag: "SERVERLESS",
            title: "Go Lean",
            description: "Efficient Lambda and Azure Functions."
        },
        {
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
            tag: "MONITORING",
            title: "Stay Awake",
            description: "Real-time logging and performance tracking."
        },
        {
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
            tag: "DATA FLOW",
            title: "Streamline",
            description: "Optimized data processing pipelines."
        },
        {
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
            tag: "RELIABILITY",
            title: "High Availability",
            description: "Ensuring 99.9% uptime for your business."
        },
        {
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
            tag: "MODERN TECH",
            title: "Edge Computing",
            description: "Processing data closer to the source."
        },
        {
            image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
            tag: "ARCHITECTURE",
            title: "Clean Code",
            description: "Maintainable and scalable codebase."
        }
    ],
    "database-performance-engineering": [
        {
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
            tag: "DATA OPTIMIZATION",
            title: "Store Efficiently",
            description: "PostgreSQL and MongoDB solutions."
        },
        {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            tag: "PERFORMANCE",
            title: "Speed Matters",
            description: "Redis caching and CDN integration."
        },
        {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tag: "ANALYTICS",
            title: "Insights",
            description: "Real-time data processing."
        },
        {
            image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&h=400&fit=crop",
            tag: "QUERIES",
            title: "Index Deep",
            description: "Advanced SQL optimization for speed."
        },
        {
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
            tag: "STORAGE",
            title: "Data Lakes",
            description: "Vast storage for big data requirements."
        },
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
            tag: "COMPLIANCE",
            title: "GDPR Ready",
            description: "Data security and privacy by design."
        },
        {
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
            tag: "BIG DATA",
            title: "Process All",
            description: "Hadoop and Spark for large-scale data."
        },
        {
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tag: "GRAPH DATA",
            title: "Connect Items",
            description: "Neo4j for relationship-heavy data."
        },
        {
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
            tag: "RECOVERY",
            title: "Safe Backup",
            description: "Automated disaster recovery solutions."
        },
        {
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
            tag: "TUNING",
            title: "Max Performance",
            description: "Fine-tuning hardware and software."
        }
    ],
    "cloud-devops-solutions": [
        {
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
            tag: "CLOUD NATIVE",
            title: "Deploy Anywhere",
            description: "AWS and Azure infrastructure."
        },
        {
            image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
            tag: "AUTOMATION",
            title: "CI/CD Pipelines",
            description: "Automated deployment workflows."
        },
        {
            image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=400&fit=crop",
            tag: "CONTAINERS",
            title: "Kubernetes",
            description: "Container orchestration at scale."
        },
        {
            image: "https://images.unsplash.com/photo-1518433278981-2a2df7aa4e9b?w=600&h=400&fit=crop",
            tag: "IAAC",
            title: "Infrastructure",
            description: "Terraform and Ansible for automation."
        },
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
            tag: "DEVOPS",
            title: "Team Sync",
            description: "Bridging the gap between dev and ops."
        },
        {
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
            tag: "SECURITY",
            title: "DevSecOps",
            description: "Integrating security into the pipeline."
        },
        {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            tag: "MONITORING",
            title: "Cloud Health",
            description: "Prometheus and Grafana dashboards."
        },
        {
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
            tag: "SERVERLESS",
            title: "Fast Deploy",
            description: "Quickly push code to the edge."
        },
        {
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
            tag: "COST",
            title: "Bill Optimize",
            description: "Reducing cloud infrastructure costs."
        },
        {
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
            tag: "HYBRID",
            title: "Both Worlds",
            description: "Combining on-prem and cloud."
        }
    ],
    "ai-data-analytics": [
        {
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tag: "ARTIFICIAL INTELLIGENCE",
            title: "AI Solutions",
            description: "Machine learning models for your business."
        },
        {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tag: "DATA SCIENCE",
            title: "Insights",
            description: "Power BI and advanced analytics."
        },
        {
            image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop",
            tag: "COMPUTER VISION",
            title: "Visual AI",
            description: "Image recognition and processing."
        },
        {
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
            tag: "NLP",
            title: "Talk to Data",
            description: "Natural language processing models."
        },
        {
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
            tag: "PREDICTION",
            title: "Future Forecast",
            description: "Predictive analytics for growth."
        },
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
            tag: "DEEP LEARNING",
            title: "Neural Nets",
            description: "Solving complex problems with AI."
        },
        {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            tag: "ETL",
            title: "Power Pipes",
            description: "Clean and transform your data."
        },
        {
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
            tag: "STATISTICS",
            title: "Hard Numbers",
            description: "Statistical modeling for accuracy."
        },
        {
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
            tag: "WAREHOUSE",
            title: "Store Smart",
            description: "Snowflake and BigQuery solutions."
        },
        {
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
            tag: "DASHBOARD",
            title: "See More",
            description: "Interactive data visualization."
        }
    ],
    "business-automation-solutions": [
        {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            tag: "E-COMMERCE",
            title: "Online Stores",
            description: "Shopify and WooCommerce solutions."
        },
        {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tag: "AUTOMATION",
            title: "Workflow Magic",
            description: "Zapier and Power Automate integration."
        },
        {
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
            tag: "RPA",
            title: "Process Automation",
            description: "Robotic process automation solutions."
        },
        {
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
            tag: "CRM",
            title: "Sales Power",
            description: "HubSpot and Salesforce optimization."
        },
        {
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
            tag: "COMMUNICATION",
            title: "Slack Bots",
            description: "Automate internal comms."
        },
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
            tag: "LOGISTICS",
            title: "Supply Chain",
            description: "Automating tracking and shipping."
        },
        {
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tag: "MARKETING",
            title: "Ad Automation",
            description: "Smart campaigns with less effort."
        },
        {
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
            tag: "FINANCE",
            title: "Auto Invoicing",
            description: "Get paid faster with automation."
        },
        {
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
            tag: "DOCUMENTS",
            title: "E-Sign",
            description: "Digital contracts and signing."
        },
        {
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
            tag: "AI BOTS",
            title: "ChatGPT",
            description: "Custom AI agents for your team."
        }
    ],
    "consulting-support-training": [
        {
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
            tag: "STRATEGY",
            title: "Tech Consulting",
            description: "Expert guidance for your projects."
        },
        {
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
            tag: "TRAINING",
            title: "Learn & Grow",
            description: "Developer training programs."
        },
        {
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
            tag: "24/7 SUPPORT",
            title: "Always Here",
            description: "Round-the-clock maintenance and support."
        },
        {
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
            tag: "MENTORING",
            title: "Expert Help",
            description: "One-on-one sessions for seniors."
        },
        {
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
            tag: "SECURITY",
            title: "Audit",
            description: "Deep dive into your system safety."
        },
        {
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
            tag: "UI/UX",
            title: "Review",
            description: "Expert feedback on your designs."
        },
        {
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tag: "AGILE",
            title: "Coach",
            description: "Improve your team's workflow."
        },
        {
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tag: "RECRUITING",
            title: "Tech Hire",
            description: "Find the best talent for your team."
        },
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
            tag: "PROJECTS",
            title: "Management",
            description: "Delivery on time and budget."
        },
        {
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
            tag: "WORKSHOPS",
            title: "Deep Dive",
            description: "Intensive training for new tech."
        }
    ]
};

const recentWorks = [
    {
        title: "Digital Transformation",
        desc: "A comprehensive system redesign focused on scalability and conversion. We implemented a high-performance architecture that reduced load times by 60% while providing a more intuitive journey for end-users.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        stats: [
            { label: "FASTER", value: "60%" },
            { label: "GROWTH", value: "25%" }
        ]
    },
    {
        title: "Cloud Migration",
        desc: "Seamlessly transitioned legacy infrastructure to a cloud-native environment. Improved operational efficiency and reduced hosting costs by 40% using AWS best practices.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        stats: [
            { label: "SAVINGS", value: "40%" },
            { label: "UPTIME", value: "99.9%" }
        ]
    },
    {
        title: "AI Integration",
        desc: "Deployed custom machine learning models to automate customer support workflows. Achieved a 50% reduction in response times and significant improvement in customer satisfaction scores.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        stats: [
            { label: "AUTOMATION", value: "50%" },
            { label: "CSAT", value: "x2" }
        ]
    },
    {
        title: "Mobile Experience",
        desc: "Developed a cross-platform mobile application that delivers a premium native feel. The project focused on high-performance animations and offline-first capabilities for users on the go.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
        stats: [
            { label: "ENGAGEMENT", value: "75%" },
            { label: "RETENTION", value: "40%" }
        ]
    },
    {
        title: "Security Audit",
        desc: "Conducted a full-scale security overhaul for a fintech platform. Implemented advanced encryption, multi-factor authentication, and real-time threat monitoring systems.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
        stats: [
            { label: "SECURITY", value: "100%" },
            { label: "COMPLIANCE", value: "SOC2" }
        ]
    }
];

export default function HorizontalServicesClient({ slug }: { slug: string }) {
    const cards = serviceDetailCards[slug] || serviceDetailCards["application-development"];
    const categoryName = serviceCategories.find(cat => slugify(cat) === slug) || "Application Development";

    // Calculate animation duration based on number of cards to keep speed consistent
    // 4 seconds per card is a good baseline
    const animationDuration = cards.length * 4;

    return (
        <div className="service-detail-page">
            {/* Category Title in Neumorphic Box */}
            <div className="title-box">
                <h1 className="page-title">{categoryName.toUpperCase()}</h1>
            </div>

            {/* Cards Container */}
            <div className="cards-grid">
                <div
                    className="marquee-track"
                    style={{
                        animationDuration: `${animationDuration}s`,
                        // @ts-ignore - custom property
                        '--marquee-duration': `${animationDuration}s`
                    } as React.CSSProperties}
                >
                    {[...cards, ...cards].map((card, idx) => (
                        <div key={idx} className="service-card">
                            <div className="card-image-wrapper">
                                <img src={card.image} alt={card.title} className="card-image" />
                                {/* Text Overlay */}
                                <div className="card-text-overlay">
                                    <span className="card-tag">{card.tag}</span>
                                    <h2 className="card-title">{card.title}</h2>
                                    <p className="card-description">{card.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHAT I WORKS Section */}
            <div className="works-section">
                <div className="works-header">
                    <div className="works-badge">
                        <span className="music-icon"></span> SERVICES
                    </div>
                    <h2 className="works-title">WHAT WE WORKED</h2>
                    <p className="works-subtitle">
                        We craft user-centered designs that not only elevate.
                    </p>
                </div>

                <div className="works-content">
                    {recentWorks.map((work, idx) => (
                        <div key={idx} className="works-card">
                            <div className="works-card-inner flex-layout">
                                <div className="works-image-side">
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        className="mockup-img-v2"
                                    />
                                </div>
                                <div className="works-text-side">
                                    <h3 className="works-item-title">{work.title}</h3>
                                    <p className="works-item-desc">{work.desc}</p>
                                    <div className="works-stats">
                                        {work.stats.map((stat, sIdx) => (
                                            <div key={sIdx} className="stat-item">
                                                <span className="stat-value">{stat.value}</span>
                                                <span className="stat-label">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .service-detail-page {
                    min-height: 100vh;
                    background: #000000;
                    padding: 10px;
                    overflow-x: hidden;
                    user-select: none; /* Completely disable text selection */
                }

                .title-box {
                    background: linear-gradient(145deg, #222222, #181818);
                    padding: 0.6rem 2rem;
                    border-radius: 50px;
                    margin-top: 13px;
                    margin-bottom: 10px;
                    width: 100%;
                    box-shadow: 
                        8px 8px 20px rgba(0, 0, 0, 0.9),
                        -5px -5px 15px rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .page-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: #ffffff;
                    margin: 0;
                    letter-spacing: 0.1rem;
                    opacity: 0.9;
                }

                .cards-grid {
                    overflow: hidden;
                    max-width: 100%;
                    margin: 0;
                    padding: 10px 0 30px;
                }

                .marquee-track {
                    display: flex;
                    gap: 19px;
                    width: max-content;
                    animation: marquee var(--marquee-duration, 40s) linear infinite;
                    user-select: none;
                }



                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 9.5px)); }
                }

                .service-card {
                    background: #1c1c1c;
                    border-radius: 24px;
                    padding: 19px;
                    flex: 0 0 320px;
                    box-shadow: 
                        -5px -5px 15px rgba(255, 255, 255, 0.06),
                        10px 10px 20px rgba(0, 0, 0, 0.85);
                }

                .card-image-wrapper {
                    width: 100%;
                    aspect-ratio: 2 / 3;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 
                        inset -2px -2px 6px rgba(255, 255, 255, 0.03),
                        inset 2px 2px 6px rgba(0, 0, 0, 0.5);
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .card-text-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 1.5rem;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 70%, transparent 100%);
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .card-tag {
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #ff6b35;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                .card-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0;
                    line-height: 1.2;
                }

                .card-description {
                    font-size: 0.9rem;
                    color: #ffffff;
                    line-height: 1.5;
                    margin: 0;
                }

                .works-section {
                    margin-top: 5rem;
                    padding: 4rem 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    background: #000000;
                }

                .works-header {
                    margin-bottom: 4rem;
                }

                .works-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #ff6b35;
                    letter-spacing: 0.2rem;
                    margin-bottom: 1.5rem;
                }

                .works-title {
                    font-size: 6.5rem;
                    font-weight: 900;
                    margin: 0;
                    line-height: 1;
                    background: linear-gradient(180deg, #ffffff 0%, #444444 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-transform: uppercase;
                }

                .works-subtitle {
                    font-size: 1.2rem;
                    color: #888888;
                    margin-top: 2rem;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                    font-family: monospace;
                    letter-spacing: -0.02em;
                }

                .works-content {
                    width: 100%;
                    max-width: 1200px;
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 3rem; /* Spacing between cards */
                }

                .works-card {
                    background: #0a0a0a;
                    border-radius: 40px;
                    padding: 2rem;
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
                }

                .works-card-inner.flex-layout {
                    display: flex;
                    align-items: center;
                    gap: 4rem;
                    min-height: 400px;
                    padding: 2rem;
                    background: #111111;
                    border-radius: 30px;
                    overflow: hidden;
                }

                .works-image-side {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .mockup-img-v2 {
                    width: 100%;
                    max-width: 450px;
                    height: auto;
                    border-radius: 20px;
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
                }

                .works-text-side {
                    flex: 1;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .works-item-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #ffffff;
                    margin: 0;
                }

                .works-item-desc {
                    font-size: 1.1rem;
                    color: #999999;
                    line-height: 1.6;
                    margin: 0;
                    max-width: 500px;
                }

                .works-stats {
                    display: flex;
                    gap: 3rem;
                    margin-top: 1rem;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #ff6b35;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: #666666;
                    letter-spacing: 0.1em;
                    font-weight: 600;
                }

                @media (max-width: 1200px) {
                    .works-title { font-size: 6rem; }
                    .service-card {
                        flex: 0 0 300px;
                    }
                }

                @media (max-width: 768px) {
                    .works-title { font-size: 4rem; }
                    .works-subtitle { font-size: 1rem; }
                    .service-card {
                        flex: 0 0 280px;
                    }
                    
                    .service-detail-page {
                        padding: 2rem 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
