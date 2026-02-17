import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { setCookiesValue } from "./lib/experiments";

export default function middleware(request: NextRequest) {
  let response = NextResponse.next();
  response = setCookiesValue(request, response);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
