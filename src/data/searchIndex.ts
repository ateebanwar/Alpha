/**
 * Optimized Search Index for servicesData
 * Provides O(1) keyword lookup using normalized keywords
 * 
 * IMPORTANT: This module uses lazy initialization to avoid side effects on import.
 * The index is only built when first accessed.
 */

import { SERVICES_DATA, ServiceItem } from './servicesData';

/**
 * Normalize keywords for fast lookup
 */
const normalizeKeyword = (keyword: string): string => {
    return keyword.toLowerCase().trim();
};

/**
 * Keyword-to-Service Index for O(1) lookup
 * Maps normalized keyword -> array of service IDs
 */
class KeywordIndex {
    private index: Map<string, string[]> = new Map();
    private initialized = false;

    /**
     * Build normalized keywords for all services
     */
    private normalizeAllKeywords(): void {
        SERVICES_DATA.forEach(service => {
            if (!service.normalizedKeywords) {
                service.normalizedKeywords = service.keywords.map(normalizeKeyword);
            }
        });
    }

    /**
     * Build keyword index for fast lookup
     * Only called when index is first accessed (lazy initialization)
     */
    private buildIndex(): void {
        if (this.initialized) return;

        this.normalizeAllKeywords();
        this.index.clear();

        SERVICES_DATA.forEach(service => {
            service.normalizedKeywords?.forEach(keyword => {
                const existing = this.index.get(keyword) || [];
                if (!existing.includes(service.id)) {
                    existing.push(service.id);
                    this.index.set(keyword, existing);
                }
            });
        });

        this.initialized = true;
    }

    /**
     * Ensure index is built before accessing
     */
    private ensureInitialized(): void {
        if (!this.initialized) {
            this.buildIndex();
        }
    }

    /**
     * Get service IDs for a normalized keyword
     */
    getServiceIds(keyword: string): string[] {
        this.ensureInitialized();
        const normalized = normalizeKeyword(keyword);
        return this.index.get(normalized) || [];
    }

    /**
     * Get all normalized keywords
     */
    getAllKeywords(): string[] {
        this.ensureInitialized();
        return Array.from(this.index.keys()).sort();
    }

    /**
     * Get keyword suggestions based on partial input
     */
    getSuggestions(partial: string, limit: number = 10): string[] {
        this.ensureInitialized();
        const normalized = normalizeKeyword(partial);
        if (!normalized) return [];

        return Array.from(this.index.keys())
            .filter(keyword => keyword.startsWith(normalized))
            .slice(0, limit);
    }
}

// Create singleton index instance (but don't build it yet - lazy initialization)
const keywordIndex = new KeywordIndex();

/**
 * Get service by ID (pure function, no side effects)
 */
export const getServiceById = (id: string): ServiceItem | undefined => {
    return SERVICES_DATA.find(service => service.id === id);
};

/**
 * Fast keyword-based search using exact match on normalized keywords
 * O(1) lookup using pre-built index (builds on first call)
 */
export const searchByKeyword = (keyword: string): ServiceItem[] => {
    const serviceIds = keywordIndex.getServiceIds(keyword);
    return serviceIds
        .map(id => getServiceById(id))
        .filter((s): s is ServiceItem => s !== undefined);
};

/**
 * Fast multi-keyword search (returns services matching ANY keyword)
 */
export const searchByKeywords = (keywords: string[]): ServiceItem[] => {
    const serviceIdSet = new Set<string>();

    keywords.forEach(keyword => {
        const ids = keywordIndex.getServiceIds(keyword);
        ids.forEach(id => serviceIdSet.add(id));
    });

    return Array.from(serviceIdSet)
        .map(id => getServiceById(id))
        .filter((s): s is ServiceItem => s !== undefined);
};

/**
 * Optimized search with exact keyword matching first, then partial matching
 */
export const searchServicesOptimized = (query: string): ServiceItem[] => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
        return SERVICES_DATA;
    }

    // First try exact keyword match (fastest - O(1))
    const exactMatch = searchByKeyword(lowerQuery);
    if (exactMatch.length > 0) {
        return exactMatch;
    }

    // Fall back to partial matching (slower - O(n))
    return SERVICES_DATA.filter(service =>
        service.id.toLowerCase().includes(lowerQuery) ||
        service.title.toLowerCase().includes(lowerQuery) ||
        service.summary.toLowerCase().includes(lowerQuery) ||
        service.normalizedKeywords?.some(keyword => keyword.includes(lowerQuery)) ||
        service.projects.some(project =>
            project.name.toLowerCase().includes(lowerQuery) ||
            project.description.toLowerCase().includes(lowerQuery) ||
            project.techStack.some((tech: string) => tech.toLowerCase().includes(lowerQuery))
        )
    );
};

/**
 * Get all normalized keywords (for autocomplete/suggestions)
 */
export const getAllNormalizedKeywords = (): string[] => {
    return keywordIndex.getAllKeywords();
};

/**
 * Get keyword suggestions based on partial input
 */
export const getKeywordSuggestions = (partial: string, limit?: number): string[] => {
    return keywordIndex.getSuggestions(partial, limit);
};

/**
 * Export the keyword index for advanced usage
 */
export { keywordIndex };
