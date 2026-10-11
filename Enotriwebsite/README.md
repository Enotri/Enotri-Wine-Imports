# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Screenshots

Playwright can capture the public pages at desktop and mobile sizes:

```sh
bunx playwright install chromium
bun run screenshots
```

Screenshots are written to `screenshots/desktop/` and `screenshots/mobile/`.

To capture the same routes with Puppeteer instead:

```sh
bun run screenshots:puppeteer
```

Puppeteer starts the local dev server when one is not already running. Set
`SCREENSHOT_BASE_URL` to capture from a different running instance. Its images
are written to `screenshots/puppeteer/desktop/` and `screenshots/puppeteer/mobile/`.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
