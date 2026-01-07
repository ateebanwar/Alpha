# Services Data Extension Guide

## Overview
The services data structure is designed to be fully extensible. You can add new services or projects without modifying any UI or search logic.

## Adding a New Service

Simply add a new object to the `SERVICES_DATA` array in `servicesData.ts`:

```typescript
{
    id: "your-new-service",
    title: "Your New Service",
    keywords: [
        "keyword1", "keyword2", "keyword3",
        "technology1", "technology2"
    ],
    summary: "Brief description of your new service and what it offers.",
    projects: [
        // Add project objects here (see below)
    ]
}
```

### Service Fields

- **id**: Unique identifier (kebab-case recommended)
- **title**: Display name shown in UI
- **keywords**: Array of searchable terms (will be auto-normalized)
- **summary**: 1-2 sentence description
- **projects**: Array of project examples

## Adding a New Project

Add a project object to any service's `projects` array:

```typescript
{
    id: "proj-unique-id",
    name: "Project Name",
    serviceType: "Service Category",
    description: "1-2 line description including outcome/results.",
    techStack: ["Technology1", "Technology2", "Technology3"],
    year: 2024
}
```

### Project Fields

- **id**: Unique identifier
- **name**: Project title
- **serviceType**: Category (e.g., "Web Application Development")
- **description**: Brief description with results (1-2 lines)
- **techStack**: Array of technologies used
- **year**: Completion year

## Automatic Features

When you add new services or projects, the following happens **automatically**:

### ✅ Search Index Updates
- Keywords are automatically normalized (lowercase, trimmed)
- Search index rebuilds on module load
- No manual indexing required

### ✅ UI Integration
- New services appear in search results immediately
- No UI component changes needed
- Keyword suggestions update automatically

### ✅ Utility Functions Work
- `searchByKeyword()` - finds your service by any keyword
- `getAllKeywords()` - includes your new keywords
- `getAllTechnologies()` - includes your tech stack
- `getProjectsByYear()` - includes your projects
- All other utility functions work automatically

## Example: Adding a Complete Service

```typescript
// Add this to SERVICES_DATA array in servicesData.ts
{
    id: "blockchain-development",
    title: "Blockchain & Web3 Development",
    keywords: [
        "blockchain", "web3", "cryptocurrency", "smart contracts",
        "Ethereum", "Solidity", "NFT", "DeFi", "decentralized",
        "distributed ledger", "crypto", "token"
    ],
    summary: "We build secure blockchain solutions and Web3 applications including smart contracts, DeFi platforms, NFT marketplaces, and decentralized applications using Ethereum, Solidity, and modern Web3 technologies.",
    projects: [
        {
            id: "proj-blockchain-001",
            name: "DeFi Lending Platform",
            serviceType: "Blockchain & Web3 Development",
            description: "Built decentralized lending platform with automated market makers and yield farming. Secured $50M+ in total value locked with zero security incidents.",
            techStack: ["Solidity", "Ethereum", "React", "Web3.js", "Hardhat", "IPFS"],
            year: 2024
        },
        {
            id: "proj-blockchain-002",
            name: "NFT Marketplace",
            serviceType: "Blockchain & Web3 Development",
            description: "Developed NFT marketplace with lazy minting and royalty distribution. Processed 10,000+ NFT transactions with $2M+ in sales volume.",
            techStack: ["Solidity", "Next.js", "Ethers.js", "Polygon", "IPFS", "TheGraph"],
            year: 2023
        }
    ]
}
```

## Best Practices

### Keywords
- Include technology names (e.g., "React", "Python")
- Include service categories (e.g., "web development", "mobile")
- Include common search terms (e.g., "API", "cloud")
- Use lowercase for consistency
- Avoid duplicates within same service

### Project Descriptions
- Combine what was done + outcome/results
- Keep to 1-2 lines maximum
- Include quantifiable results when possible
- Be specific about technologies used

### Tech Stack
- Use official technology names
- Be consistent with existing naming (e.g., "Next.js" not "NextJS")
- Include frameworks, languages, and tools
- Order by importance/relevance

## Validation

After adding new data, verify:

1. **No TypeScript errors** - The interface will catch any mistakes
2. **Unique IDs** - Service and project IDs must be unique
3. **Keywords work** - Test with `searchByKeyword("your-keyword")`
4. **Search works** - Test with `searchServices("your-term")`

## No Code Changes Required

✅ **UI Components** - Automatically render new data  
✅ **Search Logic** - Automatically indexes new keywords  
✅ **Filters** - Automatically include new technologies/years  
✅ **Suggestions** - Automatically show new keywords  

Simply add data to `SERVICES_DATA` and everything works!
