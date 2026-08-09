# SwiftServe interactive maquettes

Canonical, responsive, code-based product prototype for SwiftServe Web and the single SwiftServe Staff application. It uses deterministic fixtures only and never calls production services.

References: Backend `8395fee`, Web `3432439`, Mobile `6d11a8b`, OpenAPI SHA-256 `d06f51565ec48e2fe1f86c8b68ca725a9bd52b6c2f6d5ed0e83cbd14d4d12dce`.

Run `npm ci && npm run dev`. The planned Pages URL is `https://swiftserveresto.github.io/swiftserve-maquettes/` after merge and deployment.

The supplied canonical logo is preserved unchanged at `public/brand/swiftserve-logo-original.jpg`; checksum-locked derivatives are reproduced with `npm run brand:generate` and checked with `npm run brand:validate`. The prototype never redraws or reinterprets the mark.

Figma is not required: this code-based prototype is the canonical visual source. Prototype authorization controls are simulations only, fixtures contain no production data, and Phase 8B/8C must reference the final committed Phase 8A version.
