# PTR coverage status

Reference: `Java_Full_Stack_Services_Website_PTR.md`, version 1.0 (21 November 2026).

This is an implementation status report, not a change to the PTR. All draft copy stays non-indexable until reviewed and approved.

## Current status

| PTR area | Status | Current implementation / remaining work |
|---|---|---|
| Phase 1 foundation | Partial | Angular 22 with SSR, Spring Boot 4.2 / Java 17, PostgreSQL configuration, Flyway schema, and health endpoints exist. A safe environment template and local API proxy are added. CI and deployment configuration remain. PostgreSQL is not running in the current environment. |
| FR-01 public shell and navigation | Partial | Shared header/footer, responsive layout, keyboard focus styling, and a mobile menu button are implemented. Full keyboard, zoom/reflow, contrast, and accessibility review remains. |
| FR-02 service/article routes | Partial | Public route templates and deliberate not-found handling exist. Six proposed service routes include draft details. Admin-managed published services and articles are exposed via public APIs and displayed in the frontend. Slug redirects remain. |
| Home and services pages | Partial | Home positioning, service previews, delivery approach, draft pricing/capacity, and service detail templates exist. Business claims, service offer, pricing, and capacity are unconfirmed. The PTR default is no public rates in MVP; the displayed rates are a user-authorized draft for review and must not be treated as approved public pricing. |
| Banking domain experience | Draft content | General workflow, access, traceability, and change considerations are described, with role-based profile slots and candidate experience wording clearly marked for verification. |
| About | Draft content | Working name, proposed services-team positioning, delivery approach, legal-entity confirmation field, and editable role/profile slots are present. Names and individual histories remain unfilled until confirmed by the people concerned. |
| Insights | Draft content | Three original starter articles cover API planning, accessible form errors, and incremental modernization. They are visibly marked editorial drafts; published CMS articles can replace them. |
| Contact and FR-03/04 | Implemented, pending local DB/mail setup | Accessible client/server validation, consent, honeypot, IP throttling, durable lead insert, generic confirmation, and best-effort SMTP notification are implemented. Mail failure leaves the lead stored. PostgreSQL is needed for storage. |
| FR-05/06/07 admin and CMS | Partial | Admin sign-in, protected API, lead inbox/status, service/article/FAQ editing, preview, publish/archive, allowlisted site settings, and audit events exist. Use HTTPS in deployment; full security review and recovery process remain. |
| FR-08/09 SEO and analytics | Partial | Site-wide `noindex, nofollow` is intentionally present for the draft. Per-route metadata is basic. Canonical/OG metadata, sitemap, published-content indexing rules, redirects, and consent-aware analytics are not implemented. |
| FR-10 health | Partial | Liveness/readiness endpoints are present. Production monitoring and deployment configuration remain. |
| Legal pages and privacy | Draft content | Provisional privacy and terms outlines describe the enquiry flow and known open items without claiming legal compliance. Owner/legal review, jurisdiction, processor details, and final language remain required. |
| Release hardening | Not implemented | Security review, backups/restore, monitoring, performance, accessibility, browser matrix, deployment, and rollback preparation remain. |

## Decisions needed from the owner

- Confirm the working/business name, legal entity, geography, team roster, and what experience each person may disclose.
- Confirm which proposed services are actually offered, team capacity, pricing, and engagement terms.
- Confirm the response expectation and the 90-day lead-retention assumption.
- Configure a private administrator password and recovery process; production must use HTTPS.
- Configure a real SMTP provider, confirm privacy jurisdiction, and decide whether analytics will be used.
- Confirm hosting, domain, deployment owner, and production origins.
- Approve privacy/terms and all public copy before removing `noindex` or launching publicly.

## Verification completed

- Angular production build completed successfully after contact, admin, and content management changes.
- Backend Java 17 compilation completed successfully; automated tests have not been run.
- Local frontend preview is running at `http://localhost:4200/`. PostgreSQL and the API are not running in the current environment.
