type Props = {
  plan: "free" | "pro" | "team";
};

export default function PlanBadge({ plan }: Props) {
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-black text-white">
      {plan.toUpperCase()} PLAN
    </span>
  );
}