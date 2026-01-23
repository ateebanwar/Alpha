import { memo } from 'react';
import TickerWall from './components/TickerWall';
import { LayoutProps } from '../core/Layout.types';
import "./styles/ticker.css";

const TickerLayoutComponent = ({ isActive, expandedId, onExpandedChange }: LayoutProps) => {
    return (
        <div id="ticker-layout-container" className="ticker-iso-root" style={{ height: '100%', width: '100%' }}>
            <TickerWall
                expandedId={expandedId}
                onExpandedChange={onExpandedChange}
            />
        </div>
    );
};

// Memoize to prevent re-renders
export const TickerLayout = memo(TickerLayoutComponent);
