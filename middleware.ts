import { jwtDecode, JwtPayload } from "jwt-decode";
import { type NextRequest, NextResponse } from "next/server";

const roleAccess: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/teacher": ["TEACHER"],
  "/student": ["STUDENT"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwtDecode(token) as any;
    const role = decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] as string;

    const path = req.nextUrl.pathname;

    for (const [prefix, allowedRoles] of Object.entries(roleAccess)) {
      if (path.startsWith(prefix) && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL("/404", req.url));
      }
    }

    return NextResponse.next();
  } catch {
    // Invalid / expired token
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware only to protected sections
export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*"],
};
