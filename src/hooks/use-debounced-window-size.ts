import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

// Debounce utility
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Optimized hook for tracking window size with debouncing
 * Prevents excessive re-renders during window resize
 */
export const useDebouncedWindowSize = (debounceMs: number = 150): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    useEffect(() => {
        // Set initial size immediately
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Initial call
        handleResize();

        // Debounced handler for subsequent calls
        const debouncedHandleResize = debounce(handleResize, debounceMs);

        window.addEventListener('resize', debouncedHandleResize);
        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, [debounceMs]);

    return windowSize;
};
