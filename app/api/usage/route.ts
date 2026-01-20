import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/services/usage.service";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const result = await checkAndIncrementUsage(userId);

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Daily limit reached" },
      { status: 429 }
    );
  }

  return NextResponse.json(result);
}