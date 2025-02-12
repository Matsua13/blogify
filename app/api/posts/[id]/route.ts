// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  published: z.boolean().optional(),
});

// Récupération d'un article par son ID (pour préremplir le formulaire d'édition par exemple)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

// Edition d'un article
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const tokenPayload = await verifyToken(request);
  if (!tokenPayload) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }
  const postId = Number(params.id);
  const body = await request.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }
  const { title, content, published } = parsed.data;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        published: published !== undefined ? published : false,
      },
    });
    return NextResponse.json(updatedPost);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Error while updating" }, { status: 500 });
  }
}

// Suppression d'un article
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  console.log("DELETE endpoint reached, id:", params.id); // Log pour vérifier l'appel
  const tokenPayload = await verifyToken(request);
  console.log("TokenPayload dans DELETE:", tokenPayload);
  if (!tokenPayload) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }
  const postId = Number(params.id);
  try {
    await prisma.post.delete({ where: { id: postId } });
    return NextResponse.json({ message: "Article deleted with success" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json({ error: "Error while deleting" }, { status: 500 });
  }
}
