// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ message: 'Successful disconnection' });
  response.cookies.delete({ name: 'token', path: '/' });
  return response;
}
