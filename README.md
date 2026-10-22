# Mushrif (مشرف)

Smart livestock monitoring and tracking platform: the web front-end.

Built with React 18, Vite 5, Tailwind CSS 3 and React Router 6, with Leaflet maps, Recharts, Stripe and Sentry. The app talks to a separate backend API.

## Getting started

Requirements: Node.js 18+ and access to a running backend API.

```bash
git clone git@github.com:mohamedelnady99/moshref.git
cd moshref
npm install
```

Create a `.env` file in the project root:

```bash
VITE_API_URL=https://your-backend.example.com/api.animals/public   # backend base URL (required)
VITE_BASE_PATH=/            # set to /folder/ only if served from a sub-directory
VITE_SENTRY_DSN=            # optional error tracking
```

Then start the dev server:

```bash
npm run dev                 # http://localhost:5173
```

In development, `/api` and `/storage` requests are proxied to `VITE_API_URL` (see `vite.config.js`).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test:run` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright; needs backend and seeded users) |

## Project structure

```
src/
  App.jsx              routes (React Router, lazy-loaded pages)
  config/
    theme.js           ← brand COLORS (single source of truth)
    brand.js           ← brand NAME, tagline, domain
  assets/brand/        logos (full, transparent, icon-only mark)
  components/          layout, dashboard widgets, settings tabs, shared UI
  context/             Auth + Platform (backend settings) providers
  i18n/                en, ar, ur, eu translations + provider
  pages/               one file per screen
  utils/               api client, cookies, helpers
public/                favicon
e2e/                   Playwright tests
```

## Changing the brand

- **Colors:** edit `src/config/theme.js`. Tailwind classes (`bg-brand-primary`, `text-brand-accent`, …), CSS variables (`--color-primary`) and the chart and map colors all update. After adding a *new* color key, restart `npm run dev`.
- **Name and spelling:** edit `src/config/brand.js`. Note that the **Platform Name** saved in *Settings → General* (backend) overrides it at runtime.
- **Logo:** replace the files in `src/assets/brand/` (and `public/favicon.png`). A logo uploaded in *Settings → General* takes priority.

## Translations

Languages: English, Arabic (RTL), Urdu (RTL) and Basque. Add every new text key to **all four** files in `src/i18n/`. Translations can also be edited in the app (*Settings → Languages*), and those stored in the backend override the local files.

## Deployment

- **Docker:** `docker build -t mushrif-web .` builds the app and serves it with nginx (SPA routing included).
- **Static hosting:** run `npm run build` and serve `dist/` with SPA fallback to `index.html` (see `nginx.conf` and `vercel.json`).

## Working with Claude Code

This repo shares its Claude Code context with the whole team:

- `CLAUDE.md` holds the project instructions Claude reads automatically.
- `.claude/memory/` holds shared project memory: decisions, gotchas and preferences learned while working. Claude updates it at the end of every task, so **commit and pull these files like any other code** to keep every device and co-worker in sync.

If two people edit the same memory file, resolve the conflict like normal code and keep both facts if both are still true.
