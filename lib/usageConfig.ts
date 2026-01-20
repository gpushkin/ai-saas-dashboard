export interface Plan {
  name: string;
  dailyLimit: number;
  monthlyLimit?: number;
  price: number;
  features: string[];
}

export const PLANS: Record<string, Plan> = {
  free: {
    name: "Free",
    dailyLimit: 5,
    price: 0,
    features: [
      "5 AI conversations per day",
      "Basic chat functionality",
      "Standard response time"
    ]
  },
  pro: {
    name: "Pro",
    dailyLimit: 100,
    monthlyLimit: 2000,
    price: 9.99,
    features: [
      "100 AI conversations per day",
      "Priority response time",
      "Advanced chat features",
      "Chat history",
      "Export conversations"
    ]
  },
  premium: {
    name: "Premium",
    dailyLimit: 500,
    monthlyLimit: 10000,
    price: 29.99,
    features: [
      "500 AI conversations per day",
      "Fastest response time",
      "All chat features",
      "Advanced analytics",
      "Custom AI personas",
      "API access"
    ]
  }
};

export const DEFAULT_PLAN = "free";

export function getPlanByName(planName: string): Plan | null {
  return PLANS[planName] || null;
}

export function isValidPlan(planName: string): boolean {
  return planName in PLANS;
}