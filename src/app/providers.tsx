"use client";

import StyledJsxRegistry from "@/lib/registry";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StyledJsxRegistry>
            {children}
        </StyledJsxRegistry>
    );
}
