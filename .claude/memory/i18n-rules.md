---
name: i18n-rules
description: t() returns the key itself when missing, so `t(key) || 'fallback'` never falls back; add keys to all 4 locales
metadata:
  type: project
---

- `t()` in `src/i18n/index.jsx` returns the **key string** when a translation is missing. So `t('auth.x') || 'Fallback'` never uses the fallback and users see raw keys like `auth.emailRequired`. This was the cause of the login page bug fixed on 2026-10-22.
- `t()` also falls back to the *short* key (last segment) in any section, so a key can "work" by accident from an unrelated section — don't rely on it.
- Lookup order: backend translations (`/api/languages`, current locale) → local `src/i18n/<locale>.js` → English. Backend translations override local ones.
- Locales: `en`, `ar` (RTL), `ur` (RTL), `eu` (Basque). `en.js` uses double quotes, the others single quotes.
- Params use `{name}` syntax: `t('subscription.welcomeToOasis', { name: brandName(locale) })`.
- Login page pattern: store the error *key* in state and translate at render (`translateError` in `src/pages/Login.jsx`), so messages switch language live and fall back to English if a key is missing.
- Don't show backend `message` strings to users directly — they're English only.

**Why:** the key-returning behavior silently broke validation messages in every language.
**How to apply:** when adding UI text, add the key to all four locale files in the same section; check that a key resolves rather than guarding with `||`. Basque wording is Claude-written and unreviewed.
