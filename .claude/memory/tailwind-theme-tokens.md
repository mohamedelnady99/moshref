---
name: tailwind-theme-tokens
description: How theme.js feeds Tailwind/CSS vars; restart dev server after adding a new color key
metadata:
  type: project
---

- `tailwind.config.js` imports `src/config/theme.js`: `brand.*` colors (kebab-case **and** camelCase both work, e.g. `bg-brand-accent-light` = `bg-brand-accentLight`), and a plain-function plugin that emits `:root` CSS variables `--color-<name>` and `--color-<name>-rgb` (space-separated channels).
- Use `rgb(var(--color-secondary-rgb)/0.15)` (no spaces) inside Tailwind arbitrary classes, e.g. `shadow-[0_8px_24px_rgb(var(--color-secondary-rgb)/0.12)]`. Spaces inside `@apply` arbitrary values break the build.
- **A running `npm run dev` keeps the config it started with.** After adding a *new* color key, restart the dev server. On 2026-10-22 "bg-brand-cream doesn't work" was only a stale dev server.
- Do not import `tailwindcss/plugin` in the config (plain Node can't resolve it); plain function plugins work.
- `src/tailwind.config.js` is a stale, unused copy — the real config is the root one.

**Why:** brand colors must be changeable from one file ([[brand-identity]]).
**How to apply:** if a brand class "doesn't work", first check the class exists in theme.js, then restart the dev server before debugging further.
