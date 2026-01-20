export default function UsageChart() {
  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">AI Usage Overview</h3>

      <div className="space-y-4">
        {[
          { label: "AI Chats Used", value: "320 / 500" },
          { label: "Developer Mode Requests", value: "140" },
          { label: "Business Mode Requests", value: "98" },
          { label: "Writer Mode Requests", value: "82" },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span className="text-zinc-500">{item.value}</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full">
              <div className="bg-black h-2 rounded-full w-[65%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}