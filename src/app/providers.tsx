"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>{children}</TooltipProvider>
            </QueryClientProvider>
        </HelmetProvider>
    );
}
