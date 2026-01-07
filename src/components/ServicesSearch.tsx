"use client";

import { useState } from "react";

export default function ServicesSearch() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="w-full h-full flex items-center justify-center bg-background">
            <div className="w-full max-w-4xl px-6">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-4">Search Services</h2>
                    <p className="text-muted-foreground text-lg">
                        Find the perfect service for your needs
                    </p>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for services..."
                        className="w-full px-6 py-4 text-lg rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {searchQuery && (
                    <div className="mt-6 p-4 rounded-lg border border-border bg-card">
                        <p className="text-muted-foreground">
                            Searching for: <span className="font-semibold text-foreground">{searchQuery}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
