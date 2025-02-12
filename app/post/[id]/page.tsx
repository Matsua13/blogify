// app/post/[id]/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

export default async function PostPage({ params }: Params) {
  const postId = Number(params.id);
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
