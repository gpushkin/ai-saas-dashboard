type AnalyticsCardProps = {
  title: string;
  value: string;
  trend?: string;
};

export default function AnalyticsCard({
  title,
  value,
  trend,
}: AnalyticsCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-xl p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      {trend && (
        <p className="text-xs text-green-600 mt-1">{trend}</p>
      )}
    </div>
  );
}
