export interface ServiceDraft {
  slug: string;
  title: string;
  problem: string;
  deliverables: readonly string[];
  fit: string;
  collaboration: string;
}

// These candidate categories come from the PTR and still require owner confirmation.
export const serviceDrafts: readonly ServiceDraft[] = [
  {
    slug: 'custom-web-applications', title: 'Custom web applications',
    problem: 'A team needs a browser-based application shaped around a defined business workflow.',
    deliverables: ['Application structure and core workflows', 'Frontend and backend implementation', 'Persistence and integration boundaries', 'Setup and handover notes'],
    fit: 'Early product work or an internal business application with an agreed first release.',
    collaboration: 'Start with goals and constraints, agree a bounded scope, then review working increments.',
  },
  {
    slug: 'spring-boot-apis', title: 'Spring Boot APIs and backend development',
    problem: 'A product needs backend endpoints, application rules, or a maintainable service layer.',
    deliverables: ['REST API design and implementation', 'Validation and consistent error responses', 'Persistence and migration changes where scoped', 'API and local setup documentation'],
    fit: 'A new backend capability or a clearly scoped change to an existing Java service.',
    collaboration: 'Review current interfaces and constraints first; define compatibility and rollout expectations before implementation.',
  },
  {
    slug: 'angular-frontend', title: 'Angular frontend development',
    problem: 'Users need clear, accessible screens for a business workflow or an existing Angular app needs a focused improvement.',
    deliverables: ['Responsive page and component implementation', 'Form and navigation states', 'Typed API integration within agreed interfaces', 'Keyboard and layout review for delivered screens'],
    fit: 'A new user-facing workflow or a defined frontend backlog in an Angular application.',
    collaboration: 'Confirm user tasks, design inputs, and API contracts before building reviewable screens.',
  },
  {
    slug: 'system-integration', title: 'System integration',
    problem: 'An application needs to exchange data or coordinate a workflow with another system.',
    deliverables: ['Integration boundary and data mapping notes', 'Scoped API or messaging adapter', 'Validation and failure handling', 'Operational and testing notes for the integration'],
    fit: 'A bounded integration where system ownership, access, and interface constraints can be established.',
    collaboration: 'Agree system owners, permitted data, environments, and failure expectations before implementation.',
  },
  {
    slug: 'modernization-maintenance', title: 'Modernization and maintenance',
    problem: 'An existing application needs a targeted improvement, maintenance plan, or incremental modernization.',
    deliverables: ['Review of the agreed code or workflow area', 'Prioritized change plan', 'Scoped fixes or upgrades', 'Change and handover notes'],
    fit: 'A specific maintenance need or modernization step with access and boundaries agreed in advance.',
    collaboration: 'Begin with a limited review; confirm risks, dependencies, and rollback expectations before changes.',
  },
  {
    slug: 'technical-discovery', title: 'Technical discovery and architecture review',
    problem: 'A team needs to clarify technical options and delivery boundaries before committing to implementation.',
    deliverables: ['Goals, constraints, and assumptions summary', 'Options and trade-offs', 'Initial scope or sequence proposal', 'Open questions and next-step estimate inputs'],
    fit: 'A project with unresolved scope, architecture, dependencies, or delivery sequencing.',
    collaboration: 'A time-boxed discussion and review of information the owner is authorized to share.',
  },
];

export interface InsightDraft {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  body: string;
}

// Original starter copy for owner review. These are not presented as published team expertise.
export const insightDrafts: readonly InsightDraft[] = [
  {
    slug: 'before-building-a-business-api',
    title: 'Before building a business API: agree the contract',
    excerpt: 'A short checklist for aligning the interface, validation, error behavior, and ownership before implementation begins.',
    topic: 'API planning',
    body: `A useful API discussion starts with the work a user or connected system needs to complete. Write down the request and response shapes, required fields, and who owns each piece of data before choosing implementation details.\n\nAgree how invalid input is reported, which operations need authentication, and what a caller may see when a dependency is unavailable. These choices help the frontend and backend progress together and reduce surprises during integration.\n\nFor the first release, keep the contract focused on the agreed workflow. Record assumptions and unresolved questions, then review the contract with its consumers before treating it as stable.`,
  },
  {
    slug: 'accessible-form-errors-that-help',
    title: 'Form errors should help people recover',
    excerpt: 'Practical ways to make validation messages easier to find, understand, and correct.',
    topic: 'Frontend practice',
    body: `A form is easier to complete when each field has a visible label, the expected format is clear, and an error explains how to fix the problem. Avoid relying on color alone: pair the visual state with text and an accessible error association.\n\nAfter submission, show a concise summary when several fields need attention and move focus to a useful place. Preserve values people already entered so they can correct the form without starting over.\n\nClient-side checks make feedback faster, while the server must repeat validation because browser checks can be bypassed. Treat both as parts of the same user-facing workflow.`,
  },
  {
    slug: 'modernize-in-small-reviewable-steps',
    title: 'Modernize an existing application in reviewable steps',
    excerpt: 'A cautious starting point for improving a system without turning a focused change into a broad rewrite.',
    topic: 'Maintainability',
    body: `Start by choosing one user or operational problem and mapping the code paths and dependencies involved. Note what is known, what is uncertain, and how the current behavior can be observed.\n\nPrefer a small change with a clear boundary. Agree how it will be reviewed, what signals indicate a problem, and how to back it out before it reaches a wider audience. Add or improve checks around the behavior being changed.\n\nA sequence of understandable changes gives the team regular opportunities to reassess scope. A rewrite may still be appropriate, but it should follow an explicit comparison of cost, risk, and support needs.`,
  },
];

export interface TeamProfileDraft {
  slot: string;
  role: string;
  bioDraft: string;
  skillDraft: readonly string[];
  experienceDraft: string;
}

// These are editable role/profile slots, not claims about the real roster or team size.
export const teamProfileDrafts: readonly TeamProfileDraft[] = [
  {
    slot: 'Add approved team member name',
    role: 'Proposed role · Java / Spring Boot backend',
    bioDraft: 'Draft bio: contributes to backend application design and implementation, including APIs, validation, persistence, and clear technical handover. Replace this with the person’s approved background and responsibilities.',
    skillDraft: ['Java', 'Spring Boot', 'REST API design', 'Data validation', 'Relational data'],
    experienceDraft: 'Candidate domain areas to verify with this person: transaction-oriented workflows, integration boundaries, audit trails, and controlled change. No individual project history has been supplied.',
  },
  {
    slot: 'Add approved team member name',
    role: 'Proposed role · Angular / frontend',
    bioDraft: 'Draft bio: contributes to responsive application screens, user workflows, forms, and frontend integration. Replace this with the person’s approved background and responsibilities.',
    skillDraft: ['Angular', 'TypeScript', 'Responsive interfaces', 'Accessible forms', 'API integration'],
    experienceDraft: 'Candidate domain areas to verify with this person: role-based workflows, data validation, and user-facing operational screens. No individual project history has been supplied.',
  },
  {
    slot: 'Add approved team member name',
    role: 'Proposed role · integration / delivery',
    bioDraft: 'Draft bio: contributes to system boundaries, integration behavior, testing, delivery planning, and maintainable handover. Replace this with the person’s approved background and responsibilities.',
    skillDraft: ['System integration', 'Testing', 'Technical discovery', 'Operational readiness', 'Change planning'],
    experienceDraft: 'Candidate domain areas to verify with this person: integration controls, operational reliability, and traceability. No individual project history has been supplied.',
  },
];
