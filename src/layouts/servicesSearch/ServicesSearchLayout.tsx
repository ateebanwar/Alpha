/**
 * ServicesSearchLayout - Completely Isolated Layout
 * 
 * This is a standalone layout completely independent from:
 * - Honeycomb layout
 * - Olympic layout
 * - 3D Carousel layout
 * - Ticker layout
 * 
 * It has its own:
 * - Styling (isolated CSS)
 * - State management
 * - Data handling
 * - UI components
 */

"use client";

import { useState, useMemo } from "react";
import { SERVICES_DATA, type ServiceItem } from "@/data/servicesData";
import { searchServicesOptimized, getKeywordSuggestions } from "@/data/searchIndex";

export default function ServicesSearchLayout() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

    // Search results
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) {
            return SERVICES_DATA;
        }
        return searchServicesOptimized(searchQuery);
    }, [searchQuery]);

    // Keyword suggestions for autocomplete
    const suggestions = useMemo(() => {
        if (searchQuery.length < 2) return [];
        return getKeywordSuggestions(searchQuery, 5);
    }, [searchQuery]);

    return (
        <div className="services-search-layout">
            {/* Isolated container - no dependencies on other layouts */}
            <div className="services-search-container">
                {/* Header Section */}
                <div className="services-search-header">
                    <h1 className="services-search-title">Search Our Services</h1>
                    <p className="services-search-subtitle">
                        Find the perfect solution for your business needs
                    </p>
                </div>

                {/* Search Input Section */}
                <div className="services-search-input-wrapper">
                    <div className="services-search-input-container">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by service, technology, or keyword..."
                            className="services-search-input"
                            autoFocus
                        />
                        <svg
                            className="services-search-icon"
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

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="services-search-suggestions">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSearchQuery(suggestion)}
                                    className="services-search-suggestion-item"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="services-search-results-count">
                    {searchQuery ? (
                        <p>
                            Found <strong>{searchResults.length}</strong> service{searchResults.length !== 1 ? 's' : ''}
                            {searchQuery && ` matching "${searchQuery}"`}
                        </p>
                    ) : (
                        <p>Showing all <strong>{searchResults.length}</strong> services</p>
                    )}
                </div>

                {/* Results Grid */}
                <div className="services-search-results">
                    {searchResults.map((service) => (
                        <div
                            key={service.id}
                            className="services-search-card"
                            onClick={() => setSelectedService(service)}
                        >
                            <h3 className="services-search-card-title">{service.title}</h3>
                            <p className="services-search-card-summary">{service.summary}</p>

                            <div className="services-search-card-keywords">
                                {service.keywords.slice(0, 5).map((keyword, idx) => (
                                    <span key={idx} className="services-search-keyword-tag">
                                        {keyword}
                                    </span>
                                ))}
                                {service.keywords.length > 5 && (
                                    <span className="services-search-keyword-more">
                                        +{service.keywords.length - 5} more
                                    </span>
                                )}
                            </div>

                            <div className="services-search-card-footer">
                                <span className="services-search-project-count">
                                    {service.projects.length} project{service.projects.length !== 1 ? 's' : ''}
                                </span>
                                <button className="services-search-view-btn">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {searchResults.length === 0 && searchQuery && (
                    <div className="services-search-no-results">
                        <svg className="services-search-no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3>No services found</h3>
                        <p>Try searching with different keywords or technologies</p>
                    </div>
                )}
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div className="services-search-modal-overlay" onClick={() => setSelectedService(null)}>
                    <div className="services-search-modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="services-search-modal-close"
                            onClick={() => setSelectedService(null)}
                        >
                            ✕
                        </button>

                        <h2 className="services-search-modal-title">{selectedService.title}</h2>
                        <p className="services-search-modal-summary">{selectedService.summary}</p>

                        <div className="services-search-modal-section">
                            <h3>Keywords</h3>
                            <div className="services-search-modal-keywords">
                                {selectedService.keywords.map((keyword, idx) => (
                                    <span key={idx} className="services-search-keyword-tag">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="services-search-modal-section">
                            <h3>Projects ({selectedService.projects.length})</h3>
                            <div className="services-search-modal-projects">
                                {selectedService.projects.map((project) => (
                                    <div key={project.id} className="services-search-project-card">
                                        <h4>{project.name}</h4>
                                        <p className="services-search-project-type">{project.serviceType}</p>
                                        <p className="services-search-project-desc">{project.description}</p>
                                        <div className="services-search-project-tech">
                                            {project.techStack.map((tech, idx) => (
                                                <span key={idx} className="services-search-tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="services-search-project-year">{project.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Isolated Styles - Scoped to this layout only */}
            <style jsx>{`
                .services-search-layout {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    background: var(--background);
                    color: var(--foreground);
                }

                .services-search-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 1.5rem;
                }

                .services-search-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .services-search-title {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .services-search-subtitle {
                    font-size: 1.25rem;
                    color: var(--muted-foreground);
                }

                .services-search-input-wrapper {
                    margin-bottom: 2rem;
                    position: relative;
                }

                .services-search-input-container {
                    position: relative;
                }

                .services-search-input {
                    width: 100%;
                    padding: 1rem 3rem 1rem 1.5rem;
                    font-size: 1.125rem;
                    border: 2px solid var(--border);
                    border-radius: 0.75rem;
                    background: var(--background);
                    color: var(--foreground);
                    transition: all 0.2s;
                }

                .services-search-input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
                }

                .services-search-icon {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 1.5rem;
                    height: 1.5rem;
                    color: var(--muted-foreground);
                    pointer-events: none;
                }

                .services-search-suggestions {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-top: 0.75rem;
                }

                .services-search-suggestion-item {
                    padding: 0.5rem 1rem;
                    background: var(--muted);
                    border: 1px solid var(--border);
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .services-search-suggestion-item:hover {
                    background: var(--accent);
                    border-color: var(--primary);
                }

                .services-search-results-count {
                    margin-bottom: 1.5rem;
                    color: var(--muted-foreground);
                }

                .services-search-results {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                .services-search-card {
                    padding: 1.5rem;
                    border: 1px solid var(--border);
                    border-radius: 0.75rem;
                    background: var(--card);
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .services-search-card:hover {
                    border-color: var(--primary);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transform: translateY(-2px);
                }

                .services-search-card-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                }

                .services-search-card-summary {
                    font-size: 0.875rem;
                    color: var(--muted-foreground);
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }

                .services-search-card-keywords {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .services-search-keyword-tag {
                    padding: 0.25rem 0.75rem;
                    background: var(--muted);
                    border-radius: 0.375rem;
                    font-size: 0.75rem;
                    color: var(--foreground);
                }

                .services-search-keyword-more {
                    padding: 0.25rem 0.75rem;
                    color: var(--muted-foreground);
                    font-size: 0.75rem;
                }

                .services-search-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid var(--border);
                }

                .services-search-project-count {
                    font-size: 0.875rem;
                    color: var(--muted-foreground);
                }

                .services-search-view-btn {
                    padding: 0.5rem 1rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .services-search-view-btn:hover {
                    opacity: 0.9;
                    transform: translateX(2px);
                }

                .services-search-no-results {
                    text-align: center;
                    padding: 4rem 2rem;
                }

                .services-search-no-results-icon {
                    width: 4rem;
                    height: 4rem;
                    margin: 0 auto 1rem;
                    color: var(--muted-foreground);
                }

                .services-search-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }

                .services-search-modal {
                    background: var(--background);
                    border-radius: 1rem;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    padding: 2rem;
                    position: relative;
                }

                .services-search-modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 2rem;
                    height: 2rem;
                    border: none;
                    background: var(--muted);
                    border-radius: 0.375rem;
                    cursor: pointer;
                    font-size: 1.25rem;
                }

                .services-search-modal-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .services-search-modal-summary {
                    color: var(--muted-foreground);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .services-search-modal-section {
                    margin-bottom: 2rem;
                }

                .services-search-modal-section h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .services-search-modal-keywords {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .services-search-modal-projects {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .services-search-project-card {
                    padding: 1.5rem;
                    border: 1px solid var(--border);
                    border-radius: 0.75rem;
                    background: var(--card);
                }

                .services-search-project-card h4 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .services-search-project-type {
                    color: var(--primary);
                    font-size: 0.875rem;
                    margin-bottom: 0.75rem;
                }

                .services-search-project-desc {
                    color: var(--muted-foreground);
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }

                .services-search-project-tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }

                .services-search-tech-tag {
                    padding: 0.25rem 0.75rem;
                    background: var(--muted);
                    border-radius: 0.375rem;
                    font-size: 0.75rem;
                }

                .services-search-project-year {
                    color: var(--muted-foreground);
                    font-size: 0.875rem;
                }

                @media (max-width: 768px) {
                    .services-search-title {
                        font-size: 2rem;
                    }

                    .services-search-results {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
