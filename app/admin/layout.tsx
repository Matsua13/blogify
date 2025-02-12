// app/admin/layout.tsx
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex min-h-screen">
      <nav className="p-4 w-64 bg-gray-100">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="text-blue-500 hover:underline">
              Homepage
            </Link>
          </li>
          <li>
            <Link href="/admin" className="text-blue-500 hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/create" className="text-blue-500 hover:underline">
              Create an article
            </Link>
          </li>
          <li>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="text-red-500 hover:underline">
                Log out
              </button>
            </form>
          </li>
        </ul>
      </nav>
      <main className="p-8 flex-1">
        {children}
      </main>
    </div>
  );
}
