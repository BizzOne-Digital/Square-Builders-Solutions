# Square Builders Solutions — Website & Admin Portal

Next.js 15 (App Router) + MongoDB site for Square Builders Solutions, a roofing, HVAC, and
remodeling contractor in Davenport, FL.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.local.example` to `.env.local` and fill in:

   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `ADMIN_SESSION_SECRET` — a long random string used to sign admin session JWTs
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used once to seed the admin user (not used elsewhere)

3. Seed the admin user (run any time you need to reset the admin password):

   ```bash
   npm run seed:admin
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Visit `/admin/login` to sign in to the admin portal with the credentials you seeded.

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket and import it into Vercel.
2. Add the same environment variables (`MONGODB_URI`, `ADMIN_SESSION_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD`) in the Vercel project settings.
3. Run `npm run seed:admin` locally (pointed at your production `MONGODB_URI`) once to create
   the admin user, or run it from a one-off Vercel deployment shell.
4. Deploy. `next build` runs automatically.

## Image Uploads

Images uploaded through the admin portal (services, testimonials, homepage hero, about page)
are stored **inside MongoDB** as `StoredUpload` documents (folder, filename, mime type, size,
and the binary data itself) rather than on the filesystem. This is required because Vercel's
serverless functions have a read-only, ephemeral filesystem — anything written to disk during
a request disappears on the next cold start or redeploy.

- Uploads go through `POST /api/upload` (validates admin session, folder, MIME type, and size).
- Images are served back through `GET /api/uploads/[folder]/[filename]`, which streams the
  binary data directly from MongoDB with long-lived cache headers.
- Because the data lives in your database, uploaded images **persist across redeploys** —
  unlike a typical filesystem-based upload folder on Vercel.
- When an admin replaces an image, the new file is uploaded first, then the content document is
  updated, and only then is the old file deleted — so a failed upload never leaves a project
  without its image.

## Project Structure

- `app/` — public pages (`/`, `/about`, `/services`, `/testimonials`, `/contact`) and the admin
  portal (`app/admin/**`)
- `components/` — `layout/` (header, footer, logo), `home/` (homepage sections + contact form),
  `ui/` (shared building blocks), `admin/` (admin portal components)
- `lib/` — `mongodb.ts` (cached connection), `auth.ts` (JWT sessions via `jose`),
  `validation.ts` (zod schemas), `uploads.ts` (upload URL helpers), `content.ts` (static copy
  for services/process/etc.)
- `models/` — Mongoose schemas (`AdminUser`, `Lead`, `Service`, `Testimonial`, `SiteSettings`,
  `PageContent`, `StoredUpload`)
- `middleware.ts` — protects all `/admin/**` routes except `/admin/login`
- `scripts/seed-admin.ts` — one-time/reset script to create the admin user

## Notes

- No pricing is shown anywhere on the site — all service CTAs point to the contact form for a
  free estimate/consultation, per client requirements.
- Testimonials are pulled live from MongoDB; the site shows a graceful empty state until
  testimonials are added through the admin portal.
- All contact details (phone, email, location, Facebook) reflect exactly what the client
  provided — no fabricated address, hours, or awards are included anywhere.
