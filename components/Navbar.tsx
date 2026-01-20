"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="flex justify-end border-b p-4">
      <Button variant="outline" onClick={logout}>
        Logout
      </Button>
    </header>
  );
}