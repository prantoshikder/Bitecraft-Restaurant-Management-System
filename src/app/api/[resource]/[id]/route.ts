import { NextResponse } from "next/server";
import { find, isResource, remove, update } from "@/lib/db";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ resource: string; id: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  const { resource, id } = await params;
  if (!isResource(resource)) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const row = find(resource, id);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: row });
}

export async function PATCH(request: Request, { params }: Ctx) {
  const { resource, id } = await params;
  if (!isResource(resource)) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const body = (await request.json()) as Record<string, unknown>;
  const row = update(resource, id, body);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: row });
}

export async function PUT(request: Request, ctx: Ctx) {
  return PATCH(request, ctx);
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const { resource, id } = await params;
  if (!isResource(resource)) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const ok = remove(resource, id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
