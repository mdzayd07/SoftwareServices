# Java Full Stack Services Website

Angular and Spring Boot draft implementation for the project described in `Java_Full_Stack_Services_Website_PTR.md`.

## Project layout

- `frontend/` Angular 22 standalone application with SSR and strict TypeScript.
- `backend/` Spring Boot 4.2 REST API using Java 17, Maven, PostgreSQL, and Flyway.
- `docs/DECISIONS.md` records technical defaults and business assumptions.
- `docs/PTR-COVERAGE.md` tracks requirements against the current implementation.

Public routes, an enquiry form and storage flow, WhatsApp link, protected admin inbox, and content editors are implemented. Working name, public pricing, service details, capacity, and legal copy remain draft content pending review.

## Prerequisites

- Node.js 24.15+ and npm 11+
- Java 17+
- Maven 3.9+
- PostgreSQL 16+ for local API persistence

## Local development

1. Start PostgreSQL and create a database and user matching `backend/.env.example`.
2. In `backend/`, set the environment values in `.env.example` in your shell, including a strong `ADMIN_PASSWORD` and database password, then run `mvn spring-boot:run`.
3. Configure a real SMTP provider to enable enquiry notifications. Enquiries remain stored if email delivery fails.
4. In `frontend/`, run `npm ci` then `npm start`.
5. Open `http://localhost:4200`. The API health endpoints are `/health/live` and `/health/ready`.

Environment variables must be supplied by the shell or deployment environment; `.env` loading is deliberately not embedded in the application. Never put secrets in frontend configuration.

The supplied email and phone are shown on the contact page and used for WhatsApp. The WhatsApp link assumes the number is Indian and uses country code +91. The provisional 90-day lead retention default, business name, pricing, service offer, team biographies, experience claims, legal copy, hosting, and production security settings still need owner review before launch. Admin access is not available until `ADMIN_PASSWORD` is configured.

The workspace build was compiled after installing dependencies. If `npm` or `mvn` is not recognized in a newly opened terminal, add the corresponding installation `bin` directory to `PATH` or invoke the executable directly.
