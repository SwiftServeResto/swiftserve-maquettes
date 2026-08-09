# Testing

Run `npm ci`, then formatting, lint, type checking, unit tests, `npm run brand:validate`, Playwright, and the production build. Playwright covers every route at desktop, tablet and phone sizes, horizontal overflow, controls, themes, and deterministic principal-workflow previews.

The managed Windows sandbox retains protected Node processes around Playwright execution. The browser suite therefore uses a plain built-artifact server and the non-interactive line reporter, while native GitHub Actions remains authoritative for complete browser lifecycle termination. No forced termination or `process.exit()` is used.

`npm run build` generates known-route entry points from `src/route-manifest.ts`. `npm run routes:validate` uses a plain static server without SPA rewriting and requires effective HTTP 200 for every known route, the logo, JavaScript and CSS; an unknown route remains HTTP 404.
