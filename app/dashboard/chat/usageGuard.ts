import { PLANS, Plan } from "@/app/lib/plans";

export function canUseAI(
  plan: Plan,
  used: number
) {
  return used < PLANS[plan].monthlyLimit;
}