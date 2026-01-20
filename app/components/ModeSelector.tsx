type Props = {
  mode: string;
  setMode: (mode: string) => void;
};

export default function ModeSelector({ mode, setMode }: Props) {
  return (
    <select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-900"
    >
      <option value="writer">✍️ Writer Mode</option>
      <option value="business">💼 Business Mode</option>
      <option value="developer">👨‍💻 Developer Mode</option>
    </select>
  );
}