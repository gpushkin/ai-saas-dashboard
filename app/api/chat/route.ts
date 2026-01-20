import { NextResponse } from "next/server";
import { groq } from "@/app/lib/groq";

const MODE_PROMPTS: Record<string, string> = {
  writer: `
You are a professional content writer.
Write engaging, well-structured, and clear responses.
`,

  business: `
You are a business consultant.
Answer with clarity, strategy, and actionable insights.
`,

  developer: `
You are a Senior Full-Stack Software Engineer.

Rules:
- Respond in structured sections
- Use clean, production-ready code
- Use proper code blocks
- Explain briefly and clearly
- Mention best practices and edge cases
- Avoid unnecessary verbosity

Response Format:
1. Problem Summary
2. Solution Approach
3. Code Implementation
4. Explanation
5. Best Practices / Notes
`,
};

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ FIXED MODEL
      messages: [
        {
          role: "system",
          content: MODE_PROMPTS[mode] || MODE_PROMPTS.developer,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI response failed" },
      { status: 500 }
    );
  }
}
