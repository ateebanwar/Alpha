import {
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Cloud,
  Shield,
  Zap,
  Users,
  Clock,
  Award,
  Mail,
  MapPin,
  Briefcase,
  Layers,
  GitBranch,
  Terminal,
  Cpu,
  MonitorSmartphone,
  Palette,
  Settings,
  HeartHandshake
} from "lucide-react";

export interface CircleData {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  size: "sm" | "md" | "lg" | "xl";
  color: "primary" | "accent" | "muted";
  category: "service" | "tech" | "about" | "contact" | "process";
  content: {
    title: string;
    description: string;
    items?: { label: string; description?: string; icon?: React.ComponentType<{ className?: string }> }[];
  };
  delay?: number;
}

export const circleData: CircleData[] = [
  // About Section
  {
    id: "about",
    label: "About Us",
    icon: Users,
    size: "xl",
    color: "primary",
    category: "about",
    delay: 0,
    content: {
      title: "About Alphabet Consultancy ",
      description: "Transforming businesses through innovative technology solutions since 2016.",
      items: [
        { label: "8+ Years Experience", description: "Delivering excellence in IT consulting", icon: Clock },
        { label: "Global Reach", description: "Serving UK and international clients", icon: Globe },
        { label: "Expert Team", description: "Skilled professionals across all domains", icon: Users },
        { label: "Trusted Partner", description: "Building lasting client relationships", icon: HeartHandshake },
      ]
    }
  },
  {
    id: "experience",
    label: "Experience",
    icon: Award,
    size: "lg",
    color: "accent",
    category: "about",
    delay: 0.1,
    content: {
      title: "Our Experience",
      description: "Years of expertise across diverse industries and technologies.",
      items: [
        { label: "150+ Projects", description: "Successfully delivered" },
        { label: "50+ Clients", description: "Worldwide partnerships" },
        { label: "24/7 Support", description: "Always available" },
        { label: "99.9% Uptime", description: "Reliability guaranteed" },
      ]
    }
  },

  // Services Section
  {
    id: "web-dev",
    label: "Web Development",
    icon: Globe,
    size: "lg",
    color: "primary",
    category: "service",
    delay: 0.2,
    content: {
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies.",
      items: [
        { label: "React & Next.js", icon: Code2 },
        { label: "Progressive Web Apps", icon: MonitorSmartphone },
        { label: "E-commerce Solutions", icon: Briefcase },
        { label: "Custom CMS", icon: Layers },
      ]
    }
  },
  {
    id: "mobile-dev",
    label: "Mobile Apps",
    icon: Smartphone,
    size: "md",
    color: "accent",
    category: "service",
    delay: 0.3,
    content: {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      items: [
        { label: "React Native", icon: Smartphone },
        { label: "iOS Development", icon: Cpu },
        { label: "Android Apps", icon: Smartphone },
        { label: "Flutter", icon: Palette },
      ]
    }
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    size: "lg",
    color: "primary",
    category: "service",
    delay: 0.15,
    content: {
      title: "Backend Development",
      description: "Robust, scalable server-side solutions and APIs.",
      items: [
        { label: "Node.js & Express", icon: Terminal },
        { label: "Python & Django", icon: Code2 },
        { label: "RESTful APIs", icon: GitBranch },
        { label: "GraphQL", icon: Layers },

      ]
    }
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    size: "md",
    color: "muted",
    category: "service",
    delay: 0.25,
    content: {
      title: "Database Management",
      description: "Efficient data storage, optimization, and management solutions.",
      items: [
        { label: "PostgreSQL", icon: Database },
        { label: "MongoDB", icon: Database },
        { label: "Redis Caching", icon: Zap },
        { label: "Data Migration", icon: GitBranch },
      ]
    }
  },
  {
    id: "cloud",
    label: "Cloud Services",
    icon: Cloud,
    size: "lg",
    color: "accent",
    category: "tech",
    delay: 0.35,
    content: {
      title: "Cloud Services",
      description: "Cloud infrastructure setup, migration, and management.",
      items: [
        { label: "AWS Solutions", icon: Cloud },
        { label: "Azure Services", icon: Cloud },
        { label: "Google Cloud", icon: Cloud },
        { label: "DevOps & CI/CD", icon: Settings },
      ]
    }
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    size: "md",
    color: "primary",
    category: "tech",
    delay: 0.4,
    content: {
      title: "Cybersecurity",
      description: "Protecting your digital assets with enterprise-grade security.",
      items: [
        { label: "Security Audits", icon: Shield },
        { label: "Penetration Testing", icon: Terminal },
        { label: "SSL & Encryption", icon: Shield },
        { label: "Compliance", icon: Award },
      ]
    }
  },

  // Technology Section
  {
    id: "frontend-tech",
    label: "Frontend",
    icon: Palette,
    size: "md",
    color: "accent",
    category: "tech",
    delay: 0.45,
    content: {
      title: "Frontend Technologies",
      description: "Modern UI frameworks and libraries we excel in.",
      items: [
        { label: "React.js" },
        { label: "Vue.js" },
        { label: "TypeScript" },
        { label: "Tailwind CSS" },
      ]
    }
  },
  {
    id: "backend-tech",
    label: "Backend Tech",
    icon: Terminal,
    size: "md",
    color: "muted",
    category: "tech",
    delay: 0.5,
    content: {
      title: "Backend Technologies",
      description: "Powerful server-side technologies for robust applications.",
      items: [
        { label: "Node.js" },
        { label: "Python" },
        { label: "Java" },
        { label: "Go" },
      ]
    }
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Settings,
    size: "sm",
    color: "primary",
    category: "tech",
    delay: 0.55,
    content: {
      title: "DevOps & Automation",
      description: "Streamline your development and deployment processes.",
      items: [
        { label: "Docker" },
        { label: "Kubernetes" },
        { label: "Jenkins" },
        { label: "GitHub Actions" },
      ]
    }
  },

  // Process Section
  {
    id: "process",
    label: "Our Process",
    icon: Layers,
    size: "lg",
    color: "primary",
    category: "process",
    delay: 0.6,
    content: {
      title: "Our Development Process",
      description: "A streamlined approach to delivering exceptional results.",
      items: [
        { label: "Discovery", description: "Understanding your needs" },
        { label: "Planning", description: "Strategic roadmap creation" },
        { label: "Development", description: "Agile implementation" },
        { label: "Delivery", description: "Launch & ongoing support" },
      ]
    }
  },
  {
    id: "support",
    label: "Support",
    icon: HeartHandshake,
    size: "md",
    color: "accent",
    category: "process",
    delay: 0.65,
    content: {
      title: "Ongoing Support",
      description: "We're with you every step of the way, even after launch.",
      items: [
        { label: "24/7 Monitoring" },
        { label: "Regular Updates" },
        { label: "Performance Optimization" },
        { label: "Dedicated Account Manager" },
      ]
    }
  },

  // Contact Section
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    size: "lg",
    color: "primary",
    category: "contact",
    delay: 0.7,
    content: {
      title: "Get In Touch",
      description: "Ready to transform your business? Let's talk.",
      items: [
        { label: "hello@alphabetconsultancy.com", icon: Mail },
        { label: "United Kingdom", icon: MapPin },
        { label: "Schedule a Call", icon: Clock },
        { label: "Start a Project", icon: Briefcase },
      ]
    }
  },
  {
    id: "location",
    label: "Location",
    icon: MapPin,
    size: "sm",
    color: "muted",
    category: "contact",
    delay: 0.75,
    content: {
      title: "Our Location",
      description: "Headquartered in the UK, serving clients globally.",
      items: [
        { label: "London, UK", description: "Headquarters" },
        { label: "Remote-First", description: "Global team" },
      ]
    }
  },

  // Additional decorative/smaller circles
  {
    id: "api",
    label: "APIs",
    icon: GitBranch,
    size: "sm",
    color: "accent",
    category: "tech",
    delay: 0.8,
    content: {
      title: "API Development",
      description: "Custom API solutions for seamless integrations.",
      items: [
        { label: "REST APIs" },
        { label: "GraphQL" },
        { label: "Webhooks" },
        { label: "Third-party Integrations" },
        { label: "REST APIs" },
        { label: "GraphQL" },
        { label: "Webhooks" },
        { label: "Third-party Integrations" },
        { label: "REST APIs" },
        { label: "GraphQL" },
        { label: "Webhooks" },
        { label: "Third-party Integrations" },
      ]
    }
  },
  {
    id: "performance",
    label: "Performance",
    icon: Zap,
    size: "sm",
    color: "primary",
    category: "service",
    delay: 0.85,
    content: {
      title: "Performance Optimization",
      description: "Make your applications lightning fast.",
      items: [
        { label: "Load Time Optimization" },
        { label: "Caching Strategies" },
        { label: "CDN Setup" },
        { label: "Code Optimization" },
      ]
    }
  },
  {
    id: "consulting",
    label: "Consulting",
    icon: Briefcase,
    size: "md",
    color: "primary",
    category: "service",
    delay: 0.9,
    content: {
      title: "IT Consulting",
      description: "Strategic technology guidance for your business.",
      items: [
        { label: "Technology Assessment" },
        { label: "Digital Strategy" },
        { label: "Architecture Design" },
        { label: "Team Augmentation" },
      ]
    }
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    icon: Cpu,
    size: "md",
    color: "accent",
    category: "tech",
    delay: 0.95,
    content: {
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by cutting-edge AI.",
      items: [
        { label: "Machine Learning Models" },
        { label: "Natural Language Processing" },
        { label: "Computer Vision" },
        { label: "Predictive Analytics" },
      ]
    }
  },

  // Additional circles for richer layout
  {
    id: "ui-ux",
    label: "UI/UX Design",
    icon: Palette,
    size: "md",
    color: "primary",
    category: "service",
    delay: 1.0,
    content: {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love.",
      items: [
        { label: "User Research" },
        { label: "Wireframing & Prototyping" },
        { label: "Visual Design" },
        { label: "Usability Testing" },
      ]
    }
  },
  {
    id: "automation",
    label: "Automation",
    icon: Settings,
    size: "sm",
    color: "accent",
    category: "tech",
    delay: 1.05,
    content: {
      title: "Process Automation",
      description: "Streamline workflows and reduce manual effort.",
      items: [
        { label: "Workflow Automation" },
        { label: "CI/CD Pipelines" },
        { label: "Testing Automation" },
        { label: "Infrastructure as Code" },
      ]
    }
  },
  {
    id: "data",
    label: "Data",
    icon: Layers,
    size: "sm",
    color: "muted",
    category: "tech",
    delay: 1.1,
    content: {
      title: "Data Solutions",
      description: "Turn your data into actionable insights.",
      items: [
        { label: "Data Analytics" },
        { label: "ETL Pipelines" },
        { label: "Business Intelligence" },
        { label: "Data Visualization" },
      ]
    }
  },
  {
    id: "integration",
    label: "Integration",
    icon: GitBranch,
    size: "sm",
    color: "primary",
    category: "service",
    delay: 1.15,
    content: {
      title: "System Integration",
      description: "Connect your systems for seamless data flow.",
      items: [
        { label: "API Integration" },
        { label: "Legacy Modernization" },
        { label: "Third-party Connectors" },
        { label: "Enterprise Systems" },
      ]
    }
  },
  {
    id: "training",
    label: "Training",
    icon: Award,
    size: "sm",
    color: "accent",
    category: "process",
    delay: 1.2,
    content: {
      title: "Training & Workshops",
      description: "Empower your team with expert knowledge.",
      items: [
        { label: "Technical Workshops" },
        { label: "Team Upskilling" },
        { label: "Best Practices" },
        { label: "Documentation" },
      ]
    }
  },
];
