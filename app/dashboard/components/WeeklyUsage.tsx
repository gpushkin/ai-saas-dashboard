const WEEK_DATA = [
  { day: "Mon", value: 60 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 50 },
];

export default function WeeklyUsage() {
  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Weekly AI Requests
      </h3>

      <div className="flex items-end gap-3 h-40">
        {WEEK_DATA.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="w-8 bg-black rounded-md"
              style={{ height: `${item.value}%` }}
            />
            <span className="text-xs text-zinc-500">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}