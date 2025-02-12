// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

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
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const body = await request.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        author: { connect: { id: tokenPayload.id } },
      },
    });
    return NextResponse.json(post, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}
