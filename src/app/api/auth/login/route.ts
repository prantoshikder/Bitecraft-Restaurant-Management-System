import { NextResponse } from "next/server";
import { AUTH_COOKIE, USERS, encodeSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email?: string; password?: string };

  const match = USERS.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase().trim() && u.password === password,
  );

  if (!match) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const { password: _pw, ...user } = match;
  const response = NextResponse.json({ data: user });
  response.cookies.set(AUTH_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
