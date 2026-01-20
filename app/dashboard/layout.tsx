"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const redirected = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 🔥 Prevent double execution (Strict Mode)
        if (!redirected.current) {
          redirected.current = true;
          window.location.replace("/login");
        }
        return;
      }

      // ✅ Auth confirmed
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
