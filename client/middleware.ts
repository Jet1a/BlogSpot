import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const { pathname } = request.nextUrl;

  if (!token) {
    if (
      pathname.startsWith("/blogs/detail") ||
      pathname.startsWith("/blogs/share")
    ) {
      const loginUrl = new URL("/auth", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blogs/:path*"],
};
