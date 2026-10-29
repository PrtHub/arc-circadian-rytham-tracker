import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Permanent 308/301 redirect from arcapp.sbs (and www variants) to primary arccircadian.com
  if (
    host.includes("arcapp.sbs") ||
    host === "www.arccircadian.com" ||
    host === "www.arcapp.sbs"
  ) {
    const url = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      "https://arccircadian.com"
    );
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

