export async function checkUsage(userId: string) {
  const res = await fetch("/api/usage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error("Usage limit exceeded");
  }

  return res.json();
}