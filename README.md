# KRAFENIO 2.0 — Complete Platform Foundation

This repository is a full-stack MVP foundation for KRAFENIO: public corporate website, shared login, role model, workspace overview, business data schema, contact inquiry intake, and Render deployment configuration.

## Stack
- Node.js 26.13.1; pnpm 10.14.0
- Next.js 15.5.3, React 19, TypeScript
- PostgreSQL, Prisma 6.15
- No Docker
- Render Web Service (not Static Site)

## Run on Windows
1. Install Node 26.13.1 and PostgreSQL.
2. Create database `krafenio`.
3. Copy `.env.example` to `.env` and set a strong `AUTH_SECRET`, database URL, and seed admin password (12+ chars).
4. Run:
   ```powershell
   corepack enable
   corepack prepare pnpm@10.14.0 --activate
   pnpm install
   pnpm prisma generate
   pnpm prisma db push
   pnpm db:seed
   pnpm dev
   ```
5. Open http://localhost:3000.

## Deploy
Push to a private GitHub repository and create a Render **Web Service**. The app needs server-side rendering, API routes, authentication, and PostgreSQL. Do not deploy it as a Static Site.

Render build command:
`corepack enable && corepack prepare pnpm@10.14.0 --activate && pnpm install --frozen-lockfile && pnpm prisma generate && pnpm prisma db push && pnpm build`

Start command:
`pnpm start`

Set `DATABASE_URL`, `AUTH_SECRET`, `APP_URL`, `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD` in Render. Use a strong unique admin password. Review Render plan costs before provisioning.

## Important status
This is an initial runnable platform foundation, not a finished enterprise product. It includes a public corporate site, database schema, authentication foundation, contact intake, and workspace overview. The remaining management pages, detailed CRUD workflows, client-specific access, candidate application flows, secure object storage, email delivery, audit logging integration, MFA, password reset, rate limiting, CSRF/origin hardening, automated integration/E2E tests, and legal review must be completed before production use.

The included privacy and terms pages are placeholders, not legal advice. File storage is modeled in the schema but no upload implementation is enabled yet. The login flow should receive rate limiting and origin/CSRF protections before public launch.


## Current scope and limitations

The starter includes the public corporate pages, contact inquiry intake, session-based login, a role-aware workspace shell, dashboard metrics, starter directory pages for key records, and a client project overview. It is an MVP foundation, not a fully completed enterprise platform. Create/update/delete workflows, granular client and employee row-level authorization for every module, recruitment candidate self-service, email verification/password reset, file upload/storage, notification delivery, audit event integration, rate limiting, CSRF/origin controls, comprehensive tests, and legal review remain required before production launch.

The `privacy` and `terms` content is placeholder copy. Do not publish it as final legal policy.
