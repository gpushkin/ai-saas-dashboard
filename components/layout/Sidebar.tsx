"use client";

import Link from "next/link";
import { useUserRole } from "@/lib/useUserRole";

export default function Sidebar() {
  const { role } = useUserRole();

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 text-xl font-bold border-b">
        AI SaaS
      </div>

      <nav className="p-4 space-y-2">
        <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>

        <Link href="/dashboard/chat" className="block px-3 py-2 rounded hover:bg-gray-100">
          AI Chat
        </Link>

        <Link href="/dashboard/analytics" className="block px-3 py-2 rounded hover:bg-gray-100">
          Analytics
        </Link>

        {role === "admin" && (
          <Link
            href="/dashboard/admin"
            className="block px-3 py-2 rounded bg-gray-100 font-medium"
          >
            Admin
          </Link>
        )}
      </nav>
    </aside>
  );
}