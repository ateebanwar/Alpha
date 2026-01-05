import TickerWall from './components/TickerWall';
import { LayoutProps } from '../core/Layout.types';
import "./styles/ticker-isolated.css";

export const TickerLayout = ({ isActive, expandedId, onExpandedChange }: LayoutProps) => {
    return (
        <div id="ticker-layout-container" className="ticker-iso-root" style={{ height: '100%', width: '100%' }}>
            <TickerWall
                expandedId={expandedId}
                onExpandedChange={onExpandedChange}
            />
        </div>
    );
};
