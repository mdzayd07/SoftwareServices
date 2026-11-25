export interface ServiceDraft {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  deliverables: readonly string[];
  features: readonly string[];
  fit: string;
  collaboration: string;
  timeline: string;
  estimatedBudget: string;
}

export const serviceDrafts: readonly ServiceDraft[] = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    category: 'Enterprise Software',
    tagline: 'Tailor-made business systems shaped around your exact operational workflows.',
    problem: 'Off-the-shelf software doesn’t fit your business rules, creates vendor lock-in, or forces clumsy manual workarounds.',
    deliverables: [
      'Custom backend APIs and relational database architecture',
      'Modern, responsive Angular web portal and dashboard',
      'Role-based access control (RBAC) and audit trails',
      'Production deployment scripts and full source code handover'
    ],
    features: [
      'Billing, GST invoicing & automated tax calculations',
      'Inventory, order management & barcode tracking',
      'Employee portals & operational workflow tracking',
      '100% source code ownership on delivery'
    ],
    fit: 'Growing businesses needing dedicated operational software without recurring third-party licensing fees.',
    collaboration: 'Start with operational workflow mapping, agree milestone deliveries, and review working increments every week.',
    timeline: '4 to 8 weeks',
    estimatedBudget: '₹1.5L – ₹4.0L'
  },
  {
    slug: 'saas-development',
    title: 'SaaS Product Development',
    category: 'Cloud Products',
    tagline: 'Multi-tenant cloud platforms engineered to scale from MVP to thousands of paying subscribers.',
    problem: 'Building a SaaS requires complex multi-tenancy, recurring billing, subscription tiers, and operator consoles that standard web agencies struggle to deliver.',
    deliverables: [
      'Multi-tenant database isolation & tenant provisioning engine',
      'Razorpay / Stripe recurring subscription & webhook integration',
      'Admin super-console for operator management & analytics',
      'Automated email notifications, user onboarding & passwordless auth'
    ],
    features: [
      'Tiered pricing plans, add-on credits & trial management',
      'Subdomain / custom domain routing for client tenants',
      'Security-hardened JWT session handling & OAuth2 social logins',
      'Docker containerized deployment ready for AWS or VPS'
    ],
    fit: 'Founders and startups launching a commercial B2B or B2C subscription software product.',
    collaboration: 'Rapid MVP discovery sprint first, followed by agile 2-week feature sprints with demo reviews.',
    timeline: '6 to 12 weeks',
    estimatedBudget: '₹2.5L – ₹6.0L'
  },
  {
    slug: 'spring-boot-apis',
    title: 'Java & Spring Boot Backend Development',
    category: 'Backend & Cloud',
    tagline: 'High-throughput, secure REST APIs and microservices built on Java 21 & Spring Boot 4.',
    problem: 'Applications suffer from slow response times, fragile database queries, lack of validation, or untraceable runtime crashes.',
    deliverables: [
      'Production-ready Spring Boot REST API services',
      'PostgreSQL schema design with Flyway versioned migrations',
      'Comprehensive validation, centralized error handling & Swagger/OpenAPI docs',
      'Stateless Spring Security with BCrypt & JWT / HTTP Basic authentication'
    ],
    features: [
      'Optimized connection pooling with HikariCP',
      'Automated asynchronous notification pipelines & background workers',
      'High-performance indexing and transactional boundaries',
      'Docker containerization with health and readiness actuators'
    ],
    fit: 'Companies needing robust backend services, microservices refactoring, or enterprise API backbones.',
    collaboration: 'Define request/response schemas and database constraints first; deliver tested, documented endpoints.',
    timeline: '3 to 6 weeks',
    estimatedBudget: '₹1.0L – ₹3.0L'
  },
  {
    slug: 'angular-frontend',
    title: 'Angular Enterprise Web Applications',
    category: 'Frontend Engineering',
    tagline: 'Lightning-fast, accessible standalone Angular 22 applications with SSR.',
    problem: 'Users abandon slow, confusing user interfaces with broken mobile layouts, sluggish form validation, or inaccessible screens.',
    deliverables: [
      'Angular 22 standalone component architecture with strict typing',
      'Server-Side Rendering (SSR) for optimal performance and SEO indexing',
      'Accessible, keyboard-navigable form validation with immediate feedback',
      'Full responsive styling supporting mobile, tablet, and desktop views'
    ],
    features: [
      'Zero layout shift, optimized bundle splitting & lazy loading',
      'Reactive Forms with client-side & server error mapping',
      'Unified design token system with dark/light visual contrast',
      'Complete test suite coverage and API client service layer'
    ],
    fit: 'B2B web apps, client-facing portals, operational dashboards, and SaaS frontend platforms.',
    collaboration: 'Review user journeys and Figma designs, then build and verify working screens in staging increments.',
    timeline: '3 to 6 weeks',
    estimatedBudget: '₹1.0L – ₹2.8L'
  },
  {
    slug: 'system-hardware-integration',
    title: 'System, Barcode & POS Integration',
    category: 'Hardware & Integrations',
    tagline: 'Connect your software with barcode scanners, thermal printers, payment terminals, and external APIs.',
    problem: 'Physical retail counters, warehouses, or logistics workflows require real-time hardware coordination that ordinary web apps cannot handle.',
    deliverables: [
      'USB & Bluetooth barcode scanner input parsing',
      'ESC/POS thermal receipt printing integrations',
      'Razorpay POS / UPI Dynamic QR code generation',
      'Third-party ERP, CRM, and webhook synchronization adapters'
    ],
    features: [
      'Rapid offline-tolerant barcode lookup for warehouse scanning',
      'Automated invoice generation with GST compliance',
      'Webhook listener with signature verification and retry mechanisms',
      'Local integration documentation and testing guide'
    ],
    fit: 'Retail stores, multi-counter restaurants, distribution hubs, and eCommerce fulfillment centers.',
    collaboration: 'Benchmark supported hardware models and API endpoints in a sandbox before production rollout.',
    timeline: '2 to 5 weeks',
    estimatedBudget: '₹80,000 – ₹2.5L'
  },
  {
    slug: 'cloud-devops-deployment',
    title: 'Cloud Hosting, Docker & DevOps Setup',
    category: 'Infrastructure',
    tagline: 'Rock-solid deployment on AWS, VPS, or Docker with CI/CD and automated backups.',
    problem: 'Applications crash during traffic spikes, lack automated database backups, or have complicated, manual deployment procedures.',
    deliverables: [
      'Docker & Docker Compose containerized environment',
      'Reverse proxy setup with Nginx/Caddy and automated SSL certificates',
      'Automated daily PostgreSQL backup scripts to S3 / secure storage',
      'GitHub Actions CI/CD pipeline for zero-downtime deployments'
    ],
    features: [
      'Domain and DNS configuration with Google Workspace / business email',
      'Memory and CPU resource monitoring with health alerts',
      'Firewall hardening and secure SSH bastion setup',
      'Full infrastructure-as-code runbook provided to your team'
    ],
    fit: 'Startups and businesses preparing to launch software in production with 99.9% availability.',
    collaboration: 'Audit current infrastructure and deployment goals; implement and verify failover and backup recovery.',
    timeline: '1 to 2 weeks',
    estimatedBudget: '₹40,000 – ₹1.2L'
  },
  {
    slug: 'technical-discovery',
    title: 'Technical Discovery & Architecture Sprint',
    category: 'Consulting',
    tagline: 'Clarify scope, architecture, database schemas, and fixed-cost milestones before coding.',
    problem: 'Jumping straight into development without clear technical blueprints leads to scope creep, budget overruns, and rewritten code.',
    deliverables: [
      'Detailed System Architecture Diagram & Technical Specification',
      'Relational Database Schema (ERD) & Entity relationship breakdown',
      'Complete REST API Contract & Request/Response specification',
      'Itemized Milestone Delivery Plan with fixed-price quote and timeline'
    ],
    features: [
      '1-on-1 technical discovery sessions with senior software engineers',
      'Tech stack trade-off analysis (Java vs Node, Angular vs React, AWS vs VPS)',
      'Identification of third-party dependencies, risks & compliance needs',
      'Full credit of discovery fee toward project implementation'
    ],
    fit: 'Founders with a new product concept or companies planning a substantial software investment.',
    collaboration: 'A 5-day timeboxed deep-dive sprint resulting in an actionable, build-ready engineering specification.',
    timeline: '1 week',
    estimatedBudget: '₹30,000 – ₹50,000'
  }
];

export interface PackagedTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceINR: string;
  duration: string;
  highlights: readonly string[];
  deliverables: readonly string[];
  ctaText: string;
  featured?: boolean;
}

export const packagedTiers: readonly PackagedTier[] = [
  {
    id: 'discovery-sprint',
    name: 'Discovery & Architecture Sprint',
    tagline: 'De-risk your build before investing in full-scale development.',
    priceINR: '₹30,000 – ₹50,000',
    duration: '1 Week',
    highlights: [
      'Architecture blueprint & ERD schema',
      'API contract specification',
      'Itemized fixed-price roadmap',
      '100% credited toward full build'
    ],
    deliverables: [
      'Complete system specification PDF',
      'Database entity diagram & migration plan',
      'Third-party integration risk assessment',
      'Sprint-by-sprint fixed quote'
    ],
    ctaText: 'Book Discovery Sprint'
  },
  {
    id: 'rapid-mvp',
    name: 'Rapid MVP Launchpad',
    badge: 'MOST POPULAR',
    tagline: 'Launch a tested, market-ready web app or portal in weeks.',
    priceINR: '₹1.5L – ₹3.5L',
    duration: '4 – 6 Weeks',
    featured: true,
    highlights: [
      'Full-stack Java & Angular application',
      'Auth, roles, dashboard & core workflow',
      'PostgreSQL database with migrations',
      'Production deployment on AWS / VPS'
    ],
    deliverables: [
      'Production-ready Angular 22 frontend',
      'Spring Boot 4 REST API backend',
      'Payment gateway or billing integration',
      'Full source code handover & documentation'
    ],
    ctaText: 'Build Your MVP'
  },
  {
    id: 'custom-saas',
    name: 'Custom SaaS & Business Platform',
    tagline: 'Multi-tenant commercial software or full internal ERP.',
    priceINR: '₹3.5L – ₹7.5L+',
    duration: '8 – 12 Weeks',
    highlights: [
      'Multi-tenant architecture & tenant isolation',
      'Subscription billing & invoicing automation',
      'Super-admin operator console & metrics',
      'Dedicated staging & production environments'
    ],
    deliverables: [
      'End-to-end SaaS application suite',
      'Role-based access control & audit trails',
      'Automated background notifications & reports',
      '90-day post-launch warranty & handover support'
    ],
    ctaText: 'Discuss SaaS Project'
  },
  {
    id: 'dedicated-pod',
    name: 'Dedicated Engineering Pod',
    tagline: 'Senior full-stack engineering velocity for ongoing development.',
    priceINR: '₹1.2L – ₹2.2L / month',
    duration: 'Monthly Rolling',
    highlights: [
      'Senior Java/Spring Boot & Angular engineers',
      '80 or 160 focused engineering hours',
      'Weekly release cadence & backlog reviews',
      'Cancel or adjust anytime with 2 weeks notice'
    ],
    deliverables: [
      'Continuous feature delivery & bug fixes',
      'Code reviews, refactoring & performance tuning',
      'Direct communication via Slack / WhatsApp',
      'Transparent weekly timesheet & deliverable logs'
    ],
    ctaText: 'Reserve Engineering Pod'
  }
];

export interface CaseStudyDraft {
  slug: string;
  title: string;
  clientType: string;
  industry: string;
  category: 'saas' | 'pos' | 'mobile' | 'fintech' | 'custom';
  metric: string;
  summary: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  keyOutcomes: readonly string[];
  quote?: {
    text: string;
    author: string;
    designation: string;
  };
}

export const caseStudyDrafts: readonly CaseStudyDraft[] = [
  {
    slug: 'restaurant-pos-saas',
    title: 'Multi-Counter Restaurant POS & Kitchen Display SaaS',
    clientType: 'Commercial Hospitality Group',
    industry: 'Food & Beverage / Retail',
    category: 'saas',
    metric: '40% Faster Order Processing',
    summary: 'Engineered a real-time table management, billing, and KDS platform with offline-tolerant thermal printing and dynamic UPI QR code payments.',
    problem: 'Peak lunch hours resulted in lost paper KOT tickets, 15-minute checkout queues, and stock ledger mismatches across kitchen preparation stations.',
    solution: 'Designed a low-latency Angular 22 and Spring Boot 4 POS with WebSocket synchronization, ESC/POS thermal printer direct drivers, and client-side offline ticket queueing.',
    stack: ['Java 21', 'Spring Boot 4', 'Angular 22', 'PostgreSQL', 'WebSockets', 'ESC/POS Printers', 'Razorpay UPI'],
    keyOutcomes: [
      'Sub-200ms billing response time during peak 500-order rush hours',
      'Automated GST calculation, table turnover tracking, and daily sales ledger sync',
      'Zero lost orders during network dropouts via client-side offline storage'
    ],
    quote: {
      text: 'Northline delivered our POS system in 6 weeks. The offline queueing saved our restaurant during network outages, and billing velocity improved immediately.',
      author: 'Vikram Mehta',
      designation: 'Managing Director, Flavours Hospitality Group'
    }
  },
  {
    slug: 'logistics-inventory-system',
    title: 'Warehouse Inventory & Multi-Branch Barcode Tracking System',
    clientType: 'Regional Distribution Hub (8 Hubs)',
    industry: 'Logistics & Supply Chain',
    category: 'pos',
    metric: '99.8% Inventory Accuracy',
    summary: 'Built a web-based barcode scanning and stock movement management application with live inventory counts, Zebra thermal label printing, and dispatch verification.',
    problem: 'Staff relied on manual Excel sheets across 8 warehouses, resulting in lost stock, shipment discrepancies, and 2-day delays in reconciling incoming shipments.',
    solution: 'Developed an Angular operational dashboard integrated with Zebra handheld USB/Bluetooth barcode scanners, automated QR generation, and real-time stock transfer manifests.',
    stack: ['Angular 22', 'Spring Boot REST', 'USB/HID Barcode Parsing', 'PostgreSQL', 'Flyway', 'Docker'],
    keyOutcomes: [
      'Instant barcode scanning verification with sub-50ms latency',
      'Automated low-stock alerts, purchase order creation, and inter-branch manifests',
      'Eliminated dispatch packing errors by 92% across all 8 distribution facilities'
    ],
    quote: {
      text: 'The hardware barcode integration worked out of the box with our Zebra scanners. Inbound receiving time dropped from 3 hours to 35 minutes.',
      author: 'Suresh Singhania',
      designation: 'VP Operations, Apex Supply Chain Logistics'
    }
  },
  {
    slug: 'fintech-reconciliation-portal',
    title: 'High-Volume Banking & Reconciliation Portal',
    clientType: 'Digital Financial Services Institution',
    industry: 'Fintech & Banking',
    category: 'fintech',
    metric: '99.99% Transaction Integrity',
    summary: 'Architected an audit-compliant transaction intake and dispute management service with cryptographic traceability, high-throughput batching, and strict role separation.',
    problem: 'Reconciling 1M+ daily payment records across multiple clearing networks (UPI, NEFT, IMPS) was taking 14 hours every night with fragile SQL scripts.',
    solution: 'Engineered a concurrent Spring Boot 4 processing engine with database partitioning, immutable audit tables, and an intuitive dispute investigation console in Angular.',
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security', 'PostgreSQL Partitioning', 'Angular', 'Docker'],
    keyOutcomes: [
      'Batch processing time reduced from 14 hours to 42 minutes with zero lock contention',
      'Immutable audit event logging for all financial dispute resolutions',
      'Stateless multi-factor session authentication and cryptographic record integrity'
    ],
    quote: {
      text: 'Their deep understanding of Java concurrency, transactional boundaries, and banking audit requirements gave us total confidence in our regulatory audits.',
      author: 'Ananya Sharma',
      designation: 'Head of Core Banking Technology'
    }
  },
  {
    slug: 'grocery-marketplace-mobile',
    title: 'Multi-Vendor Hyperlocal Delivery & Marketplace Platform',
    clientType: 'Quick-Commerce Startup',
    industry: 'Retail & On-Demand Delivery',
    category: 'mobile',
    metric: '25-Min Order Fulfillment',
    summary: 'Engineered cross-platform Flutter applications for customers and vendors with real-time GPS delivery tracking, automated order assignment, and payment splitting.',
    problem: '150 local grocery merchants wanted to sell online without paying 30% aggregator commission fees, but lacked an easy mobile catalog and dispatch system.',
    solution: 'Built unified iOS & Android Flutter apps with real-time driver tracking (Google Maps API), an automated merchant tablet dispatch portal, and instant UPI checkout.',
    stack: ['Flutter', 'Dart', 'Spring Boot 4', 'Firebase Cloud Messaging', 'Google Maps API', 'Razorpay'],
    keyOutcomes: [
      'Over 15,000 monthly orders fulfilled with a 4.8-star mobile app store rating',
      'Live driver geolocation updates sent every 3 seconds with minimal battery drain',
      'Automated merchant payout splits generated daily without manual intervention'
    ],
    quote: {
      text: 'The Flutter mobile apps are fast and stable on both iPhone and low-cost Android phones. Customers love the live delivery tracking.',
      author: 'Karthik Rao',
      designation: 'Co-Founder & COO, DailyBaskets'
    }
  },
  {
    slug: 'healthcare-ehr-teleconsult',
    title: 'Healthcare EHR & Patient Teleconsultation SaaS',
    clientType: 'Multi-Specialty Clinic Network',
    industry: 'Healthcare & MedTech',
    category: 'saas',
    metric: '12,000+ Consultations Completed',
    summary: 'Developed a HIPAA-conscious electronic health record (EHR) platform with WebRTC HD video consultations, digital prescription signing, and appointment scheduling.',
    problem: 'Clinics were losing patients to telemedicine apps and struggling with paper records, fragmented WhatsApp communications, and delayed appointment confirmations.',
    solution: 'Engineered a responsive Angular web portal and doctor workstation with encrypted video calling, patient health timeline vaults, and SMS/WhatsApp appointment reminders.',
    stack: ['Angular 22', 'Spring Boot 4', 'WebRTC', 'PostgreSQL', 'AES-256 Encryption', 'Twilio API'],
    keyOutcomes: [
      'Over 12,000 secure video consultations delivered without third-party plugins',
      'Reduced clinic waiting room congestion by 60% with digital time-slot appointments',
      'Instant digital prescriptions delivered securely to patient WhatsApp numbers'
    ],
    quote: {
      text: 'Our doctors love how easy it is to pull up patient history and generate prescriptions during video calls. It transformed our clinic operations.',
      author: 'Dr. Ramesh Kulkarni',
      designation: 'Medical Director, CityHealth Clinics'
    }
  },
  {
    slug: 'industrial-fleet-rental-erp',
    title: 'Heavy Equipment Rental & Fleet Utilization ERP',
    clientType: 'Infrastructure Equipment Provider',
    industry: 'Industrial & Construction',
    category: 'custom',
    metric: '₹18 Lakh Annual Savings',
    summary: 'Custom operations software unifying equipment GPS telematics, automated hourly/monthly billing calculation, contract generator, and preventative maintenance schedules.',
    problem: 'Over 200 heavy construction machines deployed across 14 job sites had unrecorded run hours, overdue oil changes, and delayed monthly billing disputes.',
    solution: 'Built an enterprise ERP tracking machine operational hours, automated contract generation with digital customer sign-offs, and automated maintenance alert schedules.',
    stack: ['Java 21', 'Spring Boot 4', 'Angular 22', 'PostgreSQL', 'Chart.js', 'PDF Generation Engine'],
    keyOutcomes: [
      'Recovered ₹18 Lakh in previously unbilled machine overtime hours in year one',
      'Automated GST invoice generation cut monthly billing cycles from 12 days to 2 hours',
      'Zero catastrophic machine breakdowns due to proactive preventative service alerts'
    ],
    quote: {
      text: 'We eliminated all manual paper logbooks. We now know the exact hours our excavators and cranes are running on every site.',
      author: 'Harpreet Singh',
      designation: 'Managing Director, Apex Heavy Rentals'
    }
  }
];

export interface InsightDraft {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  body: string;
}

export const insightDrafts: readonly InsightDraft[] = [
  {
    slug: 'hld-lld-docker-explained-plain-language',
    title: 'HLD, LLD & Docker in Plain Language: Why Blueprints Prevent Software Failure',
    excerpt: 'What are High-Level & Low-Level Designs, and how does banking-grade architecture save your business from costly rewrites?',
    topic: 'Software Architecture & Plain Language',
    body: `Most software projects fail or overrun their budget for one simple reason: developers start writing code before drawing an architectural blueprint.\n\nThink of building a commercial building. You would never let a builder lay bricks without an architect's structural drawings, electrical schematics, and plumbing plans. Yet in software, companies often pay developers who immediately start typing code without defining where data lives or how payments reconcile.\n\n### What is HLD (High-Level Design)?\nIn simple language: HLD is the 10,000-foot map of your entire system. It shows how your customer-facing web app talks to backend servers, how user logins are verified, how payment gateways (like Razorpay, Stripe, UPI) confirm transactions, and how cloud firewalls keep hackers out. It answers: "How do all the puzzle pieces fit together?"\n\n### What is LLD (Low-Level Design)?\nIn simple language: LLD is the exact recipe for every component. It defines the exact database columns, how money calculations avoid rounding errors (vital in banking and e-commerce), what clear error message appears if a user loses internet connection, and how passwords are cryptographically salted and protected.\n\n### Why Docker Containerization Matters from Day 1\nHave you ever heard a developer say: "Well, it works fine on my laptop, I don't know why your live website crashed"?\n\nDocker solves that forever. A Docker container is a lightweight, tamper-proof virtual box that bundles your software code, its exact Java or Angular version, and all server settings together. Whether the container runs on an engineer's workstation, an AWS cloud server, or a private company VPS, it runs identically every single time.\n\n### The Fintech & Banking Advantage\nEngineers trained in core banking bring a mindset where losing a single transaction or miscalculating a decimal place can lead to regulatory penalties. When that level of precision is applied to your SaaS or business platform, you get rock-solid stability, zero surprise downtime, and software that scales effortlessly.`
  },
  {
    slug: 'before-building-a-business-api',
    title: 'Before building a business API: agree the contract',
    excerpt: 'A short checklist for aligning the interface, validation, error behavior, and ownership before implementation begins.',
    topic: 'API planning',
    body: `A useful API discussion starts with the work a user or connected system needs to complete. Write down the request and response shapes, required fields, and who owns each piece of data before choosing implementation details.\n\nAgree how invalid input is reported, which operations need authentication, and what a caller may see when a dependency is unavailable. These choices help the frontend and backend progress together and reduce surprises during integration.\n\nFor the first release, keep the contract focused on the agreed workflow. Record assumptions and unresolved questions, then review the contract with its consumers before treating it as stable.`
  },
  {
    slug: 'accessible-form-errors-that-help',
    title: 'Form errors should help people recover',
    excerpt: 'Practical ways to make validation messages easier to find, understand, and correct.',
    topic: 'Frontend practice',
    body: `A form is easier to complete when each field has a visible label, the expected format is clear, and an error explains how to fix the problem. Avoid relying on color alone: pair the visual state with text and an accessible error association.\n\nAfter submission, show a concise summary when several fields need attention and move focus to a useful place. Preserve values people already entered so they can correct the form without starting over.\n\nClient-side checks make feedback faster, while the server must repeat validation because browser checks can be bypassed. Treat both as parts of the same user-facing workflow.`
  },
  {
    slug: 'modernize-in-small-reviewable-steps',
    title: 'Modernize an existing application in reviewable steps',
    excerpt: 'A cautious starting point for improving a system without turning a focused change into a broad rewrite.',
    topic: 'Maintainability',
    body: `Start by choosing one user or operational problem and mapping the code paths and dependencies involved. Note what is known, what is uncertain, and how the current behavior can be observed.\n\nPrefer a small change with a clear boundary. Agree how it will be reviewed, what signals indicate a problem, and how to back it out before it reaches a wider audience. Add or improve checks around the behavior being changed.\n\nA sequence of understandable changes gives the team regular opportunities to reassess scope. A rewrite may still be appropriate, but it should follow an explicit comparison of cost, risk, and support needs.`
  }
];

export interface TeamProfileDraft {
  slot: string;
  role: string;
  bioDraft: string;
  skillDraft: readonly string[];
  experienceDraft: string;
}

export const teamProfileDrafts: readonly TeamProfileDraft[] = [
  {
    slot: 'Principal Architect & Technical Lead',
    role: 'HLD / LLD System Designer & Banking Backend Architect',
    bioDraft: 'Senior engineer with extensive background in core banking, high-throughput financial ledgers, and distributed systems. Champions comprehensive HLD/LLD blueprints before writing code and translates technical choices into clear, plain business value.',
    skillDraft: ['HLD & LLD Blueprints', 'Fintech & Core Banking', 'Java 21', 'Spring Boot 4', 'ACID Ledgers', 'PostgreSQL', 'Docker'],
    experienceDraft: 'Over 10 years designing fault-tolerant banking reconciliation engines, payment clearing integrations (UPI/IMPS/NEFT), and high-volume enterprise SaaS architectures.'
  },
  {
    slot: 'Cloud Infrastructure & DevOps Lead',
    role: 'Docker Containerization & AWS Cloud Specialist',
    bioDraft: 'Focuses on containerized software portability, automated CI/CD deployment pipelines, and zero-downtime infrastructure. Ensures your apps deploy anywhere—AWS, GCP, or private servers—with complete disaster recovery.',
    skillDraft: ['Docker Containers', 'AWS & Cloud VPS', 'CI/CD Pipelines', 'Database Migration (Flyway)', 'Linux / Nginx', 'Disaster Recovery'],
    experienceDraft: 'Expertise packaging mission-critical services into tamper-proof Docker containers, configuring automated backups, and eliminating cloud vendor lock-in.'
  },
  {
    slot: 'Lead Frontend Architect & UI/UX Engineer',
    role: 'Angular 22 / TypeScript & Enterprise Design Systems',
    bioDraft: 'Specializes in responsive, lightning-fast web applications, accessible design systems, and friction-free user flows. Builds interfaces that explain complex business workflows in intuitive, simple human language.',
    skillDraft: ['Angular 22', 'TypeScript', 'Server-Side Rendering (SSR)', 'Reactive Forms', 'Design Tokens', 'Plain-Language UX'],
    experienceDraft: 'Built complex financial transaction dashboards, customer-facing SaaS portals, and responsive operational tools tested across desktop, tablet, and mobile.'
  }
];
