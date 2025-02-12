// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const postCreationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  published: z.boolean().optional(), // si défini, permet de créer directement un article publié, sinon, c'est un brouillon (false)
});

export async function GET() {
  // Récupère les articles publiés
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  // Vérifie que l'utilisateur est authentifié
  const tokenPayload = await verifyToken(request);
  if (!tokenPayload) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = postCreationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }
  const { title, content, published } = parsed.data;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false, // par défaut, article en brouillon
        author: { connect: { id: tokenPayload.id } },
      },
    });
    return NextResponse.json(post, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Error while creation" }, { status: 500 });
  }
}
