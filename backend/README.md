# Backend API

The API uses Spring Boot 4.2.0 and Java 17. Database schema changes are managed by Flyway migrations in `src/main/resources/db/migration`.

## Run locally

1. Install Java 17+ and Maven 3.6.3+.
2. Create a local application role and database using PostgreSQL's command-line tools or a database administration UI (replace the example password with your own):

   ```sql
   CREATE ROLE services_site LOGIN PASSWORD 'choose-a-local-database-password';
   CREATE DATABASE services_site OWNER services_site;
   ```  

3. Copy `.env.example` to `.env` in this folder. Set `DB_PASSWORD` to the role password from step 2 and choose a separate strong `ADMIN_PASSWORD`. The app loads this local ignored file automatically. Keep it private and never commit it.
4. Configure SMTP values to enable administrator email notifications. A failed email does not discard the saved enquiry.
5. Run `mvn spring-boot:run`.

## Initial endpoints

- `GET /health/live` returns a generic liveness status.
- `GET /health/ready` checks database connectivity and returns a generic up/down status without exposing connection details.
- `POST /api/v1/leads` validates and stores enquiries; notifications use configured SMTP.
- `GET /api/v1/services` and `/api/v1/articles` expose published content only.
- `/api/v1/admin/**` requires HTTP Basic authentication with the configured administrator credentials. Use HTTPS outside local development; credentials are kept in memory by the admin page and are not persisted in browser storage.

The lead retention default is 90 days and can be changed with `LEAD_RETENTION_DAYS`; set it to `0` to disable automatic deletion. Confirm the retention period and applicable privacy terms before production. The local draft defaults to the confirmed contact email and phone. Email delivery is not available until a real SMTP provider is configured.

The PostgreSQL service must be running before the API starts. If you only installed the database server, add PostgreSQL Command Line Tools or an administration UI to create the application role/database. The backend cannot provision the database without an administrator credential.
