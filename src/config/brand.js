// Mushrif (مشرف) brand identity — the single source of truth for the app's name.
//
// Change a value here and it updates everywhere: page title, sidebar/header fallback,
// login page, "Powered by" links, email placeholders, welcome messages, export file names.
//
// Note: the Platform Name saved in Settings → General (backend) still overrides `name`
// at runtime, so update it there too if it was set before.

export const brand = {
  name: 'Moshref',                  // English / default name
  localizedNames: {                 // Name shown per language (falls back to `name`)
    ar: 'مشرف',
    ur: 'مشرف',
  },
  tagline: 'Livestock Tracking',    // Used in the browser tab title
  domain: 'mushrif.ae',             // Used for example emails/URLs in form placeholders
  slug: 'mushrif',                  // Used in downloaded file names
};

export const brandName = (locale) => brand.localizedNames[locale] || brand.name;

export const brandTitle = `${brand.name} - ${brand.tagline}`;

export const brandEmail = (user = 'example') => `${user}@${brand.domain}`;
