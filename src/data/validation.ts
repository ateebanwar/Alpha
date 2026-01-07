/**
 * Validation utilities for servicesData
 * Ensures data integrity when adding new services or projects
 */

import { SERVICES_DATA, ServiceItem, Project } from './servicesData';

/**
 * Validation result
 */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}

/**
 * Validate a service object
 */
export const validateService = (service: ServiceItem): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!service.id) errors.push('Service ID is required');
    if (!service.title) errors.push('Service title is required');
    if (!service.keywords || service.keywords.length === 0) {
        errors.push('At least one keyword is required');
    }
    if (!service.summary) errors.push('Service summary is required');

    // ID format
    if (service.id && !/^[a-z0-9-]+$/.test(service.id)) {
        warnings.push(`Service ID "${service.id}" should use kebab-case (lowercase with hyphens)`);
    }

    // Check for duplicate IDs
    const duplicateId = SERVICES_DATA.find(s => s.id === service.id && s !== service);
    if (duplicateId) {
        errors.push(`Duplicate service ID: "${service.id}"`);
    }

    // Keywords validation
    if (service.keywords) {
        const duplicateKeywords = service.keywords.filter((k, i) =>
            service.keywords.indexOf(k) !== i
        );
        if (duplicateKeywords.length > 0) {
            warnings.push(`Duplicate keywords found: ${duplicateKeywords.join(', ')}`);
        }

        const uppercaseKeywords = service.keywords.filter(k => k !== k.toLowerCase());
        if (uppercaseKeywords.length > 0) {
            warnings.push(`Keywords should be lowercase: ${uppercaseKeywords.join(', ')}`);
        }
    }

    // Projects validation
    if (service.projects && service.projects.length > 0) {
        service.projects.forEach((project, index) => {
            const projectResult = validateProject(project, service.id);
            errors.push(...projectResult.errors.map(e => `Project ${index + 1}: ${e}`));
            warnings.push(...projectResult.warnings.map(w => `Project ${index + 1}: ${w}`));
        });
    } else {
        warnings.push('Service has no projects');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
};

/**
 * Validate a project object
 */
export const validateProject = (project: Project, serviceId?: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    if (!project.id) errors.push('Project ID is required');
    if (!project.name) errors.push('Project name is required');
    if (!project.serviceType) errors.push('Project serviceType is required');
    if (!project.description) errors.push('Project description is required');
    if (!project.techStack || project.techStack.length === 0) {
        errors.push('At least one technology in techStack is required');
    }
    if (!project.year) errors.push('Project year is required');

    // ID format
    if (project.id && !/^proj-[a-z0-9-]+$/.test(project.id)) {
        warnings.push(`Project ID "${project.id}" should start with "proj-" and use kebab-case`);
    }

    // Check for duplicate project IDs across all services
    const allProjects = SERVICES_DATA.flatMap(s => s.projects);
    const duplicateId = allProjects.find(p => p.id === project.id && p !== project);
    if (duplicateId) {
        errors.push(`Duplicate project ID: "${project.id}"`);
    }

    // Year validation
    const currentYear = new Date().getFullYear();
    if (project.year && (project.year < 2000 || project.year > currentYear + 1)) {
        warnings.push(`Project year ${project.year} seems unusual (should be between 2000 and ${currentYear + 1})`);
    }

    // Description length
    if (project.description && project.description.length > 300) {
        warnings.push('Project description is quite long (recommended: 1-2 lines, ~150-200 chars)');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
};

/**
 * Validate all services data
 */
export const validateAllServices = (): ValidationResult => {
    const allErrors: string[] = [];
    const allWarnings: string[] = [];

    SERVICES_DATA.forEach((service, index) => {
        const result = validateService(service);
        if (!result.valid) {
            allErrors.push(`Service "${service.title || index}": ${result.errors.join(', ')}`);
        }
        if (result.warnings.length > 0) {
            allWarnings.push(`Service "${service.title || index}": ${result.warnings.join(', ')}`);
        }
    });

    return {
        valid: allErrors.length === 0,
        errors: allErrors,
        warnings: allWarnings
    };
};

/**
 * Helper to create a new service template
 */
export const createServiceTemplate = (id: string, title: string): ServiceItem => {
    return {
        id,
        title,
        keywords: [],
        summary: '',
        projects: []
    };
};

/**
 * Helper to create a new project template
 */
export const createProjectTemplate = (id: string, name: string, serviceType: string): Project => {
    return {
        id,
        name,
        serviceType,
        description: '',
        techStack: [],
        year: new Date().getFullYear()
    };
};

/**
 * Get statistics about the data
 */
export const getDataStats = () => {
    const totalServices = SERVICES_DATA.length;
    const totalProjects = SERVICES_DATA.reduce((sum, s) => sum + s.projects.length, 0);
    const totalKeywords = SERVICES_DATA.reduce((sum, s) => sum + s.keywords.length, 0);
    const uniqueKeywords = new Set(SERVICES_DATA.flatMap(s => s.keywords)).size;
    const allTechStack = SERVICES_DATA.flatMap(s => s.projects.flatMap(p => p.techStack));
    const uniqueTechnologies = new Set(allTechStack).size;
    const years = SERVICES_DATA.flatMap(s => s.projects.map(p => p.year));
    const yearRange = years.length > 0 ? {
        earliest: Math.min(...years),
        latest: Math.max(...years)
    } : null;

    return {
        totalServices,
        totalProjects,
        totalKeywords,
        uniqueKeywords,
        uniqueTechnologies,
        yearRange,
        averageProjectsPerService: (totalProjects / totalServices).toFixed(1),
        averageKeywordsPerService: (totalKeywords / totalServices).toFixed(1)
    };
};
