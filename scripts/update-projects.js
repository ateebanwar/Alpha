/**
 * Script to update all project objects in servicesData.ts
 * Converts old format (client, technologies, duration, outcome) to new format (serviceType, techStack)
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/servicesData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Service type mapping based on service IDs
const serviceTypeMap = {
    'mobile-app-development': 'Mobile Application Development',
    'microservices-backend': 'Microservices & Backend Development',
    'database-management': 'Database Design & Management',
    'azure-cloud-solutions': 'Azure Cloud Solutions',
    'aws-cloud-solutions': 'AWS Cloud Solutions',
    'cicd-devops': 'CI/CD & DevOps',
    'ai-machine-learning': 'AI & Machine Learning',
    'data-analytics-bi': 'Data Analytics & Business Intelligence',
    'ecommerce-marketplace': 'E-commerce & Marketplace Solutions',
    'process-automation': 'Process Automation & RPA',
    'system-integration': 'System Integration & API Development',
    'performance-optimization': 'Performance Optimization & Tuning',
    'it-consulting-strategy': 'IT Consulting & Technology Strategy',
    'support-maintenance': 'Support & Maintenance Services',
    'training-workshops': 'Training & Technical Workshops'
};

// Replace all project objects
let currentServiceId = null;

// Find service ID context
content = content.replace(/id: "([^"]+)",\s+title:/g, (match, id) => {
    if (serviceTypeMap[id]) {
        currentServiceId = id;
    }
    return match;
});

// Replace project objects
content = content.replace(
    /{\s+id: "([^"]+)",\s+name: "([^"]+)",\s+client: "([^"]+)",\s+description: "([^"]+)",\s+technologies: \[([^\]]+)\],\s+duration: "([^"]+)",\s+outcome: "([^"]+)",\s+year: (\d+)\s+}/g,
    (match, id, name, client, desc, tech, duration, outcome, year) => {
        // Determine service type from context
        let serviceType = 'General Service';
        for (const [key, value] of Object.entries(serviceTypeMap)) {
            if (match.indexOf(key) !== -1 || content.indexOf(`id: "${key}"`) < content.indexOf(match)) {
                serviceType = value;
            }
        }

        // Combine description and outcome
        const fullDesc = `${desc}. ${outcome}.`;

        // Clean up tech stack
        const techStack = tech.trim();

        return `{
                id: "${id}",
                name: "${name}",
                serviceType: "${serviceType}",
                description: "${fullDesc}",
                techStack: [${techStack}],
                year: ${year}
            }`;
    }
);

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated all project objects!');
