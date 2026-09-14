# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Enotri Wine Imports**, an Edmonton/Alberta wine agency. Server-rendered React (TanStack Start) generated and hosted by [Lovable](https://lovable.dev). There is no backend, database, or CMS — every page is static apart from client-side filtering.

## Commands

This repo uses **Bun**, not npm (`bun.lock`, `bunfig.toml`). The `npm i` / `npm run dev` lines in `README.md` are generic Lovable boilerplate — ignore them.

| Task | Command |
| --- | --- |
| Dev server | `bun run dev` |
| Production build | `bun run build` (Cloudflare target via nitro) |
| Build in dev mode | `bun run build:dev` |
| Preview a build | `bun run preview` |
| Lint | `bun run lint` (`eslint .`) |
| Format | `bun run format` (`prettier --write .`) |
| Typecheck | `bunx tsc --noEmit` — no script defines it, but the project is strict-typed and expects it to pass |

There is **no test framework** in this project — no test runner is installed and there are no test files. Don't add or run one unless asked.

`bunfig.toml` enforces a 24-hour supply-chain delay on installs (`minimumReleaseAge`). Adding a package to `minimumReleaseAgeExcludes` bypasses that guard for one package — the file's own comment says to confirm with the user before adding any entry.

## Lovable integration — history is fragile

This project is connected to Lovable (see `AGENTS.md`, `.lovable/project.json`). Commits pushed to the connected branch sync back into the Lovable editor.

- **Never rewrite published git history** — no force-push, and no rebasing/amending/squashing of commits that are already pushed. It rewrites history on Lovable's side and the user can lose their project history.
- Keep the connected branch in a working state; broken commits show up in the editor.

## Architecture

### Routing (TanStack Start, file-based)

Routes are `.tsx` files in `src/routes/`; see `src/routes/README.md` for the naming conventions (dynamic `$param`, splat `$`, `_layout`, `__root`). Key points:

- `src/routeTree.gen.ts` is **auto-generated** — never edit it by hand.
- `src/routes/__root.tsx` is the only app shell (`<html>`, `<head>`, site header/footer, error + 404 boundaries). The `<Outlet />` inside `<main>` must stay or all child routes break.
- `/producers` (`producers.tsx`) is a pass-through layout; `/producers/` is `producers.index.tsx`; `/producers/$slug` loads a single producer in its route `loader` and throws `notFound()` for unknown slugs.

### Content model — one file

**All portfolio data lives in `src/lib/portfolio.ts`**: the `producers[]` and `wines[]` arrays plus `producerSlug()`, `producerByName()`, and the `legendary` subset. Editing what the site shows means editing these arrays. `Producer` and `Wine` are typed there.

- **Array order in `wines[]` is load-bearing.** `src/routes/wines.tsx` paginates by locating the first `Château de la Grave` wine's index: page 1 is everything before it, page 2 is that block onward. The Château de la Grave wines must remain one contiguous run at the end of the array.

### Assets

`src/assets/*.asset.json` files are **Lovable asset descriptors**, not binaries — JSON with a `url` field pointing at Lovable's CDN (`/__l5e/assets-v1/...`). Import the `.asset.json` module and use its `.url`:

```ts
import logo from "@/assets/enotri-logo.png.asset.json";
// <img src={logo.url} />
```

The actual image/PDF bytes are not in the repo.

### SSR error handling (deliberate — don't "simplify")

Three cooperating pieces exist because TanStack Start's h3 server layer swallows in-handler throws into an opaque `{"unhandled":true,"message":"HTTPError"}` 500 with no stack:

- `src/server.ts` — custom server entry (wired via `tanstackStart.server.entry` in `vite.config.ts`). Wraps the real server entry, detects the h3-swallowed 500 body, and re-renders a readable page via `renderErrorPage()`.
- `src/start.ts` — its mere existence opts the app out of the auto-installed CSRF middleware, so it re-adds `createCsrfMiddleware` explicitly alongside an error-catching request middleware.
- `src/lib/error-capture.ts` — monkeypatches `console.error` globally to record the last real `Error` (so `server.ts` can recover the stack) and to expand `Error` args into full message + stack + cause chain before they hit the log pipeline.

`src/lib/lovable-error-reporting.ts` forwards React error-boundary errors to the Lovable editor's telemetry hooks, which only exist inside the editor preview.

### Vite config — do not add bundled plugins

`vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which already wires in TanStack Start, React, Tailwind v4, `tsconfig` path resolution, nitro (Cloudflare build target), the `@` alias, React/TanStack dedupe, and the error-logger plugins. **Adding any of those manually causes duplicate-plugin failures.** Pass extra config through `defineConfig({ vite: { ... } })` instead.

### Styling

- Tailwind **v4**, CSS-first config in `src/styles.css` (`@import "tailwindcss"`, `@theme inline { ... }`) — there is no `tailwind.config.js`.
- shadcn/ui components (`new-york` style) in `src/components/ui/`; `components.json` holds the generator config. `cn()` (clsx + tailwind-merge) is in `src/lib/utils.ts`.
- Design tokens are CSS variables in `src/styles.css`. The site is effectively **dark-only** — the `:root` and `.dark` blocks define the same "wine-cellar" palette. Custom tokens beyond the shadcn set: `--ink`, `--sand`, `--gold`.
- Shared layout primitives (`PageHero`, `Section`, `CtaBand`) live in `src/components/page-parts.tsx`; site header/footer in `src/components/site-chrome.tsx`.

## Research / Web Search

For any research or web-lookup task, **use Tavily first**. Fall back to the native Claude `WebSearch` tool only if Tavily fails or is unavailable. This applies to all research/web-lookup work unless the user explicitly says otherwise.

### API key

- `TAVILY_API_KEY` lives in `.env` (gitignored via the `.env` / `.env.*` rules in `.gitignore`; `.env.example` holds the empty template). Create `.env` from `.env.example` if it is missing.
- **Never hardcode the key.** Always read it from `.env` at call time (e.g. `set -a; source .env; set +a` before a `curl`).
- Auth is passed **in the JSON body as `"api_key"`**, not as a `Bearer` header.

### Search — `POST https://api.tavily.com/search`

```bash
set -a; source .env; set +a
curl -s -X POST https://api.tavily.com/search \
  -H "Content-Type: application/json" \
  -d '{"api_key":"'"$TAVILY_API_KEY"'","query":"YOUR QUERY","search_depth":"basic","max_results":5}'
```

Useful body params: `search_depth` (`basic` | `advanced`), `max_results`, `include_answer`, `topic` (`general` | `news`), `include_raw_content`, `include_domains` / `exclude_domains`. Each entry in the response `results[]` has `title`, `url`, `content`, `score`.

### Extract full page content — `POST https://api.tavily.com/extract`

```bash
curl -s -X POST https://api.tavily.com/extract \
  -H "Content-Type: application/json" \
  -d '{"api_key":"'"$TAVILY_API_KEY"'","urls":["https://example.com/article"]}'
```

### Errors

A response of `{"detail":{"error":"Unauthorized: missing or invalid API key."}}` means the key in `.env` is wrong or expired. **Flag this to the user** — do not silently fall back to `WebSearch`.

## Conventions

- ESLint bans importing `server-only` (a Next.js package); use a `*.server.ts` filename or `@tanstack/react-start/server-only` instead. `@typescript-eslint/no-unused-vars` is off. Prettier is enforced through ESLint: 100-col, double quotes, semicolons, trailing commas everywhere.
- `tsconfig.json` is strict beyond the defaults — `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and `noPropertyAccessFromIndexSignature` are all on, so array/record index access is `T | undefined` and optional properties can't be assigned `undefined` explicitly.
