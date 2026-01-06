import { memo } from 'react';
import Carousel3D from './components/Carousel3D';
import { LayoutProps } from '../core/Layout.types';

const CarouselLayoutComponent = ({ isActive, expandedId, onExpandedChange }: LayoutProps) => {
    return (
        <Carousel3D />
    );
};

// Memoize to prevent re-renders
export const CarouselLayout = memo(CarouselLayoutComponent);
