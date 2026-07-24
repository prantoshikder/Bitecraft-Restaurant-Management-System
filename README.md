# BiteCraft — Restaurant Management System

A complete, production-style restaurant platform built with **Next.js 15 (App Router)**,
**Tailwind CSS 4**, **Ant Design 5**, **Framer Motion**, and **React Icons** — one project that
contains both the customer-facing website and a full admin panel.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## Admin panel

Open **http://localhost:3000/admin** (or click *Admin Panel* in the footer). You'll be redirected
to `/login`. Demo accounts (click any card on the login page to auto-fill):

| Role    | Email                  | Password    |
| ------- | ---------------------- | ----------- |
| Admin   | admin@bitecraft.com    | admin123    |
| Manager | manager@bitecraft.com  | manager123  |
| Staff   | staff@bitecraft.com    | staff123    |

## What's included

### Customer website (`/`)
Premium dark + olive-green landing page matching the reference design: animated hero, what-we-do,
our story, categories, popular dishes, today's menu, table reservation, chefs, why-choose-us,
gallery, testimonials carousel, special offers, and blog. Plus full pages for **Menu** (search +
category filter + sort), **dish detail**, **About**, **Events**, **Gallery** (filterable lightbox),
**Blog** (list + detail), **Contact** (form + map), **Reservation**, and a working **Cart +
Checkout** flow (persisted to localStorage).

### Admin panel (`/admin`)
- **Dashboard** — KPIs, revenue/orders area chart, sales-by-category donut, top dishes, recent
  orders & reservations (all from a live `/api/stats` endpoint)
- **Orders** — status workflow (pending → completed), detail drawer, payment toggle, filters
- **Reservations** — table assignment, status management
- **Tables**, **Menu Items**, **Categories**, **Offers**
- **Customers**, **Staff**, **Chefs**
- **Inventory** (low-stock alerts), **Suppliers**
- **Blog Posts**, **Gallery**, **Events**, **Reviews** (moderation)
- **Messages** (contact inbox with read/unread), **Subscribers** (CSV export)
- **Settings** — restaurant profile, finance and social links

Every admin section has full create / read / update / delete with search, filtering, sorting and
pagination, powered by a generic `CrudManager` component.

## Architecture

```
src/
  app/
    (site)/            # customer website route group (shared header/footer/cart)
    admin/             # admin panel (protected by middleware + session cookie)
    login/             # admin login
    api/[resource]/    # generic REST CRUD for every resource
    api/auth/          # cookie-based login/logout
    api/stats/         # dashboard analytics
  components/
    site/              # website sections & components
    admin/             # admin shell, charts, CrudManager, per-resource managers
    ui/                # shared primitives (SmartImage, Reveal, SectionHeading)
  lib/
    db.ts              # JSON file store (seeded on first run, cached in memory)
    seed.ts            # rich demo data
    types.ts           # all domain types
    auth.ts            # demo auth + session encoding
    api.ts             # client fetch helpers
```

### Data
Data is stored in `data/db.json`, seeded automatically on first run from `src/lib/seed.ts`.
Delete that file (or it's git-ignored anyway) to reset to fresh demo data. Swap `src/lib/db.ts`
for a real database (Postgres, Prisma, etc.) without touching the UI — the API contract stays the
same.

### Auth
A signed session is stored in an httpOnly cookie; `src/middleware.ts` guards all `/admin` routes.
The demo user table lives in `src/lib/auth.ts` — replace with hashed passwords + a real user store
for production.

## Tech
- Next.js 15.5 · React 19
- Tailwind CSS 4 (CSS-first `@theme` config)
- Ant Design 5 (with React 19 compat patch + SSR registry)
- Framer Motion 12 · React Icons 5
- TypeScript (strict)
