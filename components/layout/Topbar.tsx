"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">Dashboard</h1>

      <button
        onClick={logout}
        className="text-sm bg-black text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
}