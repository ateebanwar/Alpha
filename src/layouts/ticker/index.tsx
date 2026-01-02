import TickerWall from './components/TickerWall';
import { LayoutProps } from '../core/Layout.types';

export const TickerLayout = ({ isActive, expandedId, onExpandedChange }: LayoutProps) => {
    return (
        <TickerWall
            expandedId={expandedId}
            onExpandedChange={onExpandedChange}
        />
    );
};
