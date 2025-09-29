// middleware.ts
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


// List of protected paths
const protectedPaths = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /dashboard routes
  // if (protectedPaths.some(path => pathname.startsWith(path))) {
  //   const accessToken = req.cookies.get("accessToken")?.value;
  //   console.log(accessToken)
  //   if (!accessToken) {
  //     const loginUrl = new URL("/login", req.url);
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   try {
  //     const user= jwtDecode(accessToken)
  //       console.log(user)
  //     // Token valid → allow access
  //     return NextResponse.next();
  //   } catch (err) {
  //     // Token invalid/expired → redirect to login
  //     const loginUrl = new URL("/login", req.url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  // Non-protected route → continue
  return NextResponse.next();
}