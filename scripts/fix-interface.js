const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/servicesData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Add normalizedKeywords to the interface
content = content.replace(
    /export interface ServiceItem \{[\s\S]*?keywords: string\[\];[\s]*\/\/ Array of searchable terms/,
    (match) => match + '\n    normalizedKeywords?: string[]; // Normalized keywords for fast lookup (lowercase, trimmed)'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Added normalizedKeywords to ServiceItem interface');
