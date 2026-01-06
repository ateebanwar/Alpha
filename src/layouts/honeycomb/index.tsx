import { memo } from 'react';
import CircleGrid from './components/CircleGrid';
import { LayoutProps } from '../core/Layout.types';
import "./styles/honeycomb-isolated.css";
import "./styles/olympic-isolated.css";

const HoneycombLayoutComponent = ({ isActive, expandedId, onExpandedChange, layoutMode }: LayoutProps) => {
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

// Memoize to prevent re-renders when props haven't changed
export const HoneycombLayout = memo(HoneycombLayoutComponent, (prevProps, nextProps) => {
    return (
        prevProps.isActive === nextProps.isActive &&
        prevProps.expandedId === nextProps.expandedId &&
        prevProps.layoutMode === nextProps.layoutMode
    );
});
