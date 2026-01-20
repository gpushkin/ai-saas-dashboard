"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t p-4 flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask something..."
      />
      <button
        className="bg-black text-white px-4 rounded"
        onClick={submit}
      >
        Send
      </button>
    </div>
  );
}