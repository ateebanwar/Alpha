"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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

const recognitions = [
    {
        logo: "N",
        title: "NIVA INTRO",
        award: "Winner - Best Signature",
        year: "2024",
        highlight: false
    },
    {
        logo: "O",
        title: "OGLIVY",
        award: "Winner - US Portfolio",
        year: "2024",
        highlight: false
    },
    {
        logo: "W",
        title: "CSS AWARDS",
        award: "Top 5 Best eCommerce",
        year: "2023",
        highlight: true
    },
    {
        logo: "S",
        title: "SOTY 2024",
        award: "Top 5 Best Design",
        year: "2024",
        highlight: false
    }
];

export default function HorizontalServicesClient({ slug }: { slug: string }) {
    const cards = serviceDetailCards[slug] || serviceDetailCards["application-development"];
    const categoryName = serviceCategories.find(cat => slugify(cat) === slug) || "Application Development";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(".works-header > *", {
                scrollTrigger: {
                    trigger: ".works-header",
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Works cards animation
            gsap.from(".works-card", {
                scrollTrigger: {
                    trigger: ".works-content",
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
                clearProps: "all"
            });

            // Award cards animation
            gsap.from(".award-card", {
                scrollTrigger: {
                    trigger: ".awards-grid",
                    start: "top 85%",
                },
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "back.out(1.7)",
                clearProps: "transform, opacity"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [slug]);

    // Calculate animation duration based on number of cards to keep speed consistent
    const animationDuration = cards.length * 4;

    return (
        <div className="service-detail-page" ref={containerRef}>
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

                {/* RECOGNITIONS Section */}
                <div className="recognitions-section">
                    <div className="recognitions-header">
                        <span className="recognitions-badge">ACCOLADES</span>
                        <h2 className="recognitions-title">RECOGNITIONS</h2>
                    </div>

                    <div className="awards-grid">
                        {recognitions.map((item, idx) => (
                            <motion.div
                                key={idx}
                                className={`award-card ${item.highlight ? 'highlight' : ''}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{
                                    y: -40,
                                    rotateY: 0,
                                    rotateZ: 0,
                                    scale: 1.05,
                                    zIndex: 100,
                                    backgroundColor: "#ef441f",
                                    boxShadow: "0 30px 100px rgba(239, 68, 31, 0.4)",
                                    transition: { duration: 0.4, ease: "easeOut" }
                                }}
                                style={{
                                    zIndex: idx + 10,
                                    borderRadius: "24px",
                                    overflow: "hidden",
                                    height: "350px",
                                    width: "280px"
                                }}
                            >
                                <div className="award-logo-box">
                                    {item.logo === "N" && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4.5l7.5 10V4h4v16h-4.5L8 10v10H4z" /></svg>}
                                    {item.logo === "O" && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>}
                                    {item.logo === "W" && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.2 7L18.6 15L15.4 7H12.6L9.4 15L7.8 7H4.2L7 19H10.2L13.4 11L16.6 19H19.8L22.6 7H20.2Z" /></svg>}
                                    {item.logo === "S" && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>}
                                </div>
                                <div className="award-info">
                                    <h3 className="award-name">{item.title}</h3>
                                    <div className="award-divider"></div>
                                    <p className="award-text">{item.award}</p>
                                    <p className="award-year">{item.year}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .service-detail-page {
                    min-height: 100vh;
                    background: #e0e5ec;
                    padding: 10px;
                    overflow-x: hidden;
                    user-select: none;
                }

                .title-box {
                    background: #e0e5ec;
                    padding: 0.8rem 2.5rem;
                    border-radius: 50px;
                    margin-top: 15px;
                    margin-bottom: 15px;
                    width: fit-content;
                    margin-left: auto;
                    margin-right: auto;
                    box-shadow: 
                        8px 8px 16px rgba(163, 177, 198, 0.6),
                        -8px -8px 16px rgba(255, 255, 255, 0.8);
                }

                .page-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #444444;
                    margin: 0;
                    letter-spacing: 0.3rem;
                    text-align: center;
                    text-shadow: 
                        1px 1px 1px rgba(255, 255, 255, 0.5),
                        -1px -1px 1px rgba(0, 0, 0, 0.2);
                    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
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
                    transition: transform 0.3s ease;
                }

                @media (max-width: 768px) {
                    .service-card {
                        flex: 0 0 260px;
                        padding: 12px;
                    }
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
                    font-size: clamp(1.2rem, 4vw, 2rem);
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0;
                    line-height: 1.2;
                }

                .card-description {
                    font-size: clamp(0.75rem, 2vw, 0.9rem);
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
                    font-size: clamp(3rem, 10vw, 6.5rem);
                    font-weight: 900;
                    margin: 0;
                    line-height: 1;
                    background: linear-gradient(180deg, #ffffff 0%, #444444 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-transform: uppercase;
                }

                .works-subtitle {
                    font-size: clamp(0.9rem, 2vw, 1.2rem);
                    color: #888888;
                    margin-top: 1.5rem;
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
                    gap: 3rem;
                }

                .works-card {
                    background: #0a0a0a;
                    border-radius: clamp(20px, 5vw, 40px);
                    padding: clamp(1rem, 3vw, 2rem);
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
                }

                .works-card-inner.flex-layout {
                    display: flex;
                    align-items: center;
                    gap: clamp(1.5rem, 5vw, 4rem);
                    min-height: auto;
                    padding: clamp(1rem, 3vw, 2.5rem);
                    background: #111111;
                    border-radius: clamp(15px, 4vw, 30px);
                    overflow: hidden;
                }

                @media (max-width: 1024px) {
                    .works-card-inner.flex-layout {
                        flex-direction: column;
                        text-align: center;
                    }
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

                @media (max-width: 1024px) {
                    .works-text-side {
                        text-align: center;
                        align-items: center;
                    }
                }

                .works-item-title {
                    font-size: clamp(1.5rem, 4vw, 2.5rem);
                    font-weight: 800;
                    color: #ffffff;
                    margin: 0;
                }

                .recognitions-section {
                    background: #000000;
                    padding: 8rem 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow: hidden;
                    perspective: 1500px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .recognitions-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .recognitions-badge {
                    color: #ff6b35;
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.4rem;
                    margin-bottom: 1rem;
                    display: block;
                }

                .recognitions-title {
                    font-size: clamp(2.5rem, 8vw, 4rem);
                    font-weight: 900;
                    color: #ffffff;
                    letter-spacing: -0.02em;
                }

                .awards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    justify-content: center;
                    gap: clamp(1.5rem, 4vw, 30px);
                    max-width: 1400px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 4rem 0;
                }

                @media (max-width: 640px) {
                    .awards-grid {
                        grid-template-columns: 1fr;
                        padding: 2rem 0;
                    }
                }

                .award-card {
                    width: 100% !important;
                    min-height: 450px;
                    background: #111111;
                    border-radius: 24px !important;
                    box-sizing: border-box;
                    overflow: hidden;
                    padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backface-visibility: hidden;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                    cursor: pointer;
                    transform: rotateY(-12deg) rotateX(4deg) skewX(-1deg);
                    transition: transform 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease !important;
                }

                @media (max-width: 1100px) {
                    .award-card {
                        transform: none !important;
                        min-height: 400px;
                    }
                }

                .award-logo-box {
                    width: 80px;
                    height: 80px;
                    margin-bottom: 4rem;
                    color: #ffffff;
                }

                .award-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .award-name {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #ffffff;
                    margin: 0;
                    letter-spacing: 0.1em;
                }

                .award-divider {
                    width: 40px;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.2);
                    margin: 0.5rem 0;
                }

                .award-text {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin: 0;
                    font-weight: 500;
                    line-height: 1.4;
                }

                .award-year {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin: 0;
                    font-family: monospace;
                }

                @media (max-width: 1100px) {
                    .awards-grid {
                        grid-template-columns: repeat(2, 280px);
                    }
                    .award-card {
                        transform: none !important;
                    }
                }

                @media (max-width: 600px) {
                    .awards-grid {
                        grid-template-columns: 1fr;
                    }
                    .award-card {
                        width: 100% !important;
                        height: auto !important;
                        min-height: 400px !important;
                    }
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
                    font-size: clamp(1.5rem, 3vw, 2rem);
                    font-weight: 700;
                    color: #ff6b35;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: #666666;
                    letter-spacing: 0.1em;
                    font-weight: 600;
                }

                @media (hover: none) {
                    .award-card:active {
                        background-color: #ef441f;
                        box-shadow: 0 30px 100px rgba(239, 68, 31, 0.4);
                        transform: scale(0.98) !important;
                    }
                }

                @media (max-width: 1200px) {
                    .works-title { font-size: 6rem; }
                }

                @media (max-width: 768px) {
                    .works-title { font-size: 4rem; }
                    .works-subtitle { font-size: 1rem; }
                    .service-detail-page {
                        padding: 2rem 1rem;
                    }
                    .works-card-inner.flex-layout {
                        flex-direction: column;
                        gap: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
