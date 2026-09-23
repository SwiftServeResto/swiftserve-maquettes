# swiftserve-maquettes — reference only for V2

**Repo:** `swiftserve-maquettes` · **Priority:** Could (no V2 requirement targets this repo) · **Rules:** [HOUSE_RULES V2](https://github.com/SwiftServeResto/swiftserve-docs/blob/HEAD/prompts/v2/HOUSE_RULES.md)

Phase 8A produced 36 Web views and 24 Staff views, the design system and 105 Playwright assertions, pinned to backend `8395fee`, Web `3432439`, Mobile `6d11a8b` and OpenAPI `d06f5156…`. V2 §17.1 does not list mockups as a deliverable, so no Must or Should prompt targets this repo. The V2 Web (W06–W12) and Mobile (M02–M09) prompts build from the approved C01 contract and the existing design system, not from new mockups.

The site stays a design reference. It never defines behavior, wording or permissions: the API decides authorization (§5.1), and the production apps are the reference for wording.

## Q01 — Mock the new V2 views (optional)

**Priority:** Could · **Depends on:** C01 draft (field names and statuses) · **Deadline:** before J3 starts, otherwise drop it

### Why

Several V2 screens have no mockup: restaurant switcher, Served, availability, payment statuses, reconciliation, dashboard and audit. If the team wants a design review before W06–W12 and M02–M05 start, a mockup is cheaper to change than a component. If nobody asks for a review, skip Q01; the clients can proceed without it.

### Task

Add views to the existing app, same stack, fixtures and route-manifest rules (`src/route-manifest.ts`, generated static routes, deterministic fixtures, no call to any real service):

- **Web:** restaurant switcher (list of assignments, what the switch clears); order detail with Served action and state history; availability toggles for item and option; payment intent statuses (Pending, Authorized, Captured, Failed, Refunded, PartiallyRefunded) and attempt history; reconciliation report with gaps; dashboard (KPIs, period and restaurant filter, confirmed vs in progress vs refunded); audit search and detail.
- **Staff (mobile):** restaurant selection after sign-in; Service (tables, order, unavailable-choice warning, Served, payment status); Kitchen (queue with time priority and filters, Ready, mark unavailable); Management (limited dashboard, availability); offline, reconnecting, stale-data and pending-action states; phone bottom navigation and tablet navigation rail.
- Use C01 names and statuses exactly. Mark any value the contract has not fixed as _placeholder_.
- Fixtures contain no real names, no card data (not even masked), and no tokens.

### Tests

Keep the CI gates green (format, lint, type-check, unit tests, brand validation, matrix regeneration, build, routes validation, Playwright). Add Playwright assertions for each new route at phone, tablet and desktop widths, and an axe check.

### Done when

The new routes are published on GitHub Pages, `docs/FIGURE_TO_IMPLEMENTATION_MATRIX.md` maps each one to its W or M prompt, and the design review outcome is recorded in `docs/DECISIONS.md`.

## Tester banner (optional)

Only if it helps recette testers (D12, R11): a banner on every page of the published site saying that the production Web app and SwiftServe Staff are the reference for behavior and wording, and that differences from the mockups are not defects. One small PR; keep the existing gates green.
