import Carousel3D from './components/Carousel3D';
import { LayoutProps } from '../core/Layout.types';

export const CarouselLayout = ({ isActive, expandedId, onExpandedChange }: LayoutProps) => {
    return (
        <Carousel3D />
    );
};
