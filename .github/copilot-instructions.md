

- Every exported function should have a TSDoc comment describing its purpose, parameters, and return value.
- Before imports or any code, add a comment block to the file that explains its purpose.
### Data Layer Patterns (Drizzle + Node SQLite)

- Define tables in `db/schema.ts`; manage schema changes with drizzle-kit migrations - see `drizzle.instructions.md`
- Keep data-access helpers in `src/lib/` with an **injectable `db`** argument so they're testable
- Keep CSV/seed logic as pure functions in `db/transforms.ts`
- Seed-derived values must be deterministic (no `Math.random`) so static builds are reproducible

### Astro Patterns

- **Astro Pages/Components**: routing, layouts, content, and components are all `.astro` - see `astro.instructions.md`
- Query data directly in page frontmatter via the `src/lib/` helpers (build-time, static output)
- Dynamic routes use `getStaticPaths()` + `export const prerender = true`
- Provide a branded `404.astro` (unknown routes are real 404s under static output)
- Only add a scoped Astro `<script>` when genuine client interactivity is required

### Styling

- Use Tailwind CSS utility classes exclusively - see `style.instructions.md`
- Dark theme colors: slate palette (`bg-slate-800`, `text-slate-100`, etc.)
- Rounded corners and modern UI patterns
- Follow modern UI/UX principles with clean, accessible interfaces

### GitHub Actions workflows

- Follow good security practices
- Make sure to explicitly set the workflow permissions
- Add comments to document what tasks are being performed

## Scripts

- The project uses **npm scripts** for all development tasks — there is no `scripts/` directory.
- **Skills take precedence.** Before running a command directly, check whether a skill covers the task (e.g. the `quality-checks` skill wraps tests and lint). If one applies, follow it.
- Key npm scripts:
  - `npm run dev` — start the Astro dev server (`predev` migrates + seeds the local SQLite database)
  - `npm run build` — build the static site (`prebuild` migrates + seeds the local SQLite database)
  - `npm run preview` — serve the built `dist/` output
  - `npm run lint` — ESLint
  - `npm run test:unit` — Vitest unit tests
  - `npm run test:e2e` — Playwright E2E tests (builds + previews first)
  - `npm run typecheck` — type-check the pure TypeScript with `tsgo` (TypeScript 7 native compiler, via `@typescript/native-preview`) using `tsconfig.tsgo.json`
  - `npm run typecheck:astro` — type-check `.astro` files with `astro check` (classic TypeScript package)
  - `npm run typecheck:all` — run both type-check scripts (used by the CI `type-check` job)
  - `npm run db:generate` / `db:migrate` / `db:seed` / `db:setup` — Drizzle schema/migration/seed tasks

> [!NOTE]
> TypeScript 7 (`tsgo`) is adopted **side-by-side** for type checking only; it does not affect linting. ESLint + `typescript-eslint` and `astro check` still resolve the classic `typescript` package (kept at v6) because the native compiler's API isn't ready for them yet. Do **not** bump the classic `typescript` package to 7 (a Dependabot `ignore` holds it) until `typescript-eslint` + `@astrojs/check` support the native API. `tsgo` is `--noEmit` only; the site is still built by `astro build`.

## Repository Structure

The application lives at the repository root:

- `db/`: Drizzle schema, migrations, transforms, seed, and `games.csv`
- `src/lib/`: Node SQLite client (`db.ts`) and data-access helpers (`games.ts`)
- `src/components/`: reusable `.astro` components
- `src/layouts/`: Astro layout templates
- `src/pages/`: Astro page routes (`index.astro` listing, `game/[id].astro`, `404.astro`, `about.astro`)
- `src/styles/`: CSS and Tailwind configuration
- `src/types/`: TypeScript interfaces (Game, Publisher, Category)
- `e2e-tests/`: Playwright E2E tests (home, games, accessibility)
- `drizzle.config.ts`, `vitest.config.ts`, `astro.config.mjs`, `playwright.config.ts`: tooling config
- `README.md`: Project documentation
