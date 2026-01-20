import AnalyticsCard from "../components/AnalyticsCard";
import ModeBreakdown from "../components/ModeBreakdown";
import WeeklyUsage from "../components/WeeklyUsage";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-zinc-500 mt-1">
          AI usage insights and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Requests"
          value="320"
          trend="+12% this week"
        />
        <AnalyticsCard
          title="Active Days"
          value="18"
        />
        <AnalyticsCard
          title="Avg Requests / Day"
          value="17"
        />
        <AnalyticsCard
          title="Success Rate"
          value="99.2%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyUsage />
        </div>
        <ModeBreakdown />
      </div>
    </div>
  );
}
