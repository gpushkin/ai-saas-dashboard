"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Topbar() {
  const logout = async () => {
    try {
      await signOut(auth);

      // 🔥 CLEAR FIREBASE STORAGE EXPLICITLY
      indexedDB.deleteDatabase("firebaseLocalStorageDb");
      localStorage.clear();
      sessionStorage.clear();

      // 🔥 HARD REDIRECT (NO RE-RENDER)
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
