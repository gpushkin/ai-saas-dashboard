"use client";

import { useUserRole } from "@/lib/useUserRole";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, loading } = useUserRole();
  const router = useRouter();

  if (loading) return <div>Checking permissions...</div>;

  if (role !== "admin") {
    router.push("/dashboard");
    return null;
  }

  return <>{children}</>;
}