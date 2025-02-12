// app/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Blogify</h1>
      {posts.length === 0 ? (
        <p>Any blog yet at the moment.</p>
      ) : (
        posts.map((post) => (
          <article key={post.id} style={{ marginBottom: '2rem' }}>
            <h2>{post.title}</h2>
            <p>{post.content.slice(0, 150)}...</p>
            <Link href={`/post/${post.id}`}>Read more</Link>
          </article>
        ))
      )}
    </main>
  );
}
