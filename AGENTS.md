# AGENTS.md

Repository guidance for coding agents working in `C:\Users\lhssa\projects\jigsolitaire`.

## Project Snapshot

- Stack: Next.js 16 App Router, React 19, TypeScript, ESLint 9, Tailwind/PostCSS tooling.
- Package manager: `npm` (lockfile present: `package-lock.json`).
- Source of truth for app code: `app/`.
- Static assets: `public/`.
- Game data and metadata helpers: `app/lib/`.
- No dedicated automated test suite is configured right now.

## Rule Files

- No repo-specific Cursor rules were found in `.cursor/rules/`.
- No `.cursorrules` file was found.
- No Copilot instructions file was found at `.github/copilot-instructions.md`.
- Follow the conventions in this file plus the existing codebase patterns.

## Build, Lint, and Verification Commands

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

- Starts Next.js locally, typically at `http://localhost:3000`.
- Use this for manual smoke testing of routes, layout changes, metadata, and UI behavior.

### Production build

```bash
npm run build
```

- Required after non-trivial routing, metadata, or server/client boundary changes.
- Catches many App Router and metadata mistakes that lint will not catch.

### Start production server

```bash
npm run start
```

- Use only after a successful build.

### Lint the whole repo

```bash
npm run lint
```

- Runs the ESLint config from `eslint.config.mjs`.
- Current config extends Next core web vitals + TypeScript rules.

### Lint a single file

```bash
npx eslint app/play/page.tsx
```

- Use this when you only changed one file and want fast feedback.
- You can pass multiple files if needed.

### Type-checking

```bash
npx tsc --noEmit
```

- There is no dedicated `typecheck` script, but TypeScript is configured with `strict: true`.
- Run this when touching shared data, props, metadata, or server/client interfaces.

## Test Guidance

### Current state

- There is no Jest, Vitest, Playwright, Cypress, or other test runner configured in `package.json`.
- There are no test scripts and no obvious `*.test.*` or `*.spec.*` conventions in the repo.

### What to do instead

- Use `npm run lint` for static verification.
- Use `npx tsc --noEmit` for stricter type validation.
- Use `npm run build` for integration-level validation.
- Manually verify relevant pages in `npm run dev`.

### Running a single test

- Not applicable right now because the repository has no automated test framework.
- Closest equivalent for targeted verification is linting a single file:

```bash
npx eslint app/components/Header.tsx
```

- If a test runner is added later, update this file immediately with the exact single-test command.

## Repository Structure

- `app/`: App Router pages, layouts, metadata, sitemap/robots, and components.
- `app/components/`: Shared UI building blocks like header, footer, ads, related articles, and author blocks.
- `app/blog/`: File-based blog index plus one folder per article.
- `app/categories/`: Category listing page and dynamic category detail route.
- `app/lib/`: Shared typed data such as puzzle categories and levels.
- `public/`: Images, audio, ads.txt, and static game assets.
- `public/game/`: Standalone game implementation used by the site.

## Code Style Expectations

### General style

- Match existing repo style before introducing a new pattern.
- Prefer straightforward code over clever abstractions.
- Keep components and page files self-explanatory.
- Use ASCII unless a file already uses emoji or Unicode intentionally.

### Imports

- Group imports by source: framework/library imports first, then local imports.
- Keep import ordering stable and readable; do not reorder noisily without reason.
- Use `import type` for TypeScript-only imports when appropriate.
- Use the `@/*` path alias if it improves clarity, but relative imports are already common and acceptable.

### Formatting

- Follow the existing formatting in the file you edit.
- The codebase currently mixes single quotes and double quotes across files; preserve local file style unless doing a broader cleanup.
- Use semicolons consistently with the surrounding file.
- Keep JSX props readable; break lines when an object or prop list becomes dense.
- Prefer trailing commas only where the file already uses them.

### Types

- The repo uses strict TypeScript; avoid `any` unless absolutely necessary.
- Prefer explicit interfaces/types for shared structures.
- Keep prop types near the component when they are local.
- Reuse existing domain types from `app/lib/gameData.ts` when possible.
- Narrow unions instead of using broad string types when the valid values are known.

### Naming conventions

- React components: PascalCase.
- Utility functions: camelCase.
- Constants: camelCase for local values, UPPER_SNAKE_CASE only for true constants shared conceptually.
- Route folders: kebab-case.
- Metadata exports: `metadata` or `generateMetadata` following Next.js conventions.

### React and Next.js patterns

- Default to server components; add `'use client'` only when hooks, browser APIs, or event handlers are required.
- Do not export `metadata` from a client component page; split client logic into a child component if needed.
- Keep App Router metadata accurate, especially `title`, `description`, and `alternates.canonical` on indexable pages.
- When adding routes, update relevant discovery surfaces such as `app/sitemap.ts` and `app/sitemap-page/page.tsx` if needed.
- Respect server/client boundaries when moving logic between pages and components.

### Styling

- Most styling is done with inline style objects plus shared classes from `app/globals.css`.
- Reuse existing classes (`page-header`, `page-content`, `container`, `card`, etc.) before inventing new ones.
- Preserve the established visual language unless a task explicitly asks for redesign.
- Ensure changes remain usable on mobile and desktop.

### Content pages and blog posts

- Blog articles are file-based at `app/blog/<slug>/page.tsx`.
- New posts should follow the existing structure: metadata, header, body content, `AuthorByline`, `Sources`, `RelatedArticles`, and ad placement if still applicable.
- Keep internal linking accurate when adding or renaming posts.
- If article discoverability changes, check blog index and sitemap surfaces.

### Error handling and safety

- Fail safely on missing data; prefer guards, early returns, or `notFound()` for invalid route params.
- Avoid throwing raw errors for expected user-facing routing conditions.
- For browser-only features, guard `window`, `document`, and `localStorage` access inside client components/effects.
- Be careful with environment variables; normalize and validate before use.

### SEO and metadata

- This repo uses explicit metadata heavily; preserve canonical correctness.
- Do not add misleading structured data or fake search features.
- When changing crawlable routes, verify `robots.ts`, `sitemap.ts`, and internal links still make sense.
- Avoid shipping placeholder copy on public pages.

### Ads, consent, and policy-sensitive areas

- Ad behavior is sensitive; do not casually add more ad slots.
- Keep policy pages accurate to actual implementation.
- If you touch ad loading, privacy, cookies, or consent behavior, review the related pages together.

## Preferred Change Workflow

1. Read the affected page/component and nearby shared helpers.
2. Make the smallest change that cleanly solves the problem.
3. Run targeted verification first (`npx eslint <file>` or `npx tsc --noEmit` when relevant).
4. Run `npm run lint` for broader changes.
5. Run `npm run build` after routing, metadata, or server/client boundary changes.

## Things to Avoid

- Do not introduce a new testing framework unless asked.
- Do not add large dependencies for small UI or utility tasks.
- Do not silently change route slugs, canonicals, or sitemap entries without updating all affected references.
- Do not replace existing inline styling patterns with a different styling system unless explicitly requested.

## Agent Deliverable Expectations

- Keep edits minimal, coherent, and easy to review.
- Mention any commands you ran and any validation you could not run.
- If the repo lacks a capability the request assumes (for example, single-test execution), say so explicitly and give the closest valid command.
