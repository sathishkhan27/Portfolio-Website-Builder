import { PortfolioData } from '../types/portfolio';

export const defaultPortfolio: PortfolioData = {
  id: 'portfolio-default-01',
  version: '1.0.0',
  lastModified: new Date().toISOString(),
  personal: {
    fullName: 'Alex Mercer',
    headline: 'Principal Software Architect & Full-Stack AI Engineer',
    tagline: 'Designing high-throughput distributed systems & generative AI platforms at global scale.',
    email: 'alex.mercer@devforge.io',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA (Open to Remote)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    avatarFallback: 'AM',
    availabilityStatus: 'available',
    availabilityText: 'Available for high-impact Staff/Lead Roles & Advisory',
    yearsOfExperience: 10,
  },
  about: {
    summary: 'Senior engineering leader and full-stack technologist with 10+ years specializing in distributed systems, modern web engineering, and enterprise AI orchestration.',
    storyParagraphs: [
      'Over the last decade, I have led engineering teams from seed-stage velocity to Series C scale, designing reliable systems that serve millions of daily active users.',
      'My passion lies at the intersection of developer experience, high-performance web frontends, and reliable AI agent infrastructures. I believe great software is born from clear abstractions, fast feedback loops, and deep empathy for the end user.',
      'When not architecting cloud infrastructure or refining reactive UIs, I mentor emerging engineers, contribute to open-source developer tooling, and write technical deep-dives on distributed consensus.'
    ],
    highlights: [
      'Architected microservices handling 45,000+ RPS with sub-40ms P99 latency',
      'Scaled engineering org from 4 to 38 engineers while maintaining high team velocity',
      'Pioneered internal autonomous AI agent framework reducing customer onboarding by 65%',
      'Active maintainer of 3 popular open-source TypeScript libraries with 500K+ monthly downloads'
    ],
    metrics: [
      { id: 'm1', label: 'Years Experience', value: '10+', description: 'End-to-end full-stack & architecture' },
      { id: 'm2', label: 'Production Apps Shipped', value: '42+', description: 'Enterprise and consumer products' },
      { id: 'm3', label: 'RPS Sustained', value: '50K+', description: 'P99 latency under 40ms' },
      { id: 'm4', label: 'Open Source Stars', value: '12K+', description: 'Across developer ecosystem tools' }
    ]
  },
  skills: [
    {
      id: 'cat-frontend',
      name: 'Frontend & Web Platforms',
      skills: [
        { id: 's1', name: 'React 19 & Next.js', level: 98, category: 'cat-frontend', years: 8 },
        { id: 's2', name: 'TypeScript & JavaScript', level: 96, category: 'cat-frontend', years: 9 },
        { id: 's3', name: 'Tailwind CSS & CSS Systems', level: 95, category: 'cat-frontend', years: 6 },
        { id: 's4', name: 'Web Performance & Core Vitals', level: 92, category: 'cat-frontend', years: 7 },
        { id: 's5', name: 'State Management (Zustand/Redux)', level: 94, category: 'cat-frontend', years: 8 },
      ]
    },
    {
      id: 'cat-backend',
      name: 'Backend & Cloud Infrastructure',
      skills: [
        { id: 's6', name: 'Node.js & Go', level: 92, category: 'cat-backend', years: 8 },
        { id: 's7', name: 'PostgreSQL & Redis', level: 90, category: 'cat-backend', years: 9 },
        { id: 's8', name: 'GraphQL & REST APIs', level: 95, category: 'cat-backend', years: 8 },
        { id: 's9', name: 'Docker & Kubernetes', level: 88, category: 'cat-backend', years: 6 },
        { id: 's10', name: 'AWS & Google Cloud', level: 90, category: 'cat-backend', years: 7 },
      ]
    },
    {
      id: 'cat-ai',
      name: 'AI Engineering & LLM Orchestration',
      skills: [
        { id: 's11', name: 'Autonomous Agent Frameworks', level: 90, category: 'cat-ai', years: 3 },
        { id: 's12', name: 'RAG & Vector Databases (Pinecone/pgvector)', level: 88, category: 'cat-ai', years: 3 },
        { id: 's13', name: 'LangChain & LlamaIndex', level: 86, category: 'cat-ai', years: 2 },
        { id: 's14', name: 'Prompt Engineering & Fine-tuning', level: 90, category: 'cat-ai', years: 3 },
      ]
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Staff Software Architect & Lead',
      company: 'Aether Cloud Systems',
      companyUrl: 'https://example.com',
      location: 'San Francisco, CA',
      type: 'Full-time',
      startDate: '2022-04',
      current: true,
      description: 'Head of core platform architecture leading a team of 16 engineers across real-time collaborative services and distributed state storage.',
      achievements: [
        'Migrated monolithic data layer into event-driven architecture, reducing infrastructure cloud costs by 38% ($420K/yr)',
        'Championed transition to React Server Components and microfrontends, dropping bundle sizes by 44%',
        'Established multi-region disaster recovery pipeline achieving 99.995% service uptime'
      ],
      technologies: ['TypeScript', 'Next.js', 'Go', 'PostgreSQL', 'Kafka', 'Kubernetes', 'Terraform']
    },
    {
      id: 'exp-2',
      role: 'Senior Full-Stack Engineer',
      company: 'OmniStream Media',
      companyUrl: 'https://example.com',
      location: 'New York, NY',
      type: 'Full-time',
      startDate: '2019-06',
      endDate: '2022-03',
      current: false,
      description: 'Spearheaded frontend and API development for real-time video telemetry and high-concurrency streaming dashboards.',
      achievements: [
        'Built real-time analytics streaming engine handling 2M+ telemetry events per minute',
        'Led team adoption of automated E2E testing, reducing production deployment regression rate by 70%',
        'Mentored 8 mid-level engineers into senior technical leadership roles'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Redis', 'WebSockets', 'AWS Lambda', 'GraphQL']
    },
    {
      id: 'exp-3',
      role: 'Software Engineer',
      company: 'Nexus Labs',
      companyUrl: 'https://example.com',
      location: 'Austin, TX',
      type: 'Full-time',
      startDate: '2016-08',
      endDate: '2019-05',
      current: false,
      description: 'Developed developer-focused SaaS analytics portals and payment processing microservices.',
      achievements: [
        'Integrated Stripe Billing & marketplace escrow pipeline processing $15M+ annually',
        'Rewrote core client dashboards resulting in a 4.2x increase in page load performance'
      ],
      technologies: ['React', 'JavaScript', 'Python', 'PostgreSQL', 'Docker', 'Stripe API']
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Master of Science (M.S.)',
      fieldOfStudy: 'Computer Science (Distributed Systems)',
      startDate: '2014',
      endDate: '2016',
      grade: '3.92 GPA',
      activities: 'Lead Graduate Research Assistant, Parallel Computing Lab'
    },
    {
      id: 'edu-2',
      institution: 'University of Michigan',
      degree: 'Bachelor of Science (B.S.)',
      fieldOfStudy: 'Computer Engineering',
      startDate: '2010',
      endDate: '2014',
      grade: 'Magna Cum Laude',
      activities: 'President of ACM Chapter, Robotics Team Lead'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'HyperScale AI - Agent Workflows',
      shortDescription: 'Autonomous multi-agent orchestration engine for automated codebase refactoring and CI/CD self-healing.',
      fullDescription: 'An enterprise-grade autonomous agent platform that inspects repository PRs, diagnoses compile-time errors, benchmarks execution time, and autonomously suggests production-ready patches using AST transforms.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      tags: ['TypeScript', 'React', 'Go', 'LLMs', 'Vector DB', 'WebSockets'],
      liveUrl: 'https://hyperscale-ai-demo.dev',
      githubUrl: 'https://github.com/example/hyperscale-ai',
      featured: true,
      role: 'Creator & Lead Architect',
      impact: 'Used by 1,400+ engineering teams, saving 12,000+ developer hours monthly'
    },
    {
      id: 'proj-2',
      title: 'PulseDB - Real-time Edge Database',
      shortDescription: 'Sub-millisecond distributed in-memory cache and key-value datastore optimized for edge workers.',
      fullDescription: 'Engineered a lightweight edge store with active CRDT sync, allowing global replicas to resolve concurrent updates in under 20 milliseconds across 32 Cloudflare POPs.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      tags: ['Rust', 'WebAssembly', 'TypeScript', 'Edge Compute', 'CRDTs'],
      liveUrl: 'https://pulsedb.dev',
      githubUrl: 'https://github.com/example/pulsedb',
      featured: true,
      role: 'Core Author',
      impact: '5,200 GitHub Stars, P99 sync time under 18ms'
    },
    {
      id: 'proj-3',
      title: 'SaaSForge - Developer Boilerplate Platform',
      shortDescription: 'Next.js 15 & Supabase production boilerplate with multi-tenancy, Stripe billing, and enterprise auth.',
      fullDescription: 'Comprehensive developer starter kit providing turnkey RBAC permissions, audit logs, team invites, metered billing, and accessible component library.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
      liveUrl: 'https://saasforge-starter.io',
      githubUrl: 'https://github.com/example/saasforge',
      featured: false,
      role: 'Full-Stack Developer',
      impact: 'Over 8,000 projects created worldwide'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2023-08',
      expiryDate: '2026-08',
      credentialId: 'AWS-PSA-8829104',
      credentialUrl: 'https://aws.amazon.com/verification',
      badgeUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'cert-2',
      name: 'Google Cloud Professional Cloud Architect',
      issuer: 'Google Cloud',
      issueDate: '2023-01',
      expiryDate: '2025-01',
      credentialId: 'GCP-PCA-994120',
      credentialUrl: 'https://cloud.google.com/certification',
      badgeUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Global Hackathon Winner - 1st Place',
      issuer: 'TechCrunch Disrupt Hackathon',
      date: '2023-09',
      description: 'Awarded 1st place among 450 teams for developing an automated zero-knowledge identity validation system.',
      url: 'https://techcrunch.com'
    },
    {
      id: 'ach-2',
      title: 'Keynote Speaker: Building Resilient Edge Systems',
      issuer: 'QCon San Francisco',
      date: '2022-11',
      description: 'Delivered technical keynote to 1,200 attendees on CRDT replication patterns and edge worker optimization.',
      url: 'https://qconsf.com'
    }
  ],
  services: [
    {
      id: 'srv-1',
      title: 'Full-Stack Architecture & Development',
      description: 'End-to-end design and implementation of modern web apps with React, TypeScript, scalable APIs, and automated CI/CD.',
      iconName: 'Code',
      tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'GraphQL']
    },
    {
      id: 'srv-2',
      title: 'Enterprise AI & LLM Systems Integration',
      description: 'Custom implementation of autonomous agents, vector retrieval pipelines, guardrails, and fine-tuned AI workflows.',
      iconName: 'Cpu',
      tags: ['LangChain', 'Vector Search', 'Multi-Agent', 'OpenAI/Anthropic']
    },
    {
      id: 'srv-3',
      title: 'Cloud Scalability & Performance Audits',
      description: 'Diagnostic performance tuning, database optimization, caching architecture, and cloud infrastructure cost reduction.',
      iconName: 'Zap',
      tags: ['AWS', 'Kubernetes', 'P99 Latency', 'Cost Reduction']
    }
  ],
  socials: [
    { id: 'soc-1', platform: 'github', url: 'https://github.com', label: 'GitHub' },
    { id: 'soc-2', platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { id: 'soc-3', platform: 'twitter', url: 'https://x.com', label: 'X (Twitter)' },
    { id: 'soc-4', platform: 'email', url: 'mailto:alex.mercer@devforge.io', label: 'Email' },
  ],
  contact: {
    email: 'alex.mercer@devforge.io',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA & Worldwide Remote',
    officeHours: 'Mon - Fri: 9:00 AM - 6:00 PM PST',
    calendarUrl: 'https://calendly.com',
    socialMessage: 'Feel free to connect or book a consultation call. I usually respond within 24 hours.'
  },
  resume: {
    fileName: 'Alex_Mercer_Principal_Architect_Resume.pdf',
    downloadUrl: '#',
    viewUrl: '#',
    lastUpdated: 'Updated September 2026'
  },
  seo: {
    metaTitle: 'Alex Mercer | Principal Software Architect & Full-Stack AI Engineer',
    metaDescription: 'Portfolio of Alex Mercer, Senior Engineering Leader specializing in modern web platforms, distributed systems, and enterprise generative AI.',
    keywords: ['Software Architect', 'Full Stack Developer', 'React 19', 'TypeScript', 'AI Engineer', 'Distributed Systems'],
    author: 'Alex Mercer'
  },
  sections: [
    { key: 'hero', label: 'Hero & Introduction', enabled: true, order: 1 },
    { key: 'about', label: 'About Me & Story', enabled: true, order: 2 },
    { key: 'skills', label: 'Skills & Tech Stack', enabled: true, order: 3 },
    { key: 'experience', label: 'Work Experience', enabled: true, order: 4 },
    { key: 'projects', label: 'Featured Projects', enabled: true, order: 5 },
    { key: 'services', label: 'Services & Advisory', enabled: true, order: 6 },
    { key: 'education', label: 'Education', enabled: true, order: 7 },
    { key: 'certifications', label: 'Certifications', enabled: true, order: 8 },
    { key: 'achievements', label: 'Achievements & Talks', enabled: true, order: 9 },
    { key: 'contact', label: 'Contact & Let\'s Talk', enabled: true, order: 10 },
  ]
};
