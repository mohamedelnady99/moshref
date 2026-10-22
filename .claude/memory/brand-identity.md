---
name: brand-identity
description: Mushrif colors & logo decisions — where they live, which values were chosen and why
metadata:
  type: project
---

The app was rebranded from "The Oasis" to **Mushrif (مشرف)** on 2026-10-22, based on the identity sheet `moshref-logo-identity.pdf` (kept outside the repo by the owner).

- Brand colors: dark green `#0E2B1F` + desert sand `#D2B48C`. The PDF and the owner's first message said `#D2B4BC` (pink) — that was a typo; the PDF's own RGB (210,180,140) = `#D2B48C`, confirmed by the owner.
- All brand colors are defined only in `src/config/theme.js` (extra shades like `accentDark`, `cream`, `deep` were derived by Claude, not from the PDF). See [[tailwind-theme-tokens]].
- Status colors (success/red/amber/blue, role badges, chart extras) were intentionally **kept** — owner decision, so they keep their meaning.
- Logos live in `src/assets/brand/` (`mushrif-logo.png`, `mushrif-logo-transparent.png`, `mushrif-mark.png` = icon-only crop made by Claude for small spots). `public/favicon.png` is generated from the mark.
- The bundled logo is only a **fallback**: a logo uploaded in Settings → General (backend `logo_url`) still wins. Owner chose this.

**Why:** owner wants to tweak colors/name later from one place, and keep admins able to override the logo.
**How to apply:** never hardcode a brand hex in components — use `brand-*` Tailwind classes, `var(--color-*)`, or `themeColors`. See also [[brand-name]].
