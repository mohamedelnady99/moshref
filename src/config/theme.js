// Mushrif (مشرف) brand palette — the single source of truth for app colors.
//
// Change a value here and it updates everywhere:
//   - Tailwind classes:   bg-brand-primary, text-brand-accent, bg-brand-accent-light (or bg-brand-accentLight), ...
//                         Restart the dev server (npm run dev) after adding a NEW color key.
//   - CSS variables:      var(--color-primary), rgb(var(--color-primary-rgb) / 0.5), ...
//   - JS (charts, maps):  import { themeColors } from '../config/theme';
//
// Status colors (success/danger/warning/info) are intentionally not part of the brand palette.

export const themeColors = {
  primary: '#0E2B1F',     // Dark green (أخضر غامق) — main brand color
  secondary: '#1B4332',   // Lighter green — gradients, hover states
  deep: '#081A12',        // Darkest green — deep gradient ends
  accent: '#D2B48C',      // Desert sand (رملي صحراوي) — main accent
  accentDark: '#8B6B43',  // Dark sand — accent text on light backgrounds
  accentLight: '#E6D3B5', // Light sand — accent text on dark backgrounds
  accentPale: '#EDE0CC',  // Pale sand — soft hover backgrounds
  light: '#FAF7F2',       // Warm off-white — page background
  cream: '#FCF9F4',       // Cream — light panels and cards
  muted: '#4A5D52',       // Muted green-gray — secondary text
};

export function hexToRgbChannels(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

const toKebab = (key) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// { primary: '#0E2B1F', accentDark: ... } -> { '--color-primary': '#0E2B1F', '--color-primary-rgb': '14 43 31', '--color-accent-dark': ... }
export function themeCssVariables(colors = themeColors) {
  return Object.fromEntries(
    Object.entries(colors).flatMap(([key, hex]) => [
      [`--color-${toKebab(key)}`, hex],
      [`--color-${toKebab(key)}-rgb`, hexToRgbChannels(hex)],
    ])
  );
}

// { accentDark: ... } -> { 'accent-dark': ..., accentDark: ... } for Tailwind color keys,
// so both bg-brand-accent-dark and bg-brand-accentDark work.
export function tailwindBrandColors(colors = themeColors) {
  return Object.fromEntries(
    Object.entries(colors).flatMap(([key, hex]) => [[toKebab(key), hex], [key, hex]])
  );
}
