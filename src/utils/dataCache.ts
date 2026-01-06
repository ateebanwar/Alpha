/**
 * Simple caching utility for data transformations
 * Prevents redundant processing of static data
 */

type CacheEntry<T> = {
    data: T;
    timestamp: number;
};

class DataCache {
    private cache: Map<string, CacheEntry<any>> = new Map();
    private maxAge: number = 5 * 60 * 1000; // 5 minutes default

    /**
     * Get cached data or compute and cache it
     */
    get<T>(key: string, computeFn: () => T, maxAge?: number): T {
        const cached = this.cache.get(key);
        const age = maxAge ?? this.maxAge;

        if (cached && Date.now() - cached.timestamp < age) {
            return cached.data as T;
        }

        const data = computeFn();
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });

        return data;
    }

    /**
     * Invalidate specific cache entry
     */
    invalidate(key: string): void {
        this.cache.delete(key);
    }

    /**
     * Clear all cache entries
     */
    clear(): void {
        this.cache.clear();
    }
}

// Singleton instance
export const dataCache = new DataCache();
