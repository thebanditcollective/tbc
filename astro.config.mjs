import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY;
const [owner = 'example', repo = 'bandit-collective-site'] = repository?.split('/') ?? [];
const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const base = isUserSite ? '/' : `/${repo}`;
const defaultSite = `https://${owner}.github.io${isUserSite ? '' : base}`;

export default defineConfig({
  site: process.env.SITE_URL ?? defaultSite,
  base: process.env.BASE_PATH ?? base,
  output: 'static',
  trailingSlash: 'ignore'
});
