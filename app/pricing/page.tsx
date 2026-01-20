import { PLANS } from "../lib/plans";

type PlanKey = keyof typeof PLANS;
type PlanValue = (typeof PLANS)[PlanKey];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center">Pricing</h1>
      <p className="text-center text-zinc-500 mt-2">
        Choose a plan that fits your needs
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {Object.entries(PLANS).map(([key, plan]: [string, PlanValue]) => (
          <div
            key={key}
            className="border rounded-xl p-6 bg-white dark:bg-zinc-900"
          >
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-3xl font-bold mt-4">
              {key === "free" ? "₹0" : key === "pro" ? "₹999" : "₹2499"}
              <span className="text-sm font-normal text-zinc-500">
                /month
              </span>
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              {plan.features.map((f: string) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>

            <button className="mt-6 w-full bg-black text-white py-2 rounded-lg">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}