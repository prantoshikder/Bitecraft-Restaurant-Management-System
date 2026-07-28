<div align="center">

# 🍽️ BiteCraft

### Restaurant Management System

**A complete, production-style restaurant platform — customer website and full admin panel in one Next.js app.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.29-0170FE?style=flat-square&logo=antdesign&logoColor=white)](https://ant.design)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://motion.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-8cb33f?style=flat-square)](LICENSE)

[Quick Start](#-quick-start) · [Features](#-features) · [Admin Panel](#-admin-panel) · [Architecture](#-architecture) · [API](#-api-reference) · [Customising](#-customising) · [Author](#-author)

</div>

---

## ✨ Overview

BiteCraft is a premium dark + olive-green restaurant platform that ships **two complete applications** behind a single codebase:

| | |
| :-- | :-- |
| 🌐 **Customer website** | Animated landing page, searchable menu, cart & checkout, reservations, blog, gallery, events |
| 🔐 **Admin panel** | 19 fully-CRUD sections, live analytics dashboard, role-based access control |

Everything runs out of the box — no database setup, no environment variables, no external services. Data is seeded automatically on first run.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/prantoshikder/Bitecraft-Restaurant-Management-System.git
cd Bitecraft-Restaurant-Management-System

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — the demo data seeds itself on first request.

### Available scripts

| Command | What it does |
| :-- | :-- |
| `npm run dev` | Start the development server on port 3000 (Turbopack) |
| `npm run dev:webpack` | Same, but with the legacy webpack dev server |
| `npm run build` | Production build (also the project's type-check gate) |
| `npm start` | Serve the production build |
| `npm run clean` | Remove `.next/` and the TS build cache |

> **Requirements:** Node.js 18.18+ (Node 20 LTS or newer recommended).
>
> **Why Turbopack?** The webpack dev server corrupts its server-side module
> registry after a handful of hot reloads in this app and starts throwing
> `__webpack_modules__[moduleId] is not a function` on every request until it's
> restarted. Turbopack doesn't, and it recompiles in ~25 ms instead of ~200 ms.
> If a dev server ever gets into a bad state, `npm run clean && npm run dev`
> resets it.

---

## 🔐 Admin Panel

Visit **[http://localhost:3000/admin](http://localhost:3000/admin)** (or click *Admin Panel* in the site footer). You'll be redirected to `/login`.

**Click any demo card on the login page to auto-fill the credentials:**

| Role | Email | Password | Access level |
| :-- | :-- | :-- | :-- |
| 👑 **Admin** | `admin@bitecraft.com` | `admin123` | Everything, including Settings |
| 🧑‍💼 **Manager** | `manager@bitecraft.com` | `manager123` | Everything except Settings |
| 🧑‍🍳 **Staff** | `staff@bitecraft.com` | `staff123` | Operations only — orders, reservations, tables, menu, inventory, messages |

Menus and routes are filtered per role by the same rule set, so a staff member never sees — or can navigate to — a manager-only page.

---

## 🎯 Features

### 🌐 Customer website

<table>
<tr><td width="50%" valign="top">

**Landing page**
- Animated hero with entrance transitions
- What we do · Our story
- Category browser
- Popular dishes & Today's menu
- Table booking banner
- Meet the chefs
- Why choose us
- Gallery strip
- Testimonials carousel
- Special offers
- Latest blog posts

</td><td width="50%" valign="top">

**Pages & flows**
- **Menu** — live search, category filter, sorting
- **Dish detail** — full nutrition, tags, add to cart
- **Cart + Checkout** — persisted to `localStorage`
- **Reservation** — date, time, party size
- **Gallery** — filterable lightbox
- **Blog** — list + article pages
- **Events**, **About**, **Contact** (form + map)

</td></tr>
</table>

### 📊 Admin panel

| Group | Sections |
| :-- | :-- |
| **Overview** | Dashboard — KPIs, revenue/orders chart, sales-by-category donut, top dishes, recent activity |
| **Operations** | Orders (status workflow + payment toggle) · Reservations (table assignment) · Tables |
| **Catalog** | Menu Items · Categories · Offers |
| **People** | Customers · Staff · Chefs |
| **Inventory** | Inventory (low-stock alerts) · Suppliers |
| **Content** | Blog Posts · Gallery · Events · Reviews (moderation) |
| **Communication** | Messages (contact inbox, read/unread) · Subscribers (CSV export) |
| **System** | Settings — restaurant profile, finance, social links |

Every section supports **create · read · update · delete** with search, filtering, sorting and pagination — all powered by one generic `CrudManager` component.

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── (site)/              # Customer website — shared header, footer, cart
│   │   ├── page.tsx         #   landing page
│   │   ├── menu/[slug]/     #   menu list + dish detail
│   │   ├── blog/[slug]/     #   blog list + article
│   │   └── ...              #   about · events · gallery · contact · reservation · checkout
│   ├── admin/               # Admin panel — guarded by middleware + session cookie
│   ├── login/               # Admin sign-in
│   └── api/
│       ├── [resource]/      #   generic REST CRUD for all 18 resources
│       ├── auth/            #   cookie-based login / logout
│       └── stats/           #   dashboard analytics
├── components/
│   ├── site/                # Website sections & components
│   ├── admin/               # Admin shell, charts, CrudManager, per-resource managers
│   └── ui/                  # Shared primitives — SmartImage, Reveal, SectionHeading
├── lib/
│   ├── db.ts                # JSON file store (seeded on first run, cached in memory)
│   ├── seed.ts              # Rich demo data
│   ├── types.ts             # All domain types
│   ├── auth.ts              # Demo auth + session encoding
│   ├── rbac.ts              # Single source of truth for menus + permissions
│   └── api.ts               # Client fetch helpers
├── temp/                    # Static page copy (nav, feature lists, contact info)
└── middleware.ts            # Route guard for /admin and /login
```

### 💾 Data

Data lives in **`data/db.json`**, seeded automatically on first run from `src/lib/seed.ts` and cached in memory across hot reloads.

```bash
rm data/db.json    # reset to fresh demo data (the file is git-ignored)
```

Swapping in a real database (Postgres, Prisma, MongoDB…) only means rewriting `src/lib/db.ts` — the API contract and every UI component stay untouched.

### 🎨 Design system

Brand tokens and component classes are declared CSS-first in `src/app/globals.css`:

```css
--color-brand: #8cb33f;   /* olive green   */
--color-ink:   #0e1210;   /* deep charcoal */
--color-cream: #f8f6f0;   /* warm surface  */
```

- **Public site** — hand-built Tailwind 4 + Framer Motion
- **Admin panel** — Ant Design 5, themed to the same palette in `AdminProviders.tsx`
- **Above-the-fold** content animates with pure CSS so it's never invisible during hydration; below-the-fold sections use scroll-triggered `<Reveal>` — both honour `prefers-reduced-motion`

### 🔒 Auth & permissions

A session is stored in an httpOnly cookie and `src/middleware.ts` guards every `/admin` route. `src/lib/rbac.ts` is the single source of truth for both the sidebar and route access — change a role there and the menu, the middleware and the page guard all follow.

---

## 🔌 API Reference

One generic route serves every resource — `categories`, `dishes`, `orders`, `reservations`, `tables`, `customers`, `staff`, `chefs`, `inventory`, `suppliers`, `offers`, `posts`, `gallery`, `reviews`, `events`, `messages`, `subscribers`, `settings`.

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| `GET` | `/api/:resource` | List rows |
| `POST` | `/api/:resource` | Create a row |
| `GET` | `/api/:resource/:id` | Fetch one row |
| `PATCH` / `PUT` | `/api/:resource/:id` | Update a row |
| `DELETE` | `/api/:resource/:id` | Delete a row |
| `POST` | `/api/auth/login` | Sign in, set session cookie |
| `POST` | `/api/auth/logout` | Sign out |
| `GET` | `/api/stats` | Dashboard analytics |

**Query parameters** on list endpoints:

```http
GET /api/dishes?q=salmon&sort=price&order=asc&limit=10
GET /api/orders?status=pending&type=delivery
```

| Param | Effect |
| :-- | :-- |
| `q` | Full-text search across the row |
| `sort` + `order` | Sort by field (`asc` / `desc`, default `desc`) |
| `limit` | Cap the number of rows returned |
| *anything else* | Exact-match filter on that field |

---

## 🛠️ Customising

| I want to… | Do this |
| :-- | :-- |
| Change the brand colour | Edit `--color-brand` in `src/app/globals.css` and `brand` in `components/admin/AdminProviders.tsx` |
| Edit website copy | Update the matching file in `src/temp/` |
| Change demo data | Edit `src/lib/seed.ts`, then delete `data/db.json` |
| Add an admin section | Add the type to `lib/types.ts`, the key to `RESOURCES` in `lib/db.ts`, a menu entry in `lib/rbac.ts`, an icon in `components/admin/nav.ts`, then a `<Manager>` wrapping `CrudManager` |
| Change who sees what | Edit the `roles` on the relevant entry in `src/lib/rbac.ts` |
| Use a real database | Rewrite `src/lib/db.ts` — nothing else needs to change |

---

## ⚠️ Before going to production

This project ships as a complete, self-contained demo. Harden these before deploying it for real:

- `src/lib/auth.ts` holds hard-coded users with plaintext passwords → move to a real user store with hashed passwords
- The session cookie is base64-encoded, not signed or encrypted → switch to a signed/encrypted token (e.g. JWT or `iron-session`)
- `/api/[resource]` has no authentication → add a session check to the route handlers
- The JSON file store is single-process and non-transactional → replace `src/lib/db.ts` with a real database
- `next.config.ts` allows images from any remote host → restrict `remotePatterns` to the hosts you actually use

---

## 🧰 Tech Stack

| Layer | Technology |
| :-- | :-- |
| Framework | Next.js 15 (App Router, Server Components) · React 19 |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS 4 — CSS-first `@theme` config |
| Admin UI | Ant Design 5 + React 19 compat patch + SSR registry |
| Animation | Framer Motion 12 |
| Icons | React Icons 5 · Ant Design Icons |
| Dates | Day.js |
| Storage | JSON file store (swappable) |

---

## 👤 Author

**Pranto Shikder**

[![GitHub](https://img.shields.io/badge/GitHub-prantoshikder-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/prantoshikder)
[![Email](https://img.shields.io/badge/Email-prantoshikder24@gmail.com-8cb33f?style=flat-square&logo=gmail&logoColor=white)](mailto:prantoshikder24@gmail.com)

Designed, built and maintained by Pranto Shikder. Issues and pull requests are welcome on the
[repository](https://github.com/prantoshikder/Bitecraft-Restaurant-Management-System/issues).

---

## 📄 License

Released under the [MIT License](LICENSE) — © 2026 Pranto Shikder.

---

<div align="center">

**Built with Next.js 15 by [Pranto Shikder](https://github.com/prantoshikder) · Made with 🫒 and a lot of coffee**

⭐ If this project helped you, consider giving it a star!

</div>
