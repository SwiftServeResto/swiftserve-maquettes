# Testing

Run `npm ci`, then formatting, lint, type checking, unit tests, `npm run brand:validate`, Playwright, and the production build. Playwright covers every route at desktop, tablet and phone sizes, horizontal overflow, controls, themes, and deterministic principal-workflow previews.

The Windows runs complete all assertions but the managed sandbox retains a protected Node process after Playwright finishes. The original configuration used `npm run dev` with `reuseExistingServer: true`; remediation now uses a directly owned Vite process, disables reuse, and uses the non-interactive line reporter. The sandbox still retains the process after 105 successful assertions, so the local lifecycle gate remains partial. No forced termination or `process.exit()` is used. A native GitHub Actions run is the permitted authoritative lifecycle gate.
