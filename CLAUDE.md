# CLAUDE.md

Guidance for Claude Code working in this repository. Several people work on this project from different machines, so **shared memory lives in the repo** under `.claude/memory/`, not in anyone's personal Claude memory.

## Project memory (read first)

@.claude/memory/MEMORY.md

The index above is loaded automatically. Open the individual files in `.claude/memory/` when they're relevant to the task.

## ⚠️ End of every task: update the project memory

Before finishing **any** task in this repo, update `.claude/memory/`:

1. If you learned something durable and non-obvious (a decision, a gotcha, a constraint, an owner preference), add it to the matching memory file or create a new one. Use the same format: frontmatter with `name`, `description`, `metadata.type` (`user` | `feedback` | `project` | `reference`), then the fact, with **Why:** / **How to apply:** for project/feedback entries.
2. Add a one-line pointer for any new file to `.claude/memory/MEMORY.md`.
3. Edit or delete entries that are now wrong. Don't duplicate; update the existing file instead.
4. Use absolute dates (e.g. 2026-10-22), never "today"/"last week".
5. Don't store what the code or git history already says, secrets, or anything personal.
6. Say in your final message which memory files you changed (or that none needed changes).

Write memory into this repo, **not** into `~/.claude/projects/...`, so co-workers and other devices get it through git.

## What this is

**Mushrif (مشرف)**: a smart livestock monitoring and tracking platform (React SPA). It talks to a separate backend API set by `VITE_API_URL`. Features include animals, IoT devices/GPS, map and geofences, alerts, medical/vaccination records, tasks, auctions, transfers, subscriptions with Stripe, messages, reports, and a multi-language admin.

## Commands

```bash
npm install
npm run dev          # Vite dev server on :5173 (restart it after adding new theme color keys)
npm run build        # production build into dist/ (dist/ is committed)
npm run test:run     # Vitest unit tests
npm run test:e2e     # Playwright; needs a running backend + seeded users
```

`npm run lint` currently fails because ESLint has no `eslint.config.js`. To check a build without touching the committed `dist/`, run `npx vite build --outDir /tmp/some-dir`.

## Architecture

- `src/main.jsx` → `src/App.jsx`. **Routes are defined in `App.jsx`** with `createBrowserRouter` and lazy pages. `ProtectedLayout` guards the authenticated routes.
- `src/context/AuthContext.jsx`: login/logout. The token, user and role are stored in cookies (`src/utils/cookies.js`).
- `src/context/PlatformContext.jsx`: public platform settings from `/api/settings/public` (name, logo, favicon, login background). These override the bundled defaults.
- `src/utils/api.js`: use `apiFetch()` for all API calls (it adds auth and `Accept-Language`), and `storageUrl()` for backend file paths.
- `src/i18n/`: `en`, `ar` (RTL), `ur` (RTL), `eu`. `useI18n()` gives `{ t, dir, locale }`. Backend translations override the local files.
- `src/hooks/useRole.js`: role checks (Admin, Owner, Manager, Shepherd, Doctor).
- `src/components/Layout/Layout.jsx`: the real sidebar, header and shell. (`Sidebar.jsx` is unused.)
- Styling: Tailwind 3 plus `src/index.css`. Icons: `react-material-symbols`.

## Conventions

- **Colors:** only in `src/config/theme.js`. In components use `bg-brand-primary`, `text-brand-accent-dark`, `rgb(var(--color-primary-rgb)/0.2)`, or `themeColors.primary` for JS (charts and maps). Never hardcode brand hex values. Status colors (red, amber, emerald, blue) stay as normal Tailwind colors.
- **Brand name, domain and slug:** only in `src/config/brand.js` (`brand.name`, `brandName(locale)`, `brandEmail()`). Don't type "Mushrif" or "Oasis" in components.
- **Logos:** import from `src/assets/brand` (`brandMark` for small spots, `brandLogoTransparent` for large ones). Always prefer the backend `logoUrl` when it is set.
- **i18n:** add every new key to all four locale files. Don't write `t(key) || 'fallback'`, because `t()` returns the key when it's missing.
- **RTL:** use logical classes (`ms-`, `me-`, `start-`, `end-`) or check `dir === 'rtl'`.
- Keep `oasis_*` cookie and storage key names; renaming them logs users out.
- Ask the project owner before acting on anything ambiguous.
