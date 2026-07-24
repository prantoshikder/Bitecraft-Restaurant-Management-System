import fs from "node:fs";
import path from "node:path";
import { buildSeed } from "./seed";
import type { DB, Resource } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

/** Cached across hot reloads in dev so we don't hit disk on every request. */
const globalForDb = globalThis as unknown as { __bitecraftDb?: DB };

function load(): DB {
  if (globalForDb.__bitecraftDb) return globalForDb.__bitecraftDb;

  let db: DB;
  try {
    if (fs.existsSync(DB_FILE)) {
      db = JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as DB;
    } else {
      db = buildSeed();
      persist(db);
    }
  } catch {
    db = buildSeed();
  }

  globalForDb.__bitecraftDb = db;
  return db;
}

function persist(db: DB) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch {
    /* read-only filesystem (e.g. serverless) — keep the in-memory copy only */
  }
}

export function getDb(): DB {
  return load();
}

export function saveDb(db: DB) {
  globalForDb.__bitecraftDb = db;
  persist(db);
}

export function resetDb() {
  const db = buildSeed();
  saveDb(db);
  return db;
}

const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;

export function list<K extends Resource>(resource: K): DB[K] {
  return getDb()[resource];
}

export function find<K extends Resource>(resource: K, id: string): DB[K][number] | undefined {
  return (getDb()[resource] as Array<{ id: string }>).find((r) => r.id === id) as DB[K][number] | undefined;
}

export function create<K extends Resource>(resource: K, payload: Record<string, unknown>): DB[K][number] {
  const db = getDb();
  const row = {
    id: uid(resource.slice(0, 3)),
    createdAt: new Date().toISOString(),
    ...payload,
  } as DB[K][number];
  (db[resource] as unknown as Array<unknown>).unshift(row);
  saveDb(db);
  return row;
}

export function update<K extends Resource>(resource: K, id: string, payload: Record<string, unknown>): DB[K][number] | null {
  const db = getDb();
  const rows = db[resource] as unknown as Array<{ id: string }>;
  const i = rows.findIndex((r) => r.id === id);
  if (i === -1) return null;
  rows[i] = { ...rows[i], ...payload, id };
  saveDb(db);
  return rows[i] as DB[K][number];
}

export function remove<K extends Resource>(resource: K, id: string): boolean {
  const db = getDb();
  const rows = db[resource] as unknown as Array<{ id: string }>;
  const i = rows.findIndex((r) => r.id === id);
  if (i === -1) return false;
  rows.splice(i, 1);
  saveDb(db);
  return true;
}

export const RESOURCES: Resource[] = [
  "categories", "dishes", "orders", "reservations", "tables", "customers",
  "staff", "chefs", "inventory", "suppliers", "offers", "posts", "gallery",
  "reviews", "events", "messages", "subscribers", "settings",
];

export function isResource(value: string): value is Resource {
  return (RESOURCES as string[]).includes(value);
}
