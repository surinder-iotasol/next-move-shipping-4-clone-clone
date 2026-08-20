## Phase 5 — Mark Story Complete

When the current story is fully implemented and validated, you MUST signal completion so the orchestrator can update `prd.json` safely.

Replace STORY_ID below with the actual story ID from the "## Current Story" section above (e.g. QP-002).

1. Tell the orchestrator you are done by creating a marker file:
   `touch .story-updates/STORY_ID.passed`
2. Verify the marker:
   `ls .story-updates/STORY_ID.passed`
3. Commit your work:
   `git add . && git commit -m "chore: mark STORY_ID as passed"`
4. Push commit to remote origin if connected:
   `git push origin HEAD 2>/dev/null || true`

## Test Strategy Gate

Before writing implementation code for the current story, classify it and write the
required tests FIRST (TDD). Do not mark `passes: true` until every required test
exists, runs green, and covers the story's acceptance criteria.

### Step 1 — Classify the story

| Story touches | Required tests |
|---------------|----------------|
| Service, utility, middleware, or business logic (no UI) | **Unit tests** for every public function and error branch |
| HTTP endpoint or repository + DB | **Unit tests** for service layer + **integration test** for the endpoint |
| UI route, page, form, modal, or user-visible flow | **Unit tests** for logic/hooks + **Playwright E2E spec** for the user flow |
| Full-stack feature (API + UI) | **Unit** + **integration** + **Playwright E2E** |
| Pure config, scaffold, or env-only (no runtime logic) | Sample passing unit test only; E2E not required |

Playwright is REQUIRED when the story adds or changes anything a user sees or
interacts with (pages, forms, buttons, navigation, toasts, modals). Browser-only
manual checks are NOT sufficient.

### Step 2 — Write tests before implementation

1. Read the project's existing test layout (co-located `*.test.ts`, `e2e/tests/`, page objects).
2. Write failing unit tests that map 1:1 to acceptance criteria for logic/API stories.
3. For UI stories, add a Playwright spec under `e2e/tests/` using the page-object pattern
   (`e2e/pages/*.page.ts`, `e2e/fixtures/`). Cover: happy path, primary error/validation path,
   and navigation/redirect if applicable.
4. Implement code until all new tests pass.

### Step 3 — Verify before completion

- Run the project's unit test command (`npm test`, `pytest`, etc.) — all pass.
- If Playwright applies: run `npm run test:e2e` (or project equivalent) — all pass.
- Run typecheck and lint if the project defines them.
- Every acceptance criterion must be exercised by at least one automated test.

If the project has no E2E setup yet and this story is UI-facing, create the minimal
Playwright scaffold (`playwright.config.ts`, `e2e/tests/`, `test:e2e` script) as part
of this story before marking it complete.

## Design Compliance

Approved UI designs have been materialised into this workspace under the `designs/` directory.
The HTML prototype for each screen is the SOURCE OF TRUTH for that screen's markup and styling.

**Before writing ANY UI code:**
1. Read `designs/DESIGN.md` — the design system, the "Tailwind Setup (REQUIRED)" section, and the screen table.
2. For the current story, use `designRefs` from the "## Current Story" injection (do not read the entire `prd.json` for this). For each ref:
   - Open the referenced `.html` file in `designs/` and study its FULL markup.
   - View the referenced `.png` screenshot for the expected visual result.

**Tailwind config & plugins (do this once, early):**
- Copy the `tailwind.config` object from the design HTML's `<script id="tailwind-config">` block
  VERBATIM into the project's tailwind config — the ENTIRE config including `darkMode`, all
  `colors`, `fontFamily`, and ALL `borderRadius` values (do not drop `full`/`9999px`). Use the
  exact token names (e.g. `primary-container`, `surface-container-lowest`, `outline-variant`).
  Never rename, approximate, drop, or invent tokens.
- Inspect the Tailwind CDN URL in the design HTML (`cdn.tailwindcss.com?plugins=...`). Install
  EVERY listed plugin (`forms` → `@tailwindcss/forms`, `container-queries` →
  `@tailwindcss/container-queries`, etc.) and register it in `plugins: []`. These are REQUIRED —
  without `@tailwindcss/forms`, inputs, checkboxes and selects render with broken styling.
- Load the same fonts and icon sets the design references (Inter, Material Symbols, …) and set the
  document `<title>` and favicon to match the product, not the scaffold default.
- TAILWIND v4 ONLY: do NOT add an unlayered global reset like `* { margin: 0; padding: 0 }` to your
  CSS. In v4 all utilities live in `@layer`, and unlayered CSS overrides layered utilities — such a
  reset silently kills every `margin`/`padding`/`space-y` utility app-wide and makes every page look
  cramped. Rely on Tailwind's Preflight; put any custom base/component CSS inside `@layer base`/`@layer components`.

**Fidelity rules:**
- Reproduce the EXACT element set of the referenced screen: every input, label, checkbox, radio,
  helper text, icon, button, link, background decoration, and footer. Do NOT drop, merge,
  simplify, or rename elements that exist in the design.
- Build the SHARED CHROME the design shows on every screen as reusable components and mount them:
  the global top app bar (logo, search, notifications bell, settings, profile/avatar), the
  sidebar, and the footer. A design that has a top bar on every dashboard page means EVERY built
  dashboard page must render that top bar — do not ship only the sidebar.
- Do NOT drop DATA WIDGETS to "keep it simple": KPI/stat cards (with their trend chips), charts
  (bar/donut/line), data tables and their columns, filter/sort bars, pagination, activity/timeline
  feeds, map cards, progress meters, and multi-column / right-rail (bento) layouts must all be
  reproduced. Wire them to real or clearly-stubbed data, never delete them.
- Use ONLY the colors, fonts, spacing, radii, and styles from the design system.
- Preserve the layout structure, responsive breakpoints, and hover/focus/active states.

**Before setting `passes: true` for a UI story:**
- Do an element-by-element self-check of your implementation against each `designRefs` `.html`
  and `.png`. Every element present in the design must be present in your code.
- If you intentionally deviate, record the deviation and the reason in the story's `notes`.
