export default function ChatMessage({
  message,
}: {
  message: { role: "user" | "assistant"; content: string };
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? "bg-black text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}