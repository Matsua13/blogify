// app/admin/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { redirect } from 'next/navigation';
import DeleteButton from '../components/DeleteButton';

export default async function AdminDashboard() {
  // Récupère tous les articles (brouillons et publiés)
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <Link href="/admin/create" className="text-blue-500 underline">
        Create a new article
      </Link>
      <ul style={{ marginTop: '1rem' }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '1rem' }}>
            <strong>{post.title}</strong> -{' '}
            {post.published ? (
              <span style={{ color: 'green' }}>Publied</span>
            ) : (
              <span style={{ color: 'orange' }}>Draft</span>
            )}
            {' | '}
            <Link href={`/admin/edit/${post.id}`} className="text-blue-500 underline">
              Edit
            </Link>
            {' | '}
            <DeleteButton postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
