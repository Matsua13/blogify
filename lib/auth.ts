// lib/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    return payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return null;
  }
}
