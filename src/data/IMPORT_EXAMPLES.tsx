/**
 * Clean Import Examples for Services Data
 * 
 * This file demonstrates how to import and use the services data
 * without side effects or runtime computation.
 */

import React, { useState } from 'react';

// ============================================
// IMPORTING DATA (No Side Effects)
// ============================================

// Import the raw data array (pure data, no computation)
import { SERVICES_DATA } from './servicesData';

// Import type definitions
import type { ServiceItem, Project } from './servicesData';

// Import search functions (lazy initialization, no side effects on import)
import {
    searchByKeyword,
    searchByKeywords,
    searchServicesOptimized,
    getKeywordSuggestions,
    getAllNormalizedKeywords
} from './searchIndex';

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * Example 1: Direct data access (no computation)
 */
export function Example1_DirectAccess() {
    // Simply access the data array
    const allServices: ServiceItem[] = SERVICES_DATA;

    // Filter manually if needed
    const webServices = allServices.filter(s =>
        s.keywords.includes('web development')
    );

    return webServices;
}

/**
 * Example 2: Search by keyword (index builds on first call only)
 */
export function Example2_KeywordSearch() {
    // First call builds the index (lazy)
    const reactServices = searchByKeyword('react');

    // Subsequent calls use cached index (fast)
    const pythonServices = searchByKeyword('python');

    return { reactServices, pythonServices };
}

/**
 * Example 3: Multi-keyword search
 */
export function Example3_MultiKeywordSearch() {
    const services = searchByKeywords(['cloud', 'aws', 'azure']);
    return services;
}

/**
 * Example 4: Optimized search with fallback
 */
export function Example4_OptimizedSearch(userQuery: string) {
    // Tries exact match first, falls back to partial
    const results = searchServicesOptimized(userQuery);
    return results;
}

/**
 * Example 5: Autocomplete suggestions
 */
export function Example5_Autocomplete(partial: string) {
    const suggestions = getKeywordSuggestions(partial, 5);
    return suggestions;
}

/**
 * Example 6: Get all keywords for filters
 */
export function Example6_GetAllKeywords() {
    // Only builds index on first call
    const allKeywords = getAllNormalizedKeywords();
    return allKeywords;
}

// ============================================
// REACT COMPONENT EXAMPLE
// ============================================

/**
 * Example React component using the data
 */
export function ServicesSearchExample() {
    // This import has NO side effects
    // Data is just a plain array
    // Search index only builds when search functions are called

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ServiceItem[]>([]);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);

        if (!searchQuery.trim()) {
            setResults(SERVICES_DATA); // Direct access, no computation
        } else {
            // Index builds on first search, cached thereafter
            setResults(searchServicesOptimized(searchQuery));
        }
    };

    return (
        <div>
            <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search services..."
            />
            <div>
                {results.map(service => (
                    <div key={service.id}>
                        <h3>{service.title}</h3>
                        <p>{service.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// KEY BENEFITS
// ============================================

/*
✅ NO SIDE EFFECTS ON IMPORT
   - Importing SERVICES_DATA doesn't run any code
   - It's just a plain JavaScript array
   - No index building until you call search functions

✅ LAZY INITIALIZATION
   - Search index only builds when first accessed
   - Subsequent calls use cached index
   - No performance cost if you don't use search

✅ CLEAN IMPORTS
   - import { SERVICES_DATA } from './servicesData'
   - import { searchByKeyword } from './searchIndex'
   - No configuration needed
   - No initialization functions to call

✅ TREE-SHAKEABLE
   - Only import what you need
   - Unused search functions won't be bundled
   - Data is separate from search logic

✅ TYPE-SAFE
   - Full TypeScript support
   - IntelliSense for all fields
   - Compile-time validation
*/
