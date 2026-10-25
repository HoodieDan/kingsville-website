# Kingsville Church website

## Featured events

Website-managed promotions live in `src/data/events.ts`, using the same event fields as the Prismic Events page. Regular events still come from Prismic; `useEvents` combines both sources for the homepage and Events listing. The older `kingsville-church` repository is a starter without an event implementation.

The Outpour's flyer, description, ministers, venue, and four service sessions are maintained in this one configuration. Its sessions drive both homepage countdowns and calendar downloads, so the two Sundays are not treated as one continuous service. After the final service, the promotion expires and the homepage returns to the next available CMS event. Future website-managed promotions can follow the same configuration.

`/outpour` replaces the previous Crusade page. `/crusade` remains an alias and is explicitly prerendered for static hosting.

Run the event timing checks with Node 22.18 or later:

```bash
node --test tests/events.test.mjs
```

## Nuxt setup

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
