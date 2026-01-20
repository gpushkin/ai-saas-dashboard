export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

      <ul className="space-y-3 text-sm">
        <li className="flex justify-between">
          <span>💬 AI Chat (Developer Mode)</span>
          <span className="text-zinc-500">2 min ago</span>
        </li>

        <li className="flex justify-between">
          <span>📊 Viewed Analytics</span>
          <span className="text-zinc-500">15 min ago</span>
        </li>

        <li className="flex justify-between">
          <span>✍️ Writer Mode Used</span>
          <span className="text-zinc-500">1 hour ago</span>
        </li>

        <li className="flex justify-between">
          <span>🔐 Logged In</span>
          <span className="text-zinc-500">Today</span>
        </li>
      </ul>
    </div>
  );
}