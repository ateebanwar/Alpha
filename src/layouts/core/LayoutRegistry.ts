import { ComponentType } from 'react';
import { LayoutProps } from './Layout.types';

import { HoneycombLayout } from '../honeycomb';
import { config as honeycombConfig } from '../honeycomb/config';

import { CarouselLayout } from '../carousel';
import { config as carouselConfig } from '../carousel/config';

import { TickerLayout } from '../ticker';
import { config as tickerConfig } from '../ticker/config';

export interface LayoutEntry {
    id: string;
    component: ComponentType<LayoutProps>;
    config: {
        id: string;
        version: string;
        name: string;
        description?: string;
    }
}

export const LAYOUT_REGISTRY: Record<string, LayoutEntry> = {
    [honeycombConfig.id]: {
        id: honeycombConfig.id,
        component: HoneycombLayout,
        config: honeycombConfig
    },
    [carouselConfig.id]: {
        id: carouselConfig.id,
        component: CarouselLayout,
        config: carouselConfig
    },
    [tickerConfig.id]: {
        id: tickerConfig.id,
        component: TickerLayout,
        config: tickerConfig
    }
};
