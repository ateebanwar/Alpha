import CircleGrid from './components/CircleGrid';
import { LayoutProps } from '../core/Layout.types';

export const HoneycombLayout = ({ isActive, expandedId, onExpandedChange, layoutMode }: LayoutProps) => {
    // If not active, we might return null, but for animations, we might keep it mounted but hidden?
    // Current HomeClient uses AnimatePresence, so it mounts/unmounts.
    // We pass layoutMode ("static" or "olympic") down.

    // Default to static if not specified
    const mode = (layoutMode === "olympic") ? "olympic" : "static";

    return (
        <CircleGrid
            layoutMode={mode}
            expandedId={expandedId}
            onExpandedChange={onExpandedChange}
        />
    );
};
