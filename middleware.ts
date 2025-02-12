// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Convertir la clé secrète en Uint8Array pour jose
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Par exemple, protéger uniquement les routes commençant par /admin
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      // Vérifier le token à l’aide de jose
      await jwtVerify(token, secret);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// Cette configuration permet d’appliquer le middleware aux routes /admin/*
export const config = {
  matcher: ['/admin/:path*'],
};
