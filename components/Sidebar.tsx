"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "AI Chat",
    href: "/dashboard/chat",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-6 py-8">
      <h1 className="text-xl font-bold mb-10">AI SaaS</h1>

      <h1 className="text-xl font-extrabold tracking-tight">
  AI<span className="text-brand">Suite</span>
</h1>
<p className="text-xs text-gray-400 mt-1">
  Your AI Work Assistant
</p>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}