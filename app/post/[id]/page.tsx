import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

// app/post/[id]/page.tsx
export default async function PostPage({ params: { id } }: { params: { id: string } }) {
  const postId = Number(id);
  const post = await prisma.post.findUnique({ where: { id: postId } });
  // Par exemple, si le post n'existe pas ou n'est pas publié, vous pouvez renvoyer une page 404 :
  if (!post || !post.published) {
    return notFound();
  }
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
