export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}