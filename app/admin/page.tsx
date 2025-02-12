// app/admin/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/admin/create">Create a new article</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} - {post.published ? 'Publied' : 'Draft'}
          </li>
        ))}
      </ul>
    </div>
  );
}
