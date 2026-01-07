/**
 * Hierarchical Services Data Structure
 * Configuration-driven, type-safe service definitions with real project examples
 */

/**
 * Project Interface - Real project examples for each service
 */
export interface Project {
    id: string;
    name: string;
    serviceType: string;
    description: string;        // 1-2 lines
    techStack: string[];        // Array of technologies
    year: number;
}

/**
 * Service Item Interface - Hierarchical structure
 */
export interface ServiceItem {
    id: string;                    // Unique, searchable identifier
    title: string;                 // Display name
    keywords: string[];            // Array of searchable terms
    summary: string;               // Short description for auto-generated paragraph
    projects: Project[];           // Array of real projects
}

/**
 * Complete Services Data
 * Each service contains: id, title, keywords, summary, and projects array
 */
export const SERVICES_DATA: ServiceItem[] = [
    {
        id: "web-application-development",
        title: "Web Application Development",
        keywords: [
            "web development", "web app", "responsive design", "progressive web app", "PWA",
            ".NET", ".NET Core", "MVC", "ASP.NET", "C#",
            "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript",
            "Python", "Django", "Flask",
            "SPA", "single page application", "SSR", "server-side rendering",
            "frontend", "backend", "fullstack", "API integration"
        ],
        summary: "We build modern, responsive web applications using cutting-edge technologies like .NET Core, React, Next.js, and Python Django. Our expertise spans from single-page applications to enterprise-grade platforms with server-side rendering, real-time features, and seamless API integrations.",
        projects: [
            {
                id: "proj-web-001",
                name: "Enterprise Resource Planning Portal",
                serviceType: "Web Application Development",
                description: "Comprehensive ERP web portal for managing inventory, procurement, and supply chain operations across 15 countries. Reduced operational costs by 35% and improved inventory accuracy to 99.2%.",
                techStack: [".NET Core", "React", "PostgreSQL", "Azure", "Redis"],
                year: 2023
            },
            {
                id: "proj-web-002",
                name: "E-commerce Platform Redesign",
                serviceType: "Web Application Development",
                description: "Complete redesign and rebuild of e-commerce platform with Next.js, implementing SSR for better SEO and performance. Increased conversion rate by 42% and reduced page load time by 68%.",
                techStack: ["Next.js", "TypeScript", "Stripe", "MongoDB", "AWS"],
                year: 2024
            },
            {
                id: "proj-web-003",
                name: "Healthcare Patient Portal",
                serviceType: "Web Application Development",
                description: "HIPAA-compliant patient portal for appointment scheduling, medical records access, and telemedicine. Served 50,000+ patients with 99.9% uptime.",
                techStack: ["Vue.js", "Python Django", "PostgreSQL", "WebRTC", "Docker"],
                year: 2023
            }
        ]
    },
    {
        id: "mobile-app-development",
        title: "Mobile Application Development",
        keywords: [
            "mobile app", "mobile development", "iOS", "Android",
            "React Native", "Flutter", "cross-platform",
            "Swift", "Kotlin", "native app",
            "push notifications", "offline mode", "biometric auth",
            "in-app purchases", "mobile UI", "responsive mobile"
        ],
        summary: "We create native and cross-platform mobile applications for iOS and Android using React Native and Flutter. Our mobile solutions feature offline functionality, push notifications, biometric authentication, and native performance for consumer apps, enterprise solutions, and e-commerce platforms.",
        projects: [
            {
                id: "proj-mobile-001",
                name: "Fitness Tracking App",
                serviceType: "Mobile Application Development",
                description: "Cross-platform fitness app with workout tracking, nutrition logging, and social features. Reached 100,000+ downloads with 4.7-star rating on both app stores.",
                techStack: ["React Native", "Firebase", "Node.js", "MongoDB", "AWS"],
                year: 2024
            },
            {
                id: "proj-mobile-002",
                name: "Field Service Management App",
                serviceType: "Mobile Application Development",
                description: "Native mobile app for field technicians to manage work orders, track time, and access equipment manuals offline. Improved field technician productivity by 45% and reduced paperwork by 90%.",
                techStack: ["Flutter", "SQLite", "REST API", "Google Maps", "Azure"],
                year: 2023
            },
            {
                id: "proj-mobile-003",
                name: "Banking Mobile App",
                serviceType: "Mobile Application Development",
                description: "Secure mobile banking app with biometric login, bill pay, mobile check deposit, and real-time notifications. Onboarded 75,000 users with zero security incidents and 4.8-star rating.",
                techStack: ["React Native", "Biometric SDK", "Encryption", "PostgreSQL", "AWS"],
                year: 2024
            }
        ]
    },
    {
        id: "microservices-backend",
        title: "Microservices & Backend Development",
        keywords: [
            "microservices", "backend", "API", "REST API", "GraphQL",
            "Node.js", "Express", "Python", "Django", "FastAPI",
            "SOAP", "WSDL", "webhooks", "event-driven",
            "scalable architecture", "distributed systems", "API gateway",
            "service mesh", "message queue", "Kafka", "RabbitMQ"
        ],
        summary: "We architect and develop robust, scalable backend solutions and microservices using Node.js, Python, and modern API technologies. Our expertise includes RESTful APIs, GraphQL, event-driven architectures, API gateways, and service mesh implementations for enterprise-scale applications.",
        projects: [
            {
                id: "proj-backend-001",
                name: "Payment Processing Microservices",
                serviceType: "Microservices & Backend Development",
                description: "Built microservices architecture for payment processing, fraud detection, and transaction reconciliation. Processing 1M+ transactions daily with 99.99% uptime and <200ms latency.",
                techStack: ["Node.js", "GraphQL", "Kafka", "Redis", "PostgreSQL", "Kubernetes"],
                year: 2023
            },
            {
                id: "proj-backend-002",
                name: "Legacy System Modernization",
                serviceType: "Microservices & Backend Development",
                description: "Migrated monolithic SOAP-based system to modern microservices with REST APIs. Reduced deployment time from weeks to hours and improved system reliability by 60%.",
                techStack: ["Python FastAPI", "Docker", "PostgreSQL", "RabbitMQ", "AWS"],
                year: 2024
            },
            {
                id: "proj-backend-003",
                name: "Real-time Analytics API",
                serviceType: "Microservices & Backend Development",
                description: "Developed high-performance API for real-time sales analytics and inventory management. Handles 10,000+ requests/second with sub-100ms response times.",
                techStack: ["Node.js", "Express", "Redis", "Elasticsearch", "MongoDB", "AWS"],
                year: 2024
            }
        ]
    },
    {
        id: "database-management",
        title: "Database Design & Management",
        keywords: [
            "database", "database design", "data modeling", "SQL", "NoSQL",
            "PostgreSQL", "MongoDB", "MySQL", "SQL Server", "Oracle",
            "Redis", "Cosmos DB", "DynamoDB",
            "database optimization", "query optimization", "indexing",
            "data migration", "replication", "clustering", "backup", "recovery"
        ],
        summary: "We provide comprehensive database design, optimization, and management services across SQL and NoSQL platforms including PostgreSQL, MongoDB, Redis, and Cosmos DB. Our expertise covers database architecture, performance tuning, data migration, high-availability setups, and disaster recovery.",
        projects: [
            {
                id: "proj-db-001",
                name: "Database Performance Optimization",
                serviceType: "Database Design & Management",
                description: "Optimized PostgreSQL database with query tuning, indexing strategy, and partitioning for 50TB dataset. Reduced query response time by 85% and database costs by 40%.",
                techStack: ["PostgreSQL", "pgBouncer", "TimescaleDB", "Redis", "Grafana"],
                year: 2024
            },
            {
                id: "proj-db-002",
                name: "Multi-Region Database Architecture",
                serviceType: "Database Design & Management",
                description: "Designed and implemented multi-region MongoDB cluster with automatic failover and data replication. Achieved 99.99% uptime with <50ms latency across 3 continents.",
                techStack: ["MongoDB Atlas", "Redis", "AWS", "Terraform"],
                year: 2023
            },
            {
                id: "proj-db-003",
                name: "Oracle to PostgreSQL Migration",
                serviceType: "Database Design & Management",
                description: "Migrated legacy Oracle database to PostgreSQL with zero downtime and data validation. Saved $200K annually in licensing costs with improved performance.",
                techStack: ["PostgreSQL", "Oracle", "Python", "Docker", "AWS RDS"],
                year: 2023
            }
        ]
    },
    {
        id: "azure-cloud-solutions",
        title: "Azure Cloud Solutions",
        keywords: [
            "Azure", "Microsoft Azure", "cloud", "cloud migration", "cloud infrastructure",
            "Azure Web Apps", "Azure Functions", "Azure DevOps",
            "Azure Load Balancer", "Azure CDN", "Azure Networking",
            "Infrastructure as Code", "Terraform", "ARM templates",
            "auto-scaling", "serverless", "PaaS", "IaaS"
        ],
        summary: "We deliver comprehensive Microsoft Azure cloud solutions including infrastructure setup, cloud migration, and ongoing management. Our services cover Azure Web Apps, serverless functions, load balancing, CDN configuration, Infrastructure as Code, and auto-scaling for enterprise applications.",
        projects: [
            {
                id: "proj-azure-001",
                name: "Enterprise Cloud Migration",
                serviceType: "Azure Cloud Solutions",
                description: "Migrated on-premise infrastructure to Azure with zero downtime, including 50+ applications and 200TB data. Reduced infrastructure costs by 45% and improved deployment speed by 10x.",
                techStack: ["Azure", "Azure DevOps", "Terraform", "Azure SQL", "Azure Storage"],
                year: 2023
            },
            {
                id: "proj-azure-002",
                name: "Serverless Application Platform",
                serviceType: "Azure Cloud Solutions",
                description: "Built serverless video processing pipeline using Azure Functions and Azure CDN for global content delivery. Processes 100K+ videos daily serving 5M+ users across 50 countries.",
                techStack: ["Azure Functions", "Azure CDN", "Azure Media Services", "Cosmos DB"],
                year: 2024
            },
            {
                id: "proj-azure-003",
                name: "Disaster Recovery Solution",
                serviceType: "Azure Cloud Solutions",
                description: "Implemented multi-region disaster recovery solution with automated failover and backup. Achieved RPO of 15 minutes and RTO of 2 hours with full compliance.",
                techStack: ["Azure Site Recovery", "Azure Backup", "Azure Traffic Manager", "PowerShell"],
                year: 2024
            }
        ]
    },
    {
        id: "aws-cloud-solutions",
        title: "AWS Cloud Solutions",
        keywords: [
            "AWS", "Amazon Web Services", "cloud", "cloud computing",
            "EC2", "Lambda", "S3", "RDS", "DynamoDB",
            "CloudFront", "ECS", "EKS", "Fargate",
            "serverless", "containers", "Kubernetes",
            "CloudFormation", "Terraform", "DevOps"
        ],
        summary: "We provide end-to-end AWS cloud services including serverless architectures, container orchestration, machine learning pipelines, and multi-region deployments. Our expertise spans EC2, Lambda, S3, RDS, ECS/EKS, and comprehensive infrastructure automation.",
        projects: [
            {
                id: "proj-aws-001",
                name: "Serverless E-commerce Backend",
                serviceType: "AWS Cloud Solutions",
                description: "Built fully serverless e-commerce backend using Lambda, API Gateway, and DynamoDB. Handles 50K concurrent users with 99.99% uptime and 70% cost reduction.",
                techStack: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "Cognito"],
                year: 2024
            },
            {
                id: "proj-aws-002",
                name: "Container Platform Migration",
                serviceType: "AWS Cloud Solutions",
                description: "Migrated monolithic application to containerized microservices on EKS with CI/CD automation. Improved deployment frequency from monthly to daily with zero-downtime releases.",
                techStack: ["EKS", "Docker", "Terraform", "Jenkins", "Prometheus", "Grafana"],
                year: 2023
            },
            {
                id: "proj-aws-003",
                name: "Big Data Analytics Platform",
                serviceType: "AWS Cloud Solutions",
                description: "Built real-time analytics platform processing billions of events daily using AWS data services. Processes 5B+ events daily with real-time insights and 60% cost savings.",
                techStack: ["Kinesis", "EMR", "Redshift", "Athena", "QuickSight", "Lambda"],
                year: 2024
            }
        ]
    },
    {
        id: "cicd-devops",
        title: "CI/CD & DevOps",
        keywords: [
            "DevOps", "CI/CD", "continuous integration", "continuous deployment",
            "Jenkins", "GitHub Actions", "GitLab CI", "BitBucket Pipelines",
            "Docker", "Kubernetes", "container orchestration",
            "Infrastructure as Code", "Terraform", "Ansible",
            "monitoring", "logging", "Prometheus", "Grafana", "ELK stack"
        ],
        summary: "We streamline development and deployment processes with modern DevOps practices including CI/CD pipelines, Infrastructure as Code, container orchestration, automated testing, and comprehensive monitoring using Jenkins, GitHub Actions, Docker, and Kubernetes.",
        projects: [
            {
                id: "proj-devops-001",
                name: "Enterprise CI/CD Pipeline",
                serviceType: "CI/CD & DevOps",
                description: "Implemented end-to-end CI/CD pipeline with automated testing, security scanning, and multi-environment deployments. Reduced deployment time from 4 hours to 15 minutes with 95% fewer production issues.",
                techStack: ["Jenkins", "Docker", "Kubernetes", "SonarQube", "Nexus", "Terraform"],
                year: 2024
            },
            {
                id: "proj-devops-002",
                name: "Infrastructure Automation",
                serviceType: "CI/CD & DevOps",
                description: "Automated infrastructure provisioning and management using Terraform and Ansible across AWS and Azure. Reduced infrastructure provisioning time from days to minutes with full version control.",
                techStack: ["Terraform", "Ansible", "AWS", "Azure", "GitHub Actions", "Vault"],
                year: 2023
            },
            {
                id: "proj-devops-003",
                name: "Monitoring & Observability Platform",
                serviceType: "CI/CD & DevOps",
                description: "Built comprehensive monitoring solution with metrics, logs, and distributed tracing. Reduced MTTR by 75% and prevented 12 major incidents through proactive alerts.",
                techStack: ["Prometheus", "Grafana", "ELK Stack", "Jaeger", "Kubernetes", "Helm"],
                year: 2024
            }
        ]
    },
    {
        id: "ai-machine-learning",
        title: "AI & Machine Learning",
        keywords: [
            "AI", "artificial intelligence", "machine learning", "ML", "deep learning",
            "TensorFlow", "PyTorch", "Scikit-learn", "Keras",
            "NLP", "natural language processing", "computer vision", "image recognition",
            "predictive analytics", "recommendation system", "chatbot",
            "OpenAI", "GPT", "LLM", "large language model"
        ],
        summary: "We develop intelligent AI and machine learning solutions using TensorFlow, PyTorch, and cutting-edge frameworks. Our expertise includes NLP, computer vision, predictive analytics, recommendation systems, and chatbots for applications like fraud detection, sentiment analysis, and personalization.",
        projects: [
            {
                id: "proj-ai-001",
                name: "Fraud Detection System",
                serviceType: "AI & Machine Learning",
                description: "Built ML-powered fraud detection system analyzing transaction patterns in real-time. Detected 98.5% of fraudulent transactions with 0.3% false positive rate, saving $5M annually.",
                techStack: ["Python", "TensorFlow", "Kafka", "Redis", "PostgreSQL", "AWS SageMaker"],
                year: 2024
            },
            {
                id: "proj-ai-002",
                name: "Customer Service Chatbot",
                serviceType: "AI & Machine Learning",
                description: "Developed NLP-powered chatbot handling customer inquiries with GPT integration. Handles 70% of customer inquiries automatically, reducing support costs by 45%.",
                techStack: ["OpenAI GPT-4", "Python", "FastAPI", "PostgreSQL", "React"],
                year: 2024
            },
            {
                id: "proj-ai-003",
                name: "Product Recommendation Engine",
                serviceType: "AI & Machine Learning",
                description: "Built personalized recommendation system using collaborative filtering and deep learning. Increased average order value by 32% and customer engagement by 55%.",
                techStack: ["PyTorch", "Python", "Redis", "Elasticsearch", "AWS", "Docker"],
                year: 2023
            }
        ]
    },
    {
        id: "data-analytics-bi",
        title: "Data Analytics & Business Intelligence",
        keywords: [
            "data analytics", "business intelligence", "BI", "data visualization",
            "Power BI", "Tableau", "Looker", "dashboards",
            "data warehouse", "ETL", "data pipeline",
            "Python", "R", "SQL", "Apache Spark",
            "predictive modeling", "statistical analysis", "reporting"
        ],
        summary: "We transform data into actionable insights with advanced analytics and business intelligence solutions using Power BI, Tableau, Python, and Apache Spark. Our services include data visualization, BI dashboards, ETL pipelines, data warehousing, and predictive modeling.",
        projects: [
            {
                id: "proj-analytics-001",
                name: "Executive Analytics Dashboard",
                serviceType: "Data Analytics & Business Intelligence",
                description: "Built comprehensive Power BI dashboard providing real-time insights across 200+ stores. Enabled data-driven decisions resulting in 18% revenue increase and 25% cost reduction.",
                techStack: ["Power BI", "Azure Synapse", "Python", "SQL Server", "Azure Data Factory"],
                year: 2024
            },
            {
                id: "proj-analytics-002",
                name: "Customer Analytics Platform",
                serviceType: "Data Analytics & Business Intelligence",
                description: "Developed customer analytics platform with churn prediction and lifetime value modeling. Reduced churn by 28% and increased customer lifetime value by 35%.",
                techStack: ["Python", "Tableau", "PostgreSQL", "Apache Spark", "AWS", "Scikit-learn"],
                year: 2023
            },
            {
                id: "proj-analytics-003",
                name: "Supply Chain Analytics",
                serviceType: "Data Analytics & Business Intelligence",
                description: "Built real-time supply chain analytics with demand forecasting and inventory optimization. Reduced inventory costs by 22% and improved forecast accuracy to 92%.",
                techStack: ["Tableau", "Python", "R", "PostgreSQL", "Apache Airflow", "Docker"],
                year: 2024
            }
        ]
    },
    {
        id: "ecommerce-marketplace",
        title: "E-commerce & Marketplace Solutions",
        keywords: [
            "e-commerce", "ecommerce", "online store", "marketplace",
            "Amazon", "Flipkart", "Shopify", "WooCommerce", "Magento",
            "product listing", "catalog management", "inventory management",
            "price optimization", "order management", "multi-channel selling",
            "payment gateway", "shopping cart", "checkout"
        ],
        summary: "We provide complete e-commerce and marketplace management solutions including Amazon/Flipkart integration, product listing optimization, catalog management, inventory synchronization, automated repricing, and multi-channel selling capabilities.",
        projects: [
            {
                id: "proj-ecom-001",
                name: "Multi-Channel Marketplace Integration",
                serviceType: "E-commerce & Marketplace Solutions",
                description: "Integrated inventory and order management across Amazon, Flipkart, and own website. Increased sales by 65% while reducing inventory discrepancies by 90%.",
                techStack: ["Amazon MWS", "Flipkart API", "Node.js", "MongoDB", "React", "AWS"],
                year: 2024
            },
            {
                id: "proj-ecom-002",
                name: "Automated Repricing System",
                serviceType: "E-commerce & Marketplace Solutions",
                description: "Built ML-powered dynamic pricing system for competitive pricing across marketplaces. Improved profit margins by 18% while maintaining competitive positioning.",
                techStack: ["Python", "Scikit-learn", "PostgreSQL", "Redis", "Celery", "AWS"],
                year: 2023
            },
            {
                id: "proj-ecom-003",
                name: "Custom E-commerce Platform",
                serviceType: "E-commerce & Marketplace Solutions",
                description: "Developed custom e-commerce platform with personalization and exclusive member features. Achieved $2M in first-year sales with 4.2% conversion rate.",
                techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "Redis"],
                year: 2024
            }
        ]
    },
    {
        id: "process-automation",
        title: "Process Automation & RPA",
        keywords: [
            "automation", "process automation", "workflow automation", "RPA",
            "n8n", "Zapier", "Power Automate", "UiPath",
            "business process automation", "task automation",
            "integration automation", "API orchestration",
            "scheduled tasks", "data entry automation", "report automation"
        ],
        summary: "We streamline business workflows and reduce manual effort through intelligent process automation using n8n, Zapier, Power Automate, and custom RPA solutions. Our automation services cover data entry, report generation, API orchestration, and business process optimization.",
        projects: [
            {
                id: "proj-auto-001",
                name: "Invoice Processing Automation",
                serviceType: "Process Automation & RPA",
                description: "Automated invoice processing workflow from receipt to payment using OCR and RPA. Reduced invoice processing time by 85% and eliminated 95% of manual data entry.",
                techStack: ["UiPath", "Python", "OCR", "PostgreSQL", "Power Automate", "Azure"],
                year: 2024
            },
            {
                id: "proj-auto-002",
                name: "Multi-System Integration Platform",
                serviceType: "Process Automation & RPA",
                description: "Built n8n-based automation platform integrating 15+ systems for patient data synchronization. Automated 50+ manual processes saving 200 hours weekly across departments.",
                techStack: ["n8n", "Node.js", "PostgreSQL", "REST APIs", "Docker", "AWS"],
                year: 2023
            },
            {
                id: "proj-auto-003",
                name: "Marketing Automation Suite",
                serviceType: "Process Automation & RPA",
                description: "Developed custom automation suite for campaign management, reporting, and client communication. Increased team capacity by 40% and improved campaign delivery speed by 60%.",
                techStack: ["Zapier", "Python", "Google APIs", "Slack API", "Airtable", "AWS Lambda"],
                year: 2024
            }
        ]
    },
    {
        id: "system-integration",
        title: "System Integration & API Development",
        keywords: [
            "system integration", "API integration", "enterprise integration",
            "REST API", "GraphQL", "SOAP", "webhooks",
            "middleware", "ESB", "enterprise service bus",
            "CRM integration", "ERP integration", "payment gateway",
            "third-party integration", "data synchronization"
        ],
        summary: "We connect disparate systems for seamless data flow and interoperability through API integration, middleware development, and enterprise system integration. Our expertise includes CRM/ERP connectivity, payment gateways, and third-party service integrations.",
        projects: [
            {
                id: "proj-integration-001",
                name: "ERP-CRM Integration",
                serviceType: "System Integration & API Development",
                description: "Integrated SAP ERP with Salesforce CRM for real-time data synchronization. Eliminated data silos, improved sales efficiency by 35%, and reduced errors by 90%.",
                techStack: ["MuleSoft", "SAP APIs", "Salesforce API", "PostgreSQL", "Redis", "AWS"],
                year: 2023
            },
            {
                id: "proj-integration-002",
                name: "Payment Gateway Integration",
                serviceType: "System Integration & API Development",
                description: "Integrated multiple payment gateways with fraud detection and reconciliation automation. Supports 10+ payment methods processing $50M+ annually with 99.99% uptime.",
                techStack: ["Node.js", "Stripe", "PayPal", "Razorpay", "PostgreSQL", "Kafka"],
                year: 2024
            },
            {
                id: "proj-integration-003",
                name: "Legacy System Modernization",
                serviceType: "System Integration & API Development",
                description: "Built API layer over legacy mainframe system enabling modern application integration. Enabled digital transformation while preserving $10M+ investment in legacy systems.",
                techStack: ["Java", "Spring Boot", "IBM MQ", "PostgreSQL", "Docker", "Kubernetes"],
                year: 2024
            }
        ]
    },
    {
        id: "performance-optimization",
        title: "Performance Optimization & Tuning",
        keywords: [
            "performance optimization", "performance tuning", "speed optimization",
            "load time", "page speed", "website performance",
            "caching", "CDN", "content delivery network",
            "Redis", "Nginx", "load balancer",
            "code optimization", "database optimization", "query optimization",
            "asset optimization", "image optimization", "lazy loading"
        ],
        summary: "We make applications lightning-fast through expert performance optimization including load time reduction, caching strategies, CDN setup, code optimization, database query tuning, and asset optimization for web, mobile, and API platforms.",
        projects: [
            {
                id: "proj-perf-001",
                name: "E-commerce Performance Overhaul",
                serviceType: "Performance Optimization & Tuning",
                description: "Comprehensive performance optimization reducing page load times and improving Core Web Vitals. Reduced page load time by 72%, increased conversion rate by 28%, and improved SEO ranking.",
                techStack: ["Next.js", "Redis", "CloudFront", "Image Optimization", "Webpack", "AWS"],
                year: 2024
            },
            {
                id: "proj-perf-002",
                name: "API Performance Optimization",
                serviceType: "Performance Optimization & Tuning",
                description: "Optimized API performance through caching, query optimization, and infrastructure scaling. Reduced API response time from 800ms to 95ms and increased throughput by 10x.",
                techStack: ["Node.js", "Redis", "PostgreSQL", "Nginx", "AWS ElastiCache", "CloudFront"],
                year: 2023
            },
            {
                id: "proj-perf-003",
                name: "Database Performance Tuning",
                serviceType: "Performance Optimization & Tuning",
                description: "Optimized database performance for handling billions of records with complex queries. Reduced query time by 90% and database costs by 50% while handling 10x data growth.",
                techStack: ["PostgreSQL", "TimescaleDB", "Redis", "pgBouncer", "Grafana"],
                year: 2024
            }
        ]
    },
    {
        id: "it-consulting-strategy",
        title: "IT Consulting & Technology Strategy",
        keywords: [
            "IT consulting", "technology consulting", "digital strategy",
            "technology assessment", "architecture design", "solution architecture",
            "digital transformation", "technology roadmap", "strategic planning",
            "team augmentation", "technical due diligence", "vendor selection",
            "technology audit", "scalability planning", "modernization"
        ],
        summary: "We provide strategic technology guidance for business transformation including technology assessments, architecture design, digital strategy, team augmentation, technical due diligence, and roadmap planning for enterprises and startups.",
        projects: [
            {
                id: "proj-consulting-001",
                name: "Digital Transformation Strategy",
                serviceType: "IT Consulting & Technology Strategy",
                description: "Developed comprehensive digital transformation roadmap and technology architecture. Defined 3-year roadmap resulting in 40% operational efficiency improvement.",
                techStack: ["Enterprise Architecture", "Cloud Strategy", "Microservices", "API Strategy"],
                year: 2023
            },
            {
                id: "proj-consulting-002",
                name: "Technical Due Diligence",
                serviceType: "IT Consulting & Technology Strategy",
                description: "Conducted technical due diligence for $50M acquisition of SaaS company. Identified $2M in technical debt and provided mitigation roadmap.",
                techStack: ["Code Review", "Architecture Assessment", "Security Audit", "Scalability Analysis"],
                year: 2024
            },
            {
                id: "proj-consulting-003",
                name: "Cloud Migration Strategy",
                serviceType: "IT Consulting & Technology Strategy",
                description: "Designed multi-cloud strategy and migration roadmap for 100+ applications. Projected 45% cost savings and 3x improvement in deployment speed.",
                techStack: ["AWS", "Azure", "Cloud Architecture", "Migration Planning", "Cost Optimization"],
                year: 2024
            }
        ]
    },
    {
        id: "support-maintenance",
        title: "Support & Maintenance Services",
        keywords: [
            "support", "maintenance", "technical support", "application support",
            "24/7 support", "monitoring", "incident management",
            "bug fixes", "security patches", "updates", "upgrades",
            "performance monitoring", "uptime", "SLA",
            "helpdesk", "troubleshooting", "issue resolution"
        ],
        summary: "We provide ongoing support and maintenance services to keep systems running smoothly including 24/7 monitoring, regular updates, performance optimization, bug fixes, security patches, and dedicated account management with guaranteed SLAs.",
        projects: [
            {
                id: "proj-support-001",
                name: "Enterprise Application Support",
                serviceType: "Support & Maintenance Services",
                description: "Providing 24/7 support and maintenance for mission-critical trading platform. Maintained 99.98% uptime with average incident resolution time of 45 minutes.",
                techStack: ["Monitoring", "Incident Management", "Java", ".NET", "PostgreSQL", "AWS"],
                year: 2024
            },
            {
                id: "proj-support-002",
                name: "SaaS Platform Maintenance",
                serviceType: "Support & Maintenance Services",
                description: "Comprehensive maintenance including feature updates, bug fixes, and performance optimization. Delivered 24 feature releases with zero downtime and 4.8 customer satisfaction.",
                techStack: ["React", "Node.js", "MongoDB", "AWS", "CI/CD", "Monitoring"],
                year: 2024
            },
            {
                id: "proj-support-003",
                name: "Infrastructure Monitoring & Support",
                serviceType: "Support & Maintenance Services",
                description: "Proactive monitoring and support for cloud infrastructure serving 1M+ users. Prevented 15 major incidents through proactive monitoring and reduced MTTR by 70%.",
                techStack: ["Prometheus", "Grafana", "ELK", "PagerDuty", "AWS", "Kubernetes"],
                year: 2024
            }
        ]
    },
    {
        id: "training-workshops",
        title: "Training & Technical Workshops",
        keywords: [
            "training", "technical training", "workshops", "upskilling",
            "developer training", "team training", "corporate training",
            "technology onboarding", "best practices", "code review",
            "architecture training", "hands-on training", "certification",
            "knowledge transfer", "documentation", "mentoring"
        ],
        summary: "We empower teams with expert knowledge through technical workshops, hands-on training, best practices sessions, and certification preparation covering modern technologies, architecture patterns, and development methodologies.",
        projects: [
            {
                id: "proj-training-001",
                name: "React & TypeScript Training Program",
                serviceType: "Training & Technical Workshops",
                description: "Delivered comprehensive 6-week training program for 30 developers transitioning to React. 100% of participants successfully transitioned to React projects with 4.9/5 satisfaction.",
                techStack: ["React", "TypeScript", "Next.js", "Testing", "Best Practices"],
                year: 2024
            },
            {
                id: "proj-training-002",
                name: "Cloud Architecture Workshop Series",
                serviceType: "Training & Technical Workshops",
                description: "Conducted workshop series on AWS and Azure architecture patterns and best practices. Trained 50+ architects resulting in 3 AWS and 2 Azure certifications.",
                techStack: ["AWS", "Azure", "Microservices", "Serverless", "Kubernetes"],
                year: 2023
            },
            {
                id: "proj-training-003",
                name: "DevOps Transformation Training",
                serviceType: "Training & Technical Workshops",
                description: "Comprehensive DevOps training including CI/CD, IaC, and container orchestration. Enabled team to reduce deployment time by 80% and implement full CI/CD pipeline.",
                techStack: ["Jenkins", "Docker", "Kubernetes", "Terraform", "Git", "Monitoring"],
                year: 2024
            }
        ]
    }
];

/**
 * Utility Functions
 */

/**
 * Get service by ID
 */
export const getServiceById = (id: string): ServiceItem | undefined => {
    return SERVICES_DATA.find(service => service.id === id);
};

/**
 * Search services by query (searches in id, title, keywords, and summary)
 */
export const searchServices = (query: string): ServiceItem[] => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
        return SERVICES_DATA;
    }

    return SERVICES_DATA.filter(service =>
        service.id.toLowerCase().includes(lowerQuery) ||
        service.title.toLowerCase().includes(lowerQuery) ||
        service.summary.toLowerCase().includes(lowerQuery) ||
        service.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
        service.projects.some(project =>
            project.name.toLowerCase().includes(lowerQuery) ||
            project.name.toLowerCase().includes(lowerQuery) ||
            project.description.toLowerCase().includes(lowerQuery) ||
            project.techStack.some((tech: string) => tech.toLowerCase().includes(lowerQuery))
        )
    );
};

/**
 * Get all unique keywords across all services
 */
export const getAllKeywords = (): string[] => {
    const keywordSet = new Set<string>();
    SERVICES_DATA.forEach(service => {
        service.keywords.forEach(keyword => keywordSet.add(keyword));
    });
    return Array.from(keywordSet).sort();
};

/**
 * Get all unique technologies from projects
 */
export const getAllTechnologies = (): string[] => {
    const techSet = new Set<string>();
    SERVICES_DATA.forEach(service => {
        service.projects.forEach(project => {
            project.techStack.forEach((tech: string) => techSet.add(tech));
        });
    });
    return Array.from(techSet).sort();
};

/**
 * Get services by keyword
 */
export const getServicesByKeyword = (keyword: string): ServiceItem[] => {
    const lowerKeyword = keyword.toLowerCase();
    return SERVICES_DATA.filter(service =>
        service.keywords.some(k => k.toLowerCase() === lowerKeyword)
    );
};

/**
 * Get all projects across all services
 */
export const getAllProjects = (): Project[] => {
    return SERVICES_DATA.flatMap(service => service.projects);
};

/**
 * Get projects by technology
 */
export const getProjectsByTechnology = (technology: string): Project[] => {
    const lowerTech = technology.toLowerCase();
    return getAllProjects().filter(project =>
        project.techStack.some((tech: string) => tech.toLowerCase().includes(lowerTech))
    );
};

/**
 * Get projects by year
 */
export const getProjectsByYear = (year: number): Project[] => {
    return getAllProjects().filter(project => project.year === year);
};
