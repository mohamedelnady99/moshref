---
name: brand-name
description: App name is defined in src/config/brand.js; backend platform_name overrides it; oasis_* internal keys are kept on purpose
metadata:
  type: project
---

- The app name (`Mushrif`, Arabic/Urdu `مشرف`), tagline, domain (`mushrif.ae`, from the business card in the identity PDF) and file slug are defined only in `src/config/brand.js`.
- `index.html` `<title>` is filled from `brandTitle` by a small plugin in `vite.config.js` (`%BRAND_TITLE%`).
- At runtime, `platform_name` from the backend (`/api/settings/public`, editable in Settings → General) **overrides** `brand.name`. Backend-stored translations also override local i18n files. If "Oasis" shows up, check the backend data first.
- Internal identifiers still use `oasis_` (`oasis_token`/`oasis_user`/`oasis_role` cookies, `oasis_` storage prefix, `oasis_dashboard_layout`, `oasis_translations_dirty`, package name `oasis-trace`, e2e base path `/react.oasis/`). Kept on purpose: renaming the cookies logs every user out and resets saved layouts.

**Why:** owner asked for the name in one config file so spelling can be fixed later.
**How to apply:** use `brand.name` / `brandName(locale)` / `brandEmail()` instead of typing the name. Do not rename `oasis_*` keys unless the owner explicitly accepts the logout/reset. Related: [[brand-identity]], [[i18n-rules]].
