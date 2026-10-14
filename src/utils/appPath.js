const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export const appPath = (path = '/') => `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
