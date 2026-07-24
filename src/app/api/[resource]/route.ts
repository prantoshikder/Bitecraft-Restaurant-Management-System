import { NextResponse } from "next/server";
import { create, isResource, list } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  if (!isResource(resource)) {
    return NextResponse.json({ error: `Unknown resource "${resource}"` }, { status: 404 });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase();
  const limit = Number(url.searchParams.get("limit") || 0);

  let rows = [...list(resource)] as Array<Record<string, unknown>>;

  for (const [key, value] of url.searchParams.entries()) {
    if (["q", "limit", "sort", "order"].includes(key)) continue;
    rows = rows.filter((row) => String(row[key]) === value);
  }

  if (q) {
    rows = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }

  const sort = url.searchParams.get("sort");
  if (sort) {
    const dir = url.searchParams.get("order") === "asc" ? 1 : -1;
    rows.sort((a, b) => (String(a[sort]) > String(b[sort]) ? dir : -dir));
  }

  if (limit > 0) rows = rows.slice(0, limit);

  return NextResponse.json({ data: rows, total: rows.length });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  if (!isResource(resource)) {
    return NextResponse.json({ error: `Unknown resource "${resource}"` }, { status: 404 });
  }
  const body = (await request.json()) as Record<string, unknown>;
  const row = create(resource, body);
  return NextResponse.json({ data: row }, { status: 201 });
}
