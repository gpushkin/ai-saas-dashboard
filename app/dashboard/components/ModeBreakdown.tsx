const MODES = [
  { name: "Developer Mode", value: 48 },
  { name: "Business Mode", value: 32 },
  { name: "Writer Mode", value: 20 },
];

export default function ModeBreakdown() {
  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Usage by Mode
      </h3>

      <div className="space-y-4">
        {MODES.map((mode) => (
          <div key={mode.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{mode.name}</span>
              <span className="text-zinc-500">
                {mode.value}%
              </span>
            </div>

            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full">
              <div
                className="bg-black h-2 rounded-full"
                style={{ width: `${mode.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}