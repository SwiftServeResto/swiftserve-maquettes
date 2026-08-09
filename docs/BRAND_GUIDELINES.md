# Brand guidelines

The unchanged canonical source is `public/brand/swiftserve-logo-original.jpg` (1200 × 1200, SHA-256 `dcb3eb665326fd4a13d1910fcd935b9395c13c303649633d6eb13a0d9ca51fbf`). `npm run brand:generate` deterministically creates transparent, WebP, symbol, light-surface, dark-surface, and 512/1024 application-icon derivatives. `npm run brand:validate` rejects a missing or changed source and validates every output. An SVG is intentionally omitted because producing one would require manually redrawing the mark.

Use the full mark on identity and authentication surfaces; use the cropped symbol in compact navigation and application icons. Preserve its proportions and clear space of at least the central lightning-stroke width. Minimum displayed full-logo width is 160 CSS pixels; minimum symbol size is 32 pixels.

Use the light asset on light surfaces and the dark asset on deep graphite surfaces. Never stretch, rotate, partially recolor, add effects, or separate the cloche, lightning, and checkmark. Canonical colors are graphite `#414C51`, deep graphite `#202626`, orange `#F08417`, green `#50A655`, black, and white.

Orange and green base colors do not reliably support white body text. Use deep graphite text on their light surfaces, or the darker 700–900 tonal variants when white text is required. Statuses always include text and/or an icon; production-intent pairs must meet WCAG 2.2 AA.
