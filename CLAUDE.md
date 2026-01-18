# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static blog built from the official Astro blog template. The site uses Astro's Content Collections API for managing blog posts, supports both Markdown and MDX, and includes RSS feed generation and sitemap support.

## Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
npm run astro    # Run Astro CLI commands (e.g., astro check, astro add)
```

## Architecture

### Content Management
- **Content Collections**: Blog posts are managed via Astro's Content Collections API (src/content.config.ts)
- **Blog Collection**: Defined with a Zod schema that validates frontmatter fields (title, description, pubDate, updatedDate, heroImage)
- **Content Loader**: Uses glob loader to load all .md and .mdx files from src/content/blog/
- **Type Safety**: All blog posts are type-checked against the schema, with dates coerced from strings to Date objects

### Routing & Pages
- **Dynamic Routes**: Blog posts use catch-all routing via src/pages/blog/[...slug].astro
- **Static Generation**: Uses getStaticPaths() to generate static pages from content collection at build time
- **RSS Feed**: Generated programmatically via src/pages/rss.xml.js using getCollection()

### Site Configuration
- **Global Constants**: Site metadata (SITE_TITLE, SITE_DESCRIPTION) defined in src/consts.ts
- **Site URL**: Configure in astro.config.mjs (currently set to https://example.com)
- **Integrations**: MDX and sitemap are enabled via astro.config.mjs

### File Structure
- src/content/blog/ - Blog post content (Markdown/MDX files)
- src/pages/ - Route definitions (Astro file-based routing)
- src/layouts/ - Page layouts (BlogPost.astro for blog post pages)
- src/components/ - Reusable components (Header, Footer, BaseHead, etc.)
- src/assets/ - Images optimized by Astro's image service
- public/ - Static assets served directly (fonts, favicon)

## TypeScript Configuration

Uses Astro's strict TypeScript config with strictNullChecks enabled.
