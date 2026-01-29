# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **艾瑞克的沼澤** (Eric's Swamp), an Astro-based personal blog in Traditional Chinese. The site uses Astro's Content Collections API for managing blog posts and projects, supports both Markdown and MDX, and includes RSS feed generation, sitemap support, Google AdSense integration, and GitHub Pages deployment.

**Live site**: https://ericwu.asia

## Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
npm run astro    # Run Astro CLI commands (e.g., astro check, astro add)
```

## Architecture

### Content Management

- **Content Collections**: Managed via Astro's Content Collections API (`src/content.config.ts`)
- **Two Collections**:
  - `blog`: Blog posts in `src/content/blog/` with frontmatter schema (title, description, pubDate, updatedDate, heroImage, category, tags)
  - `projects`: Project showcases in `src/content/projects/` with frontmatter schema (title, description, pubDate)
- **Content Loader**: Uses glob loader to load all `.md` and `.mdx` files
- **Type Safety**: All content is type-checked against Zod schemas with dates coerced from strings to Date objects

### Blog Post Frontmatter Schema

```yaml
---
title: "Post Title"           # Required: string
description: "Description"     # Required: string
pubDate: 2026-01-22           # Required: date (coerced)
updatedDate: 2026-01-23       # Optional: date (coerced)
heroImage: "/images/blog/..."  # Optional: string (path to image in public/)
category: "技術筆記"           # Optional: string (used for category pages)
tags:                          # Optional: string array (used for tag pages)
  - AI
  - 開發工具
---
```

### Routing & Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/index.astro` | Homepage |
| `/about` | `src/pages/about.astro` | About page |
| `/blog` | `src/pages/blog/[...page].astro` | Paginated blog listing (12 posts/page) |
| `/blog/:slug` | `src/pages/blog/[...slug].astro` | Individual blog post |
| `/categories` | `src/pages/categories/index.astro` | All categories |
| `/categories/:category` | `src/pages/categories/[category].astro` | Posts by category |
| `/tags` | `src/pages/tags/index.astro` | All tags |
| `/tags/:tag` | `src/pages/tags/[tag].astro` | Posts by tag |
| `/projects` | `src/pages/projects/index.astro` | Project listing |
| `/projects/:slug` | `src/pages/projects/[...slug].astro` | Individual project |
| `/rss.xml` | `src/pages/rss.xml.js` | RSS feed |
| `/search-data.json` | `src/pages/search-data.json.js` | JSON endpoint for client-side search |

### Site Configuration

- **Global Constants**: Site metadata defined in `src/consts.ts`
  - `SITE_TITLE`: "艾瑞克的沼澤"
  - `SITE_DESCRIPTION`: "一些學習心得、學習筆記"
- **Site URL**: https://ericwu.asia (configured in `astro.config.mjs`)
- **Integrations**: MDX (`@astrojs/mdx`) and sitemap (`@astrojs/sitemap`) enabled
- **Image Optimization**: Uses `sharp` for image processing

### File Structure

```
src/
├── assets/               # Images optimized by Astro's image service
├── components/           # Reusable Astro components
│   ├── BaseHead.astro    # SEO meta tags, Open Graph, Twitter cards, AdSense
│   ├── Breadcrumb.astro  # Breadcrumb navigation
│   ├── Footer.astro      # Site footer
│   ├── FormattedDate.astro # Date formatting component
│   ├── Header.astro      # Site header/navigation
│   └── HeaderLink.astro  # Navigation link component
├── content/
│   ├── blog/             # Blog post Markdown/MDX files
│   └── projects/         # Project Markdown/MDX files
├── layouts/
│   ├── BlogPost.astro    # Blog post layout (includes TOC)
│   └── ProjectPost.astro # Project layout
├── pages/                # File-based routing
├── styles/
│   └── global.css        # Global styles
└── consts.ts             # Site-wide constants
└── content.config.ts     # Content collection definitions

public/
├── fonts/                # Atkinson fonts (regular, bold)
├── images/blog/          # Blog post images (referenced as /images/blog/...)
├── ads.txt               # Google AdSense verification
├── CNAME                 # Custom domain config (ericwu.asia)
├── favicon.svg           # Site favicon
└── .nojekyll             # Disable Jekyll processing
```

### Key Features

1. **Table of Contents**: Blog posts automatically generate a sticky TOC from h2/h3/h4 headings (`BlogPost.astro:290-352`)
2. **Pagination**: Blog listing paginates at 12 posts per page
3. **Category & Tag System**: Posts can have categories and tags for organization
4. **Responsive Design**: Mobile-friendly with breakpoints at 720px and 1200px
5. **SEO Optimized**: Canonical URLs, Open Graph, Twitter cards
6. **Google AdSense**: Integrated in `BaseHead.astro`

## Deployment

The site deploys to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`):

1. Triggered on push to `main` branch or manual dispatch
2. Uses Node.js 20
3. Runs `npm ci` and `npm run build`
4. Deploys `./dist` to GitHub Pages

**Important**: The `public/CNAME` file configures the custom domain `ericwu.asia`.

## TypeScript Configuration

Uses Astro's strict TypeScript config with `strictNullChecks` enabled. Type definitions are generated in `.astro/types.d.ts`.

## Conventions

### Adding New Blog Posts

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Name format: `YYYY-MM-DD-title-slug.md`
3. Include all required frontmatter fields (title, description, pubDate)
4. Place images in `public/images/blog/` and reference as `/images/blog/filename.png`

### Adding New Projects

1. Create a new `.md` or `.mdx` file in `src/content/projects/`
2. Include required frontmatter: title, description, pubDate

### Styling

- Global styles in `src/styles/global.css`
- Component-scoped styles use `<style>` or `<style is:global>` in Astro files
- Color scheme uses CSS custom properties (e.g., `rgb(var(--gray-dark))`)
- Primary accent color: `#3498db`

### Language

The site is in Traditional Chinese (zh-TW). Content and UI text should follow this convention.
