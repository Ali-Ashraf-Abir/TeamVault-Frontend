// middleware.ts
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshAccessToken } from "./api/api";

// List of protected paths
const protectedPaths = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /dashboard routes
  // if (protectedPaths.some(path => pathname.startsWith(path))) {
  //   let accessToken = req.cookies.get("accessToken")?.value;
    
  //   // If no access token, try to refresh
  //   if (!accessToken) {
  //     console.log("No access token, attempting refresh...");
  //     const newToken = await refreshAccessToken();
      
  //     if (newToken) {
  //       // Create response and set the new token
  //       const response = NextResponse.next();
  //       response.cookies.set("accessToken", newToken, {
  //         httpOnly: true,
  //         secure: process.env.NODE_ENV === "production",
  //         sameSite: "lax",
  //         path: "/"
  //       });
  //       return response;
  //     } else {
  //       // Refresh failed, redirect to login
  //       console.log("Refresh failed, redirecting to login");
  //       const loginUrl = new URL("/login", req.url);
  //       return NextResponse.redirect(loginUrl);
  //     }
  //   }

  //   // Validate existing access token
  //   try {
  //     const user = jwtDecode(accessToken);
  //     console.log("Token valid:", user);
  //     return NextResponse.next();
  //   } catch (err) {
  //     // Token invalid, try to refresh
  //     console.log("Token invalid, attempting refresh...");
  //     const newToken = await refreshAccessToken();
      
  //     if (newToken) {
  //       const response = NextResponse.next();
  //       response.cookies.set("accessToken", newToken, {
  //         httpOnly: true,
  //         secure: process.env.NODE_ENV === "production",
  //         sameSite: "lax",
  //         path: "/"
  //       });
  //       return response;
  //     } else {
  //       // Refresh failed, redirect to login
  //       const loginUrl = new URL("/login", req.url);
  //       return NextResponse.redirect(loginUrl);
  //     }
  //   }
  // }

  // Non-protected route → continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};