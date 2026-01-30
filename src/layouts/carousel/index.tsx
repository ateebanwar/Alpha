import { memo } from 'react';
import Carousel3D from './components/Carousel3D';
import { LayoutProps } from '../core/Layout.types';

const CarouselLayoutComponent = ({ isActive, expandedId, onExpandedChange, onCardClick }: LayoutProps & { onCardClick?: (id: string) => void }) => {
    return (
        <Carousel3D onCardClick={onCardClick} />
    );
};

// Memoize to prevent re-renders
export const CarouselLayout = memo(CarouselLayoutComponent);
