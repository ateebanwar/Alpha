export interface LayoutConfig {
    id: string;
    version: string;
    name: string;
    description?: string;
    thumbnail?: string;
}

export interface LayoutProps {
    isActive: boolean;
    expandedId: string | null;
    onExpandedChange: (id: string | null) => void;
    layoutMode?: string; // Optional, for sub-modes like 'olympic' vs 'static' if handled within one module
}
