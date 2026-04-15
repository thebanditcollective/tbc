export function withBase(path: string) {
  const base = import.meta.env.BASE_URL || '/';

  if (!path || path === '/') {
    return base;
  }

  if (path.startsWith('#')) {
    return `${base}${path}`;
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
}
