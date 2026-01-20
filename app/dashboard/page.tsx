import StatCard from "./components/StatCard";
import UsageChart from "./components/UsageChart";
import RecentActivity from "./components/RecentActivity";
import PlanBadge from "./components/PlanBadge";

export default function DashboardPage() {
  // TEMP: Later this will come from Firestore / Auth
  const userPlan = "free"; // free | pro | team

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-500 mt-1">
            Overview of your AI SaaS usage
          </p>
        </div>

        {/* PLAN BADGE */}
        <PlanBadge plan={userPlan} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total AI Chats"
          value="320"
          subtitle="This month"
        />
        <StatCard
          title="Developer Mode"
          value="140"
          subtitle="Requests used"
        />
        <StatCard
          title="Business Mode"
          value="98"
          subtitle="Requests used"
        />
        <StatCard
          title="Writer Mode"
          value="82"
          subtitle="Requests used"
        />
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UsageChart />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}