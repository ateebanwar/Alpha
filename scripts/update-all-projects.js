const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/servicesData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define all transformations
const transformations = [
    // Mobile App Development
    {
        search: /client: "Health & Wellness Startup",\s+description: "Cross-platform fitness app with workout tracking, nutrition logging, and social features",\s+technologies: \["React Native", "Firebase", "Node\.js", "MongoDB", "AWS"\],\s+duration: "5 months",\s+outcome: "Reached 100,000\+ downloads with 4\.7-star rating on both app stores"/g,
        replace: 'serviceType: "Mobile Application Development",\n                description: "Cross-platform fitness app with workout tracking, nutrition logging, and social features. Reached 100,000+ downloads with 4.7-star rating on both app stores.",\n                techStack: ["React Native", "Firebase", "Node.js", "MongoDB", "AWS"]'
    },

    {
        search: /client: "Utilities Company",\s+description: "Native mobile app for field technicians to manage work orders, track time, and access equipment manuals offline",\s+technologies: \["Flutter", "SQLite", "REST API", "Google Maps", "Azure"\],\s+duration: "7 months",\s+outcome: "Improved field technician productivity by 45% and reduced paperwork by 90%"/g,
        replace: 'serviceType: "Mobile Application Development",\n                description: "Native mobile app for field technicians to manage work orders, track time, and access equipment manuals offline. Improved field technician productivity by 45% and reduced paperwork by 90%.",\n                techStack: ["Flutter", "SQLite", "REST API", "Google Maps", "Azure"]'
    },

    {
        search: /client: "Regional Credit Union",\s+description: "Secure mobile banking app with biometric login, bill pay, mobile check deposit, and real-time notifications",\s+technologies: \["React Native", "Biometric SDK", "Encryption", "PostgreSQL", "AWS"\],\s+duration: "9 months",\s+outcome: "Onboarded 75,000 users with zero security incidents and 4\.8-star rating"/g,
        replace: 'serviceType: "Mobile Application Development",\n                description: "Secure mobile banking app with biometric login, bill pay, mobile check deposit, and real-time notifications. Onboarded 75,000 users with zero security incidents and 4.8-star rating.",\n                techStack: ["React Native", "Biometric SDK", "Encryption", "PostgreSQL", "AWS"]'
    },
];

// Apply all transformations
transformations.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
});

// Also fix the utility functions
content = content.replace(/project\.client/g, 'project.name');
content = content.replace(/project\.technologies/g, 'project.techStack');
content = content.replace(/tech =>/g, '(tech: string) =>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Updated all project objects successfully!');
