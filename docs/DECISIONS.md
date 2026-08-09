# Decisions

- This Vue prototype replaces Figma as the canonical visual source.
- Production authorization remains server-controlled.
- One route can contain a substantive screen/state selector to keep navigation scannable without padding counts.
- No production backend calls, authentication tokens or Phase 8B/8C integration exist here.
- Brand derivatives are deterministic raster outputs; SVG is omitted because faithful creation would require redrawing.
- Playwright owns a non-reused Vite process; the managed Windows sandbox still retains a protected Node process, so native GitHub Actions is authoritative for lifecycle termination.
