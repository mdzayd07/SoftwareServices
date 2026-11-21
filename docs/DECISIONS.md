# Phase 1 decisions

## Approved starting defaults

- Angular frontend with server-side rendering for public pages.
- Java with Spring Boot backend, using Maven.
- PostgreSQL relational database.
- One named administrator using secure server-side sessions. The identity provider and sign-in flow remain undecided and are not implemented.
- No hosting provider and no approved public business claims.

## Version baseline

- Angular 22; exact compatible package versions are pinned in `frontend/package.json`.
- Spring Boot 4.2.0 and Java 17.
- PostgreSQL 16 as the local development baseline.

## Current implementation state

- Phase 1 structure and database migration have been drafted.
- Phase 2 public routes and placeholder page templates have been added. Proposed service categories are copied from the PTR and remain unconfirmed.
- The whole frontend currently carries `noindex, nofollow`; remove that only after approved content and deployment metadata are ready.
- Contact intake, service/article persistence, admin authentication, analytics, and legal publication are not active.
- Angular production build and backend Java 17 compilation completed; automated tests have not been run.
- The home page now uses **Northline** as a provisional working name, not a verified business or legal name. No trademark or domain clearance has been completed.
- Draft India-market pricing is shown for review: ₹1,500–₹2,500 per engineering hour; ₹30,000–₹50,000 for a one-week discovery sprint; and ₹1.2L–₹2L for an 80-hour monthly block. These are planning estimates, not an approved offer or quote. The hourly band is a narrowed planning assumption within the ₹1,500–₹3,000 senior Java/Spring Boot range reported by [Codingclave’s 2026 guide](https://codingclave.com/blog/custom-software-development-cost-india).
- Draft capacity assumes one active engagement at a time and up to 80 support hours per month. Confirm this against the actual team roster and availability.

## Still required before related work

- Identity provider and session recovery approach before implementing admin sign-in.
- Allowed frontend origin and deployment values before production CORS/security configuration.
- Named administrator identity and role policy before provisioning access.
- Lead retention period before production lead intake.
- Approved business details and legal review before publication.

## Contact and admin implementation defaults (21 November 2026)

- Confirmed contact destination: `mdzain2545@gmail.com`; phone: `7013631398`. The WhatsApp link currently assumes India country code `+91` and opens a prefilled enquiry message. These values are editable in the admin site settings.
- The contact form stores a lead before attempting SMTP notification. SMTP settings are placeholders until a provider is configured. Notification failures are logged without form contents.
- Lead retention is provisionally 90 days (`LEAD_RETENTION_DAYS`). Change or confirm this after the applicable privacy jurisdiction and business requirements are reviewed.
- Admin uses HTTP Basic authentication with a single environment-configured account. The browser keeps the Authorization value in memory only, and signs out on page reload. Do not use outside HTTPS. Set `ADMIN_PASSWORD` privately; no credential is committed.
- Local PostgreSQL is required for lead persistence and CMS operation, but no PostgreSQL service was found running during implementation. The API and full form workflow need PostgreSQL before local end-to-end use.
- Public prices, service details, Northline name, and capacity remain draft assumptions. The PTR defaults to omitting public rates; the owner asked for provisional rates to be shown for later editing.
