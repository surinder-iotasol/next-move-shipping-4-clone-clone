# Design System & Screen Reference

> This file is generated from the approved Stitch design artifact.
> Read it before writing ANY UI code for this project.

## Design System

**Style:** Ashbyhq

### Colors

> The role→hex values below are a quick reference ONLY. The canonical design tokens —
> and their exact Tailwind names (e.g. `primary-container`, `surface-container-lowest`,
> `outline-variant`) — live inside each page HTML in the `<script id="tailwind-config">`
> block. Always port those token names and values verbatim; never rename or invent tokens.

| Role | Hex |
|------|-----|
| cta | #0000ee |
| text | #717075 |
| accent | #0000ee |
| border | #f4f4f4 |
| primary | #473bce |
| surface | #d0d5d2 |
| secondary | #d0d5d2 |
| background | #ffffff |
| on-primary | #ffffff |
| text-muted | #212121 |

### Typography

- **Heading font:** TTNormsPro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif
- **Body font:** TTNormsPro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif

### Tailwind Setup (REQUIRED)

Each page HTML in `designs/` was generated for Tailwind with a specific config and plugin set.
Reproduce that setup exactly in the project, or the screens will NOT render as designed:

1. **Port the token config verbatim.** Copy the `tailwind.config` object from the design
   HTML's `<script id="tailwind-config">` block into the project tailwind config (colors,
   fontFamily, borderRadius). Keep the exact token names.
2. **Install the design's Tailwind plugins.** Inspect the Tailwind CDN `<script src>` URL in
   the design HTML (e.g. `cdn.tailwindcss.com?plugins=forms,container-queries`). For each
   plugin listed, install the matching package and register it in `plugins: [...]`:
   - `forms` → `@tailwindcss/forms`
   - `container-queries` → `@tailwindcss/container-queries`
   - `typography` → `@tailwindcss/typography`
   - `aspect-ratio` → `@tailwindcss/aspect-ratio`
   These are NOT optional — without `@tailwindcss/forms`, inputs, checkboxes and selects
   render with broken default styling.
3. **Load the same fonts & icons** the design uses (e.g. Inter, Material Symbols Outlined),
   and set the document `<title>`/favicon to match the product, not the scaffold default.
4. **Tailwind v4: never add an unlayered `* { margin:0; padding:0 }` reset.** In v4 unlayered CSS
   overrides layered utilities, so such a reset silently breaks every margin/padding/space-y
   utility app-wide (cramped pages). Rely on Preflight; wrap custom CSS in `@layer base`/`@layer components`.

**Approved at:** 2026-08-13T14:18:05.272Z

---

## Screens

| Page | Route | Purpose | Key Elements | HTML | Screenshot |
|------|-------|---------|-------------|------|------------|
| Login | `/login` | Authenticate a tenant user with their credentials before granting access to the platform. | Email/username field, Password field, Sign In button | [view](designs/login.html) | [view](designs/login.png) |
| Force Password Change | `/change-password` | Require a user flagged with a temporary password to set a new password before entering the app. | New password field, Confirm password field, Password strength indicator | [view](designs/change-password.html) | [view](designs/change-password.png) |
| Dashboard | `/dashboard` | Show the signed-in user a role-based summary of customer, job, and staff activity within their tenant. | Sidebar navigation, Stat cards (Customers/Jobs/Staff counts), Role-based widget grid | [view](designs/dashboard.html) | [view](designs/dashboard.png) |
| Customer Directory | `/customers` | List, search, and manage the tenant's customer companies, and open a customer's detail or jobs. | Sidebar navigation, Search/filter bar, Server-paginated customer table | [view](designs/customers.html) | [view](designs/customers.png) |
| Customer Detail | `/customers/:id` | View and edit a single customer's company info, sales rep assignment, and uploaded documents. | Company info form, Sales person assignment field, Document list | [view](designs/customers-id.html) | [view](designs/customers-id.png) |
| Jobs List | `/jobs` | Browse and filter freight jobs across the tenant, optionally scoped to one customer, and open a job's workspace. | Sidebar navigation, Customer filter (customerId param), Job status filter | [view](designs/jobs.html) | [view](designs/jobs.png) |
| Job Workspace | `/jobs-workspace/:jobCode` | Manage a single job's nested folders and files in a 3-panel file-explorer view. | Left folder tree panel, Center file table (size, mime type), Right detail inspector panel | [view](designs/jobs-workspace-jobcode.html) | [view](designs/jobs-workspace-jobcode.png) |
| Staff Directory | `/staff` | Let admins view and manage staff accounts and their assigned roles within the tenant. | Sidebar navigation, Staff table (name, email, role), Role dropdown per row | [view](designs/staff.html) | [view](designs/staff.png) |
| Profile | `/profile` | Let a signed-in user view their account details and change their password. | Sidebar navigation, Profile info form (name, email), Change password fields | [view](designs/profile.html) | [view](designs/profile.png) |
| Not Found | `/404` | Inform the user that the requested route does not exist and route them back to a valid screen. | Animated mesh gradient background, 404 message/illustration, Return to Dashboard button | [view](designs/404.html) | [view](designs/404.png) |
