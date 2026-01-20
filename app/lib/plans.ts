export type Plan = "free" | "pro" | "team";

type PlanConfig = {
  name: string;
  monthlyLimit: number;
  features: string[];
};

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    name: "Free",
    monthlyLimit: 50,
    features: [
      "50 AI chats / month",
      "Writer Mode",
      "Basic Analytics",
    ],
  },
  pro: {
    name: "Pro",
    monthlyLimit: 500,
    features: [
      "500 AI chats / month",
      "Developer Mode",
      "Business Mode",
      "Advanced Analytics",
    ],
  },
  team: {
    name: "Team",
    monthlyLimit: 2000,
    features: [
      "2000 AI chats / month",
      "All AI Modes",
      "Team Analytics",
      "Priority Support",
    ],
  },
};

/* ===============================
   USAGE HELPERS (IMPORTANT)
================================ */

// Can user send another AI request?
export function canUseAI(
  plan: Plan,
  usedCount: number
): boolean {
  const limit = PLANS[plan].monthlyLimit;
  return usedCount < limit;
}

// Remaining AI messages
export function getRemainingUsage(
  plan: Plan,
  usedCount: number
): number {
  return Math.max(
    PLANS[plan].monthlyLimit - usedCount,
    0
  );
}

// Get plan display name
export function getPlanName(plan: Plan): string {
  return PLANS[plan].name;
}

// Get features (useful for pricing page)
export function getPlanFeatures(plan: Plan): string[] {
  return PLANS[plan].features;
}