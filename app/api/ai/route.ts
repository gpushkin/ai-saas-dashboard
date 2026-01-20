import { NextResponse } from "next/server";

// Minimal POST handler so this file is a valid route module.
export async function POST(request: Request) {
	// Return a small JSON response. Replace with real logic later.
	return NextResponse.json({ ok: true });
}
