import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, decodeSession } from "@/lib/auth";
import { canAccessPath } from "@/lib/rbac";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const user = decodeSession(token);

  // Protect the admin area — must be signed in.
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // Role-based access — bounce disallowed pages back to the dashboard.
    if (!canAccessPath(user.role, pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "?denied=1";
      return NextResponse.redirect(url);
    }
  }

  // Already signed in → skip the login page.
  if (pathname === "/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
