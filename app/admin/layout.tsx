// app/admin/layout.tsx
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ padding: '1rem', width: '200px', background: '#f0f0f0' }}>
        <ul>
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/create">Create an article</Link>
          </li>
          <li>
            <form action="/api/auth/logout" method="POST">
              <button type="submit">Disconnect</button>
            </form>
          </li>
        </ul>
      </nav>
      <main style={{ padding: '2rem', flex: 1 }}>{children}</main>
    </div>
  );
}
