const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/servicesData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all remaining old-format projects with new format
// Pattern: client, description, technologies, duration, outcome -> serviceType, description (combined), techStack

const replacements = [
    // Microservices & Backend
    ['Fintech Platform', 'Microservices & Backend Development', 'Built microservices architecture for payment processing, fraud detection, and transaction reconciliation', 'Processing 1M+ transactions daily with 99.99% uptime and <200ms latency'],
    ['Insurance Company', 'Microservices & Backend Development', 'Migrated monolithic SOAP-based system to modern microservices with REST APIs', 'Reduced deployment time from weeks to hours and improved system reliability by 60%'],
    ['E-commerce Marketplace', 'Microservices & Backend Development', 'Developed high-performance API for real-time sales analytics and inventory management', 'Handles 10,000+ requests/second with sub-100ms response times'],

    // Database Management
    ['SaaS Platform', 'Database Design & Management', 'Optimized PostgreSQL database with query tuning, indexing strategy, and partitioning for 50TB dataset', 'Reduced query response time by 85% and database costs by 40%'],
    ['Global E-commerce Platform', 'Database Design & Management', 'Designed and implemented multi-region MongoDB cluster with automatic failover and data replication', 'Achieved 99.99% uptime with <50ms latency across 3 continents'],
    ['Enterprise Software Company', 'Database Design & Management', 'Migrated legacy Oracle database to PostgreSQL with zero downtime and data validation', 'Saved $200K annually in licensing costs with improved performance'],

    // Azure Cloud
    ['Financial Services Firm', 'Azure Cloud Solutions', 'Migrated on-premise infrastructure to Azure with zero downtime, including 50+ applications and 200TB data', 'Reduced infrastructure costs by 45% and improved deployment speed by 10x'],
    ['Media Streaming Service', 'Azure Cloud Solutions', 'Built serverless video processing pipeline using Azure Functions and Azure CDN for global content delivery', 'Processes 100K+ videos daily serving 5M+ users across 50 countries'],
    ['Healthcare Provider', 'Azure Cloud Solutions', 'Implemented multi-region disaster recovery solution with automated failover and backup', 'Achieved RPO of 15 minutes and RTO of 2 hours with full compliance'],

    // AWS Cloud
    ['Online Retailer', 'AWS Cloud Solutions', 'Built fully serverless e-commerce backend using Lambda, API Gateway, and DynamoDB', 'Handles 50K concurrent users with 99.99% uptime and 70% cost reduction'],
    ['SaaS Company', 'AWS Cloud Solutions', 'Migrated monolithic application to containerized microservices on EKS with CI/CD automation', 'Improved deployment frequency from monthly to daily with zero-downtime releases'],
    ['Telecommunications Company', 'AWS Cloud Solutions', 'Built real-time analytics platform processing billions of events daily using AWS data services', 'Processes 5B+ events daily with real-time insights and 60% cost savings'],

    // CI/CD & DevOps
    ['Software Development Company', 'CI/CD & DevOps', 'Implemented end-to-end CI/CD pipeline with automated testing, security scanning, and multi-environment deployments', 'Reduced deployment time from 4 hours to 15 minutes with 95% fewer production issues'],
    ['E-commerce Platform', 'CI/CD & DevOps', 'Automated infrastructure provisioning and management using Terraform and Ansible across AWS and Azure', 'Reduced infrastructure provisioning time from days to minutes with full version control'],
    ['Fintech Startup', 'CI/CD & DevOps', 'Built comprehensive monitoring solution with metrics, logs, and distributed tracing', 'Reduced MTTR by 75% and prevented 12 major incidents through proactive alerts'],

    // AI & ML
    ['Payment Processor', 'AI & Machine Learning', 'Built ML-powered fraud detection system analyzing transaction patterns in real-time', 'Detected 98.5% of fraudulent transactions with 0.3% false positive rate, saving $5M annually'],
    ['Telecommunications Provider', 'AI & Machine Learning', 'Developed NLP-powered chatbot handling customer inquiries with GPT integration', 'Handles 70% of customer inquiries automatically, reducing support costs by 45%'],
    ['E-commerce Marketplace', 'AI & Machine Learning', 'Built personalized recommendation system using collaborative filtering and deep learning', 'Increased average order value by 32% and customer engagement by 55%'],

    // Data Analytics
    ['Retail Chain', 'Data Analytics & Business Intelligence', 'Built comprehensive Power BI dashboard providing real-time insights across 200+ stores', 'Enabled data-driven decisions resulting in 18% revenue increase and 25% cost reduction'],
    ['Subscription Service', 'Data Analytics & Business Intelligence', 'Developed customer analytics platform with churn prediction and lifetime value modeling', 'Reduced churn by 28% and increased customer lifetime value by 35%'],
    ['Manufacturing Company', 'Data Analytics & Business Intelligence', 'Built real-time supply chain analytics with demand forecasting and inventory optimization', 'Reduced inventory costs by 22% and improved forecast accuracy to 92%'],

    // E-commerce
    ['Consumer Electronics Retailer', 'E-commerce & Marketplace Solutions', 'Integrated inventory and order management across Amazon, Flipkart, and own website', 'Increased sales by 65% while reducing inventory discrepancies by 90%'],
    ['Fashion Marketplace Seller', 'E-commerce & Marketplace Solutions', 'Built ML-powered dynamic pricing system for competitive pricing across marketplaces', 'Improved profit margins by 18% while maintaining competitive positioning'],
    ['Luxury Goods Brand', 'E-commerce & Marketplace Solutions', 'Developed custom e-commerce platform with personalization and exclusive member features', 'Achieved $2M in first-year sales with 4.2% conversion rate'],

    // Process Automation
    ['Accounting Firm', 'Process Automation & RPA', 'Automated invoice processing workflow from receipt to payment using OCR and RPA', 'Reduced invoice processing time by 85% and eliminated 95% of manual data entry'],
    ['Healthcare Network', 'Process Automation & RPA', 'Built n8n-based automation platform integrating 15+ systems for patient data synchronization', 'Automated 50+ manual processes saving 200 hours weekly across departments'],
    ['Digital Marketing Agency', 'Process Automation & RPA', 'Developed custom automation suite for campaign management, reporting, and client communication', 'Increased team capacity by 40% and improved campaign delivery speed by 60%'],

    // System Integration
    ['Manufacturing Enterprise', 'System Integration & API Development', 'Integrated SAP ERP with Salesforce CRM for real-time data synchronization', 'Eliminated data silos, improved sales efficiency by 35%, and reduced errors by 90%'],
    ['E-commerce Platform', 'System Integration & API Development', 'Integrated multiple payment gateways with fraud detection and reconciliation automation', 'Supports 10+ payment methods processing $50M+ annually with 99.99% uptime'],
    ['Government Agency', 'System Integration & API Development', 'Built API layer over legacy mainframe system enabling modern application integration', 'Enabled digital transformation while preserving $10M+ investment in legacy systems'],

    // Performance Optimization
    ['Online Retailer', 'Performance Optimization & Tuning', 'Comprehensive performance optimization reducing page load times and improving Core Web Vitals', 'Reduced page load time by 72%, increased conversion rate by 28%, and improved SEO ranking'],
    ['SaaS Platform', 'Performance Optimization & Tuning', 'Optimized API performance through caching, query optimization, and infrastructure scaling', 'Reduced API response time from 800ms to 95ms and increased throughput by 10x'],
    ['Analytics Platform', 'Performance Optimization & Tuning', 'Optimized database performance for handling billions of records with complex queries', 'Reduced query time by 90% and database costs by 50% while handling 10x data growth'],

    // IT Consulting
    ['Insurance Company', 'IT Consulting & Technology Strategy', 'Developed comprehensive digital transformation roadmap and technology architecture', 'Defined 3-year roadmap resulting in 40% operational efficiency improvement'],
    ['Private Equity Firm', 'IT Consulting & Technology Strategy', 'Conducted technical due diligence for $50M acquisition of SaaS company', 'Identified $2M in technical debt and provided mitigation roadmap'],
    ['Retail Corporation', 'IT Consulting & Technology Strategy', 'Designed multi-cloud strategy and migration roadmap for 100+ applications', 'Projected 45% cost savings and 3x improvement in deployment speed'],

    // Support & Maintenance
    ['Financial Services Company', 'Support & Maintenance Services', 'Providing 24/7 support and maintenance for mission-critical trading platform', 'Maintained 99.98% uptime with average incident resolution time of 45 minutes'],
    ['HR Tech Startup', 'Support & Maintenance Services', 'Comprehensive maintenance including feature updates, bug fixes, and performance optimization', 'Delivered 24 feature releases with zero downtime and 4.8 customer satisfaction'],
    ['E-commerce Platform', 'Support & Maintenance Services', 'Proactive monitoring and support for cloud infrastructure serving 1M+ users', 'Prevented 15 major incidents through proactive monitoring and reduced MTTR by 70%'],

    // Training & Workshops
    ['Software Development Company', 'Training & Technical Workshops', 'Delivered comprehensive 6-week training program for 30 developers transitioning to React', '100% of participants successfully transitioned to React projects with 4.9/5 satisfaction'],
    ['Enterprise IT Department', 'Training & Technical Workshops', 'Conducted workshop series on AWS and Azure architecture patterns and best practices', 'Trained 50+ architects resulting in 3 AWS and 2 Azure certifications'],
    ['Financial Institution', 'Training & Technical Workshops', 'Comprehensive DevOps training including CI/CD, IaC, and container orchestration', 'Enabled team to reduce deployment time by 80% and implement full CI/CD pipeline'],
];

replacements.forEach(([client, serviceType, desc, outcome]) => {
    const fullDesc = `${desc}. ${outcome}.`;
    const pattern = new RegExp(
        `client: "${client.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s+description: "${desc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s+technologies: \\[([^\\]]+)\\],\\s+duration: "[^"]+",\\s+outcome: "${outcome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
        'g'
    );

    content = content.replace(pattern, (match, techStack) => {
        return `serviceType: "${serviceType}",\n                description: "${fullDesc}",\n                techStack: [${techStack}]`;
    });
});

// Fix utility functions
content = content.replace(/project\.name\.toLowerCase\(\)\.includes\(lowerQuery\) \|\|\s+project\.client/g, 'project.name');
content = content.replace(/project\.technologies\.some\(\(tech: string\)/g, 'project.techStack.some((tech: string)');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Successfully updated all remaining project objects!');
