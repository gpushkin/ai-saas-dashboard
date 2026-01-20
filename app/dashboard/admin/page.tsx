import AdminGuard from "@/components/AdminGuard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="mt-2 text-gray-600">
          Only admins can see this page.
        </p>
      </div>
    </AdminGuard>
  );
}