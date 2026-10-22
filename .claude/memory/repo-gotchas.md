---
name: repo-gotchas
description: Dead/stale files, committed dist/, no ESLint config, .env not gitignored, backend repo is separate
metadata:
  type: project
---

- `dist/` is **committed** to git (deploy output). It is not rebuilt automatically — run `npm run build` when a deploy needs it. Don't build into `dist/` just to test; use `npx vite build --outDir <tmp>`.
- Unused files: `src/components/Layout/Sidebar.jsx` (real sidebar is inside `Layout.jsx`), `src/hooks/useAuth.js` and therefore `src/config/routes.js` (routes are actually defined in `src/App.jsx`), `src/tailwind.config.js`, `src/package-lock.json`, `src/postcss.config.js`, `dev_out2.txt`/`dev_err2.txt`.
- `npm run lint` fails: ESLint 10 is installed but there is no `eslint.config.js`. Same failure before any of Claude's changes.
- `.env` is **not** in `.gitignore` (it only holds public `VITE_*` values, but be careful). `.env.example` was deleted in the working tree by the owner as of 2026-10-22 — ask before restoring.
- Backend is a separate Laravel-style API (`VITE_API_URL`, files under `/files/...`, `/storage` proxied in dev). Not in this repo.
- Unit tests: `npm run test:run` (Vitest, 12 tests as of 2026-10-22). E2E: Playwright in `e2e/`, needs a running backend and seeded users (`admin@oasis.com`).

**How to apply:** don't "fix" dead files or `.gitignore` without asking; mention them instead. Related: [[tailwind-theme-tokens]].
