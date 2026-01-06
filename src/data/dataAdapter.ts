import masterDataRaw from "./masterData.json";
import { iconRegistry } from "./iconRegistry";
import { LucideIcon } from "lucide-react";
import { dataCache } from "@/utils/dataCache";

// --- Types ---
export interface CircleData {
    id: string;
    label: string;
    icon: LucideIcon;
    size: "sm" | "md" | "lg" | "xl";
    color: "primary" | "accent" | "muted";
    category: "service" | "tech" | "about" | "contact" | "process";
    content: {
        title: string;
        description: string;
        items?: { label: string; description?: string; icon?: LucideIcon }[];
    };
    delay?: number;
}

export interface TickerItem {
    id: string;
    title: string;
    category: "service" | "tech" | "about" | "contact" | "process";
    icon: string; // Ticker uses string icon names mostly, but we can map if needed
    color: "primary" | "accent" | "muted";
    backgroundImage: string;
}

export interface CarouselSlide {
    title: string;
    img: string;
}

// --- Data Adapter with Caching ---

const masterData = masterDataRaw as any[];

/**
 * Optimized data getter for Honeycomb layout with caching
 * Prevents redundant data transformations
 */
export const getDataForHoneycomb = (): CircleData[] => {
    return dataCache.get('honeycomb', () => {
        return masterData
            .filter((item) => item.layouts?.honeycomb)
            .map((item) => ({
                id: item.id,
                label: item.label || item.title,
                icon: iconRegistry[item.icon as string] || iconRegistry["Code2"], // Fallback
                size: item.size || "md",
                color: item.color || "primary",
                category: item.category || "service",
                delay: item.delay || 0,
                content: {
                    title: item.content?.title || item.title,
                    description: item.content?.description || item.description,
                    items: item.content?.items?.map((subItem: any) => ({
                        label: subItem.label,
                        description: subItem.description,
                        icon: subItem.icon ? iconRegistry[subItem.icon as string] : undefined,
                    })),
                },
            }));
    }, Infinity); // Cache indefinitely since data is static
};

/**
 * Optimized data getter for Ticker layout with caching
 */
export const getDataForTicker = (): TickerItem[] => {
    return dataCache.get('ticker', () => {
        return masterData
            .filter((item) => item.layouts?.ticker)
            .map((item) => ({
                id: item.id,
                title: item.title,
                category: item.category || "service",
                icon: item.icon,
                color: item.color || "primary",
                backgroundImage: item.image || "",
            }));
    }, Infinity); // Cache indefinitely since data is static
};

/**
 * Optimized data getter for Carousel layout with caching
 */
export const getDataForCarousel = (): (CarouselSlide & { id: string, icon?: LucideIcon, color?: string, label?: string })[] => {
    return dataCache.get('carousel', () => {
        // REQUIREMENT: 3D Layout must match Default Layout (Honeycomb) EXACTLY.
        // So we filter by 'honeycomb' instead of 'carousel' to ensure 1:1 parity.
        return masterData
            .filter((item) => item.layouts?.honeycomb)
            .map((item) => ({
                id: item.id,
                title: item.title || item.label,
                label: item.label,
                img: item.img || "", // Might be empty for icons
                icon: iconRegistry[item.icon as string] || iconRegistry["Code2"],
                color: item.color || "primary",
            }));
    }, Infinity); // Cache indefinitely since data is static
};
