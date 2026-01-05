import CircleGrid from './components/CircleGrid';
import { LayoutProps } from '../core/Layout.types';
import "./styles/honeycomb-isolated.css";
import "./styles/olympic-isolated.css";

export const HoneycombLayout = ({ isActive, expandedId, onExpandedChange, layoutMode }: LayoutProps) => {
    // If not active, we might return null, but for animations, we might keep it mounted but hidden?
    // Current HomeClient uses AnimatePresence, so it mounts/unmounts.
    // We pass layoutMode ("static" or "olympic") down.

    // Default to static if not specified
    const mode = (layoutMode === "olympic") ? "olympic" : "static";

    const wrapperId = mode === "olympic" ? "olympic-layout-container" : "default-honeycomb-layout";

    return (
        <div id={wrapperId} className="honeycomb-iso-root" style={{ height: '100%', width: '100%' }}>
            <CircleGrid
                layoutMode={mode}
                expandedId={expandedId}
                onExpandedChange={onExpandedChange}
            />
        </div>
    );
};
