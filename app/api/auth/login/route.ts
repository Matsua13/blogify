// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Request login received:", body);
  const { email, password } = body;

  if (!email || !password) {
    console.log("Email or password missing");
    return NextResponse.json({ error: 'Email and password needed' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  console.log("User found :", user);
  if (!user) {
    console.log("No users for this email");
    return NextResponse.json({ error: 'Invalid username' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("Valid password ?", isPasswordValid);
  if (!isPasswordValid) {
    console.log("Invalid password");
    return NextResponse.json({ error: 'Invalid username' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  console.log("Token generated :", token);

  const response = NextResponse.json({ message: 'Connection done' });
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
  });

  return response;
}
