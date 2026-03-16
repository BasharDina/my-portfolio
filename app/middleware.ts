import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  const auth = request.headers.get("authorization");

  const username = process.env.STUDIO_BASIC_USER;
  const password = process.env.STUDIO_BASIC_PASS;

  if (!username || !password) {
    return new NextResponse("Studio auth is not configured.", { status: 500 });
  }

  if (auth) {
    const [scheme, encoded] = auth.split(" ");

    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const [user, pass] = decoded.split(":");

      if (user === username && pass === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Studio"',
    },
  });
}

export const config = {
  matcher: ["/studio/:path*"],
};