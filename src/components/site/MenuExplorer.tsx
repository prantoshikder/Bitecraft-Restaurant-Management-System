"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { TbTrendingUp, TbStar, TbSortAscending, TbSortDescending } from "react-icons/tb";
import DishCard from "@/components/site/DishCard";
import Select, { type SelectOption } from "@/components/ui/Select";
import type { Category, Dish } from "@/lib/types";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: SelectOption<SortKey>[] = [
  { label: "Most Popular", value: "popular", icon: <TbTrendingUp className="size-4" /> },
  { label: "Top Rated", value: "rating", icon: <TbStar className="size-4" /> },
  { label: "Price: Low to High", value: "price-asc", icon: <TbSortAscending className="size-4" /> },
  { label: "Price: High to Low", value: "price-desc", icon: <TbSortDescending className="size-4" /> },
];

export default function MenuExplorer({ dishes, categories }: { dishes: Dish[]; categories: Category[] }) {
  const params = useSearchParams();
  const initialCat = params.get("category") ?? "all";

  const [active, setActive] = useState(initialCat);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let rows = dishes;
    if (active !== "all") {
      const cat = categories.find((c) => c.slug === active);
      if (cat) rows = rows.filter((d) => d.categoryId === cat.id);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    const sorted = [...rows];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else sorted.sort((a, b) => b.reviews - a.reviews);
    return sorted;
  }, [dishes, categories, active, query, sort]);

  const tabs = [{ slug: "all", name: "All Menu" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="container-x">
        {/* Controls */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setActive(tab.slug)}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  active === tab.slug
                    ? "bg-brand text-white shadow-[0_10px_25px_-12px_rgba(140,179,63,0.9)]"
                    : "border border-ink/10 bg-white text-ink/70 hover:border-brand hover:text-brand"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes..."
                className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-brand sm:w-56"
              />
            </div>
            <Select
              value={sort}
              onChange={setSort}
              options={SORT_OPTIONS}
              align="right"
              className="w-52"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> dishes
        </p>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-muted">No dishes match your search.</div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
