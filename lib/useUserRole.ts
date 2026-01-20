"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";

export function useUserRole() {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      setRole(snap.data()?.role ?? "user");
      setLoading(false);
    };

    fetchRole();
  }, []);

  return { role, loading };
}