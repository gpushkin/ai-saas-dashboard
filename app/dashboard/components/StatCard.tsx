type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-xl p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
      <p className="text-xs text-zinc-400 mt-1">{subtitle}</p>
    </div>
  );
}