# Zivah Styles

A premium fashion e-commerce storefront built with React, TanStack Router, and Tailwind CSS v4.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- **Router**: [TanStack Router](https://tanstack.com/router) (file-based routing)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + custom design tokens
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives)
- **State**: React Context (cart, wishlist, compare, recently viewed)
- **Build Tool**: [Vite](https://vite.dev) via `@lovable.dev/vite-tanstack-config`
- **Package Manager**: [Bun](https://bun.sh)

## Features

- 🛍️ Product catalog with filtering, sorting, and search
- 🛒 Cart with coupon codes and free-shipping threshold
- ❤️ Wishlist with localStorage persistence
- 🔍 Command-palette search (`Cmd+K`)
- ↔️ Side-by-side product comparison (up to 3 items)
- 📦 Collection pages (dresses, shirts, co-ords, ethnic wear, etc.)
- 📱 Fully responsive — mobile-first design
- 🎨 Luxury design system (Cormorant Garamond + DM Sans, gold accent, warm ivory)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.x or later

### Install & Run

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## Project Structure

```
src/
├── components/
│   ├── site/          # App-specific components (Header, Footer, ProductCard, …)
│   └── ui/            # shadcn/ui primitives (Button, Dialog, Sheet, …)
├── hooks/             # Custom React hooks
├── lib/
│   ├── products.ts    # Product catalog & helpers
│   ├── collections.ts # Collection definitions
│   ├── shop-store.tsx # Cart / wishlist / recently-viewed context
│   └── compare-store.tsx # Compare context
├── routes/            # TanStack Router file-based routes
│   ├── __root.tsx     # Root layout (Header, Footer, Providers)
│   ├── index.tsx      # Home page
│   ├── shop.tsx       # Shop / catalog page
│   ├── collection.$slug.tsx  # Collection pages
│   ├── product.$id.tsx       # Product detail page
│   └── wishlist.tsx   # Wishlist page
├── styles.css         # Global styles + Tailwind v4 design tokens
├── router.tsx         # Router instantiation
└── server.ts          # SSR server entry
```

## Design System

Custom design tokens defined in `src/styles.css`:

| Token | Value |
|---|---|
| `--canvas` | Warm ivory `oklch(0.975 0.006 80)` |
| `--ink` | Deep charcoal `oklch(0.18 0.005 60)` |
| `--accent` | Warm gold `oklch(0.72 0.085 75)` |
| Font display | Cormorant Garamond |
| Font body | DM Sans |

## Deployment

The project is configured for **Cloudflare Workers** via [Nitro](https://nitro.unjs.io). Run `bun build` and deploy the `.output/` directory to Cloudflare Pages / Workers.

## License

MIT
