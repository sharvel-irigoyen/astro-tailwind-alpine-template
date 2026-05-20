# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static site template using **Astro 6** + **Tailwind CSS 4** + **Alpine.js 3**, built as a static site (no SSR). The project language is Spanish (UI text, comments, commit context). Uses **pnpm** as package manager. Requires **Node >= 22.12.0**.

## Commands

| Task               | Command                                           |
| ------------------ | ------------------------------------------------- |
| Dev server         | `pnpm dev`                                        |
| Build              | `pnpm build`                                      |
| Preview build      | `pnpm preview`                                    |
| Lint               | `pnpm lint`                                       |
| Format             | `pnpm format`                                     |
| Format check       | `pnpm exec prettier --check .`                    |
| Docker prod build  | `docker compose -f docker-compose.prod.yml build` |
| Deploy (on server) | `./deploy.sh`                                     |

## Git Conventions

- **Conventional Commits** enforced via commitlint (`@commitlint/config-conventional`) on a `commit-msg` hook.
- **Pre-commit hook** runs `lint-staged`: ESLint fix + Prettier write on staged files.
- Both hooks managed by Husky.

## Architecture

- **Static output**: Astro builds to `dist/`, served by Nginx in Docker. No server-side runtime.
- **Tailwind CSS 4**: Configured as a Vite plugin in `astro.config.mjs` (not as an Astro integration). Global styles in `src/styles/global.css` with `@import 'tailwindcss'`.
- **Alpine.js**: Registered via `@astrojs/alpinejs` integration with a custom entrypoint at `src/scripts/alpine-entrypoint.ts`. Alpine components (like `counter.ts`) are registered as `Alpine.data()` in this entrypoint and referenced in templates via `x-data="componentName"`.
- **Environment variables**: Validated at build time using Astro's `envField` schema in `astro.config.mjs`. Missing required env vars will fail the build.
- **Components**: Astro components in `src/components/ui/`. The `Button` component supports polymorphic rendering (renders as `<a>` when `href` is provided).
- **Layouts**: `BaseLayout.astro` is the single base layout wrapping all pages.
- **Error pages**: Custom `404.astro` and `500.astro` (marked `noindex`).
- **SEO**: `BaseLayout` includes canonical URL, Open Graph tags, robots meta, and theme-color. Sitemap generated automatically via `@astrojs/sitemap`. `robots.txt` in `public/`.
- **Lighthouse**: Template is optimized for 100/100 scores. `compressHTML` enabled, Nginx has gzip + immutable cache for `/_astro/` hashed assets, and `Permissions-Policy` header set. When adding new pages, always use `BaseLayout` to inherit all SEO/performance meta tags.

## Deployment

Multi-stage Dockerfile: Node 22 builder (pnpm install + astro build) -> Nginx Alpine serving static files. Custom Nginx config at `nginx/nginx.conf`. CD pipeline deploys to VPS via SSH using `deploy.sh`.

## Code Style

- Prettier: semicolons, single quotes, 2-space tabs, with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`.
- ESLint: flat config with `typescript-eslint` recommended + `eslint-plugin-astro` recommended.
- TypeScript: strict mode (extends `astro/tsconfigs/strict`).
