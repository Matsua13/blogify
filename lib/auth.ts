// lib/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(request: NextRequest) {
  // Exemple : lecture du token dans un cookie nommé "token"
  const token = request.cookies.get('token')?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return payload; // Doit contenir par exemple { id: number, role: string, ... }
  } catch (err) {
    console.error("Erreur dans verifyToken :", err);
    return null;
  }
}
